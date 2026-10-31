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
test('homepage consistently identifies its default English content and canonical production URL', () => {
  expect(document.documentElement.lang).toBe('en');
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
  ).toBe('en_US');
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
  for (const item of graph.filter((item: Record<string, unknown>) =>
    ['WebSite', 'WebPage'].includes(String(item['@type'])),
  )) {
    expect(item.inLanguage).toBe('en');
  }
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
  ).toContain('https://www.easttowndigital.com/');
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

const newPaths = [
  '/solusi-ai/',
  '/studi-kasus/ai-quality-assurance/',
  '/jasa-pembuatan-website/',
  '/software-custom/',
  '/aplikasi-mobile/',
  '/integrasi-sistem/',
  '/studi-kasus/pos-reservasi-salon/',
  '/studi-kasus/sistem-antrean/',
  '/studi-kasus/monitoring-keuangan-proyek/',
  '/artikel/biaya-software-custom/',
  '/artikel/kapan-beralih-dari-excel/',
];
test('service, case-study and article pages are discoverable, unique and usable without JavaScript', async () => {
  const titles = new Set<string>();
  for (const path of newPaths) {
    const response = await fetch(origin + path);
    expect(response.status).toBe(200);
    const page = parseHTML(await response.text()).document;
    expect(page.documentElement.lang).toBe('en');
    expect(
      page.querySelector('meta[property="og:locale"]')?.getAttribute('content'),
    ).toBe('en_US');
    const graph = JSON.parse(
      page.querySelector('script[type="application/ld+json"]')!.textContent!,
    )['@graph'];
    expect(
      graph.find((item: Record<string, unknown>) => item['@type'] === 'WebPage')
        .inLanguage,
    ).toBe('en');
    expect(page.querySelectorAll('h1').length).toBe(1);
    expect(
      page.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    ).toBe('https://www.easttowndigital.com' + path);
    expect(
      page.querySelector('a[href="https://wa.me/62817131366"]'),
    ).not.toBeNull();
    expect(page.querySelector('main')!.textContent!.length).toBeGreaterThan(
      1200,
    );
    titles.add(page.title);
  }
  expect(titles.size).toBe(newPaths.length);
  const map = parseHTML(
    await (await fetch(origin + '/sitemap.xml')).text(),
  ).document;
  const locations = [...map.querySelectorAll('loc')].map((n) => n.textContent);
  for (const path of newPaths)
    expect(locations).toContain('https://www.easttowndigital.com' + path);
});

test('article illustrations are distinct, accessible, responsive and served as optimized images', async () => {
  const sources = new Set<string>();
  for (const path of [
    '/artikel/biaya-software-custom/',
    '/artikel/kapan-beralih-dari-excel/',
  ]) {
    const page = parseHTML(await (await fetch(origin + path)).text()).document;
    const image = page.querySelector('figure img');
    expect(image).not.toBeNull();
    expect(image!.getAttribute('alt')!.length).toBeGreaterThan(40);
    expect(image!.getAttribute('width')).toBe('1536');
    expect(image!.getAttribute('height')).toBe('1024');
    expect(image!.getAttribute('srcset')).toContain('480w');
    expect(image!.getAttribute('srcset')).toContain('1536w');
    expect(image!.getAttribute('sizes')).toContain('100vw');
    expect(page.querySelector('figcaption')?.textContent).toContain(
      'Illustration',
    );
    const source = image!.getAttribute('src')!;
    sources.add(source);
    const response = await fetch(new URL(source, origin));
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('image/webp');
  }
  expect(sources.size).toBe(2);
  const service = parseHTML(
    await (await fetch(origin + '/software-custom/')).text(),
  ).document;
  expect(service.querySelector('figure')).toBeNull();
});

test('AI capabilities are discoverable from the homepage and linked to detailed services and experience', () => {
  expect(document.querySelector('h1')?.textContent).toMatch(/AI/);
  expect(
    document.querySelector('meta[name="description"]')?.getAttribute('content'),
  ).toMatch(/AI/);
  const navigation = document.querySelector('nav a[href="#ai"]');
  expect(navigation).not.toBeNull();
  const section = document.querySelector(navigation!.getAttribute('href')!);
  expect(section).not.toBeNull();
  expect(section!.querySelector('a[href="/solusi-ai/"]')).not.toBeNull();
  expect(
    section!.querySelector('a[href="/studi-kasus/ai-quality-assurance/"]'),
  ).not.toBeNull();
});

// The integration explanation and local technology assets must work without scripts or CDNs.
test('the integration page exposes an accessible architecture diagram and self-hosted technology logos', async () => {
  const page = parseHTML(
    await (await fetch(origin + '/integrasi-sistem/')).text(),
  ).document;
  const diagram = page.querySelector('figure.integration-architecture');
  expect(diagram).not.toBeNull();
  expect(diagram!.querySelector('figcaption')?.textContent).toMatch(
    /example|illustrative/i,
  );
  for (const id of diagram!.getAttribute('aria-labelledby')!.split(' ')) {
    expect(page.getElementById(id)?.textContent?.trim().length).toBeGreaterThan(
      0,
    );
  }
  const technologies = page.querySelector(
    '[aria-labelledby="integration-technologies-heading"]',
  );
  expect(technologies).not.toBeNull();
  for (const name of ['Node.js', 'Java'])
    expect(technologies!.textContent).toContain(name);
  const logos = technologies!.querySelectorAll('img');
  expect(logos.length).toBeGreaterThanOrEqual(2);
  for (const logo of logos) {
    expect(logo.getAttribute('src')).toMatch(/^\/technology\//);
    expect(logo.hasAttribute('alt')).toBe(true);
    expect(Number(logo.getAttribute('width'))).toBeGreaterThan(0);
    expect(Number(logo.getAttribute('height'))).toBeGreaterThan(0);
    const response = await fetch(origin + logo.getAttribute('src'));
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('image/svg+xml');
  }
});

test('the AI service page explains the audio QA workflow and distinguishes development tools from runtime services', async () => {
  const page = parseHTML(
    await (await fetch(origin + '/solusi-ai/')).text(),
  ).document;
  const workflow = page.querySelector('figure.ai-workflow');
  expect(workflow).not.toBeNull();
  expect(workflow!.querySelectorAll('.ai-pipeline > li').length).toBe(4);
  expect(workflow!.textContent).toContain('ElevenLabs');
  expect(workflow!.textContent).toContain('Sonnet 5.5');
  expect(workflow!.textContent).toMatch(/human review/i);
  expect(workflow!.querySelector('.ai-development')?.textContent).toContain(
    'Codex',
  );
  const stack = page.querySelector(
    '[aria-labelledby="ai-technologies-heading"]',
  );
  expect(stack).not.toBeNull();
  for (const name of [
    'Bun',
    'Vite',
    'React',
    'TypeScript',
    'Docker',
    'PostgreSQL',
    'Redis',
    'Python',
  ]) {
    expect(stack!.textContent).toContain(name);
  }
  for (const image of page.querySelectorAll('.ai-visual img')) {
    const response = await fetch(origin + image.getAttribute('src'));
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('image/svg+xml');
  }
  expect(page.querySelector('#opening-intro')).not.toBeNull();
});
