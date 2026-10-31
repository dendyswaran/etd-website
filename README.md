# East Town Digital

An introductory website for East Town Digital, an independent software house with 15+ years of IT experience. Inspired by the warm, typographic composition and animated line field at [abliteration.ai](https://abliteration.ai), with original branding, copy, and artwork.

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

Content and contact links render without JavaScript. Animation follows reduced-motion preferences and the background pauses when offscreen or the tab is hidden. No analytics, backend, or environment variables are required.

## Deployment

Vercel detects Astro. `vercel.json` selects `bun install --frozen-lockfile`, `bun run build`, and `dist/`. Import the public `etd-website` GitHub repository into Vercel, or deploy from an authenticated CLI:

```sh
bunx vercel@latest --prod
```

Link the GitHub repository to the Vercel project for future automatic deployments. Do not commit `.vercel/` or credentials.
