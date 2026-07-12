'use client';

import { useState } from 'react';
import { Shield, Clock, Users } from 'lucide-react';
import Image from 'next/image';

const benefits = [
  { icon: Shield, text: 'Индивидуальные условия для бизнеса' },
  { icon: Clock, text: 'Приоритетное выполнение заказов' },
  { icon: Users, text: 'Выделенный менеджер и поддержка 24/7' },
];

export function Partners() {
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <section
      id="partners"
      data-section="partners"
      className="relative py-16 md:py-24 lg:py-32 text-white overflow-hidden bg-black"
    >
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image src="/images/partner-bg.webp" alt="Сотрудничество" fill className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка */}
          <div>
            <p className="inline-block bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-semibold backdrop-blur-sm border border-accent/30">
              Для бизнеса
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold">
              Сотрудничество с <br />
              <span className="text-accent">LINE AUTO</span>
            </h2>
            <p className="mt-4 text-gray-300 leading-relaxed max-w-lg">
              Если вы владелец рент-кар, таксопарка или автопарка — мы предлагаем выгодные условия.
            </p>
            {/* Список преимуществ – скрыт на мобильных */}
            <ul className="hidden md:block mt-6 space-y-3">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-200">
                  <b.icon size={20} className="text-accent" />
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
            {/* Блок гарантии – скрыт на мобильных */}
            <div className="hidden md:block mt-8 p-4 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">Гарантия качества:</span> до 3-х лет на все виды работ.
              </p>
            </div>
          </div>

          {/* Форма */}
          <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold mb-2">Обсудить условия</h3>
            <p className="text-sm text-gray-300 mb-6">Заполните форму, и мы свяжемся с вами</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Ваше имя</label>
                <input type="text" required className="w-full bg-transparent border-b border-white/30 focus:border-accent outline-none pb-2 text-base text-white placeholder-gray-500" placeholder="Алексей" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Номер телефона</label>
                <input type="tel" required className="w-full bg-transparent border-b border-white/30 focus:border-accent outline-none pb-2 text-base text-white placeholder-gray-500" placeholder="+381 60 123 4567" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Комментарий</label>
                <input type="text" className="w-full bg-transparent border-b border-white/30 focus:border-accent outline-none pb-2 text-base text-white placeholder-gray-500" placeholder="Расскажите о вас" />
              </div>
              <div className="flex items-start gap-3 pt-2">
                <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} className="mt-1 w-4 h-4 bg-transparent border-2 border-white/50 rounded accent-accent" />
                <label className="text-xs text-gray-300 leading-relaxed">Я соглашаюсь на обработку данных</label>
              </div>
              <button type="submit" disabled={!isChecked || status === 'loading'} className="w-full py-3 rounded-full border-2 border-white text-white font-medium transition-all hover:bg-white hover:text-secondary disabled:opacity-50">
                {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
              </button>
              {status === 'success' && <p className="text-green-400 text-center text-sm">✅ Заявка отправлена!</p>}
              {status === 'error' && <p className="text-red-400 text-center text-sm">❌ {errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}