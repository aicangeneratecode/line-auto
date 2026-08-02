'use client';

import Image from 'next/image';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const advantages = [
  'Опыт работы более 5 лет',
  'Собственная покрасочная камера',
  'Материалы высокого качества',
  'Гарантия на все виды работ',
];

const stats = [
  { value: '5+', label: 'Лет опыта' },
  { value: '1200+', label: 'Отремонтировано авто' },
  { value: '98%', label: 'Довольных клиентов' },
];

const carouselImages = [
  '/images/car_paint1.webp',
  '/images/car_paint2.webp',
  '/images/car_paint3.webp',
  '/images/car_paint4.webp',
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = sectionRef.current?.querySelectorAll('.counter-item');
            counters?.forEach((item) => item.classList.add('visible'));
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  return (
    <section
      id="about"
      data-section="about"
      ref={sectionRef}
      className="relative bg-secondary text-white py-12 md:py-24 lg:pt-28 overflow-hidden"
    >
      {/* Фоновые декоративные элементы */}
      <div
        className="absolute inset-0 opacity-[0.05] bg-grid-pattern"
        style={{
          maskImage: 'radial-gradient(circle at 70% 30%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 70% 30%, black 40%, transparent 80%)',
        }}
      />
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка – текст */}
          <div className="space-y-6">
            <div>
              <p className="inline-block bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-semibold backdrop-blur-sm border border-accent/30">
                О компании
              </p>
              <h2 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                <span className="text-accent">LINE AUTO</span> <br />
                профессиональный кузовной ремонт
              </h2>
            </div>

            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              Мы команда профессионалов, специализирующаяся на кузовном ремонте и покраске автомобилей в Белграде. Работаем с 2018 года, используя современное оборудование и материалы премиум-класса.
            </p>

            {/* Список преимуществ – скрыт на мобильных, показывается с md */}
            <ul className="hidden md:block space-y-3">
              {advantages.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-200">
                  <CheckCircle size={20} className="text-accent flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-white/10">
              {stats.map((stat, idx) => (
                <div key={idx} className="counter-item text-center">
                  <div className="text-2xl sm:text-4xl font-bold text-accent counter-number">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Правая колонка – карусель */}
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl">
              {carouselImages.map((src, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    idx === currentIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Слайд ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={idx === 0}
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-l from-accent/20 via-transparent to-transparent mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-accent/30 transition-all duration-300"
                aria-label="Предыдущее"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-accent/30 transition-all duration-300"
                aria-label="Следующее"
              >
                <ChevronRight size={20} />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'bg-accent w-6' : 'bg-white/40'
                    }`}
                    aria-label={`Перейти к слайду ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-accent text-secondary px-6 py-3 rounded-2xl shadow-2xl font-bold text-2xl flex items-center gap-2 backdrop-blur-sm border border-white/20">
              <span>5+</span>
              <span className="text-sm font-normal opacity-80">лет</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}