import React, { useEffect, useState } from 'react';
import { CertificateItem } from '../data/portfolioData';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, ExternalLink, ShieldCheck, Download } from 'lucide-react';

interface CertificateLightboxProps {
  certificates: CertificateItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const CertificateLightbox: React.FC<CertificateLightboxProps> = ({
  certificates,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const cert = currentIndex !== null ? certificates[currentIndex] : null;

  // Reset zoom whenever certificate changes
  useEffect(() => {
    setZoomLevel(1);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + certificates.length) % certificates.length;
        onNavigate(prevIndex);
      } else if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % certificates.length;
        onNavigate(nextIndex);
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel((z) => Math.min(z + 0.25, 2.5));
      } else if (e.key === '-') {
        setZoomLevel((z) => Math.max(z - 0.25, 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, certificates.length, onClose, onNavigate]);

  if (currentIndex === null || !cert) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + certificates.length) % certificates.length;
    onNavigate(prevIndex);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % certificates.length;
    onNavigate(nextIndex);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate viewer: ${cert.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col lg:flex-row w-full max-w-5xl max-h-[92vh] bg-white dark:bg-[#111726] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close certificate lightbox"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Interactive Image Preview */}
        <div className="relative flex-1 bg-slate-950 flex items-center justify-center p-4 min-h-[320px] lg:min-h-[500px] overflow-hidden select-none">
          {/* Zoom controls floating bar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 text-white text-xs">
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 1))}
              disabled={zoomLevel <= 1}
              className="p-1 hover:text-cyan-400 disabled:opacity-40 transition-colors"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-mono">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
              disabled={zoomLevel >= 2.5}
              className="p-1 hover:text-cyan-400 disabled:opacity-40 transition-colors"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 hover:text-cyan-400 ml-1 transition-colors"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous certificate"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-800 text-white backdrop-blur-sm border border-slate-700/50 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next certificate"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-800 text-white backdrop-blur-sm border border-slate-700/50 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Image Container with Zoom */}
          <div className="overflow-auto max-h-[70vh] flex items-center justify-center w-full">
            <img
              src={cert.image}
              alt={cert.title}
              style={{
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
              }}
              className="max-h-[65vh] max-w-full object-contain rounded-lg shadow-lg cursor-zoom-in"
              onClick={() => setZoomLevel((z) => (z > 1 ? 1 : 1.75))}
            />
          </div>
        </div>

        {/* Right Side: Detailed Metadata */}
        <div className="w-full lg:w-96 p-6 flex flex-col justify-between overflow-y-auto bg-slate-50 dark:bg-[#111726] border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Credential
              </span>
              <span className="text-xs text-slate-400 capitalize">{cert.category}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug mb-2">
              {cert.title}
            </h3>

            <div className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300 mb-4">
              <p>
                <span className="font-semibold text-slate-700 dark:text-slate-200">Issuer:</span> {cert.issuer}
              </p>
              <p>
                <span className="font-semibold text-slate-700 dark:text-slate-200">Date:</span> {cert.date}
              </p>
              {cert.certId && (
                <p className="font-mono text-xs break-all text-slate-500 dark:text-slate-400">
                  <span className="font-sans font-semibold text-slate-700 dark:text-slate-200">Cert ID:</span> {cert.certId}
                </p>
              )}
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              {cert.description}
            </p>

            {cert.signatories && cert.signatories.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-1.5">Signatories & Officials</h4>
                <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                  {cert.signatories.map((sig, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {sig}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {cert.skillsLearned && cert.skillsLearned.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-1.5">Key Competencies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skillsLearned.map((sk, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[11px] rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Links & Pager */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6 space-y-3">
            {cert.pdfUrl && (
              <a
                href={cert.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-medium text-sm transition-all shadow-md shadow-cyan-500/20"
              >
                <Download className="w-4 h-4" />
                View / Download Official PDF
              </a>
            )}

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Use arrow keys to navigate (← / →)</span>
              <span>{currentIndex + 1} of {certificates.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
