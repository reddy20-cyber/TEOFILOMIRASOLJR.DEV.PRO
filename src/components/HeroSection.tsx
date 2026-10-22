import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ThreeHeroScene } from './ThreeHeroScene';
import { ArrowRight, Download, Sparkles, MapPin, CheckCircle2, ShieldCheck, Mail, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const HeroSection: React.FC = () => {
  const { personal, stats, profileImages } = portfolioData;

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* 3D Interactive Three.js Background */}
      <ThreeHeroScene />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow delay-1000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Availability & Civic Tech Pill */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                {personal.statusBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Civic Tech & Enterprise Systems
              </span>
            </div>

            {/* Name & Headline */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400">
                Hello, I am
              </p>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                {personal.name}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300">
                {personal.role}
              </p>
            </div>

            {/* Short Narrative */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              4th-year BSIT student at <span className="text-slate-900 dark:text-white font-semibold">SEAIT</span> (Tampakan, South Cotabato) with <span className="text-slate-900 dark:text-white font-semibold">486 hours</span> of hands-on software development and technical writing at <span className="text-slate-900 dark:text-white font-semibold">DOST XII</span>. Architecting resilient microservices, PostgreSQL systems, and civic technology.
            </p>

            {/* Location & Quick Meta */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-500" />
                {personal.location}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Undergraduate Freelance Architect
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>Hire Me to Build Your System</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={personal.resumePdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-slate-900 dark:text-white font-semibold text-sm sm:text-base border border-slate-300 dark:border-slate-700 transition-all hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4 text-cyan-500" />
                <span>Download CV</span>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 font-semibold text-sm transition-all"
              >
                <span>View Projects</span>
              </a>
            </div>

            {/* Quick Social & Direct Contact Links */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4">
              <a
                href="https://github.com/reddy20-cyber"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500 hover:border-cyan-500 transition-all shadow-sm"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/teofilo-mirasol"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500 hover:border-cyan-500 transition-all shadow-sm"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:teofilomirasoljr.dost@gmail.com"
                aria-label="Send Email"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500 hover:border-cyan-500 transition-all shadow-sm"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://red-portfolio-ten.vercel.app"
                target="_blank"
                rel="noreferrer"
                aria-label="Live Mirror"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500 hover:border-cyan-500 transition-all shadow-sm"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

          </div>

          {/* Right Column: Hero Profile Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              
              {/* Outer decorative glow and border rings */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-emerald-400 opacity-60 blur-xl group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative w-72 sm:w-80 md:w-96 rounded-3xl overflow-hidden bg-slate-900 border-2 border-slate-700/60 shadow-2xl">
                <img
                  src={profileImages.heroAvatar}
                  alt="Teofilo Bullos Mirasol Jr. - Formal Profile"
                  className="w-full h-auto object-cover object-top aspect-[4/5] transform group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />

                {/* Floating experience badge card */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700/80 text-white shadow-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      DOST Software Dev Alum
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">486 Hrs</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-1">
                    Microservices, PostgreSQL & Technical Documentation
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Stats Strip */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center lg:text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {stat.note}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
