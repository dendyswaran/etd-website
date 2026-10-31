import { afterAll, beforeAll, expect, test } from 'bun:test';
import { parseHTML } from 'linkedom';
import { runInNewContext } from 'node:vm';

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

test('local development does not load Google Analytics', () => {
  expect(document.querySelector('script[data-google-analytics]')).toBeNull();
  expect(
    document.querySelector('script[src*="googletagmanager.com"]'),
  ).toBeNull();
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

// Exercise the real early script: a failed bundle must never leave content covered.
function runIntroBootstrap(
  options: {
    reduced?: boolean;
    seen?: boolean;
    hash?: string;
    search?: string;
    blockedStorage?: boolean;
    navigationType?: 'navigate' | 'reload' | 'back_forward';
  } = {},
) {
  const page = parseHTML(document.documentElement.outerHTML);
  const timers: Array<() => void> = [];
  const cleared: number[] = [];
  const listeners = new Map<string, () => void>();
  runInNewContext(
    page.document.querySelector('script[data-intro-bootstrap]')!.textContent!,
    {
      document: page.document,
      matchMedia: () => ({ matches: options.reduced ?? false }),
      location: { hash: options.hash ?? '', search: options.search ?? '' },
      sessionStorage: {
        getItem: () => {
          if (options.blockedStorage) throw new Error('Storage blocked');
          return options.seen ? '1' : null;
        },
      },
      performance: {
        getEntriesByType: () => [
          { type: options.navigationType ?? 'navigate' },
        ],
      },
      URLSearchParams,
      Event: page.Event,
      setTimeout: (callback: () => void) => {
        timers.push(callback);
        return timers.length;
      },
      clearTimeout: (id: number) => cleared.push(id),
      window: {
        addEventListener: (name: string, callback: () => void) =>
          listeners.set(name, callback),
      },
    },
  );
  return {
    document: page.document,
    Event: page.Event,
    timers,
    cleared,
    listeners,
  };
}

test('the opening plays on a first visit and stays optional for returning, reduced-motion and deep-link visitors', () => {
  for (const options of [
    {},
    { seen: true, search: '?intro=1' },
    { blockedStorage: true },
  ]) {
    const page = runIntroBootstrap(options);
    expect(page.document.documentElement.dataset.intro).toBe('pending');
    expect(page.document.getElementById('opening-intro')!.hidden).toBe(false);
  }
  for (const options of [
    { seen: true },
    { reduced: true, search: '?intro=1' },
    { hash: '#contact' },
  ]) {
    const page = runIntroBootstrap(options);
    expect(page.document.documentElement.dataset.intro).toBeUndefined();
    expect(page.document.getElementById('opening-intro')!.hidden).toBe(true);
  }
});

test('the opening releases content if its animation bundle fails or the page is restored from history', () => {
  for (const mode of ['timeout', 'pagehide']) {
    const page = runIntroBootstrap();
    const main = page.document.querySelector('main')!;
    main.inert = true;
    if (mode === 'timeout') page.timers[0]();
    else page.listeners.get('pagehide')!();
    expect(page.document.documentElement.dataset.intro).toBeUndefined();
    expect(page.document.getElementById('opening-intro')!.hidden).toBe(true);
    expect(main.inert).toBe(false);
  }
  const page = runIntroBootstrap();
  page.document.dispatchEvent(new page.Event('etd:intro-complete'));
  expect(page.cleared).toEqual([1]);
});

test('refresh replays the opening even after a previous visit or at a fragment URL', () => {
  for (const hash of ['', '#contact']) {
    const page = runIntroBootstrap({
      seen: true,
      navigationType: 'reload',
      hash,
    });
    expect(page.document.documentElement.dataset.intro).toBe('pending');
    expect(page.document.getElementById('opening-intro')!.hidden).toBe(false);
  }
  const reduced = runIntroBootstrap({
    seen: true,
    navigationType: 'reload',
    reduced: true,
  });
  expect(reduced.document.getElementById('opening-intro')!.hidden).toBe(true);
});
