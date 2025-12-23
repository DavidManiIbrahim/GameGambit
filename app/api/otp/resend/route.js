import { NextResponse } from 'next/server';
import { getOtpFor, canResend, createOtpFor, markResent } from '@/lib/otp';
import { sendOtpEmail } from '@/lib/mailer';

export async function POST(req) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ ok: false, error: 'missing_email' }, { status: 400 });

  const existing = await getOtpFor(email);
  if (existing && !(await canResend(email))) {
    const nextAt = new Date(existing.nextResendAt).getTime();
    const wait = Math.max(0, Math.ceil((nextAt - Date.now()) / 1000));
    return NextResponse.json({ ok: false, error: 'too_soon', wait }, { status: 429 });
  }

  // If there's an existing entry, just reuse code, otherwise create new
  const entry = existing || (await createOtpFor(email));

  // mark resent to update cooldown
  await markResent(email);

  const sendResult = await sendOtpEmail(email, entry.code);
  if (!sendResult.ok) {
    return NextResponse.json({ ok: false, error: 'send_failed', details: sendResult.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true, sendResult, cooldown: process.env.RESEND_COOLDOWN_SECONDS || 60 });
}
