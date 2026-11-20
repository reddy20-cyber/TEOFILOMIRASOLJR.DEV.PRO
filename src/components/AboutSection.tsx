import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { TiltCard } from './TiltCard';
import { Code2, Landmark, GraduationCap, Clock, Award, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { personal, education, profileImages } = portfolioData;

  return (
    <section id="about" className="py-16 relative">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-600 dark:text-amber-300">
            About My Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Developer, Technical Writer & Civic Innovator
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-300 to-rose-400 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Centered Pop-Out Formal Suit Cutout Card */}
          <div className="lg:col-span-5 space-y-6 pt-12 sm:pt-16">
            <div className="bento-card relative h-[350px] sm:h-[390px] overflow-visible group">
              {/* Clipped Inner Ambient Glass Backdrop (Zero overlapping text behind portrait) */}
              <div className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none">
                <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-amber-400/15 blur-3xl" />
                <div className="absolute bottom-8 right-6 w-52 h-52 rounded-full bg-rose-400/15 blur-3xl" />
              </div>

              {/* Centered Pop-Out Formal Suit Cutout breaking cleanly above top border */}
              <img
                src={profileImages.formalCutout}
                alt="Teofilo Bullos Mirasol Jr. - Formal Cutout Portrait"
                className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[385px] sm:h-[435px] w-auto max-w-none object-contain object-bottom drop-shadow-[0_22px_35px_rgba(0,0,0,0.45)] group-hover:scale-[1.03] transition-transform duration-500 pointer-events-none select-none z-10"
                loading="lazy"
              />

              {/* Bottom Floating Frosted Glass Info Strip */}
              <div className="absolute inset-x-4 bottom-4 z-20 p-4 rounded-[20px] bg-white/85 dark:bg-[#1e1b26]/80 backdrop-blur-2xl border border-zinc-200/80 dark:border-white/[0.16] shadow-xl">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-widest text-amber-600 dark:text-amber-300 font-bold">
                    Tampakan, South Cotabato
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-900/10 dark:bg-white/[0.12] text-zinc-700 dark:text-amber-300 border border-zinc-200 dark:border-white/[0.12]">
                    BSIT • 4th Year
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-white leading-tight">
                  Teofilo Bullos Mirasol Jr.
                </h3>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-300 line-clamp-1">
                  BSIT Candidate @ South East Asian Institute of Technology, Inc.
                </p>
              </div>
            </div>

            {/* Quick mini-cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bento-card shadow-sm flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-500">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Focus</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">Civic Tech</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bento-card shadow-sm flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-500">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Recognition</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">Best Editor</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Transparent Freelance Callout */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Bio Paragraphs */}
            <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              <p>
                I am an IT student, developer, and technical researcher located in <strong className="text-slate-900 dark:text-white">Tampakan, South Cotabato, Philippines</strong>. Currently in my 4th year completing a Bachelor of Science in Information Technology at the <strong className="text-slate-900 dark:text-white">South East Asian Institute of Technology, Inc. (SEAIT)</strong>.
              </p>
              <p>
                My technical core was forged during my extensive 486-hour residency at the <strong className="text-slate-900 dark:text-white">Department of Science and Technology (DOST XII)</strong>. There, I engineered and maintained multi-service distributed architectures, implemented secure PostgreSQL database migrations, automated log audits, and authored foundational technical system manuals and SOPs for agency operations.
              </p>
              <p>
                I have a particular passion for <strong className="text-cyan-600 dark:text-cyan-400">civic technology</strong>: building digital infrastructure, communication tools, and data workflows that make public institutions more transparent, efficient, and community-responsive.
              </p>
            </div>

            {/* Honest Open-For-Hire / Freelance Disclaimer Box */}
            <div className="p-5 rounded-2xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/30 space-y-3">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-cyan-500" />
                <span>Open for Client Engagements & System Builds</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {personal.freelanceDisclaimer}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Full weekday schedule
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Contract / milestone billing
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> End-to-end documentation
                </span>
              </div>
            </div>

            {/* Education Timeline */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-500" />
                Academic Background
              </h3>

              <div className="space-y-3">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-4 rounded-xl bento-card shadow-sm space-y-1.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                        {edu.degree}
                      </h4>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400">
                        {edu.period}
                      </span>
                    </div>

                    <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      {edu.institution} • {edu.location}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {edu.details}
                    </p>

                    {edu.honors && edu.honors.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {edu.honors.map((h, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-[11px] font-medium rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          >
                            ★ {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
