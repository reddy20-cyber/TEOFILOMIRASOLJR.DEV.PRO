import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Badges', href: '#badges' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-[#0a0d14]/85 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-slate-200/50 dark:border-slate-800/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-xl"
        >
          <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-cyan-500/80 shadow-md shadow-cyan-500/25 group-hover:scale-105 group-hover:ring-cyan-400 transition-all flex-shrink-0 bg-slate-800">
            <img
              src="/assets/profile/formal-headshot.webp"
              alt="Teofilo Mirasol Jr."
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
              Teofilo Mirasol Jr.
            </span>
            <span className="text-[11px] font-medium text-cyan-600 dark:text-cyan-400 -mt-1 tracking-wider uppercase">
              Full-Stack & Civic Tech
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark/light theme"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>

          {/* Hire Me CTA Button */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Hire Me</span>
            <ArrowUpRight className="w-4 h-4 -ml-0.5" />
          </a>
        </div>

        {/* Mobile controls & hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark/light theme"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-white dark:bg-[#0d121f] border-b border-slate-200 dark:border-slate-800 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-cyan-50 dark:hover:bg-slate-800 hover:text-cyan-600 dark:hover:text-cyan-400"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-sm shadow-md shadow-cyan-500/20"
            >
              <Sparkles className="w-4 h-4" />
              Hire Me / Start a Project
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
