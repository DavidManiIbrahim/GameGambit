require('dotenv').config();
console.log('--- Environment Check ---');
console.log('RESEND_API_KEY set:', !!process.env.RESEND_API_KEY);
console.log('SMTP_HOST set:', !!process.env.SMTP_HOST);
console.log('SMTP_FROM set:', !!process.env.SMTP_FROM);
console.log('OTP_DELIVERY:', process.env.OTP_DELIVERY || 'not set (defaults to email)');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('-------------------------');
