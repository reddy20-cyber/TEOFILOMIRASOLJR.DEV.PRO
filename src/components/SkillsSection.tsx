import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { TiltCard } from './TiltCard';
import { Terminal, Database, Server, Cpu, Smartphone, Bot, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { skillsCategories } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages & Core':
        return <Terminal className="w-4 h-4 text-cyan-500" />;
      case 'Databases & Storage':
        return <Database className="w-4 h-4 text-emerald-500" />;
      case 'Containers, Infra & DevOps':
        return <Server className="w-4 h-4 text-indigo-500" />;
      case 'Backend & Microservices':
        return <Cpu className="w-4 h-4 text-blue-500" />;
      case 'Cross-Platform & Mobile':
        return <Smartphone className="w-4 h-4 text-purple-500" />;
      case 'AI Integration & Analytics':
        return <Bot className="w-4 h-4 text-amber-500" />;
      default:
        return <FileText className="w-4 h-4 text-teal-500" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-cyan-600 dark:text-cyan-400">
            Technical Stack & Competencies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Comprehensive Skills Matrix
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            From low-level microservice coordination to modern responsive frontends and AI integration.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full" />
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {skillsCategories.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === idx
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20 scale-105'
                  : 'bg-white dark:bg-[#111726] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {getCategoryIcon(cat.category)}
              <span>{cat.category}</span>
            </button>
          ))}
        </div>

        {/* Active Category Display */}
        <div className="max-w-4xl mx-auto">
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                  {getCategoryIcon(skillsCategories[selectedCategory].category)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {skillsCategories[selectedCategory].category}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {skillsCategories[selectedCategory].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {skillsCategories[selectedCategory].skills.map((skill, i) => (
                <TiltCard key={i} maxTilt={8} scale={1.03}>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-colors space-y-2 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          {skill.name}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            skill.level === 'Advanced'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : skill.level === 'Intermediate'
                              ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20'
                              : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                          }`}
                        >
                          {skill.level}
                        </span>
                      </div>
                      {skill.details && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                          {skill.details}
                        </p>
                      )}
                    </div>

                    {/* Subtle progress indicator */}
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
                      <div
                        className={`h-full rounded-full ${
                          skill.level === 'Advanced'
                            ? 'w-full bg-gradient-to-r from-cyan-500 to-emerald-400'
                            : skill.level === 'Intermediate'
                            ? 'w-3/4 bg-gradient-to-r from-cyan-500 to-indigo-500'
                            : 'w-1/2 bg-indigo-500'
                        }`}
                      />
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
