'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CompareSliderProps {
  before: string;
  after: string;
  alt: string;
  beforeLabel: string;
  afterLabel: string;
}

function CompareSlider({ before, after, alt, beforeLabel, afterLabel }: CompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const onMove = (event: MouseEvent) => handleMove(event.clientX);
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const handleTouchStart = () => {
    const onMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) handleMove(touch.clientX);
    };
    const onEnd = () => {
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[7/5] overflow-hidden rounded-2xl bg-gray-200 shadow-xl select-none transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}>
        <Image src={after} alt={`${alt} после`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
      </div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
        <Image src={before} alt={`${alt} до`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
      </div>
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize shadow-lg"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl border border-white/50">
          <span className="text-gray-900 font-bold text-lg tracking-tight">‹ ›</span>
        </div>
      </div>
      <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/50 text-white text-xs backdrop-blur-sm">
        {beforeLabel}
      </div>
      <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/50 text-white text-xs backdrop-blur-sm">
        {afterLabel}
      </div>
    </div>
  );
}

export function Gallery() {
  const t = useTranslations('gallery');
  const items = t.raw('items') as Array<{
    alt: string;
    before: string;
    after: string;
  }>;
  const [activeIndex, setActiveIndex] = useState(0);
  const beforeLabel = t('before');
  const afterLabel = t('after');

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };
  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <section id="gallery" className="py-16 md:py-20 lg:pt-14 pb-6 bg-secondary text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] bg-grid-pattern"
        style={{
          maskImage: 'radial-gradient(circle at 70% 30%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 70% 30%, black 40%, transparent 80%)',
        }}
      />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold bg-accent/20 text-accent border border-accent/30">
            {t('badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">{t('title')}</h2>
          <p className="text-gray-300 text-lg">{t('subtitle')}</p>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-4 md:gap-8 mt-12">
          {items.map((item, index) => (
            <CompareSlider
              key={index}
              before={item.before}
              after={item.after}
              alt={item.alt}
              beforeLabel={beforeLabel}
              afterLabel={afterLabel}
            />
          ))}
        </div>

        <div className="md:hidden mt-8">
          <CompareSlider
            before={items[activeIndex].before}
            after={items[activeIndex].after}
            alt={items[activeIndex].alt}
            beforeLabel={beforeLabel}
            afterLabel={afterLabel}
          />

          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-accent/30 transition-all duration-300"
              aria-label="Предыдущий"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'bg-accent w-6' : 'bg-white/40'
                  }`}
                  aria-label={`Перейти к слайду ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-accent/30 transition-all duration-300"
              aria-label="Следующий"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}