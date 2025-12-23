const { sendOtpEmail } = require('../lib/mailer');
const dotenv = require('dotenv');
dotenv.config();

async function test() {
    console.log('Testing Resend with Key:', process.env.RESEND_API_KEY?.substring(0, 10) + '...');
    const result = await sendOtpEmail('itzlimincj@gmail.com', '123456');
    console.log('Result:', result);
}

test();
