'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { COMPANY } from '@/lib/config/company';

const navItems = [
  { label: 'Процесс', href: '#steps' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'О нас', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Блокировка прокрутки при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isMenuOpen]);

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

            <a
              href={`tel:${COMPANY.phoneLink}`}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm',
                isScrolled
                  ? 'bg-accent text-secondary hover:bg-accent/90'
                  : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/30'
              )}
            >
              <Phone size={16} />
              {COMPANY.phone}
            </a>
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

      {/* Мобильное меню – полноэкранное, с непрозрачным фоном и overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="md:hidden fixed inset-0 top-16 z-40 flex flex-col items-center justify-center gap-6 p-6 bg-secondary overflow-y-auto">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-medium text-white hover:text-accent transition-colors"
              >
                {item.label}
              </a>
            ))}

            <a
              href={`tel:${COMPANY.phoneLink}`}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 bg-accent text-secondary px-8 py-4 rounded-full text-xl font-semibold mt-4"
            >
              <Phone size={22} />
              {COMPANY.phone}
            </a>
          </div>
        </>
      )}
    </header>
  );
}