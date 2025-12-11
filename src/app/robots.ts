import type { MetadataRoute } from 'next';
import { siteMetadata } from '@/lib/siteMetadata';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteMetadata.siteUrl.replace(/\/$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`],
    host: baseUrl,
  };
}
