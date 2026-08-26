import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { COMPANY } from '@/lib/config/company';


const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'LINE AUTO - Кузовной ремонт и покраска авто в Белграде',
    template: '%s | LINE AUTO',
  },
  description:
    'Профессиональный кузовной ремонт, покраска автомобилей, рихтовка и полировка в Белграде. Работаем с любыми марками. Гарантия качества.',
  keywords:[
    'покраска авто Белград, кузовной ремонт Белград, автосервис Белград, рихтовка, полировка, удаление царапин',
    'покраска автомобилей Белград',
    'подбор цвета',
    'ремонт кузова',
    'auto limar Beograd',
    'karoserijski servis Beograd',],
  metadataBase: new URL('https://lineauto.rs'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LINE AUTO – Кузовной ремонт и покраска авто в Белграде',
    description: 'Профессиональный кузовной ремонт, покраска, рихтовка. Гарантия, современное оборудование.',
    url: 'https://lineauto.rs',
    siteName: 'LINE AUTO',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LINE AUTO – кузовной ремонт Белград',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LINE AUTO – Кузовной ремонт и покраска авто в Белграде',
    description: 'Профессиональный кузовной ремонт и покраска автомобилей в Белграде. Запишитесь сейчас!',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AutoBodyShop',
              name: COMPANY.name,
              telephone: COMPANY.phone,
              email: COMPANY.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: COMPANY.address,
                addressLocality: 'Belgrade',
                addressCountry: 'RS',
              },
              openingHours: COMPANY.workingHours,
              url: 'https://lineauto.rs',
              priceRange: '$$',
              image: 'https://lineauto.rs/og-image.jpg',
            }),
          }}
        />
        
      </body>
    </html>
  );
}