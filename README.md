# East Town Digital

An English-first, bilingual English/Indonesian website for East Town Digital, an independent software house with 15+ years of IT experience. Inspired by the warm, typographic composition and animated line field at [abliteration.ai](https://abliteration.ai), with original branding, copy, and artwork.

[Live website](https://www.easttowndigital.com) · [Public GitHub repository](https://github.com/dendyswaran/etd-website)

## Stack

- Astro 7.4.4, statically rendered
- Bun 1.4.4 for dependencies, scripts, and tests
- GSAP 3.15 for entrance, scroll, and line-field animations
- Carbon styles and self-hosted IBM Plex fonts
- TypeScript 6 (compatible with `astro check`)

## Development

Requires Bun 1.4.4 and Node.js 22.12+ (Node 24 recommended).

```sh
bun install --frozen-lockfile
bun run dev
```

Open the local URL printed by Astro, normally `http://localhost:4321`.

| Command                | Purpose                                             |
| ---------------------- | --------------------------------------------------- |
| `bun run dev`          | Start the development server                        |
| `bun run check`        | Check Astro and TypeScript                          |
| `bun test`             | Test the actual rendered homepage and contact links |
| `bun run build`        | Generate static files in `dist/`                    |
| `bun run preview`      | Preview the production build                        |
| `bun run format`       | Format with Prettier                                |
| `bun run format:check` | Check formatting                                    |

## Structure

`src/pages/index.astro` contains the landing page and WhatsApp destination. `src/styles/global.scss` defines the layout and brand styling. `src/scripts/motion.ts` owns GSAP animation. `public/` contains static assets; `tests/` contains Bun integration tests.

Content and contact links render without JavaScript. Animation follows reduced-motion preferences and the background pauses when offscreen or the tab is hidden. No backend or environment variables are required.

Google Analytics uses measurement ID `G-C4DHWJTYQL` through Google's asynchronous `gtag.js` snippet. Tracking is included in production builds only, keeping local development out of analytics. The tag follows the deployed hostname, including custom domains, without a code change. Production preview builds also include the tag. WhatsApp clicks send the `contact_whatsapp` event with the link location; they do not imply that a message was sent.

Content entries live in `src/data/pages.ts`; `src/pages/[...slug].astro` renders the service pages, anonymous case studies, and guides. `src/components/SeoHead.astro` shares metadata and production analytics across pages.

## SEO

The canonical domain is `https://www.easttowndigital.com/`, configured in `astro.config.mjs`. The website includes English and Indonesian service content, visual case-study previews, a local project brief builder, organization JSON-LD, social-preview images, `robots.txt`, and an XML sitemap for all published pages. See [SEO operations](docs/seo.md) for Search Console setup, content rules, and lead measurement.

## Deployment

Vercel detects Astro. `vercel.json` selects `bun install --frozen-lockfile`, `bun run build`, and `dist/`. Import the public `etd-website` GitHub repository into Vercel, or deploy from an authenticated CLI:

```sh
bunx vercel@latest --prod
```

The GitHub repository is connected to the Vercel project for automatic deployments from `main`. Do not commit `.vercel/` or credentials.
