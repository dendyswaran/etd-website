import type { APIRoute } from 'astro';

// This release has one canonical page. Add real, published routes as the site grows.
export const GET: APIRoute = ({ site }) => {
  const homepage = new URL('/', site);
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${homepage.href}</loc></url></urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
