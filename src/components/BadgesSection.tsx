import React from 'react';
import { portfolioData, BadgeItem } from '../data/portfolioData';
import { TiltCard } from './TiltCard';
import { ShieldCheck, Sparkles, ExternalLink, Award, FileCheck } from 'lucide-react';

export const BadgesSection: React.FC = () => {
  const { badges } = portfolioData;

  return (
    <section id="badges" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-cyan-600 dark:text-cyan-400">
            Digital Badges & Micro-Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Accredited Badges & Distinctions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Verified technical badges from Cisco Networking Academy and institutional honors.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full" />
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {badges.map((badge) => (
            <TiltCard key={badge.id} maxTilt={8} scale={1.03}>
              <div
                className={`h-full flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-[#111726] border shadow-xl relative overflow-hidden transition-all group ${
                  badge.isPlaceholder
                    ? 'border-dashed border-purple-400/60 dark:border-purple-500/40'
                    : 'border-slate-200 dark:border-slate-800 hover:border-cyan-500/50'
                }`}
              >
                {/* Subtle colored glow behind badge */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 blur-2xl transition-opacity pointer-events-none"
                  style={{ backgroundColor: badge.accentColor || '#06b6d4' }}
                />

                <div>
                  {/* Badge Header: Category tag & verification status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {badge.category === 'cisco' ? (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                          Cisco Academy
                        </>
                      ) : badge.isPlaceholder ? (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                          Talong Series
                        </>
                      ) : (
                        <>
                          <Award className="w-3.5 h-3.5 text-amber-500" />
                          Institutional Honor
                        </>
                      )}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{badge.date}</span>
                  </div>

                  {/* Badge Graphic / Icon */}
                  <div className="flex justify-center my-6">
                    <div className="relative group-hover:scale-110 transition-transform duration-300">
                      {badge.isPlaceholder ? (
                        <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-purple-600/20 to-indigo-600/30 border-2 border-purple-500/40 flex flex-col items-center justify-center p-3 text-center shadow-lg">
                          <span className="text-3xl mb-1">🍆</span>
                          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                            Talong Badge
                          </span>
                        </div>
                      ) : (
                        <img
                          src={badge.image}
                          alt={badge.title}
                          className="w-28 h-28 object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)]"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </div>

                  {/* Title & Issuer */}
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                      {badge.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {badge.issuer}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 text-center mt-3 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                {/* Footer Link / Verification */}
                <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-center">
                  {badge.verifyUrl ? (
                    <a
                      href={badge.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>View Credly Verification PDF</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : badge.isPlaceholder ? (
                    <span className="text-[11px] font-mono text-purple-500/80">
                      Placeholder ready for asset drop
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      Verified Academic Distinction
                    </span>
                  )}
                </div>

              </div>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
};
