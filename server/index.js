import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allow Vite during local development
}));

// CORS Configuration
const allowedOrigins = (process.env.ALLOWED_ORIGIN || 'http://localhost:6001,http://127.0.0.1:6001')
  .split(',')
  .map((origin) => origin.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or same-origin)
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    return callback(new Error('Cross-Origin Request Blocked by CORS policy'));
  },
  credentials: true,
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Rate Limiter: 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact requests from this IP address. Please wait 15 minutes before sending another message.',
  },
});

// Configure Multer in-memory storage with strict limits
const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB per file
const MAX_TOTAL_SIZE = 15 * 1024 * 1024; // 15 MB total

const storage = multer.memoryStorage();

// Allowed file extensions and MIME types
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'application/zip',
  'application/x-zip-compressed',
]);

const ALLOWED_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.webp', '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt', '.zip'
]);

const BLOCKED_EXTENSIONS = new Set([
  '.exe', '.bat', '.cmd', '.sh', '.php', '.js', '.vbs', '.msi', '.ps1', '.scr', '.jar', '.com', '.pif'
]);

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (BLOCKED_EXTENSIONS.has(ext)) {
    return cb(new Error(`Security Alert: Executable file types (${ext}) are strictly forbidden.`));
  }

  if (!ALLOWED_EXTENSIONS.has(ext) || !ALLOWED_MIME_TYPES.has(file.mimetype)) {
    return cb(new Error(`Invalid file type for "${file.originalname}". Allowed: Images, PDF, Word, Excel, TXT, ZIP.`));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: MAX_FILES,
  },
  fileFilter,
});

// Helper: Sanitize string to prevent HTML injection in emails
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Helper: Sanitize filename
function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Portfolio Contact Service', timestamp: new Date().toISOString() });
});

// POST /api/contact
app.post('/api/contact', contactLimiter, (req, res) => {
  // Wrap multer middleware in custom handler to cleanly catch MulterErrors
  upload.array('attachments', MAX_FILES)(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'One or more files exceed the 5 MB limit.' });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({ success: false, message: `A maximum of ${MAX_FILES} files can be uploaded.` });
      }
      return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    try {
      const { name, email, subject, message, website_url } = req.body;

      // Anti-spam Honeypot Check: if website_url is filled, treat as bot silently
      if (website_url) {
        console.warn('[SPAM BOT PREVENTED] Honeypot field was populated.');
        return res.status(200).json({ success: true, message: 'Message sent successfully.' });
      }

      // Validate required fields
      if (!name || !name.trim() || !email || !email.trim() || !message || !message.trim()) {
        return res.status(400).json({ success: false, message: 'Name, email, and message are required fields.' });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ success: false, message: 'Invalid sender email format.' });
      }

      // Check total attachments size
      const files = req.files || [];
      const totalSize = files.reduce((acc, f) => acc + f.size, 0);
      if (totalSize > MAX_TOTAL_SIZE) {
        return res.status(400).json({ success: false, message: 'Total file attachments exceed the 15 MB limit.' });
      }

      // Sanitize inputs
      const safeName = escapeHtml(name.trim());
      const safeEmail = escapeHtml(email.trim());
      const safeSubject = escapeHtml(subject ? subject.trim() : 'Portfolio Contact Inquiry');
      const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br/>');

      // Check SMTP credentials
      const gmailUser = process.env.GMAIL_USER;
      const gmailPass = process.env.GMAIL_APP_PASSWORD;
      const contactReceivers = process.env.CONTACT_RECEIVER || gmailUser;

      if (!gmailUser || !gmailPass) {
        console.error('SMTP credentials missing in .env configuration');
        return res.status(500).json({
          success: false,
          message: 'Email service is currently being configured. Please email Teofilo directly using the links below.',
        });
      }

      // Create Nodemailer Transporter using Gmail SMTP (port 465, secure SSL)
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      });

      // Prepare attachments for Nodemailer
      const mailAttachments = files.map((f) => ({
        filename: sanitizeFilename(f.originalname),
        content: f.buffer,
        contentType: f.mimetype,
      }));

      // Email Body for Teofilo's Inboxes
      const htmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
          <div style="border-bottom: 2px solid #06b6d4; padding-bottom: 16px; margin-bottom: 20px;">
            <h2 style="color: #0f172a; margin: 0 0 6px 0; font-size: 20px;">New Portfolio Contact Inquiry</h2>
            <p style="color: #64748b; margin: 0; font-size: 13px;">Received from personal portfolio website</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 90px; font-weight: 600;">Sender:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
              <td style="padding: 8px 0; color: #0891b2;"><a href="mailto:${safeEmail}" style="color: #0891b2; text-decoration: none;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Subject:</td>
              <td style="padding: 8px 0; color: #0f172a;">${safeSubject}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Attachments:</td>
              <td style="padding: 8px 0; color: #0f172a;">${files.length} file(s) attached</td>
            </tr>
          </table>

          <div style="background-color: #f8fafc; border-left: 4px solid #06b6d4; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
            <h4 style="margin: 0 0 8px 0; font-size: 13px; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Message Content:</h4>
            <div style="font-size: 15px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${safeMessage}</div>
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #94a3b8; text-align: center;">
            <p style="margin: 0;">Reply directly to this email to respond to <strong>${safeName}</strong> at <strong>${safeEmail}</strong>.</p>
          </div>
        </div>
      `;

      const plainTextBody = `
New Portfolio Contact Inquiry:
From: ${safeName} (${safeEmail})
Subject: ${safeSubject}
Attachments: ${files.length} file(s)

Message:
${message.trim()}

---
Reply directly to this email to respond to ${safeEmail}.
      `.trim();

      // Send to Teofilo's specified recipient list
      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${gmailUser}>`,
        to: contactReceivers, // All 3 recipient emails
        replyTo: safeEmail,   // Visitor's email so Teofilo can hit Reply directly
        subject: `[Portfolio] ${safeSubject} - from ${safeName}`,
        text: plainTextBody,
        html: htmlBody,
        attachments: mailAttachments,
      });

      // Optional Auto-Reply to Visitor
      if (process.env.AUTO_REPLY_ENABLED === 'true') {
        try {
          await transporter.sendMail({
            from: `"Teofilo Mirasol Jr." <${gmailUser}>`,
            to: safeEmail,
            subject: `Thank you for reaching out, ${safeName}! [Auto-Confirmation]`,
            text: `Hi ${safeName},\n\nThank you for reaching out through my developer portfolio! I have received your message regarding "${safeSubject}" and will review your inquiry and attachments promptly.\n\nBest regards,\nTeofilo Bullos Mirasol Jr.\nFull-Stack Developer & Civic Tech Enthusiast\nTampakan, South Cotabato, Philippines\nhttps://github.com/reddy20-cyber`,
            html: `
              <div style="font-family: sans-serif; max-width: 550px; padding: 20px; color: #1e293b;">
                <h3 style="color: #0891b2;">Thank you for contacting me, ${safeName}!</h3>
                <p>I have received your message regarding "<strong>${safeSubject}</strong>" and will review your message and attachments promptly.</p>
                <br/>
                <p style="margin: 0; font-weight: bold;">Teofilo Bullos Mirasol Jr.</p>
                <p style="margin: 0; font-size: 13px; color: #64748b;">Full-Stack Developer & Technical Writer</p>
                <p style="margin: 0; font-size: 13px; color: #64748b;">Tampakan, South Cotabato, Philippines</p>
              </div>
            `,
          });
        } catch (autoErr) {
          console.warn('Auto-reply could not be delivered:', autoErr.message);
        }
      }

      return res.status(200).json({
        success: true,
        message: 'Your message and attachments have been delivered successfully!',
      });
    } catch (sendError) {
      console.error('SMTP Mail Dispatch Error:', sendError);
      return res.status(500).json({
        success: false,
        message: 'Unable to deliver message at this time. Please email Teofilo directly using the links provided.',
      });
    }
  });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`Portfolio Contact Server running on http://localhost:${PORT}`);
});
