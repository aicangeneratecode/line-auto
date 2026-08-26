'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Clock, Send, X, Image as ImageIcon } from 'lucide-react';
import { COMPANY } from '@/lib/config/company';
import { sendContactForm } from '@/app/actions/contact';

export function Contact() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState(''); // храним английский ответ
  const [isChecked, setIsChecked] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFiles(selected.slice(0, 5)); // ограничим до 5
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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
    files.forEach((file) => formData.append('photos', file));

    const result = await sendContactForm(formData);
    if (result.error) {
      setStatus('error');
      setStatusMessage(result.error);
    } else if (result.success) {
      setStatus('success');
      setStatusMessage(result.success);
      formRef.current?.reset();
      setIsChecked(false);
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => {
        setStatus('idle');
        setStatusMessage('');
      }, 5000);
    }
  };

  return (
    <section id="contact" className="relative text-white overflow-hidden pt-8 md:py-0">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-[5]" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        <div className="flex items-center justify-center p-6 md:p-10 lg:p-14 bg-secondary/95 backdrop-blur-sm">
          <div className="w-full max-w-md">
            <p className="inline-block bg-accent/20 text-accent px-3 py-0.5 rounded-full text-xs font-semibold border border-accent/30">
              {t('badge')}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mt-3">{t('title')}</h2>
            <p className="text-gray-300 text-sm mt-1">{t('subtitle')}</p>

            <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input type="text" name="website" className="hidden" autoComplete="off" />
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">
                  {t('form.nameLabel')}
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-white/30 focus:border-accent outline-none pb-1.5 text-base text-white placeholder-gray-500"
                  placeholder={t('form.namePlaceholder')}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">
                  {t('form.phoneLabel')}
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  className="w-full bg-transparent border-b border-white/30 focus:border-accent outline-none pb-1.5 text-base text-white placeholder-gray-500"
                  placeholder={t('form.phonePlaceholder')}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">
                  {t('form.messageLabel')}
                </label>
                <input
                  name="message"
                  type="text"
                  className="w-full bg-transparent border-b border-white/30 focus:border-accent outline-none pb-1.5 text-base text-white placeholder-gray-500"
                  placeholder={t('form.messagePlaceholder')}
                />
              </div>

              {/* Поле загрузки фото */}
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">
                  Photos (up to 5)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 border border-white/30 rounded-full text-sm hover:bg-white/10 transition"
                  >
                    <ImageIcon size={16} className="inline mr-1" />
                    Choose
                  </button>
                  <span className="text-sm text-gray-400">{files.length} / 5</span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                {files.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {files.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-16 h-16 object-cover rounded border border-white/30"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 hover:bg-red-600 transition"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="mt-0.5 w-4 h-4 bg-transparent border-2 border-white/50 rounded accent-accent"
                />
                <label className="text-xs text-gray-300">{t('form.agreeLabel')}</label>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 rounded-full border-2 border-white text-white font-medium transition-all hover:bg-white hover:text-secondary disabled:opacity-50 text-sm"
              >
                {status === 'loading' ? t('form.sending') : t('form.submit')}
                <Send className="inline ml-1.5" size={14} />
              </button>

              {/* Показываем статусные сообщения (на английском) */}
              {status === 'success' && (
                <p className="text-green-400 text-center text-sm">{statusMessage}</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-center text-sm">{statusMessage}</p>
              )}
            </form>

            <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <Phone size={14} className="text-accent" />
                <a href={`tel:${COMPANY.phoneLink}`}>{COMPANY.phone}</a>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail size={14} className="text-accent" />
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </div>
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

        <div className="relative h-64 lg:h-auto bg-gray-700 min-h-[250px] lg:min-h-[300px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d16.657426347260564!3d44.93063239871438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a6fd7a0434b35%3A0x5213f88bbd74fbbe!2sLINE-AUTO!5e1!3m2!1sru!2srs!4v1787736883753!5m2!1sru!2srs"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="LINE AUTO on map"
          />
        </div>
      </div>
    </section>
  );
}