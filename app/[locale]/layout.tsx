import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { COMPANY } from '@/lib/config/company';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params; // без await
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return {
    title: {
      default: messages.metadata.title,
      template: '%s | LINE AUTO',
    },
    description: messages.metadata.description,
    keywords: messages.metadata.keywords,
    metadataBase: new URL('https://lineauto.rs'),
    alternates: {
      canonical: `https://lineauto.rs/${locale}`,
      languages: {
        'x-default': 'https://lineauto.rs/ru',
        ru: 'https://lineauto.rs/ru',
        sr: 'https://lineauto.rs/sr',
      },
    },
    openGraph: {
      title: messages.metadata.ogTitle,
      description: messages.metadata.ogDescription,
      url: `https://lineauto.rs/${locale}`,
      siteName: 'LINE AUTO',
      locale: locale === 'ru' ? 'ru_RU' : 'sr_RS',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: messages.metadata.ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.metadata.twitterTitle,
      description: messages.metadata.twitterDescription,
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params; // без await
  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
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
                openingHoursSpecification: [
                  {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    opens: '09:00',
                    closes: '18:00',
                  },
                ],
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: '44.930632',
                  longitude: '16.657426',
                },
                url: `https://lineauto.rs/${locale}`,
                priceRange: '$$',
                image: 'https://lineauto.rs/og-image.jpg',
              }),
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}