import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp, Mail, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const { personal, socials, contacts } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pb-24 lg:pb-6 pt-4 relative">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bento-card p-6 sm:p-8 text-zinc-600 dark:text-zinc-400">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-zinc-200/80 dark:border-white/[0.08]">
            {/* Brand & Photo Avatar */}
            <div className="flex items-center gap-3.5">
              <div className="relative w-11 h-11 rounded-2xl overflow-hidden ring-2 ring-zinc-200 dark:ring-white/15 shadow-md flex-shrink-0 bg-zinc-900">
                <img
                  src="/assets/profile/formal-headshot.webp"
                  alt="Teofilo Mirasol Jr."
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white text-base leading-tight">
                  {personal.name}
                </h4>
                <p className="text-xs font-medium text-amber-600 dark:text-amber-300 mt-0.5">
                  Full-Stack Systems &amp; Civic Tech Developer
                </p>
              </div>
            </div>

            {/* Socials & Email Quick Links */}
            <div className="flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="w-10 h-10 rounded-xl bg-white/75 dark:bg-white/[0.06] hover:bg-white dark:hover:bg-white/[0.14] border border-zinc-200/80 dark:border-white/[0.1] text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center justify-center transition-all"
                >
                  {s.name === 'GitHub' ? (
                    <GithubIcon className="w-4 h-4" />
                  ) : s.name === 'LinkedIn' ? (
                    <LinkedinIcon className="w-4 h-4" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                </a>
              ))}
              <a
                href={`mailto:${contacts[0].email}`}
                aria-label="Direct Email"
                className="w-10 h-10 rounded-xl bg-white/75 dark:bg-white/[0.06] hover:bg-white dark:hover:bg-white/[0.14] border border-zinc-200/80 dark:border-white/[0.1] text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center justify-center transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>

              {/* Back to top button (Matching crisp white pill aesthetic) */}
              <button
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                title="Back to top"
                className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 shadow-md flex items-center justify-center transition-all hover:-translate-y-0.5 ml-1"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Credits */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p className="text-center sm:text-left text-zinc-600 dark:text-zinc-400">
              © {new Date().getFullYear()} Teofilo Bullos Mirasol Jr. All rights reserved. Tampakan, South Cotabato, Philippines.
            </p>
            <p className="text-center sm:text-right text-zinc-500 dark:text-zinc-500">
              Engineered with React, Vite, TypeScript, Tailwind CSS, Three.js &amp; Node.js.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
