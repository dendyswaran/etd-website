import type { APIRoute } from 'astro';
import { pages } from '../data/pages';

// Use the same route inventory as static page generation.
export const GET: APIRoute = ({ site }) => {
  const locations = ['/', ...pages.map((page) => `/${page.slug}/`)];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locations.map((path) => `<url><loc>${new URL(path, site).href}</loc></url>`).join('')}</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
