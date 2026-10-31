import { afterAll, beforeAll, expect, test } from 'bun:test';
import { parseHTML } from 'linkedom';

let server: ReturnType<typeof Bun.spawn>;
let document: Document;
const port = 44000 + Math.floor(Math.random() * 1000);
const origin = `http://127.0.0.1:${port}`;

beforeAll(async () => {
  server = Bun.spawn(
    [
      'node',
      'node_modules/astro/bin/astro.mjs',
      'dev',
      '--ignore-lock',
      '--host',
      '127.0.0.1',
      '--port',
      String(port),
    ],
    { stdout: 'ignore', stderr: 'ignore' },
  );
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      const response = await fetch(origin);
      if (!response.ok) throw new Error(`Homepage returned ${response.status}`);
      document = parseHTML(await response.text()).document;
      return;
    } catch {
      await Bun.sleep(100);
    }
  }
  throw new Error('SEO test server did not start');
}, 20000);

afterAll(async () => {
  server?.kill();
  await server?.exited;
});

// Catch staging URLs or mismatched languages reaching search engines and shared links.
test('homepage consistently identifies its Indonesian content and canonical production URL', () => {
  expect(document.documentElement.lang).toBe('id');
  expect(document.title).toMatch(/software house.*Indonesia/i);
  expect(document.querySelector('h1')?.textContent).toMatch(/software house/i);
  expect(document.querySelector('main')?.textContent).toContain('Indonesia');
  expect(
    document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
  ).toBe('https://www.easttowndigital.com/');
  expect(
    document.querySelector('meta[property="og:url"]')?.getAttribute('content'),
  ).toBe('https://www.easttowndigital.com/');
  expect(
    document
      .querySelector('meta[property="og:locale"]')
      ?.getAttribute('content'),
  ).toBe('id_ID');
  expect(
    document.querySelector('meta[name="robots"]')?.getAttribute('content'),
  ).not.toContain('noindex');
});

test('organization data exposes verified company contact details without invented local credentials', () => {
  const script = document.querySelector('script[type="application/ld+json"]');
  expect(script).not.toBeNull();
  const graph = JSON.parse(script!.textContent!)['@graph'];
  const organization = graph.find(
    (item: Record<string, unknown>) => item['@type'] === 'Organization',
  );
  expect(organization.name).toBe('East Town Digital');
  expect(organization.url).toBe('https://www.easttowndigital.com/');
  expect(organization.contactPoint.telephone).toBe('+62817131366');
  expect(organization.contactPoint.areaServed.name).toBe('Indonesia');
  expect(organization.address).toBeUndefined();
  expect(organization.aggregateRating).toBeUndefined();
});

test('crawler endpoints lead to a reachable sitemap of canonical URLs', async () => {
  const robots = await fetch(`${origin}/robots.txt`);
  expect(robots.status).toBe(200);
  const text = await robots.text();
  expect(text).toContain(
    'Sitemap: https://www.easttowndigital.com/sitemap.xml',
  );
  expect(text).not.toMatch(/Disallow:\s*\/$/m);
  const sitemap = await fetch(`${origin}/sitemap.xml`);
  expect(sitemap.status).toBe(200);
  expect(sitemap.headers.get('content-type')).toContain('xml');
  const xml = parseHTML(await sitemap.text()).document;
  expect(
    [...xml.querySelectorAll('loc')].map((entry) => entry.textContent),
  ).toEqual(['https://www.easttowndigital.com/']);
});

test('social previews have a reachable image with the advertised dimensions', async () => {
  const image = document
    .querySelector('meta[property="og:image"]')
    ?.getAttribute('content');
  expect(image).toBe('https://www.easttowndigital.com/og-image.png');
  expect(
    document
      .querySelector('meta[name="twitter:card"]')
      ?.getAttribute('content'),
  ).toBe('summary_large_image');
  const response = await fetch(`${origin}${new URL(image!).pathname}`);
  expect(response.status).toBe(200);
  expect(response.headers.get('content-type')).toContain('image/png');
  const bytes = new DataView(await response.arrayBuffer());
  expect(bytes.getUint32(16)).toBe(1200);
  expect(bytes.getUint32(20)).toBe(630);
});
