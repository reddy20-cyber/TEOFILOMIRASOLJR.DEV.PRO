import React, { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, Copy, Check, Send, UploadCloud, File, Trash2, AlertCircle, CheckCircle2, Phone, MapPin, Sparkles, ExternalLink, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FileWithId {
  id: string;
  file: File;
}

export const ContactSection: React.FC = () => {
  const { contacts, personal } = portfolioData;

  // Copy state for emails and phone
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<FileWithId[]>([]);
  const [honeypot, setHoneypot] = useState(''); // Anti-spam honeypot

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isDragOver, setIsDragOver] = useState(false);

  // Anti-bot time tracker
  const formLoadTimeRef = useRef<number>(Date.now());
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    formLoadTimeRef.current = Date.now();
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // File validation constants
  const MAX_FILES = 5;
  const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
  const MAX_TOTAL_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB
  const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt', '.zip'];

  const totalUploadedBytes = files.reduce((acc, f) => acc + f.file.size, 0);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const validateAndAddFiles = (newFileList: FileList | File[]) => {
    setStatusMessage(null);
    const newFilesArray = Array.from(newFileList);

    if (files.length + newFilesArray.length > MAX_FILES) {
      setStatusMessage({
        type: 'error',
        text: `You can upload a maximum of ${MAX_FILES} files. Currently you have ${files.length}.`,
      });
      return;
    }

    let runningTotal = totalUploadedBytes;
    const validated: FileWithId[] = [];

    for (const file of newFilesArray) {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        setStatusMessage({
          type: 'error',
          text: `File "${file.name}" has an unsupported format. Allowed types: Images (JPG, PNG, WebP), PDF, Word (DOC/DOCX), Excel (XLS/XLSX), TXT, and ZIP.`,
        });
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setStatusMessage({
          type: 'error',
          text: `File "${file.name}" exceeds the 5 MB per-file limit (${formatFileSize(file.size)}).`,
        });
        return;
      }

      if (runningTotal + file.size > MAX_TOTAL_SIZE_BYTES) {
        setStatusMessage({
          type: 'error',
          text: `Adding "${file.name}" exceeds the total 15 MB upload limit.`,
        });
        return;
      }

      runningTotal += file.size;
      validated.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
      });
    }

    setFiles((prev) => [...prev, ...validated]);
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    // Bot honeypot check
    if (honeypot) {
      console.warn('Honeypot triggered');
      return;
    }

    // Minimum time-to-submit verification (prevent instant bot script submission)
    const timeSpentMs = Date.now() - formLoadTimeRef.current;
    if (timeSpentMs < 2000) {
      setStatusMessage({
        type: 'error',
        text: 'Form submitted too rapidly. Please take a moment to verify your message.',
      });
      return;
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Please fill in your name, email, and message.',
      });
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatusMessage({
        type: 'error',
        text: 'Please provide a valid email address so Teofilo can reply to you.',
      });
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(20);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject || 'Portfolio Contact Inquiry');
    formData.append('message', message);
    files.forEach((f) => {
      formData.append('attachments', f.file);
    });

    try {
      setUploadProgress(50);
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      setUploadProgress(85);
      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setUploadProgress(100);
        setStatusMessage({
          type: 'success',
          text: 'Thank you! Your message and attachments have been delivered directly to Teofilo.',
        });
        
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });

        // Reset form
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setFiles([]);
      } else {
        throw new Error(data?.message || 'Server returned an error response.');
      }
    } catch (err: any) {
      console.error('Contact submit error:', err);
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Unable to connect to the email server. Please use one of the direct email buttons below.',
      });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const directMailtoUrl = `mailto:${contacts[0].email}?subject=${encodeURIComponent(
    subject || 'Freelance / Systems Inquiry for Teofilo Mirasol'
  )}&body=${encodeURIComponent(
    `Hi Teofilo,\n\nName: ${name || '[Your Name]'}\nEmail: ${email || '[Your Email]'}\n\n${message || ''}`
  )}`;

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-cyan-600 dark:text-cyan-400">
            Let's Collaborate
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Get In Touch & Hire Me
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Available for freelance systems development, database engineering, and civic tech consulting.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Inquiries & Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Freelance Status Box */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Open for Freelance & Independent Work
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {personal.freelanceDisclaimer}
              </p>
              <div className="pt-2 text-xs font-medium text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>{personal.location}</span>
              </div>
            </div>

            {/* Email Addresses List with Click-to-Copy and Mailto */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 px-1">
                Direct Email Inboxes
              </h4>

              {contacts.map((c) => (
                <div
                  key={c.email}
                  className="p-4 rounded-xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-cyan-500/40 transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 block">
                      {c.label} {c.isPrimary && '★ Primary'}
                    </span>
                    <span className="text-sm font-mono font-medium text-slate-900 dark:text-slate-100 break-all">
                      {c.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Click-to-copy button */}
                    <button
                      onClick={() => copyToClipboard(c.email, c.email)}
                      title="Copy email to clipboard"
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                      aria-label={`Copy email ${c.email}`}
                    >
                      {copiedText === c.email ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    {/* Mailto button */}
                    <a
                      href={`mailto:${c.email}`}
                      title="Open in mail client"
                      className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 transition-colors"
                      aria-label={`Email ${c.email}`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Phone / SMS Card */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block">Mobile & SMS</span>
                  <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">
                    {personal.phoneFormatted}
                  </span>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(personal.phone, 'phone')}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                title="Copy phone number"
                aria-label="Copy phone number"
              >
                {copiedText === 'phone' ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Full Contact Form with Message + File Upload */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
              
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-cyan-500" />
                  Send Me a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Upload project requirements, RFPs, or diagrams. Messages are delivered directly to Teofilo's inboxes.
                </p>
              </div>

              {/* Status Alert */}
              {statusMessage && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`p-4 rounded-xl flex items-start gap-3 text-xs sm:text-sm ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p>{statusMessage.text}</p>
                    {statusMessage.type === 'error' && (
                      <div className="mt-2">
                        <a
                          href={directMailtoUrl}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white font-medium text-xs hover:bg-rose-700 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Email me directly via Mail Client
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Honeypot field for anti-spam (invisible to humans) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_url">Leave this empty</label>
                  <input
                    type="text"
                    id="website_url"
                    name="website_url"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact_name" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Your Name <span className="text-cyan-500">*</span>
                    </label>
                    <input
                      id="contact_name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe / Municipal Director"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact_email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Your Email (for Reply) <span className="text-cyan-500">*</span>
                    </label>
                    <input
                      id="contact_email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. you@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact_subject" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Subject <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="contact_subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Inquiring about a civic database system / microservices development"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  />
                </div>

                {/* Message field with live counter */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="contact_message" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Message <span className="text-cyan-500">*</span>
                    </label>
                    <span className="text-[11px] font-mono text-slate-400">
                      {message.length} / 2000
                    </span>
                  </div>
                  <textarea
                    id="contact_message"
                    required
                    rows={4}
                    maxLength={2000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your system requirements, timeline, and goals..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-y"
                  />
                </div>

                {/* Drag-and-Drop File Upload Zone */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      File Attachments <span className="text-slate-400 font-normal">(Max 5 files, 5MB each, 15MB total)</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {files.length} / {MAX_FILES} • {formatFileSize(totalUploadedBytes)}
                    </span>
                  </div>

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`cursor-pointer p-5 rounded-xl border-2 border-dashed text-center transition-all ${
                      isDragOver
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-slate-300 dark:border-slate-700 hover:border-cyan-500/50 bg-slate-50/50 dark:bg-slate-900/30'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) validateAndAddFiles(e.target.files);
                      }}
                      accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip"
                    />
                    <UploadCloud className="w-8 h-8 text-cyan-500 mx-auto mb-1.5" />
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Drag & drop files here, or <span className="text-cyan-500 underline">browse your device</span>
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Supported: JPG, PNG, WebP, PDF, DOCX, XLSX, TXT, ZIP
                    </p>
                  </div>

                  {/* Uploaded File Previews List */}
                  {files.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {files.map(({ id, file }) => (
                        <div
                          key={id}
                          className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-xs"
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <File className="w-4 h-4 text-cyan-500 shrink-0" />
                            <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                              {file.name}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono shrink-0">
                              ({formatFileSize(file.size)})
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFile(id);
                            }}
                            aria-label={`Remove file ${file.name}`}
                            className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button with Loading Spinner */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/25 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>Sending Message & Attachments...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message to Teofilo</span>
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
