import { afterAll, beforeAll, expect, test } from 'bun:test';
import { parseHTML } from 'linkedom';

// Catch broken public routes, lost company context, and misdirected contact links.
let server: ReturnType<typeof Bun.spawn>;
let document: Document;
let status: number;
const port = 43000 + Math.floor(Math.random() * 1000);

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
    {
      stdout: 'ignore',
      stderr: 'ignore',
    },
  );
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`);
      status = response.status;
      document = parseHTML(await response.text()).document;
      return;
    } catch {
      await Bun.sleep(100);
    }
  }
  throw new Error(`Astro did not start on port ${port}`);
}, 20000);

afterAll(async () => {
  server?.kill();
  await server?.exited;
});

test('the public homepage introduces the software house and its experience', () => {
  expect(status).toBe(200);
  expect(document.querySelectorAll('h1').length).toBe(1);
  expect(document.querySelector('main')?.textContent).toContain(
    'East Town Digital',
  );
  expect(document.querySelector('main')?.textContent).toMatch(
    /software house/i,
  );
  expect(document.querySelector('main')?.textContent).toMatch(/15\+/);
});

test('every WhatsApp contact action points to the requested conversation', () => {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('a')].filter(
    (link) =>
      /contact us/i.test(link.textContent ?? '') || link.href.includes('wa.me'),
  );
  expect(links.length).toBeGreaterThanOrEqual(2);
  for (const link of links) {
    expect(link.getAttribute('href')).toBe('https://wa.me/62817131366');
    expect(link.getAttribute('rel')).toContain('noopener');
  }
});

test('essential navigation and company metadata exist without JavaScript', () => {
  const skipLink = document.querySelector<HTMLAnchorElement>('a[href="#main"]');
  expect(skipLink).not.toBeNull();
  expect(document.getElementById('main')).not.toBeNull();
  expect(document.title).toContain('East Town Digital');
  expect(
    document.querySelector('meta[name="description"]')?.getAttribute('content'),
  ).toContain('15+');
  for (const anchor of document.querySelectorAll<HTMLAnchorElement>(
    'a[href^="#"]',
  )) {
    expect(
      document.getElementById(anchor.getAttribute('href')!.slice(1)),
    ).not.toBeNull();
  }
});
