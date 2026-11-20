import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ThreeHeroScene } from './ThreeHeroScene';
import {
  ChevronRight,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const HeroSection: React.FC = () => {
  const { personal, profileImages, projects } = portfolioData;

  const kpiMetrics = [
    {
      value: '486+',
      label: 'DOST Hours',
      dotColor: 'bg-sky-400',
      barColor: 'bg-sky-400',
      barWidth: 'w-4/5',
    },
    {
      value: '5+',
      label: 'Microservices',
      dotColor: 'bg-rose-400',
      barColor: 'bg-rose-400',
      barWidth: 'w-3/4',
    },
    {
      value: '3',
      label: 'Cisco Certs',
      dotColor: 'bg-emerald-400',
      barColor: 'bg-emerald-400',
      barWidth: 'w-2/3',
    },
    {
      value: '1',
      label: 'Live Gov App',
      dotColor: 'bg-amber-300',
      barColor: 'bg-amber-300',
      barWidth: 'w-full',
    },
  ];

  const featuredRows = projects.slice(0, 3);

  return (
    <section
      id="overview"
      className="relative pt-24 sm:pt-28 pb-12 overflow-x-clip"
    >
      {/* Subtle 3D Interactive Three.js Background */}
      <div className="opacity-35 dark:opacity-45 pointer-events-none">
        <ThreeHeroScene />
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        {/* TOP BENTO GRID: Hero Spotlight (8 cols) + Right Widgets (4 cols) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch md:pt-8">
          {/* LEFT 8 COLS: Main Hero Spotlight Bento Card with Pop-Out Cutout (Exact Reference Style) */}
          <div className="xl:col-span-8 bento-card relative overflow-visible p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[450px] lg:min-h-[470px]">
            {/* Clipped Warm Inner Ambient Glows */}
            <div className="pointer-events-none absolute inset-0 rounded-[28px] overflow-hidden">
              <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-300/10 dark:bg-amber-400/12 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-violet-400/10 dark:bg-violet-400/12 blur-3xl" />
            </div>

            {/* Desktop Pop-Out Transparent Portrait Cutout (large & prominent, breaking above top rim) */}
            <img
              src={profileImages.casualCutout}
              alt="Teofilo Bullos Mirasol Jr."
              className="hidden md:block absolute right-2 lg:right-6 bottom-0 h-[630px] lg:h-[680px] xl:h-[710px] w-auto max-w-none object-contain object-bottom z-10 pointer-events-none select-none drop-shadow-[0_28px_45px_rgba(0,0,0,0.5)]"
              loading="eager"
            />

            {/* Upper Hero Content: Left Copy (gives room on right for Pop-Out Cutout) */}
            <div className="relative z-20 md:max-w-[62%] lg:max-w-[60%] space-y-4">
              <div className="inline-flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {personal.statusBadge}
                </span>
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  4th-Year BSIT • SEAIT
                </span>
              </div>

              <div className="space-y-1.5">
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.08]">
                  {personal.name}
                </h1>
                <p className="text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-300">
                  {personal.role}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300/90 leading-relaxed max-w-lg">
                Solo Full-Stack creator of{' '}
                <a
                  href="https://scpio.media/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-zinc-900 dark:text-amber-300 underline decoration-amber-400/50 underline-offset-4 hover:decoration-amber-300"
                >
                  scpio.media
                </a>{' '}
                (Province of South Cotabato OPIO RDTS Pro) and 486-hour DOST XII software engineering alum. Building resilient civic tech, microservices, and PostgreSQL systems.
              </p>

              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-amber-500 dark:text-amber-300 shrink-0" />
                <span>{personal.location}</span>
              </div>

              {/* Primary White Pill CTA + Download CV + Socials */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-sm shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={personal.resumePdf}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/70 dark:bg-white/[0.08] hover:bg-white dark:hover:bg-white/[0.14] text-zinc-900 dark:text-white font-semibold text-sm border border-zinc-200 dark:border-white/[0.12] backdrop-blur-md transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </a>

                <div className="flex items-center gap-1.5 ml-1">
                  <a
                    href="https://github.com/reddy20-cyber"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="w-10 h-10 rounded-xl bg-white/70 dark:bg-white/[0.07] hover:bg-white dark:hover:bg-white/[0.15] border border-zinc-200 dark:border-white/[0.1] flex items-center justify-center text-zinc-700 dark:text-zinc-200 transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/teofilo-mirasol"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-xl bg-white/70 dark:bg-white/[0.07] hover:bg-white dark:hover:bg-white/[0.15] border border-zinc-200 dark:border-white/[0.1] flex items-center justify-center text-zinc-700 dark:text-zinc-200 transition-all"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:teofilomirasoljr.dost@gmail.com"
                    aria-label="Email"
                    className="w-10 h-10 rounded-xl bg-white/70 dark:bg-white/[0.07] hover:bg-white dark:hover:bg-white/[0.15] border border-zinc-200 dark:border-white/[0.1] flex items-center justify-center text-zinc-700 dark:text-zinc-200 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Portrait Cutout */}
            <div className="md:hidden relative z-10 flex justify-center mt-6 -mb-10">
              <img
                src={profileImages.casualCutout}
                alt="Teofilo Bullos Mirasol Jr."
                className="h-72 w-auto object-contain object-bottom drop-shadow-[0_18px_30px_rgba(0,0,0,0.4)]"
                loading="eager"
              />
            </div>

            {/* Bottom Floating Frosted Glass KPI Strip overlaid across the lower cutout (Signature Reference Element) */}
            <div className="relative z-20 mt-6 sm:mt-8 p-4 sm:p-5 rounded-[22px] bg-white/80 dark:bg-white/[0.08] backdrop-blur-2xl border border-zinc-200/80 dark:border-white/[0.14] shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 flex-1">
                  {kpiMetrics.map((metric) => (
                    <div key={metric.label} className="space-y-1.5">
                      <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-none">
                        {metric.value}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-300">
                        <span className={`w-2 h-2 rounded-full ${metric.dotColor}`} />
                        <span>{metric.label}</span>
                      </div>
                      <div className="h-1 w-full max-w-[84px] rounded-full bg-zinc-200 dark:bg-white/10 overflow-hidden">
                        <div className={`h-full rounded-full ${metric.barColor} ${metric.barWidth}`} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Circular Black Arrow CTA */}
                <a
                  href="#projects"
                  aria-label="Explore all projects"
                  title="Explore Projects"
                  className="self-end sm:self-center w-11 h-11 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white border border-white/15 flex items-center justify-center shrink-0 shadow-lg hover:scale-105 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT 4 COLS: Stacked Bento Widgets */}
          <div className="xl:col-span-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6">
            {/* Top Right Card: Engineering Activity Curve (Matches "Active Users right now") */}
            <div className="bento-card p-6 flex flex-col justify-between min-h-[220px]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <span>Engineering Velocity</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </h2>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    2026 Government & Production Milestones
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20">
                  Active
                </span>
              </div>

              {/* Dual-Line Smooth Glowing SVG Chart */}
              <div className="my-3 relative">
                <svg
                  viewBox="0 0 320 96"
                  className="w-full h-24 overflow-visible"
                  fill="none"
                  aria-hidden="true"
                >
                  {/* Subtle horizontal grid */}
                  <line x1="0" y1="22" x2="320" y2="22" stroke="currentColor" className="text-zinc-200 dark:text-white/[0.06]" strokeDasharray="3 3" />
                  <line x1="0" y1="54" x2="320" y2="54" stroke="currentColor" className="text-zinc-200 dark:text-white/[0.06]" strokeDasharray="3 3" />
                  <line x1="0" y1="86" x2="320" y2="86" stroke="currentColor" className="text-zinc-200 dark:text-white/[0.06]" />

                  {/* Secondary crisp white/slate line */}
                  <path
                    d="M 8 76 C 45 50, 72 56, 110 42 C 150 28, 178 46, 218 28 C 258 10, 286 24, 312 14"
                    stroke="currentColor"
                    className="text-zinc-400 dark:text-white/75"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Primary warm gold line */}
                  <path
                    d="M 8 82 C 42 74, 70 62, 108 64 C 148 66, 176 34, 218 32 C 258 30, 284 18, 312 10"
                    stroke="#f5b942"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="312" cy="10" r="4" fill="#f5b942" />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                <span>Jul • DOST XII</span>
                <span>Oct • Certs</span>
                <span className="text-amber-600 dark:text-amber-300 font-semibold">Nov • scpio.media</span>
              </div>
            </div>

            {/* Bottom Right Card: Latest Live Launch (Matches "Latest Sales") */}
            <a
              href="https://scpio.media/"
              target="_blank"
              rel="noopener noreferrer"
              className="bento-card p-6 group flex items-center justify-between gap-4 hover:-translate-y-0.5"
            >
              <div className="space-y-2.5 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-900 dark:text-white">
                    Latest Launch
                  </span>
                </div>

                {/* Mini Sparkline + Date */}
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 64 20" className="w-14 h-5" fill="none" aria-hidden="true">
                    <path
                      d="M 2 15 Q 14 6, 26 12 T 50 7 T 62 4"
                      stroke="#f5b942"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-300">
                    Nov 17, 2026
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-600 dark:text-lime-300 leading-none">
                  scpio.media
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="truncate">Solo Full-Stack • South Cotabato</span>
                </div>
              </div>

              {/* Right Thumbnail Preview Box (Matches Backpack preview box in reference) */}
              <div className="w-28 sm:w-32 shrink-0 p-2 rounded-[20px] bg-zinc-100/90 dark:bg-white/[0.07] border border-zinc-200/80 dark:border-white/[0.1] flex flex-col items-center gap-1.5">
                <div className="w-full h-20 rounded-xl overflow-hidden bg-zinc-900">
                  <img
                    src="/assets/projects/opio-rdts-pro.webp"
                    alt="OPIO RDTS Pro Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-300 flex items-center gap-1">
                  <span>OPIO RDTS</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* BOTTOM BENTO LIST CARD: Featured Systems Overview (Matches "Your top videos in this period") */}
        <div className="bento-card p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                Top Systems & Engineering Highlights
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Production deployments and government platforms
              </p>
            </div>
            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/70 dark:bg-white/[0.07] hover:bg-white dark:hover:bg-white/[0.14] text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-white/[0.1] transition-all"
            >
              <span>All Projects</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-2.5">
            {featuredRows.map((proj, idx) => {
              const rowHref = proj.demoUrl || '#projects';
              const isExternal = Boolean(proj.demoUrl);
              return (
                <a
                  key={proj.id}
                  href={rowHref}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="bento-row p-3 sm:px-4 sm:py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 group"
                >
                  {/* Thumbnail + Title */}
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className="w-16 h-11 rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-white/10">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors truncate">
                        {proj.title}
                      </div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                        {proj.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Status + Role + Mini Sparkline */}
                  <div className="flex flex-wrap items-center justify-between md:justify-end gap-4 sm:gap-6 shrink-0 text-xs">
                    <span className="inline-flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-200">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          idx === 0 ? 'bg-emerald-400' : idx === 1 ? 'bg-amber-400' : 'bg-sky-400'
                        }`}
                      />
                      <span>{proj.launchDate || proj.category}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-zinc-500 dark:text-zinc-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                      <span>{proj.role || 'Full-Stack / Backend'}</span>
                    </span>

                    {/* Mini Sparkline */}
                    <svg
                      viewBox="0 0 68 20"
                      className="hidden sm:block w-16 h-5 shrink-0"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d={
                          idx === 0
                            ? 'M 2 16 Q 16 14, 28 10 T 52 6 T 66 3'
                            : idx === 1
                            ? 'M 2 14 Q 18 6, 32 11 T 54 7 T 66 5'
                            : 'M 2 15 Q 20 11, 34 8 T 56 9 T 66 4'
                        }
                        stroke="#f5b942"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>

                    <span className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-white/[0.06] group-hover:bg-zinc-900 dark:group-hover:bg-white text-zinc-600 dark:text-zinc-300 group-hover:text-white dark:group-hover:text-zinc-950 flex items-center justify-center transition-all">
                      {isExternal ? (
                        <ExternalLink className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
