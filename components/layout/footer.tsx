import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { COMPANY } from '@/lib/config/company';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  // Используем t('nav.process') и т.д. – теперь ключи есть в JSON
  const navLinks = [
    { label: t('nav.process'), href: '#steps' },
    { label: t('nav.gallery'), href: '#gallery' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.faq'), href: '#faq' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <footer className="relative z-20 bg-black text-white py-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary">{COMPANY.name}</h3>
            <p className="mt-2 text-sm text-gray-300 leading-relaxed">
              {t('description')}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">{t('contactsTitle')}</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2 py-1">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <a href={`tel:${COMPANY.phoneLink}`} className="hover:text-white transition">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 py-1">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition">
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-center gap-2 py-1">
                <MapPin size={16} className="text-primary flex-shrink-0" />
                <span>{COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-2 py-1">
                <Clock size={16} className="text-primary flex-shrink-0" />
                <span>{COMPANY.workingHours}</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">{t('navTitle')}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-primary transition block py-1">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">{t('socialTitle')}</h4>
            <div className="flex gap-4">
              <a
                href={COMPANY.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-2 bg-white/10 rounded-full hover:bg-primary/20 transition"
                aria-label="Instagram"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href={COMPANY.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-2 bg-white/10 rounded-full hover:bg-primary/20 transition"
                aria-label="Telegram"
              >
                <Send size={20} />
              </a>
              <a
                href={COMPANY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-2 bg-white/10 rounded-full hover:bg-primary/20 transition"
                aria-label="WhatsApp"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-white/10 text-center text-sm text-gray-400">
          {t('copyright', { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}