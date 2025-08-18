import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://votre-domaine.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/',
        '/auth/',
        '/api/',
        '/_next/',
        '/admin/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

