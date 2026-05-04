import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sarl-rubio.fr';

  const routes = [
    '',
    '/plomberie',
    '/chauffage',
    '/climatisation',
    '/depannage',
    '/realisations',
    '/equipe',
    '/contact',
    '/mentions-legales',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
