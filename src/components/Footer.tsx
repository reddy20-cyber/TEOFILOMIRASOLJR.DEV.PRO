import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp, Mail, Heart, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const { personal, socials, contacts } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#080b12] text-slate-600 dark:text-slate-400 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          
          {/* Brand & Photo Avatar */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-cyan-500/80 shadow-md shadow-cyan-500/20 flex-shrink-0 bg-slate-800">
              <img
                src="/assets/profile/formal-headshot.webp"
                alt="Teofilo Mirasol Jr."
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                {personal.name}
              </h4>
              <p className="text-xs text-cyan-600 dark:text-cyan-400">
                Full-Stack Systems & Civic Tech Developer
              </p>
            </div>
          </div>

          {/* Socials & Email Quick Links */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:text-cyan-500 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all"
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
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:text-cyan-500 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white shadow-md shadow-cyan-500/20 transition-all ml-2"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Credits & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Teofilo Bullos Mirasol Jr. All rights reserved. Tampakan, South Cotabato, Philippines.
          </p>
          <p className="text-center sm:text-right text-slate-500 dark:text-slate-500">
            Engineered with React, Vite, TypeScript, Tailwind CSS, Three.js & Node.js.
          </p>
        </div>
      </div>
    </footer>
  );
};
