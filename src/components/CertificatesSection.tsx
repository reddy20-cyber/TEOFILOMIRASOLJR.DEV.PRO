import React, { useState } from 'react';
import { portfolioData, CertificateItem } from '../data/portfolioData';
import { TiltCard } from './TiltCard';
import { CertificateLightbox } from './CertificateLightbox';
import { ShieldCheck, Calendar, ZoomIn, Download, ExternalLink, Award } from 'lucide-react';

interface CertificatesSectionProps {
  activeCertId?: string | null;
  onClearActiveCert?: () => void;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  activeCertId,
  onClearActiveCert,
}) => {
  const { certificates } = portfolioData;
  const [filter, setFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // If activeCertId was passed from another section (e.g. from OJT button), open it!
  React.useEffect(() => {
    if (activeCertId) {
      const idx = certificates.findIndex((c) => c.id === activeCertId);
      if (idx !== -1) {
        setLightboxIndex(idx);
      }
    }
  }, [activeCertId, certificates]);

  const filterOptions = [
    { label: 'All Certificates', value: 'all' },
    { label: 'Professional & Tech', value: 'professional' },
    { label: 'Academic & Competitions', value: 'academic' },
    { label: 'Seminars & Appearances', value: 'seminar' },
  ];

  const filteredCertificates = filter === 'all'
    ? certificates
    : certificates.filter((c) => c.category === filter);

  const handleOpenLightbox = (cert: CertificateItem) => {
    const fullListIndex = certificates.findIndex((c) => c.id === cert.id);
    setLightboxIndex(fullListIndex);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
    if (onClearActiveCert) onClearActiveCert();
  };

  return (
    <section id="certificates" className="py-20 relative bg-slate-100/60 dark:bg-[#0c101a]/70 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-cyan-600 dark:text-cyan-400">
            Credentials & Achievements
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Official Certificates & Honors
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Click any certificate to inspect in high resolution with interactive zoom and verification metadata.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === opt.value
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20 scale-105'
                  : 'bg-white dark:bg-[#111726] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCertificates.map((cert) => (
            <TiltCard key={cert.id} maxTilt={6}>
              <div
                onClick={() => handleOpenLightbox(cert)}
                className="cursor-pointer h-full flex flex-col justify-between rounded-2xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-cyan-500/50 transition-all overflow-hidden group"
              >
                {/* Certificate Preview Image */}
                <div className="relative h-56 bg-slate-950 flex items-center justify-center p-3 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="max-h-full max-w-full object-contain rounded group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white">
                    <span className="p-2.5 rounded-full bg-cyan-500 text-white shadow-lg">
                      <ZoomIn className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-bold tracking-wide">Click to Enlarge</span>
                  </div>

                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-sm text-cyan-400 border border-cyan-500/20">
                      {cert.category}
                    </span>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-cyan-500 transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {cert.date}
                    </span>
                    <span className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-medium">
                      Inspect <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Lightbox / Modal */}
        <CertificateLightbox
          certificates={certificates}
          currentIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onNavigate={(newIndex) => setLightboxIndex(newIndex)}
        />

      </div>
    </section>
  );
};
