import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'game_gambit';

let cachedClient = globalThis._mongoClient || null;
let cachedDb = globalThis._mongoDb || null;
let indexesEnsured = false;

export async function getDb() {
  if (!uri) throw new Error('MONGODB_URI not set');
  if (cachedDb) return cachedDb;
  if (!cachedClient) {
    cachedClient = new MongoClient(uri, {
      // useNewUrlParser and useUnifiedTopology are default in modern driver
    });
    await cachedClient.connect();
    globalThis._mongoClient = cachedClient;
  }
  cachedDb = cachedClient.db(dbName);
  globalThis._mongoDb = cachedDb;

  if (!indexesEnsured) {
    await ensureIndexes(cachedDb);
    indexesEnsured = true;
  }

  return cachedDb;
}

export async function ensureIndexes(db) {
  try {
    const col = db.collection('otps');
    // Ensure TTL index on expiresAt (expiresAt is a Date; expireAfterSeconds: 0 causes doc to be removed when expiresAt < now)
    await col.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    await col.createIndex({ nextResendAt: 1 });
    // Users indexes
    const users = db.collection('users');
    await users.createIndex({ email: 1 }, { unique: true });
    await users.createIndex({ username: 1 }, { unique: true });
  } catch (err) {
    console.warn('Error ensuring indexes', err);
  }
}
