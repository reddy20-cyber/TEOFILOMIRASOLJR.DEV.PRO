import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Building2, Calendar, MapPin, Clock, CheckCircle2, FileText, ExternalLink } from 'lucide-react';

export const ExperienceSection: React.FC<{ onOpenCert: (certId: string) => void }> = ({ onOpenCert }) => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-cyan-600 dark:text-cyan-400">
            Professional Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Government Tech Residency & Engineering
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between gap-6 hover:border-cyan-500/40 transition-colors"
            >
              <div className="space-y-6">
                {/* Top Title Bar */}
                <div className="flex flex-col gap-3 pb-6 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {exp.hoursCompleted ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                        <Clock className="w-3.5 h-3.5" />
                        {exp.hoursCompleted} Hours Completed
                      </span>
                    ) : exp.badgeLabel ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        {exp.badgeLabel}
                      </span>
                    ) : null}

                    <div className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                    {exp.role}
                  </h3>

                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 flex items-start gap-1.5">
                      <Building2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{exp.organization}</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Summary Description */}
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {exp.summary}
                </p>

                {/* Responsibilities list */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-white">
                    Key Responsibilities & Deliverables
                  </h4>
                  <ul className="space-y-2.5">
                    {exp.bulletPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies strip & Action button */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {exp.liveUrl && (
                    <a
                      href={exp.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-md shadow-cyan-500/20 transition-all"
                    >
                      <span>Visit scpio.media</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {exp.certificateUrl && (
                    <button
                      onClick={() => onOpenCert('dost-ojt-completion')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View OJT Certificate</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
