'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const videoItems = [
  {
    id: '1',
    title: 'Процесс покраски',
    src: '/videos/servis1.mp4',
  },
  {
    id: '2',
    title: 'Удаление вмятины',
    src: '/videos/servis2.mp4',
  },
  {
    id: '3',
    title: 'Полировка',
    src: '/videos/servis3.mp4',
  },
];

interface VideoCardProps {
  src: string;
  title: string;
  poster?: string;
}

function VideoCard({ src, title, poster }: VideoCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gray-800 shadow-xl transition-transform duration-300 hover:scale-[1.02] w-full h-[350px] md:h-[450px]">
      <video
        src={src}
        poster={poster}
        controls
        muted
        playsInline
        autoPlay
        loop
        className="absolute inset-0 w-full h-full object-cover"
        preload="metadata"
      />
    </div>
  );
}

export function Videos() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + videoItems.length) % videoItems.length);
  };
  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % videoItems.length);
  };

  return (
    <section id="videos" className="pt-2 pb-12 md:pb-16 bg-secondary text-white relative overflow-hidden">
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
            Видео работ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Наши работы в видео</h2>
          <p className="text-gray-300 text-lg">Короткие ролики о ремонте и покраске</p>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-4 md:gap-8 mt-8">
          {videoItems.map((item) => (
            <VideoCard key={item.id} src={item.src} title={item.title}  />
          ))}
        </div>

        <div className="md:hidden mt-6">
          <div className="w-full h-[350px] overflow-hidden rounded-2xl bg-gray-800 shadow-xl">
            <video
              src={videoItems[activeIndex].src}
              controls
              muted
              playsInline
              autoPlay
              loop
              className="w-full h-full object-cover"
              preload="metadata"
            />
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-accent/30 transition-all duration-300"
              aria-label="Предыдущее видео"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {videoItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'bg-accent w-6' : 'bg-white/40'
                  }`}
                  aria-label={`Перейти к видео ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-accent/30 transition-all duration-300"
              aria-label="Следующее видео"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}