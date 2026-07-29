import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory or persisted subscriber list
const SUBSCRIBERS_FILE = path.join(__dirname, 'subscribers.json');

function getSubscribers(): { email: string; date: string }[] {
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading subscribers file:', e);
  }
  return [];
}

function saveSubscriber(email: string) {
  const subscribers = getSubscribers();
  const existing = subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
  if (!existing) {
    subscribers.push({ email, date: new Date().toISOString() });
    try {
      fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
    } catch (e) {
      console.error('Error writing subscribers file:', e);
    }
  }
  return subscribers.length;
}

// Transporter helper
async function getEmailTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);

  if (host && user && pass) {
    return {
      transporter: nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      }),
      from: process.env.SMTP_FROM || `LazrHub <${user}>`,
      isTestAccount: false,
    };
  }

  // Fallback to ethereal test account for demonstration/testing
  try {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    return {
      transporter,
      from: 'LazrHub Official <noreply@lazrhub.com>',
      isTestAccount: true,
    };
  } catch (err) {
    console.warn('Failed to create Ethereal test account:', err);
    return null;
  }
}

// API Routes
app.get('/api/subscribers/count', (req, res) => {
  const subscribers = getSubscribers();
  res.json({ count: 1482 + subscribers.length });
});

app.post('/api/notify', async (req, res) => {
  const { email } = req.body;

  if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const totalCount = saveSubscriber(cleanEmail);

  let emailSent = false;
  let previewUrl: string | undefined = undefined;
  let emailError: string | undefined = undefined;

  try {
    const emailConfig = await getEmailTransporter();

    if (emailConfig) {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0b0b; color: #ffffff; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .card { background-color: #15102a; border: 1px solid #3b2063; border-radius: 20px; padding: 32px; box-shadow: 0 10px 40px rgba(168,85,247,0.2); }
            .header { text-align: center; margin-bottom: 24px; }
            .logo { width: 72px; height: 72px; border-radius: 16px; margin-bottom: 12px; border: 2px solid #8b5cf6; }
            .title { font-size: 26px; font-weight: 800; color: #ffffff; margin: 0 0 8px 0; }
            .subtitle { font-size: 14px; color: #c084fc; margin: 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
            .content { font-size: 15px; line-height: 1.6; color: #d1d5db; margin-top: 20px; }
            .badge-box { background: rgba(139, 92, 246, 0.15); border: 1px solid rgba(168, 85, 247, 0.4); border-radius: 12px; padding: 16px; margin: 24px 0; text-align: center; }
            .badge-number { font-size: 20px; font-weight: 800; color: #a855f7; }
            .features-list { background: #0d081b; border-radius: 12px; padding: 20px; margin: 20px 0; }
            .feature-item { margin-bottom: 12px; display: flex; align-items: center; font-size: 14px; color: #e5e7eb; }
            .feature-icon { margin-right: 10px; font-size: 18px; }
            .btn { display: inline-block; background: linear-gradient(135deg, #9333ea, #4f46e5); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 15px; margin-top: 10px; }
            .footer { text-align: center; font-size: 12px; color: #6b7280; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="card">
              <div class="header">
                <img src="https://res.cloudinary.com/oeweu9pq/image/upload/v1785275548/lazrhub-logo_dfkql7.jpg" alt="LazrHub Logo" class="logo" />
                <h1 class="title">You're on the LazrHub VIP List! 🚀</h1>
                <p class="subtitle">Official Release Confirmation</p>
              </div>

              <div class="content">
                <p>Hey gamer,</p>
                <p>Welcome to the <strong>LazrHub v1.0</strong> release list! You are officially locked in to receive an exclusive email alert the second we launch live on <strong>August 11 at 6:00 PM</strong>.</p>

                <div class="badge-box">
                  <div class="badge-number">VIP Early Access Spot #${1482 + totalCount}</div>
                  <p style="margin: 4px 0 0 0; font-size: 13px; color: #9ca3af;">Your email (${cleanEmail}) has been registered for early access perks & launcher badge.</p>
                </div>

                <p><strong>What to expect on launch day:</strong></p>
                <div class="features-list">
                  <div class="feature-item"><span class="feature-icon">🎮</span> Unblocked Arcade Gaming Library</div>
                  <div class="feature-item"><span class="feature-icon">⚡</span> Zero-Lag 60 FPS Browser Performance</div>
                  <div class="feature-item"><span class="feature-icon">🪙</span> LazrCoins Rewards & Play Quests</div>
                  <div class="feature-item"><span class="feature-icon">🏆</span> Player Profile Stats & Ranks</div>
                </div>

                <p>In the meantime, join our official gamer lounge on Discord to hang out with the devs and participate in launch giveaways!</p>

                <div style="text-align: center; margin-top: 24px;">
                  <a href="https://discord.gg/eYcVSFkFcP" class="btn" target="_blank">Join LazrHub Discord</a>
                </div>
              </div>

              <div class="footer">
                <p>© ${new Date().getFullYear()} LazrHub. Unblocked. Play Free.</p>
                <p>You received this email because you subscribed to launch notifications on LazrHub. You can unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      const textContent = `
LazrHub v1.0 Launch Confirmation 🚀

You're officially on the VIP List!

Your email (${cleanEmail}) has been registered for launch notifications.
You will receive an email alert when LazrHub goes live on August 11 at 6:00 PM.

VIP Spot: #${1482 + totalCount}

What's coming in LazrHub v1.0:
- Unblocked Arcade Gaming Library
- Zero-Lag 60 FPS Performance
- LazrCoins Rewards
- Player Profiles & Rankings

Join our Discord: https://discord.gg/eYcVSFkFcP

© LazrHub. Unblocked. Play Free.
      `.trim();

      const info = await emailConfig.transporter.sendMail({
        from: emailConfig.from,
        to: cleanEmail,
        subject: "🚀 You're on the LazrHub v1.0 Launch VIP List!",
        text: textContent,
        html: htmlContent,
      });

      emailSent = true;

      if (emailConfig.isTestAccount) {
        previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
        if (previewUrl) {
          console.log('Ethereal Email Preview URL:', previewUrl);
        }
      }
    }
  } catch (err: unknown) {
    const errorObj = err as Error;
    console.error('Email dispatch error:', errorObj);
    emailError = errorObj.message || 'Error sending email';
  }

  return res.json({
    success: true,
    email: cleanEmail,
    subCount: 1482 + totalCount,
    emailSent,
    previewUrl,
    emailError,
    message: emailSent
      ? 'Confirmation email sent successfully! Check your inbox.'
      : 'Subscribed successfully! Email notification queued for release.',
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LazrHub Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
