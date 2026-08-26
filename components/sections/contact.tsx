'use client';

import { useState, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { COMPANY } from '@/lib/config/company';
import { sendContactForm } from '@/app/actions/contact';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isChecked) {
      setErrorMessage('Подтвердите согласие');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMessage('');
    const formData = new FormData(e.currentTarget);
    const result = await sendContactForm(formData);
    if (result.error) {
      setStatus('error');
      setErrorMessage(result.error);
    } else {
      setStatus('success');
      formRef.current?.reset();
      setIsChecked(false);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="relative text-white overflow-hidden pt-8 md:py-0">
      {/* Тонкая светлая линия сверху */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-[5]" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        {/* Форма – левая половина */}
        <div className="flex items-center justify-center p-6 md:p-10 lg:p-14 bg-secondary/95 backdrop-blur-sm">
          <div className="w-full max-w-md">
            <p className="inline-block bg-accent/20 text-accent px-3 py-0.5 rounded-full text-xs font-semibold border border-accent/30">
              Записаться
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mt-3">Свяжитесь с нами</h2>
            <p className="text-gray-300 text-sm mt-1">Оставьте заявку, и мы перезвоним в течение 15 минут</p>

            <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input type="text" name="website" className="hidden" autoComplete="off" />
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">Ваше имя *</label>
                <input name="name" type="text" required className="w-full bg-transparent border-b border-white/30 focus:border-accent outline-none pb-1.5 text-base text-white placeholder-gray-500" placeholder="Иван" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">Телефон *</label>
                <input name="phone" type="tel" required className="w-full bg-transparent border-b border-white/30 focus:border-accent outline-none pb-1.5 text-base text-white placeholder-gray-500" placeholder="+381 60 123 4567" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">Сообщение</label>
                <input name="message" type="text" className="w-full bg-transparent border-b border-white/30 focus:border-accent outline-none pb-1.5 text-base text-white placeholder-gray-500" placeholder="Опишите задачу" />
              </div>
              <div className="flex items-start gap-3 pt-1">
                <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} className="mt-0.5 w-4 h-4 bg-transparent border-2 border-white/50 rounded accent-accent" />
                <label className="text-xs text-gray-300">Я соглашаюсь на обработку данных</label>
              </div>
              <button type="submit" disabled={status === 'loading'} className="w-full py-3 rounded-full border-2 border-white text-white font-medium transition-all hover:bg-white hover:text-secondary disabled:opacity-50 text-sm">
                {status === 'loading' ? 'Отправка...' : 'Отправить заявку'} <Send className="inline ml-1.5" size={14} />
              </button>
              {status === 'success' && <p className="text-green-400 text-center text-sm">✅ Заявка отправлена!</p>}
              {status === 'error' && <p className="text-red-400 text-center text-sm">❌ {errorMessage}</p>}
            </form>

            {/* Контакты под формой */}
            <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <Phone size={14} className="text-accent" />
                <a href={`tel:${COMPANY.phoneLink}`}>{COMPANY.phone}</a>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail size={14} className="text-accent" />
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </div>
              {/* ИСПРАВЛЕННЫЙ БЛОК С АДРЕСОМ – теперь ссылка оборачивает и иконку, и текст */}
              <div className="flex items-start gap-1.5 col-span-2">
                <a
                  href={COMPANY.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-1.5 hover:text-accent transition-colors underline decoration-white/20"
                >
                  <MapPin size={14} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="leading-tight">{COMPANY.address}</span>
                </a>
              </div>
              <div className="flex items-center gap-1.5 col-span-2">
                <Clock size={14} className="text-accent" />
                <span>{COMPANY.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Карта – правая половина */}
        <div className="relative h-64 lg:h-auto bg-gray-700 min-h-[250px] lg:min-h-[300px]">
          <iframe
            src={COMPANY.googleMaps}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="LINE AUTO на карте"
          />
        </div>
      </div>
    </section>
  );
}