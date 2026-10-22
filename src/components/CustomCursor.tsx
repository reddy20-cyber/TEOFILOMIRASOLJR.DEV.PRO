import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer');
        setIsPointer(isInteractive);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-cyan-400 dark:border-cyan-400 transition-transform duration-150 ease-out hidden md:block"
        style={{
          transform: `translate3d(${position.x - (isPointer ? 24 : 16)}px, ${position.y - (isPointer ? 24 : 16)}px, 0)`,
          width: isPointer ? 48 : 32,
          height: isPointer ? 48 : 32,
          backgroundColor: isPointer ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
        }}
      />
      {/* Center Dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-cyan-400 hidden md:block"
        style={{
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
          width: 6,
          height: 6,
        }}
      />
    </>
  );
};
