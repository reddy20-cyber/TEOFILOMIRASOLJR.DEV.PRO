import React, { useState } from 'react';
import { portfolioData, GalleryPhoto } from '../data/portfolioData';
import { TiltCard } from './TiltCard';
import { Image as ImageIcon, X, ZoomIn, Tag } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { gallery } = portfolioData;
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  return (
    <section id="gallery" className="py-20 relative bg-slate-100/60 dark:bg-[#0c101a]/70 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-cyan-600 dark:text-cyan-400">
            Life, Work & Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Photo Gallery & Fieldwork
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A visual documentation of DOST tech operations, national conferences, editorial work, and design.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gallery.map((photo) => (
            <TiltCard key={photo.id} maxTilt={6}>
              <div
                onClick={() => setActivePhoto(photo)}
                className="cursor-pointer group relative rounded-2xl overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl border border-slate-200 dark:border-slate-800 transition-all"
              >
                {/* Photo Image */}
                <div className="h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent flex flex-col justify-end p-4 text-white">
                  <div className="flex flex-wrap gap-1 mb-1.5">
                    {photo.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800/80 text-cyan-300 backdrop-blur-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                    {photo.caption}
                  </p>
                </div>

                {/* Hover zoom indicator */}
                <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/70 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Modal for viewing photo in full size */}
        {activePhoto && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="relative max-w-4xl max-h-[90vh] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActivePhoto(null)}
                aria-label="Close photo preview"
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 flex items-center justify-center p-2 overflow-hidden max-h-[72vh]">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="max-h-[70vh] max-w-full object-contain rounded-lg"
                />
              </div>

              <div className="p-5 bg-slate-900 text-white border-t border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="text-base font-bold text-cyan-400">{activePhoto.title}</h3>
                  <div className="flex gap-1.5">
                    {activePhoto.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-xs rounded bg-slate-800 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-300">{activePhoto.caption}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
