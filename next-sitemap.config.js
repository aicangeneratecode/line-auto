/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://lineauto.rs',
    generateRobotsTxt: true, // автоматически создаёт robots.txt
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' },
        // при необходимости запретить админку или другие служебные пути
      ],
      additionalSitemaps: [
        // если есть другие sitemap (например, для изображений)
      ],
    },
    exclude: ['/admin/*'], // если есть
    generateIndexSitemap: false, // если страниц мало, можно false
    changefreq: 'weekly',
    priority: 0.7,
  };