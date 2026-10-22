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
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 relative bg-slate-100/50 dark:bg-[#0c101a]/50 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-cyan-600 dark:text-cyan-400">
            Portfolio Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Featured Systems & Engineering Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Real enterprise software, civic tech infrastructure, and academic innovation.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20 scale-105'
                  : 'bg-white dark:bg-[#111726] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <TiltCard key={project.id} maxTilt={6}>
              <div className="h-full flex flex-col justify-between rounded-2xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden group hover:border-cyan-500/50 transition-colors">
                
                {/* Image Header with Badge */}
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                      {project.category}
                    </span>
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
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Impact Highlights */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                      Highlights & Implementation
                    </div>
                    <ul className="space-y-1">
                      {project.impact.slice(0, 2).map((item, i) => (
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

                  {/* Action link */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 group-hover:translate-x-1 transition-all"
                    >
                      <span>Inquire about this architecture</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
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
