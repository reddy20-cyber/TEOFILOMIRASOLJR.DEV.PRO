import React, { useState } from 'react';
import { portfolioData, ProjectItem } from '../data/portfolioData';
import { TiltCard } from './TiltCard';
import { Layers, Sparkles, ExternalLink, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Full-Stack', 'Microservices & Backend', 'Civic Tech', 'Academic Innovation'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory || p.tags.includes(activeCategory));

  return (
    <section id="projects" className="py-16 relative">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-600 dark:text-amber-300">
            Portfolio Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Featured Systems & Engineering Projects
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Real enterprise software, civic tech infrastructure, and academic innovation.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-300 to-rose-400 mx-auto rounded-full" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-lg scale-105'
                  : 'bg-white/75 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-white/[0.12] border border-zinc-200 dark:border-white/[0.1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <TiltCard key={project.id} maxTilt={6}>
              <div className="bento-card h-full flex flex-col justify-between overflow-hidden group">
                
                {/* Image Header with Badge */}
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                      {project.category}
                    </span>
                    {project.demoUrl && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-400/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live
                      </span>
                    )}
                  </div>

                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500/20 backdrop-blur-md text-amber-400 border border-amber-500/30">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-1">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  {(project.role || project.launchDate) && (
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                      {project.role && (
                        <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                          {project.role}
                        </span>
                      )}
                      {project.launchDate && (
                        <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                          {project.launchDate}
                        </span>
                      )}
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Impact Highlights */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                      Highlights & Implementation
                    </div>
                    <ul className="space-y-1">
                      {project.impact.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Architecture Note if available */}
                  {project.architectureDetails && (
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                      <strong className="text-slate-700 dark:text-slate-300">Architecture:</strong> {project.architectureDetails}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action links */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                    {project.demoUrl ? (
                      <>
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all"
                        >
                          <span>Visit Live Site</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                        >
                          <span>Inquire</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </>
                    ) : (
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 group-hover:translate-x-1 transition-all"
                      >
                        <span>Inquire about this architecture</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
};
