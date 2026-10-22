import multer from 'multer';
import nodemailer from 'nodemailer';
import path from 'path';

// Disable default Vercel body parser to allow Multer to handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB per file
const MAX_TOTAL_SIZE = 15 * 1024 * 1024; // 15 MB total

const storage = multer.memoryStorage();

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

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  try {
    // Run Multer middleware
    await runMiddleware(req, res, upload.array('attachments', MAX_FILES));

    const { name, email, subject, message, website_url } = req.body;

    // Honeypot anti-spam
    if (website_url) {
      return res.status(200).json({ success: true, message: 'Message sent successfully.' });
    }

    if (!name || !name.trim() || !email || !email.trim() || !message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required fields.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Invalid sender email format.' });
    }

    const files = req.files || [];
    const totalSize = files.reduce((acc, f) => acc + f.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) {
      return res.status(400).json({ success: false, message: 'Total file attachments exceed the 15 MB limit.' });
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeSubject = escapeHtml(subject ? subject.trim() : 'Portfolio Contact Inquiry');
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br/>');

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const contactReceivers = process.env.CONTACT_RECEIVER || gmailUser;

    if (!gmailUser || !gmailPass) {
      return res.status(500).json({
        success: false,
        message: 'SMTP credentials missing on server configuration.',
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const mailAttachments = files.map((f) => ({
      filename: sanitizeFilename(f.originalname),
      content: f.buffer,
      contentType: f.mimetype,
    }));

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
        <div style="border-bottom: 2px solid #06b6d4; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #0f172a; margin: 0 0 6px 0; font-size: 20px;">New Portfolio Contact Inquiry</h2>
          <p style="color: #64748b; margin: 0; font-size: 13px;">Received via Vercel Serverless Form</p>
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
          <h4 style="margin: 0 0 8px 0; font-size: 13px; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Message:</h4>
          <div style="font-size: 15px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${safeMessage}</div>
        </div>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #94a3b8; text-align: center;">
          <p style="margin: 0;">Reply directly to this email to respond to <strong>${safeName}</strong> at <strong>${safeEmail}</strong>.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${gmailUser}>`,
      to: contactReceivers,
      replyTo: safeEmail,
      subject: `[Portfolio] ${safeSubject} - from ${safeName}`,
      text: `From: ${safeName} (${safeEmail})\nSubject: ${safeSubject}\n\n${message.trim()}`,
      html: htmlBody,
      attachments: mailAttachments,
    });

    if (process.env.AUTO_REPLY_ENABLED === 'true') {
      try {
        await transporter.sendMail({
          from: `"Teofilo Mirasol Jr." <${gmailUser}>`,
          to: safeEmail,
          subject: `Thank you for reaching out, ${safeName}! [Auto-Confirmation]`,
          text: `Hi ${safeName},\n\nThank you for reaching out through my developer portfolio! I have received your message regarding "${safeSubject}" and will review your inquiry and attachments promptly.\n\nBest regards,\nTeofilo Bullos Mirasol Jr.`,
        });
      } catch (e) {
        console.warn('Auto reply failed:', e.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Your message and attachments have been delivered successfully!',
    });
  } catch (error) {
    console.error('Vercel Contact API Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error processing your message.',
    });
  }
}
