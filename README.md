# Teofilo Bullos Mirasol Jr. - Personal Developer Portfolio

A modern, high-performance developer portfolio website for **Teofilo Bullos Mirasol Jr.** — Full-Stack Developer, Technical Writer, and Civic Tech Enthusiast.

Built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, interactive **Three.js** 3D background scene, **Framer Motion** styling, and a secure **Node.js/Express** contact backend supporting file attachments sent directly to your Gmail inbox.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure your `.env` contains:
```env
GMAIL_USER=teo.works.dev@gmail.com
GMAIL_APP_PASSWORD=tfzkfbnzoytjhzvi
CONTACT_RECEIVER=reddevcm3era@gmail.com,teofilomirasoljr.dost@gmail.com,teo.works.dev@gmail.com
ALLOWED_ORIGIN=http://localhost:6000,http://127.0.0.1:6000
PORT=4000
AUTO_REPLY_ENABLED=true
```

### 3. Run Development Server
```bash
npm run dev
```
This command runs both the **Vite frontend** (http://localhost:6000) and the **Express contact server** (http://localhost:4000) concurrently!

### 4. Build for Production
```bash
npm run build
```

---

## 📁 Project Architecture & Folder Structure

```
PORTFOLIOPro/
├── public/
│   └── assets/
│       ├── profile/        # High-res portraits & barong photos (WebP + original)
│       ├── certificates/   # Official certificates & competition awards (WebP + original)
│       ├── badges/         # Cisco Networking Academy digital badges & honors
│       ├── gallery/        # DOST fieldwork, photography, and graphic design posters
│       └── docs/           # CV Resume, Application Letter, Cisco verification PDFs
├── server/
│   └── index.js            # Express + Multer + Nodemailer secure contact backend
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              # Sticky glassmorphism header & theme toggle
│   │   ├── HeroSection.tsx         # 3D Hero banner with live status & action buttons
│   │   ├── ThreeHeroScene.tsx      # Three.js 3D interactive particle core
│   │   ├── AboutSection.tsx        # Bio, civic tech narrative & education timeline
│   │   ├── ExperienceSection.tsx   # 486-hour DOST software residency breakdown
│   │   ├── ProjectsSection.tsx     # DOST GovChat, EIS, and civic infrastructure
│   │   ├── SkillsSection.tsx       # Categorized skills matrix with proficiency levels
│   │   ├── CertificatesSection.tsx # Filterable certificates grid with lightbox
│   │   ├── CertificateLightbox.tsx # Zoom, pan, next/prev, and PDF viewer modal
│   │   ├── BadgesSection.tsx       # Verified digital badges & Talong placeholder
│   │   ├── GallerySection.tsx      # Photo gallery with modal viewer
│   │   ├── ContactSection.tsx      # Contact form with drag-and-drop file upload
│   │   ├── TiltCard.tsx            # Interactive 3D tilt component with glare
│   │   ├── CustomCursor.tsx        # Desktop magnetic cursor
│   │   ├── ScrollProgressBar.tsx   # Top reading progress indicator
│   │   └── Preloader.tsx           # Initial loading animation
│   ├── data/
│   │   └── portfolioData.ts        # ⭐ SINGLE DATA FILE FOR ALL PORTFOLIO CONTENT
│   ├── App.tsx                     # Main application container
│   ├── main.tsx                    # React DOM entrypoint
│   └── index.css                   # Tailwind styles and custom utilities
├── .env.example                    # Template environment variables
├── .env                            # Active environment credentials (git-ignored)
├── .gitignore                      # Git ignore rules protecting secrets
├── package.json                    # Scripts and dependencies
├── tailwind.config.js              # Theme customization and color palette
└── vite.config.ts                  # Vite config with API proxy
```

---

## ✏️ How to Edit Portfolio Content

All personal information, experiences, projects, skills, certificates, badges, and contact details are stored in **one centralized file**:
👉 [`/src/data/portfolioData.ts`](file:///C:/Users/Authorized%20Only/PORTFOLIOPro/src/data/portfolioData.ts)

To change any content (e.g., adding a new project or updating your bio):
1. Open `src/data/portfolioData.ts`.
2. Edit the relevant section (`personal`, `projects`, `skillsCategories`, `certificates`, etc.).
3. Save the file — Vite will instantly hot-reload the changes in your browser!

---

## 🔒 Gmail App Password Setup Guide

If you ever need to generate a new Gmail App Password:
1. Log in to your Google Account ([myaccount.google.com](https://myaccount.google.com)).
2. Navigate to **Security** on the left menu.
3. Under *"How you sign in to Google"*, make sure **2-Step Verification** is turned **ON**.
4. Search or navigate to **App passwords** (or go to `myaccount.google.com/apppasswords`).
5. Enter an app name (e.g. `Portfolio Contact Form`) and click **Create**.
6. Google will generate a **16-character password** (e.g., `tfzk fbnz oytj hzvi`).
7. Paste this 16-character string into `GMAIL_APP_PASSWORD` in your `.env` file (without spaces).

---

## 🚢 Deployment Guide

### Option 1: Vercel (Recommended)
1. Push your repository to GitHub.
2. In Vercel, click **"Add New Project"** and import the repository.
3. For the frontend, Vercel automatically detects Vite (`npm run build`).
4. To run the contact backend on Vercel as a Serverless Function:
   - Create an `api/contact.js` handler (Vercel Serverless Function) using the logic from `server/index.js`.
   - Add the environment variables (`GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_RECEIVER`, etc.) in the **Vercel Project Settings > Environment Variables**.

### Option 2: Render / Railway / VPS (Full Express Server)
1. Deploy the full repository to **Render**, **Railway**, or your own VPS.
2. Build Command: `npm install && npm run build`
3. Start Command: `node server/index.js`
4. Set Environment Variables in your service dashboard.

### Option 3: Static Hosting (GitHub Pages / Netlify)
- If hosting statically without a backend, the contact form includes an automatic fallback button: **"Email directly via Mail Client"** using mailto links to all three of your email addresses.

---

## 🧪 Contact Form Testing Checklist

Use this quick checklist to test your contact form and verify security:

- [x] **Test 1: Send message without files**
  - Enter Name, Email, and Message -> Click Send.
  - Verify success alert and email delivery to `reddevcm3era@gmail.com`, `teofilomirasoljr.dost@gmail.com`, and `teo.works.dev@gmail.com`.
- [x] **Test 2: Send message with 1 valid file**
  - Attach a PDF or image (e.g., <= 5MB) -> Click Send.
  - Verify email arrives with the file as a valid attachment.
- [x] **Test 3: Oversized file check**
  - Attempt to upload a file larger than 5 MB.
  - The client UI and server reject the file with a clear warning: *"File exceeds the 5 MB per-file limit"*.
- [x] **Test 4: Blocked executable check**
  - Attempt to upload an `.exe` or `.bat` file.
  - The client and server reject the file with: *"Security Alert: Executable file types are strictly forbidden"*.
- [x] **Test 5: Anti-spam Honeypot**
  - Automated bots filling invisible honeypot fields are silently rejected without triggering emails.
