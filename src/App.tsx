import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { CertificatesSection } from './components/CertificatesSection';
import { BadgesSection } from './components/BadgesSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';

export function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [targetCertId, setTargetCertId] = useState<string | null>(null);

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio_theme');
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setDarkMode(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    } else {
      // Default to dark theme as required
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('portfolio_theme', next ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  const handleOpenCertificate = (certId: string) => {
    setTargetCertId(certId);
    // Smooth scroll to certificates section
    const el = document.getElementById('certificates');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#0a0d14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Animated initial preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Top Reading Progress Bar */}
      <ScrollProgressBar />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Main Navigation */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main Sections */}
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection onOpenCert={handleOpenCertificate} />
        <ProjectsSection />
        <SkillsSection />
        <CertificatesSection
          activeCertId={targetCertId}
          onClearActiveCert={() => setTargetCertId(null)}
        />
        <BadgesSection />
        <GallerySection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
