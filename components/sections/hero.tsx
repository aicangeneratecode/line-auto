'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowDown, MessageCircle } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[75dvh] sm:min-h-[100dvh] flex items-center overflow-hidden bg-secondary hidden md:block">
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.webp"
          alt="Кузовной ремонт и покраска автомобилей"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Основной контент */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2 sm:pt-8 sm:pb-6 md:pt-20 md:pb-8">
        <div className="max-w-2xl max-w-full">
          <p
            className={`hidden sm:inline-block bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-semibold backdrop-blur-sm border border-accent/30 mb-4 animate-fade-in-up`}
          >
            Профессиональный кузовной ремонт
          </p>

          <h1
            className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white animate-fade-in-up animation-delay-100`}
          >
            Ремонт и покраска авто <br />
            <span className="text-accent">в Белграде</span>
          </h1>

          <p
            className={`mt-4 text-base sm:text-lg text-gray-200 leading-relaxed max-w-lg animate-fade-in-up animation-delay-200`}
          >
            Полный спектр услуг: от локального ремонта до полной перекраски. Работаем с любыми марками. Гарантия до 3-х лет.
          </p>

          <div
            className={`mt-8 flex flex-wrap gap-3 sm:gap-4 animate-fade-in-up animation-delay-300`}
          >
            <Link
              href="#contact"
              className="btn-gloss inline-flex items-center justify-center rounded-xl bg-accent text-secondary px-8 py-4 text-lg font-semibold transition-all hover:bg-accent/90 hover:scale-105 shadow-lg shadow-accent/30 group w-full sm:w-auto"
            >
              Записаться на ремонт
              <ArrowDown className="ml-2 inline-block sm:hidden transition-transform group-hover:translate-y-1" size={20} />
              <ArrowRight className="ml-2 hidden sm:inline-block transition-transform group-hover:translate-x-1" size={20} />
            </Link>
            <Link
              href="#gallery"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 text-white px-8 py-4 text-lg font-medium transition-all hover:bg-white/10 hover:border-white/50 w-full sm:w-auto"
            >
              Галерея
            </Link>
          </div>
        </div>
      </div>

      {/* Вертикальная плашка (скрыта на мобильных) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex items-center z-20">
        <Link
          href="#contact"
          className="group bg-black/40 backdrop-blur-sm text-white px-3 py-6 rounded-l-2xl border-l border-t border-b border-white/10 hover:bg-accent/20 hover:border-accent/30 transition-all duration-300 flex flex-col items-center gap-2"
          style={{ writingMode: 'vertical-rl' }}
        >
          <MessageCircle
            size={18}
            className="text-accent group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-xs tracking-[0.2em] font-light uppercase">Задайте вопросы</span>
        </Link>
      </div>
    </section>
  );
}