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

        <div className="space-y-8 max-w-4xl mx-auto">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 shadow-xl space-y-6"
            >
              {/* Top Title Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    <Clock className="w-3.5 h-3.5" />
                    {exp.hoursCompleted} Hours Completed
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    {exp.organization}
                  </div>
                </div>

                <div className="space-y-1 text-left md:text-right text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center md:justify-end gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </div>
                  <div className="flex items-center md:justify-end gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </div>
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
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

              {/* Technologies strip & Certificate view button */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
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

                <button
                  onClick={() => onOpenCert('dost-ojt-completion')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>View OJT Certificate</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
