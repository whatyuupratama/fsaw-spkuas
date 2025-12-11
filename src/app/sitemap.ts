import type { MetadataRoute } from 'next';
import { siteMetadata } from '@/lib/siteMetadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteMetadata.siteUrl.replace(/\/$/, '');
  const routes = ['/', '/fsaw-detection'];

  return routes.map((route) => ({
    url: `${baseUrl}${route === '/' ? '' : route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'daily',
    priority: route === '/' ? 1 : 0.8,
  }));
}
