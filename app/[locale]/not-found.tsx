import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');
  const locale = useLocale();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-white bg-black px-4">
      <h1 className="text-6xl md:text-8xl font-bold text-accent">404</h1>
      <h2 className="text-2xl md:text-4xl font-semibold mt-4">{t('title')}</h2>
      <Link
        href={`/${locale}`}
        className="mt-8 inline-block px-6 py-3 border-2 border-accent text-accent rounded-full hover:bg-accent hover:text-black transition duration-300"
      >
        {t('back')}
      </Link>
    </div>
  );
}