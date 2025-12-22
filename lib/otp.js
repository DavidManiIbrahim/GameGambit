import { getDb } from './mongo';

export const DEFAULT_EXPIRY_MINUTES = Number(process.env.OTP_EXPIRY_MINUTES || 10);
export const RESEND_COOLDOWN_SECONDS = Number(process.env.RESEND_COOLDOWN_SECONDS || 60);

export function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function useMongo() {
  return !!process.env.MONGODB_URI;
}

// Create or update an OTP for the given key (email)
export async function createOtpFor(key, { ttlMinutes = DEFAULT_EXPIRY_MINUTES } = {}) {
  if (await useMongo()) {
    const db = await getDb();
    const col = db.collection('otps');
    const code = generateCode();
    const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);
    const nextResendAt = new Date(Date.now() + RESEND_COOLDOWN_SECONDS * 1000);
    const doc = { _id: key, code, expiresAt, nextResendAt, attempts: 0, verified: false };
    await col.updateOne({ _id: key }, { $set: doc }, { upsert: true });
    return doc;
  }

  // fallback in-memory
  if (!global._otp_store) global._otp_store = new Map();
  const code = generateCode();
  const expiresAt = Date.now() + ttlMinutes * 60 * 1000;
  const nextResendAt = Date.now() + RESEND_COOLDOWN_SECONDS * 1000;
  const entry = { code, expiresAt, nextResendAt, attempts: 0, verified: false };
  global._otp_store.set(key, entry);
  return entry;
}

export async function getOtpFor(key) {
  if (await useMongo()) {
    const db = await getDb();
    const col = db.collection('otps');
    const doc = await col.findOne({ _id: key, expiresAt: { $gt: new Date() } });
    return doc || null;
  }

  const store = global._otp_store || new Map();
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry;
}

export async function verifyOtp(key, code) {
  if (await useMongo()) {
    const db = await getDb();
    const col = db.collection('otps');
    const doc = await col.findOne({ _id: key, expiresAt: { $gt: new Date() } });
    if (!doc) return { ok: false, reason: 'not_found_or_expired' };
    if (doc.code !== code) {
      const attempts = (doc.attempts || 0) + 1;
      if (attempts > 5) {
        await col.deleteOne({ _id: key });
        return { ok: false, reason: 'too_many_attempts' };
      }
      await col.updateOne({ _id: key }, { $set: { attempts } });
      return { ok: false, reason: 'invalid_code' };
    }
    await col.deleteOne({ _id: key });
    return { ok: true };
  }

  const store = global._otp_store || new Map();
  const entry = store.get(key);
  if (!entry) return { ok: false, reason: 'not_found_or_expired' };
  if (entry.code !== code) {
    entry.attempts = (entry.attempts || 0) + 1;
    if (entry.attempts > 5) {
      store.delete(key);
      return { ok: false, reason: 'too_many_attempts' };
    }
    store.set(key, entry);
    return { ok: false, reason: 'invalid_code' };
  }
  entry.verified = true;
  store.set(key, entry);
  return { ok: true };
}

export async function canResend(key) {
  if (await useMongo()) {
    const db = await getDb();
    const col = db.collection('otps');
    const doc = await col.findOne({ _id: key });
    if (!doc) return true;
    return Date.now() >= new Date(doc.nextResendAt).getTime();
  }
  const store = global._otp_store || new Map();
  const entry = store.get(key);
  if (!entry) return true;
  return Date.now() >= (entry.nextResendAt || 0);
}

export async function markResent(key) {
  if (await useMongo()) {
    const db = await getDb();
    const col = db.collection('otps');
    const nextResendAt = new Date(Date.now() + RESEND_COOLDOWN_SECONDS * 1000);
    await col.updateOne({ _id: key }, { $set: { nextResendAt } });
    return await col.findOne({ _id: key });
  }
  const store = global._otp_store || new Map();
  const entry = store.get(key);
  if (!entry) return null;
  entry.nextResendAt = Date.now() + RESEND_COOLDOWN_SECONDS * 1000;
  store.set(key, entry);
  return entry;
}

export async function deleteOtp(key) {
  if (await useMongo()) {
    const db = await getDb();
    const col = db.collection('otps');
    return (await col.deleteOne({ _id: key })).deletedCount > 0;
  }
  const store = global._otp_store || new Map();
  return store.delete(key);
}

// For debugging only
export async function _dump() {
  if (await useMongo()) {
    const db = await getDb();
    return await db.collection('otps').find({}).toArray();
  }
  const store = global._otp_store || new Map();
  return Array.from(store.entries()).map(([k, v]) => ({ key: k, ...v }));
}
