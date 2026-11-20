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
      setScrolled(window.scrollY > 24);
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
      {/* Desktop Slim Floating Pitch-Black Vertical Sidebar */}
      <aside
        aria-label="Primary Sidebar Navigation"
        className="hidden lg:flex fixed left-4 xl:left-5 top-4 bottom-4 w-[64px] xl:w-[68px] rounded-[24px] bg-[#09090b] border border-white/[0.08] shadow-[0_24px_60px_rgba(0,0,0,0.45)] z-40 flex-col items-center justify-between py-3.5"
      >
        {/* Top Brand Avatar */}
        <a
          href="#overview"
          title="Teofilo Bullos Mirasol Jr."
          className="relative group focus:outline-none shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl overflow-hidden ring-2 ring-white/20 group-hover:ring-amber-300/80 transition-all shadow-lg bg-zinc-900">
            <img
              src="/assets/profile/formal-headshot.webp"
              alt="Teofilo Mirasol Jr."
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#09090b]" />
        </a>

        {/* Middle Vertical Icon Navigation (Comfortable spacing for 720p+ laptops) */}
        <nav className="flex flex-col items-center gap-1 my-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                aria-label={link.name}
                className={`relative group w-9 h-9 xl:w-10 xl:h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-white/[0.15] text-white shadow-inner border border-white/15'
                    : 'text-zinc-500 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <Icon className="w-[17px] h-[17px]" />
                {/* Hover Tooltip */}
                <span className="pointer-events-none opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all absolute left-[56px] px-3 py-1.5 rounded-xl bg-[#0e0e12] text-white text-xs font-semibold whitespace-nowrap border border-white/10 shadow-xl z-50">
                  {link.name}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Bottom Utility Icons */}
        <div className="flex flex-col items-center gap-1 shrink-0 pt-1 border-t border-white/[0.08]">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark/light theme"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            {darkMode ? (
              <Sun className="w-[17px] h-[17px] text-amber-300" />
            ) : (
              <Moon className="w-[17px] h-[17px] text-indigo-300" />
            )}
          </button>
          <a
            href={portfolioData.personal.resumePdf}
            target="_blank"
            rel="noreferrer"
            aria-label="Download CV"
            title="Download CV"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            <FileDown className="w-[17px] h-[17px]" />
          </a>
        </div>
      </aside>

      {/* Top Floating Dashboard Header Bar (Aligned cleanly with Bento Grid) */}
      <header className="fixed top-0 left-0 lg:left-[88px] xl:left-[96px] right-0 z-30 pointer-events-none">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
          <div
            className={`pointer-events-auto flex items-center justify-between gap-4 transition-all duration-300 ${
              scrolled
                ? 'px-4 sm:px-5 py-2.5 rounded-2xl bg-white/80 dark:bg-[#1c1923]/80 backdrop-blur-2xl border border-zinc-200/80 dark:border-white/[0.1] shadow-[0_12px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_14px_36px_rgba(0,0,0,0.4)]'
                : 'px-1 py-2 bg-transparent border border-transparent'
            }`}
          >
            {/* Left Dashboard Title */}
            <a href="#overview" className="flex items-center gap-3 group focus:outline-none">
              <div className="lg:hidden relative w-9 h-9 rounded-xl overflow-hidden ring-2 ring-zinc-300 dark:ring-white/20 shadow-sm flex-shrink-0 bg-zinc-900">
                <img
                  src="/assets/profile/formal-headshot.webp"
                  alt="Teofilo Mirasol Jr."
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>
              <div>
                <span className="block font-bold text-base sm:text-lg tracking-tight text-zinc-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors leading-tight">
                  Teofilo Mirasol Jr.
                </span>
                <span className="hidden sm:block text-[11px] font-medium text-zinc-500 dark:text-zinc-400 tracking-wide">
                  Full-Stack Developer & Civic Tech Portfolio
                </span>
              </div>
            </a>

            {/* Right Dashboard Actions */}
            <div className="hidden md:flex items-center gap-2.5">
              <button
                onClick={toggleDarkMode}
                aria-label="Toggle theme"
                className="lg:hidden p-2 rounded-xl bg-white/80 dark:bg-white/[0.07] text-zinc-700 dark:text-zinc-200 border border-zinc-200/80 dark:border-white/[0.1]"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-500" />}
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Hire Me</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#about"
                aria-label="Profile"
                className="hidden lg:block w-9 h-9 rounded-full overflow-hidden ring-2 ring-zinc-200 dark:ring-white/15 hover:ring-amber-400 transition-all shadow-sm"
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
                className="p-2 rounded-xl bg-white/80 dark:bg-white/[0.08] text-zinc-700 dark:text-zinc-200 border border-zinc-200/80 dark:border-white/10"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-500" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 rounded-xl bg-white/80 dark:bg-white/[0.08] text-zinc-800 dark:text-white border border-zinc-200/80 dark:border-white/10"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Glass Drawer */}
          {mobileMenuOpen && (
            <div className="pointer-events-auto md:hidden mt-2.5 p-4 rounded-3xl bg-white/95 dark:bg-[#16141c]/95 backdrop-blur-2xl border border-zinc-200 dark:border-white/10 shadow-2xl space-y-2">
              <div className="grid grid-cols-2 gap-1.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                        activeSection === link.id
                          ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/[0.08]'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{link.name}</span>
                    </a>
                  );
                })}
              </div>
              <div className="pt-2 flex gap-2 border-t border-zinc-200/80 dark:border-white/[0.08]">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs"
                >
                  <span>Hire Me</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={portfolioData.personal.resumePdf}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-white/[0.08] text-zinc-800 dark:text-zinc-200 font-semibold text-xs flex items-center gap-1.5 border border-zinc-200 dark:border-white/[0.1]"
                >
                  <FileDown className="w-4 h-4" />
                  <span>CV</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Floating Pitch-Black Bottom Dock (Matches Desktop Floating Sidebar) */}
      <nav
        aria-label="Mobile Quick Navigation"
        className="lg:hidden fixed bottom-3 left-3 right-3 z-40 max-w-md mx-auto"
      >
        <div className="flex items-center justify-around px-2 py-2 rounded-[22px] bg-[#09090b]/92 backdrop-blur-2xl border border-white/[0.12] shadow-[0_16px_40px_rgba(0,0,0,0.55)]">
          {[
            { id: 'overview', name: 'Home', href: '#overview', icon: LayoutGrid },
            { id: 'experience', name: 'Work', href: '#experience', icon: Briefcase },
            { id: 'projects', name: 'Projects', href: '#projects', icon: FolderKanban },
            { id: 'certificates', name: 'Certs', href: '#certificates', icon: Award },
            { id: 'contact', name: 'Hire', href: '#contact', icon: Mail },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all min-w-[56px] ${
                  isActive
                    ? 'bg-white/[0.16] text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Icon className="w-[18px] h-[18px]" />
                <span className="text-[10px] font-semibold leading-none">{item.name}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
};
