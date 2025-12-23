import { NextResponse } from 'next/server';
import { verifyOtp, deleteOtp } from '@/lib/otp';

export async function POST(req) {
  const { email, code } = await req.json();
  if (!email || !code) return NextResponse.json({ ok: false, error: 'missing_params' }, { status: 400 });

  const res = await verifyOtp(email, String(code));
  if (!res.ok) {
    return NextResponse.json({ ok: false, reason: res.reason }, { status: 400 });
  }

  // On success, optionally delete OTP
  await deleteOtp(email);

  // Mark user as verified in DB
  try {
    const { getDb } = await import('@/lib/mongo');
    const db = await getDb();
    await db.collection('users').updateOne(
      { email: email.toLowerCase() },
      { $set: { verified: true } }
    );
  } catch (err) {
    console.error('Error marking user as verified', err);
  }

  return NextResponse.json({ ok: true });
}
