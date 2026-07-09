const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter;

function getTransporter() {
  if (transporter) return transporter;
  
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // Fallback: log to console for development (no email sent)
    transporter = {
      sendMail: async (opts) => {
        console.log('\n📧 [DEV EMAIL] ─────────────────────────────');
        console.log('To:', opts.to);
        console.log('Subject:', opts.subject);
        console.log('Body:', opts.text || opts.html);
        console.log('────────────────────────────────────────────\n');
        return { messageId: 'dev-' + Date.now() };
      }
    };
  }
  return transporter;
}

async function sendOtpEmail(email, otpCode) {
  return getTransporter().sendMail({
    from: `"Epicurean Collective" <${process.env.SMTP_USER || 'noreply@epicurean.local'}>`,
    to: email,
    subject: 'Verify your Epicurean account',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;">
        <h2 style="font-size:24px;font-weight:700;color:#1A1A1B;">Welcome to Epicurean Collective</h2>
        <p style="color:#666;margin:16px 0;">Your verification code is:</p>
        <div style="background:#F9F7F2;border-radius:12px;padding:24px;text-align:center;margin:24px 0;">
          <span style="font-size:36px;font-weight:700;letter-spacing:8px;color:#C5A059;">${otpCode}</span>
        </div>
        <p style="color:#999;font-size:14px;">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
      </div>
    `,
    text: `Your Epicurean verification code: ${otpCode} (expires in 10 minutes)`,
  });
}

async function sendPasswordResetEmail(email, resetLink) {
  return getTransporter().sendMail({
    from: `"Epicurean Collective" <${process.env.SMTP_USER || 'noreply@epicurean.local'}>`,
    to: email,
    subject: 'Reset your Epicurean password',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;">
        <h2 style="font-size:24px;font-weight:700;color:#1A1A1B;">Reset your password</h2>
        <p style="color:#666;margin:16px 0;">Click the button below to set a new password. This link expires in 1 hour.</p>
        <a href="${resetLink}" style="display:inline-block;background:#1A1A1B;color:#F9F7F2;padding:14px 28px;border-radius:50px;text-decoration:none;font-weight:600;margin:16px 0;">
          Reset Password
        </a>
        <p style="color:#999;font-size:14px;margin-top:24px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
    text: `Reset your Epicurean password: ${resetLink}`,
  });
}

module.exports = { sendOtpEmail, sendPasswordResetEmail };
