import { beforeAll, expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import { parseHTML } from 'linkedom';

let document: Document;

beforeAll(async () => {
  const build = Bun.spawn(
    ['node', 'node_modules/astro/bin/astro.mjs', 'build'],
    {
      env: { ...process.env, NODE_ENV: 'production' },
      stdout: 'ignore',
      stderr: 'inherit',
    },
  );
  if ((await build.exited) !== 0) throw new Error('Production build failed');
  document = parseHTML(await readFile('dist/index.html', 'utf8')).document;
}, 20000);

// Catch missing production tracking, a wrong destination, or duplicate page-view setup.
test('production loads Google Analytics asynchronously and configures the requested property once', () => {
  const loaders = document.querySelectorAll(
    'script[src^="https://www.googletagmanager.com/gtag/js"]',
  );
  expect(loaders.length).toBe(1);
  expect(loaders[0].getAttribute('src')).toBe(
    'https://www.googletagmanager.com/gtag/js?id=G-C4DHWJTYQL',
  );
  expect(loaders[0].hasAttribute('async')).toBe(true);

  const initialization = document.querySelector(
    'script[data-google-analytics]',
  );
  expect(initialization).not.toBeNull();
  const browser = { dataLayer: [] as IArguments[] };
  runInNewContext(initialization!.textContent!, { window: browser, document });
  const commands = browser.dataLayer.map((command) => Array.from(command));
  expect(commands.map((command) => command[0])).toEqual(['js', 'config']);
  expect(commands[1]).toEqual(['config', 'G-C4DHWJTYQL']);
});

test('WhatsApp clicks queue a contact event without blocking the link or tracking internal navigation', () => {
  const page = parseHTML(document.documentElement.outerHTML);
  const browser = { dataLayer: [] as IArguments[] };
  const script = page.document.querySelector('script[data-google-analytics]')!;
  runInNewContext(script.textContent!, {
    window: browser,
    document: page.document,
  });
  const internal = page.document.querySelector('a[href="#main"]')!;
  internal.dispatchEvent(
    new page.Event('click', { bubbles: true, cancelable: true }),
  );
  expect(browser.dataLayer.length).toBe(2);
  const links = page.document.querySelectorAll(
    'a[href="https://wa.me/62817131366"]',
  );
  for (const link of links) {
    const click = new page.Event('click', { bubbles: true, cancelable: true });
    // Clicking the nested arrow must count once, just like clicking its parent link.
    (link.querySelector('span') ?? link).dispatchEvent(click);
    expect(click.defaultPrevented).toBe(false);
  }
  const events = browser.dataLayer
    .slice(2)
    .map((command) => Array.from(command));
  expect(events).toHaveLength(4);
  expect(events.map((command) => command.slice(0, 2))).toEqual(
    Array(4).fill(['event', 'contact_whatsapp']),
  );
  expect(events.map((command) => command[2])).toEqual([
    { link_location: 'header' },
    { link_location: 'hero' },
    { link_location: 'contact' },
    { link_location: 'phone' },
  ]);
});
