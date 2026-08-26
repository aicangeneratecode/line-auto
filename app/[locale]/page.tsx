// app/[locale]/page.tsx
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Steps } from '@/components/sections/steps';
import { FAQ } from '@/components/sections/faq';
import { Gallery } from '@/components/sections/gallery';
import { Videos } from '@/components/sections/videos';
import { Contact } from '@/components/sections/contact';
import { Partners } from '@/components/sections/partners';
import { BackgroundController } from '@/components/background-controller';
import { locales } from '@/i18n/config';

// Генерация всех языковых версий при сборке
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Home() {
  return (
    <BackgroundController>
      <Hero />
      <About />
      <Steps />
      <FAQ />
      <Gallery />
      <Videos />
      <Contact />
      <Partners />
    </BackgroundController>
  );
}