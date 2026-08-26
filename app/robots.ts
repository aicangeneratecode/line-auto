import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/actions/'],
    },
    sitemap: 'https://lineauto.rs/sitemap.xml',
  };
}