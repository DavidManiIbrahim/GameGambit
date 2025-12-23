import nodemailer from 'nodemailer';
import { Resend } from 'resend';

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  OTP_DELIVERY,
  RESEND_API_KEY,
  SMTP_FROM
} = process.env;

let transporter = null;
let resendClient = null;

// Initialize Resend if API key is provided
if (RESEND_API_KEY) {
  resendClient = new Resend(RESEND_API_KEY);
}
// Otherwise initialize Nodemailer if SMTP is provided
else if (SMTP_HOST && SMTP_PORT) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });
}

export async function sendOtpEmail(to, code) {
  const subject = 'Your GameGambit verification code';
  const text = `Your verification code is: ${code}\nThis code expires in ${process.env.OTP_EXPIRY_MINUTES || 10} minutes.`;
  const html = `<p>Your verification code is: <strong>${code}</strong></p><p>This code expires in ${process.env.OTP_EXPIRY_MINUTES || 10} minutes.</p>`;
  const from = SMTP_FROM || 'Game Gambit <onboarding@resend.dev>';

  // Fallback to console during development if no provider is configured
  if ((OTP_DELIVERY || '').toLowerCase() === 'console' || (!resendClient && !transporter)) {
    console.log('--- EMAIL FALLBACK (CONSOLE) ---');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Code: ${code}`);
    console.log('-------------------------------');
    return { ok: true, method: 'console' };
  }

  // Use Resend SDK
  if (resendClient) {
    try {
      const { data, error } = await resendClient.emails.send({
        from,
        to,
        subject,
        text,
        html,
      });
      if (error) throw new Error(error.message);
      return { ok: true, method: 'resend', id: data?.id };
    } catch (err) {
      console.error('Resend error:', err);
      return { ok: false, error: err.message || String(err) };
    }
  }

  // Use Nodemailer
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });
    return { ok: true, method: 'smtp', info };
  } catch (err) {
    console.error('Nodemailer error:', err);
    return { ok: false, error: err.message || String(err) };
  }
}
