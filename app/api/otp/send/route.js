import { NextResponse } from 'next/server';
import { createOtpFor } from '@/lib/otp';
import { sendOtpEmail } from '@/lib/mailer';

export async function POST(req) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ ok: false, error: 'missing_email' }, { status: 400 });

  const entry = await createOtpFor(email);

  const sendResult = await sendOtpEmail(email, entry.code);

  return NextResponse.json({ ok: true, sendResult, cooldown: process.env.RESEND_COOLDOWN_SECONDS || 60 });
}
