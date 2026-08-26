'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';

const steps = [
  {
    id: '01',
    title: 'Осмотр и подготовка поверхности',
    description: 'Тщательный осмотр автомобиля, выявление дефектов и подготовка кузова к работе.',
    image: '/images/step-1.webp',
  },
  {
    id: '02',
    title: 'Демонтаж деталей',
    description: 'Снятие элементов, которые не подлежат окраске, для защиты и удобства выполнения работы.',
    image: '/images/step-2.webp',
  },
  {
    id: '03',
    title: 'Обезжиривание и очистка',
    description: 'Полное удаление грязи, масел и старых покрытий для идеального сцепления краски с поверхностью.',
    image: '/images/step-3.webp',
  },
  {
    id: '04',
    title: 'Выравнивание поверхности',
    description: 'Шпатлевка и шлифовка повреждений для создания ровной основы под покраску.',
    image: '/images/step-4.webp',
  },
  {
    id: '05',
    title: 'Грунтование',
    description: 'Нанесение специального грунта для защиты от коррозии и улучшения адгезии краски.',
    image: '/images/step-5.webp',
  },
  {
    id: '06',
    title: 'Окраска',
    description: 'Нанесение выбранного оттенка краски с использованием современного оборудования и материалов.',
    image: '/images/step-6.webp',
  },
  {
    id: '07',
    title: 'Лакирование',
    description: 'Нанесение защитного слоя лака для придания блеска и дополнительной защиты от внешних воздействий.',
    image: '/images/step-7.webp',
  },
  {
    id: '08',
    title: 'Полировка и финальная проверка',
    description: 'Завершающая полировка и проверка качества покрытия перед выдачей автомобиля клиенту.',
    image: '/images/step-8.webp',
  },
];

export function Steps() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const items = containerRef.current?.querySelectorAll('.step-item');
    items?.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="steps"
      data-section="steps"
      ref={containerRef}
      className="relative bg-secondary text-white py-16 md:py-24 lg:pb-16 -mt-20 overflow-hidden"
    >
      {/* Фоновые декоративные элементы */}
      <div
        className="absolute inset-0 opacity-[0.04] bg-grid-pattern"
        style={{
          maskImage: 'linear-gradient(to right, black 20%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to right, black 20%, transparent 80%)',
        }}
      />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-2 md:pt-0">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <p className="inline-block bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-semibold backdrop-blur-sm border border-accent/30">
            Процесс работы
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Этапы работ</h2>
          <p className="text-lg text-gray-300">Каждый этап — залог безупречного результата</p>
        </div>

        <div className="relative mt-6 md:mt-16">
          {/* Вертикальная линия */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-white/10 hidden md:block" />

          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={step.id}
                className={`step-item relative flex flex-col md:flex-row items-start md:items-center mb-8 md:mb-16 last:mb-0 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } opacity-0 translate-y-8 transition-all duration-700`}
              >
                <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  {isEven ? (
                    <>
                      <span className="text-4xl md:text-7xl font-black text-white/20">{step.id}</span>
                      <h3 className="text-xl md:text-3xl font-bold mt-2">{step.title}</h3>
                      <p className="text-sm md:text-lg text-gray-300 mt-2 leading-relaxed">{step.description}</p>
                    </>
                  ) : (
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                      <Image src={step.image} alt={step.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" loading="lazy" />
                    </div>
                  )}
                </div>
                <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${isEven ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                  {isEven ? (
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                      <Image src={step.image} alt={step.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" loading="lazy" />
                    </div>
                  ) : (
                    <>
                      <span className="text-4xl md:text-7xl font-black text-white/20">{step.id}</span>
                      <h3 className="text-xl md:text-3xl font-bold mt-2">{step.title}</h3>
                      <p className="text-sm md:text-lg text-gray-300 mt-2 leading-relaxed">{step.description}</p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}