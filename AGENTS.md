# Repository Guidelines

## Project Structure & Module Organization

This is the East Town Digital teaser website, built with Astro 7, TypeScript, Bun, and GSAP. It produces static HTML with client-side animation and no backend.

- `src/pages/index.astro`: company introduction, metadata, and WhatsApp links.
- `src/styles/global.scss`: responsive layout, Carbon styles, and brand tokens.
- `src/scripts/motion.ts`: GSAP entrance, scroll, and canvas animations.
- `public/`: static assets, including the favicon.
- `tests/`: Bun integration tests against the rendered homepage.
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

Keep this release focused on company introduction and contact. Preserve usable content without JavaScript and respect reduced-motion preferences. Deploy static output to Vercel using `vercel.json`. Never commit secrets or local environment files.
