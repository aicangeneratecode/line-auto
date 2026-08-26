'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Shield, Clock, Users } from 'lucide-react';
import Image from 'next/image';
import { sendPartnerForm } from '@/app/actions/partner';

const iconMap = {
  Shield: Shield,
  Clock: Clock,
  Users: Users,
};

export function Partners() {
  const t = useTranslations('partners');
  const benefits = t.raw('benefits') as Array<{ icon: keyof typeof iconMap; text: string }>;

  const [isChecked, setIsChecked] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isChecked) {
      setStatusMessage('Please confirm your consent.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setStatusMessage('');

    const formData = new FormData(e.currentTarget);
    const result = await sendPartnerForm(formData);

    if (result.error) {
      setStatus('error');
      setStatusMessage(result.error);
    } else if (result.success) {
      setStatus('success');
      setStatusMessage(result.success);
      formRef.current?.reset();
      setIsChecked(false);
      setTimeout(() => {
        setStatus('idle');
        setStatusMessage('');
      }, 5000);
    }
  };

  return (
    <section
      id="partners"
      data-section="partners"
      className="relative py-16 md:py-24 lg:py-32 text-white overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <Image src="/images/partner-bg.webp" alt="Сотрудничество" fill className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-block bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-semibold backdrop-blur-sm border border-accent/30">
              {t('badge')}
            </p>
            <h2
              className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold"
              dangerouslySetInnerHTML={{ __html: t.raw('title') }}
            />
            <p className="mt-4 text-gray-300 leading-relaxed max-w-lg">{t('description')}</p>

            <ul className="hidden md:block mt-6 space-y-3">
              {benefits.map((b, i) => {
                const Icon = iconMap[b.icon] || Shield;
                return (
                  <li key={i} className="flex items-center gap-3 text-gray-200">
                    <Icon size={20} className="text-accent" />
                    <span>{b.text}</span>
                  </li>
                );
              })}
            </ul>

            <div className="hidden md:block mt-8 p-4 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">Quality guarantee:</span> {t('guarantee')}
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold mb-2">{t('form.title')}</h3>
            <p className="text-sm text-gray-300 mb-6">{t('form.subtitle')}</p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <input type="text" name="website" className="hidden" autoComplete="off" />
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                  {t('form.nameLabel')}
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-white/30 focus:border-accent outline-none pb-2 text-base text-white placeholder-gray-500"
                  placeholder={t('form.namePlaceholder')}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                  {t('form.phoneLabel')}
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  className="w-full bg-transparent border-b border-white/30 focus:border-accent outline-none pb-2 text-base text-white placeholder-gray-500"
                  placeholder={t('form.phonePlaceholder')}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                  {t('form.commentLabel')}
                </label>
                <input
                  name="comment"
                  type="text"
                  className="w-full bg-transparent border-b border-white/30 focus:border-accent outline-none pb-2 text-base text-white placeholder-gray-500"
                  placeholder={t('form.commentPlaceholder')}
                />
              </div>
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="mt-1 w-4 h-4 bg-transparent border-2 border-white/50 rounded accent-accent"
                />
                <label className="text-xs text-gray-300 leading-relaxed">{t('form.agreeLabel')}</label>
              </div>
              <button
                type="submit"
                disabled={!isChecked || status === 'loading'}
                className="w-full py-3 rounded-full border-2 border-white text-white font-medium transition-all hover:bg-white hover:text-secondary disabled:opacity-50"
              >
                {status === 'loading' ? t('form.sending') : t('form.submit')}
              </button>

              {status === 'success' && (
                <p className="text-green-400 text-center text-sm">{statusMessage}</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-center text-sm">{statusMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}