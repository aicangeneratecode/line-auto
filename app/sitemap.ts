import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lineauto.rs';
  const currentDate = new Date().toISOString().split('T')[0];

  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 1.0,
    // Важно: для многоязычных сайтов указываем альтернативные версии в sitemap
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}`])
      ),
    },
  }));
}