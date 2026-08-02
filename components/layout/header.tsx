'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const navItems = [
  { label: 'Процесс', href: '#steps' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'О нас', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contact' },
];

const languages = ['RU', 'SR'];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('RU');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Блокировка прокрутки страницы при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const LanguageSwitcher = () => (
    <div className="flex items-center gap-1 text-sm font-medium">
      {languages.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={cn(
            'px-2 py-1 text-white/60 transition-all relative',
            lang === l && 'text-white'
          )}
        >
          {l}
          {lang === l && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
          )}
        </button>
      ))}
    </div>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-secondary/90 backdrop-blur-sm shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="text-2xl font-bold text-white">
            LINE AUTO
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  isScrolled ? 'text-white/90 hover:text-accent' : 'text-white/90 hover:text-white'
                )}
              >
                {item.label}
              </a>
            ))}
            <LanguageSwitcher />
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
          >
            {isMenuOpen ? (
              <X className="text-white" size={24} />
            ) : (
              <Menu className="text-white" size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Мобильное меню – теперь всегда на весь экран */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[100] md:hidden"
          style={{
            backgroundColor: '#000',
            transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            height: '100dvh', // динамическая высота для мобильных
          }}
        >
          <div className="flex flex-col min-h-full px-6 py-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <Link href="/" className="text-xl font-bold text-white">
                LINE AUTO
              </Link>
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <button
                  onClick={closeMenu}
                  aria-label="Закрыть меню"
                  className="text-white hover:text-accent transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <nav className="flex-1 flex flex-col justify-center gap-0 py-6">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="border-b border-white/10 last:border-0"
                >
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="block py-5 text-2xl font-bold text-white hover:text-accent transition-colors"
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}