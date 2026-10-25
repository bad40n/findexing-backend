import dotenv from "dotenv";
dotenv.config();

export const sendOtpEmail = async (email: string, otp: string) => {
  const apiKey = process.env.RESEND_API;
  if (!apiKey) {
    throw new Error("RESEND_API key is not configured in .env file");
  }

  const emailHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Verify Your Email - discountkothai.com</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #fafaf9;
      color: #1c1917;
      margin: 0;
      padding: 0;
    }
    .wrapper {
      max-width: 500px;
      margin: 40px auto;
      background-color: #ffffff;
      border: 1px solid #e7e5e4;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    }
    .header {
      background-color: #1c1917;
      padding: 24px;
      text-align: center;
    }
    .logo {
      color: #ffffff;
      font-size: 18px;
      font-weight: 900;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      text-decoration: none;
      font-family: monospace;
    }
    .logo-dot {
      color: #dc2626;
    }
    .content {
      padding: 32px 24px;
      text-align: center;
    }
    .title {
      font-size: 20px;
      font-weight: 800;
      color: #1c1917;
      margin-top: 0;
      margin-bottom: 8px;
    }
    .subtitle {
      font-size: 13px;
      font-weight: 600;
      color: #78716c;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 24px;
    }
    .otp-card {
      background-color: #f5f5f4;
      border: 1px solid #e7e5e4;
      border-radius: 12px;
      padding: 20px;
      margin: 24px 0;
      font-size: 32px;
      font-weight: 900;
      letter-spacing: 0.25em;
      color: #dc2626;
      font-family: monospace;
    }
    .description {
      font-size: 14px;
      line-height: 1.6;
      color: #44403c;
      margin-bottom: 24px;
      text-align: left;
    }
    .footer {
      background-color: #f5f5f4;
      border-top: 1px solid #e7e5e4;
      padding: 20px;
      text-align: center;
      font-size: 11px;
      color: #78716c;
    }
    .footer-link {
      color: #dc2626;
      text-decoration: none;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <a href="https://discountkothai.com" class="logo" style="color: #ffffff; text-decoration: none;">discountkothai<span class="logo-dot">.com</span></a>
    </div>
    <div class="content">
      <h2 class="title" style="margin-top: 0;">Verify Your Email Address</h2>
      <div class="subtitle">Verification Code</div>
      <p class="description">
        Hello! Thank you for choosing discountkothai.com. Use the verification code below to complete your registration. This code is valid for 10 minutes.
      </p>
      <div class="otp-card">${otp}</div>
      <p class="description" style="font-size: 12px; color: #78716c; text-align: center;">
        If you did not request this email, please ignore it.
      </p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} discountkothai.com — Bangladesh's Premium Discount Directory.<br>
      <a href="https://discountkothai.com" class="footer-link">discountkothai.com</a>
    </div>
  </div>
</body>
</html>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || "discountkothai <onboarding@resend.dev>",
      to: email,
      subject: "Verify Your Email - discountkothai.com",
      html: emailHtml,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send email via Resend: ${errorText}`);
  }

  const result = await response.json();
  return result;
};
