import { COMPANY } from '@/lib/config/company';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-20 bg-black text-white py-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary">{COMPANY.name}</h3>
            <p className="mt-2 text-sm text-gray-300 leading-relaxed">
              Профессиональный кузовной ремонт и покраска автомобилей в Белграде.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Контакты</h4>
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
            <h4 className="font-semibold mb-4 text-white">Навигация</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#steps" className="hover:text-primary transition block py-1">Процесс</a></li>
              <li><a href="#gallery" className="hover:text-primary transition block py-1">Галерея</a></li>
              <li><a href="#about" className="hover:text-primary transition block py-1">О нас</a></li>
              <li><a href="#faq" className="hover:text-primary transition block py-1">FAQ</a></li>
              <li><a href="#contact" className="hover:text-primary transition block py-1">Контакты</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Мы в соцсетях</h4>
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
          © {new Date().getFullYear()} LINE AUTO. Все права защищены.
        </div>
      </div>
    </footer>
  );
}