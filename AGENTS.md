# Repository Guidelines

## Project Structure & Module Organization

This is the East Town Digital company website, built with Astro 7, TypeScript, Bun, and GSAP. It produces static HTML with client-side animation and no backend.

- `src/pages/index.astro`: company introduction, metadata, and WhatsApp links.
- `src/data/pages.ts`: published service pages, anonymous case studies, and guides.
- `src/components/SeoHead.astro`: shared metadata and analytics.
- `src/styles/global.scss`: responsive layout, Carbon styles, and brand tokens.
- `src/scripts/motion.ts`: GSAP entrance, scroll, and canvas animations.
- `public/`: static assets, including the favicon.
- `src/pages/robots.txt.ts` and `sitemap.xml.ts`: crawler endpoints.
- `tests/`: Bun integration tests against rendered pages and analytics.
- `docs/seo.md`: SEO publishing and measurement guidance.
- `.github/workflows/`: continuous integration.

Keep generated `dist/`, `.astro/`, installed dependencies, and `.vercel/` out of version control.

## Build, Test, and Development Commands

Use Bun consistently and commit `bun.lock`. Install with `bun install --frozen-lockfile`. Node.js 22.12+ is required; Node 24 is recommended.

- `bun run dev`: start Astro locally, normally on port 4321.
- `bun run check`: check Astro and TypeScript. Keep TypeScript compatible with `astro check`.
- `bun test`: run homepage integration tests.
- `bun run build`: generate the static production site in `dist/`.
- `bun run preview`: serve the production build.
- `bun run format` / `bun run format:check`: apply or verify Prettier formatting.

## Coding Style & Naming Conventions

Use two-space indentation and Prettier with the Astro plugin. Use descriptive `camelCase` identifiers, `PascalCase` component names, and kebab-case CSS classes. Keep brand colors in shared tokens. Prefer semantic HTML and accessible native links.

## Testing Guidelines

Use Bun’s test runner and name tests `*.test.ts`. Tests should exercise rendered behavior, including valid internal anchors and the exact WhatsApp destination `https://wa.me/62817131366`. Run tests, type checks, and a production build before publishing. Check mobile layout, keyboard navigation, and reduced motion for visual or animation changes. No coverage threshold is configured.

## Commit & Pull Request Guidelines

Use concise, imperative subjects such as `Add company teaser and WhatsApp contact`. Describe changes and validation in pull requests; include screenshots for visual updates and link relevant issues.

## Scope & Deployment

Keep content focused on Indonesian clients, services, verified experience, and contact. Use `https://www.easttowndigital.com/` as canonical. Never publish private project identifiers or unsupported client claims. Preserve usable content without JavaScript and respect reduced-motion preferences. Deploy static output to Vercel using `vercel.json`. Never commit secrets or local environment files.
