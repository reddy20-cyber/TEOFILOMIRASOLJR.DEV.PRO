import React, { useEffect, useState } from 'react';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFade(true), 1200);
    const timer2 = setTimeout(() => onComplete(), 1600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0d14] text-white transition-opacity duration-500 ease-out ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Glowing orbital ring */}
        <div className="absolute w-24 h-24 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
        <div className="absolute w-28 h-28 rounded-full border border-indigo-500/10 border-b-indigo-400 animate-spin-slow" />
        
        {/* Center Logo */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center font-black text-2xl tracking-tight shadow-[0_0_30px_rgba(6,182,212,0.5)]">
          TM
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-1">
        <span className="text-sm font-semibold tracking-widest uppercase text-cyan-400">Teofilo Mirasol Jr.</span>
        <span className="text-xs text-slate-400">Loading portfolio experience...</span>
      </div>
    </div>
  );
};
