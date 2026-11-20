import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Menu,
  X,
  ArrowUpRight,
  LayoutGrid,
  User,
  Briefcase,
  FolderKanban,
  Cpu,
  Award,
  ShieldCheck,
  Image as ImageIcon,
  Mail,
  FileDown,
  Globe,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('overview');

  const navLinks = [
    { id: 'overview', name: 'Overview', href: '#overview', icon: LayoutGrid },
    { id: 'about', name: 'About', href: '#about', icon: User },
    { id: 'experience', name: 'Experience', href: '#experience', icon: Briefcase },
    { id: 'projects', name: 'Projects', href: '#projects', icon: FolderKanban },
    { id: 'skills', name: 'Skills', href: '#skills', icon: Cpu },
    { id: 'certificates', name: 'Certificates', href: '#certificates', icon: Award },
    { id: 'badges', name: 'Badges', href: '#badges', icon: ShieldCheck },
    { id: 'gallery', name: 'Gallery', href: '#gallery', icon: ImageIcon },
    { id: 'contact', name: 'Contact', href: '#contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPos = window.scrollY + 180;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Slim Floating Pitch-Black Vertical Sidebar (Reference UI Signature) */}
      <aside
        aria-label="Primary Sidebar Navigation"
        className="hidden lg:flex fixed left-4 xl:left-5 top-5 bottom-5 w-[68px] rounded-[26px] bg-[#08080a] border border-white/[0.08] shadow-[0_24px_60px_rgba(0,0,0,0.55)] z-40 flex-col items-center justify-between py-5"
      >
        {/* Top Brand Avatar */}
        <a
          href="#overview"
          title="Teofilo Bullos Mirasol Jr."
          className="relative group focus:outline-none"
        >
          <div className="w-11 h-11 rounded-2xl overflow-hidden ring-2 ring-white/20 group-hover:ring-amber-300/80 transition-all shadow-lg bg-zinc-900">
            <img
              src="/assets/profile/formal-headshot.webp"
              alt="Teofilo Mirasol Jr."
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#08080a]" />
        </a>

        {/* Middle Vertical Icon Navigation */}
        <nav className="flex flex-col items-center gap-1.5 my-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                aria-label={link.name}
                className={`relative group w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-white/[0.14] text-white shadow-inner border border-white/15'
                    : 'text-zinc-500 hover:text-white hover:bg-white/[0.07]'
                }`}
              >
                <Icon className="w-[18px] h-[18px]" />
                {/* Hover Tooltip */}
                <span className="pointer-events-none opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all absolute left-[62px] px-3 py-1.5 rounded-xl bg-[#0e0e12] text-white text-xs font-semibold whitespace-nowrap border border-white/10 shadow-xl">
                  {link.name}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Bottom Utility Icons */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark/light theme"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            {darkMode ? <Sun className="w-[18px] h-[18px] text-amber-300" /> : <Moon className="w-[18px] h-[18px] text-indigo-300" />}
          </button>
          <a
            href={portfolioData.personal.resumePdf}
            target="_blank"
            rel="noreferrer"
            aria-label="Download CV"
            title="Download CV"
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            <FileDown className="w-[18px] h-[18px]" />
          </a>
        </div>
      </aside>

      {/* Top Dashboard Header Bar */}
      <header
        className={`fixed top-0 left-0 lg:left-[88px] xl:left-[96px] right-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-[#19171e]/80 backdrop-blur-2xl border-b border-slate-200/70 dark:border-white/[0.08] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left Dashboard Title */}
          <a href="#overview" className="flex items-center gap-3 group focus:outline-none">
            <div className="lg:hidden relative w-10 h-10 rounded-2xl overflow-hidden ring-2 ring-white/20 shadow-md flex-shrink-0 bg-zinc-900">
              <img
                src="/assets/profile/formal-headshot.webp"
                alt="Teofilo Mirasol Jr."
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
            </div>
            <div>
              <span className="block font-bold text-lg sm:text-xl tracking-tight text-zinc-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors">
                Teofilo Mirasol Jr.
              </span>
              <span className="hidden sm:block text-[11px] font-medium text-zinc-500 dark:text-zinc-400 tracking-wide">
                Full-Stack Developer & Civic Tech Portfolio
              </span>
            </div>
          </a>

          {/* Right Dashboard Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href="https://scpio.media/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold bg-white/70 dark:bg-white/[0.06] hover:bg-white dark:hover:bg-white/[0.12] text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-white/[0.1] backdrop-blur-md transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Globe className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span>scpio.media</span>
            </a>

            <button
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
              className="lg:hidden p-2.5 rounded-2xl bg-white/70 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-200 border border-zinc-200/80 dark:border-white/[0.1]"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs sm:text-sm shadow-lg transition-all hover:scale-[1.03] active:scale-95"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#about"
              aria-label="Profile"
              className="hidden lg:block w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/15 hover:ring-amber-300/70 transition-all shadow-md"
            >
              <img
                src="/assets/profile/formal-headshot.webp"
                alt="Teofilo Mirasol Jr."
                className="w-full h-full object-cover object-top"
              />
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark/light theme"
              className="p-2 rounded-xl bg-white/70 dark:bg-white/[0.08] text-zinc-700 dark:text-zinc-200 border border-zinc-200/80 dark:border-white/10"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-xl bg-white/70 dark:bg-white/[0.08] text-zinc-800 dark:text-white border border-zinc-200/80 dark:border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Glass Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mx-4 mt-3 p-4 rounded-3xl bg-white/95 dark:bg-[#141218]/95 backdrop-blur-2xl border border-zinc-200 dark:border-white/10 shadow-2xl space-y-1.5">
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                      activeSection === link.id
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/[0.08]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>
            <div className="pt-2 flex gap-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold text-sm"
              >
                <span>Hire Me</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="https://scpio.media/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold text-xs flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                scpio.media
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
