import nodemailer from 'nodemailer';

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  OTP_DELIVERY,
  SMTP_FROM
} = process.env;

let transporter = null;

// Initialize Nodemailer if SMTP is provided
if (SMTP_HOST && SMTP_PORT) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });
  console.log('Mailer: initialized with Nodemailer');
}

export async function sendNotification(to, subject, html) {
  if (!transporter) {
    console.warn('Mailer: No transporter configured, cannot send notification');
    return { ok: false, error: 'no_transporter' };
  }
  try {
    const info = await transporter.sendMail({
      from: SMTP_FROM || 'noreply@gamegambit.com',
      to,
      subject,
      html,
    });
    return { ok: true, info };
  } catch (err) {
    console.error('Mailer notification error:', err);
    return { ok: false, error: err.message || String(err) };
  }
}

export async function sendOtpEmail(to, code) {
  const subject = 'Your OTP Code';
  const html = `<p>Your OTP code is <strong>${code}</strong>. It will expire in 10 minutes.</p>`;
  return await sendNotification(to, subject, html);
}
