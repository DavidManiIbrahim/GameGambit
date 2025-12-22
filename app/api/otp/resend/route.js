import { NextResponse } from 'next/server';
import { getOtpFor, canResend, createOtpFor, markResent } from '@/lib/otp';
import { sendOtpEmail } from '@/lib/mailer';

export async function POST(req) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ ok: false, error: 'missing_email' }, { status: 400 });

  const existing = getOtpFor(email);
  if (existing && !canResend(email)) {
    const wait = Math.max(0, Math.ceil((existing.nextResendAt - Date.now()) / 1000));
    return NextResponse.json({ ok: false, error: 'too_soon', wait }, { status: 429 });
  }

  // If there's an existing entry, just reuse code, otherwise create new
  const entry = existing || createOtpFor(email);

  // mark resent to update cooldown
  markResent(email);

  const sendResult = await sendOtpEmail(email, entry.code);
  return NextResponse.json({ ok: true, sendResult, cooldown: process.env.RESEND_COOLDOWN_SECONDS || 60 });
}
