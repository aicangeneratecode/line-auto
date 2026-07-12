'use client';

import { useRef, useEffect } from 'react';

export function BackgroundController({ children }: { children: React.ReactNode }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    const observer = new IntersectionObserver(
      (entries) => {
        let activeId: string | null = null;
        let maxRatio = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeId = entry.target.getAttribute('data-section');
          }
        });
        if (gridRef.current && activeId) {
          gridRef.current.setAttribute('data-active', activeId);
        }
      },
      { threshold: [0.2, 0.5, 0.8], rootMargin: '0px 0px -10% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Базовый градиентный фон */}
      <div
        className="fixed inset-0 z-0 bg-base"
        style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
      />

      {/* Сетка и световые пятна */}
      <div
        ref={gridRef}
        className="fixed inset-0 pointer-events-none z-0 bg-grid-base"
        style={{ willChange: 'transform, mask-image, opacity', backfaceVisibility: 'hidden' }}
        data-active="hero"
      >
        <div className="absolute inset-0 bg-ambient" />
      </div>

      {/* Контент */}
      <div className="relative z-10">{children}</div>
    </>
  );
}