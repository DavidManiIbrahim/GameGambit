import nodemailer from 'nodemailer';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, OTP_DELIVERY } = process.env;

let transporter = null;
if (SMTP_HOST && SMTP_PORT) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });
}

export async function sendOtpEmail(to, code) {
  const subject = 'Your GameGambit verification code';
  const text = `Your verification code is: ${code}\nThis code expires in ${process.env.OTP_EXPIRY_MINUTES || 10} minutes.`;
  const html = `<p>Your verification code is: <strong>${code}</strong></p><p>This code expires in ${process.env.OTP_EXPIRY_MINUTES || 10} minutes.</p>`;

  // If OTP_DELIVERY=console or transporter not configured — fallback to console logging
  if ((OTP_DELIVERY || '').toLowerCase() === 'console' || !transporter) {
    // Log for dev
    console.log(`OTP for ${to}: ${code}`);
    return { ok: true, method: 'console' };
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `no-reply@${process.env.NEXTAUTH_URL?.replace(/^https?:\/\//, '') || 'localhost'}`,
      to,
      subject,
      text,
      html,
    });
    return { ok: true, method: 'smtp', info };
  } catch (err) {
    console.error('Error sending OTP email', err);
    return { ok: false, error: err?.message || String(err) };
  }
}
