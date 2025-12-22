import { NextResponse } from 'next/server';
import { verifyOtp, deleteOtp } from '@/lib/otp';

export async function POST(req) {
  const { email, code } = await req.json();
  if (!email || !code) return NextResponse.json({ ok: false, error: 'missing_params' }, { status: 400 });

  const res = verifyOtp(email, String(code));
  if (!res.ok) {
    return NextResponse.json({ ok: false, reason: res.reason }, { status: 400 });
  }

  // On success, optionally delete OTP
  deleteOtp(email);

  return NextResponse.json({ ok: true });
}
