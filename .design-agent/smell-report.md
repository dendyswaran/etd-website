# East Town Digital: smell

2026-10-31. Initial diagnostic, before implementation. Brand register; decide on services, then contact via WhatsApp. Detail pages support learning.

Score: 7/10.

## Scores

| Lens              | Score / status |
| ----------------- | -------------- |
| Tech gradient     | 1              |
| Generic tech hue  | 1              |
| Feature tile grid | 0              |
| Accent rail       | 1              |
| Unearned blur     | 1              |
| Stat monument     | 0              |
| Icon topper       | 1              |
| Decorative motion | 0              |
| Default type      | 1              |
| Center stack      | 1              |

## Findings

| #   | Severity | Discipline | Location                      | Before                                                                    | After                                                                                              | Why                                                           |
| --- | -------- | ---------- | ----------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 1   | MEDIUM   | Voice      | src/pages/index.astro:118     | Split slogan ends in “Lebih jauh.”; CTA follows several large text beats. | One left-aligned headline naming software and AI, adjacent concrete operations and contact action. | Visitors need to identify fit before starting a conversation. |
| 2   | MEDIUM   | Layout     | src/styles/global.scss:674    | Every homepage section is a rounded bordered panel.                       | Open editorial sections with horizontal rules; keep the dark contact area as the destination.      | Repeated containers flatten the reading rhythm.               |
| 3   | MEDIUM   | Voice      | src/pages/index.astro:189     | 15+ is a display-sized statistic with a repeated abstract motto.          | Compact founder experience statement and link to existing development experience.                  | Explain whose experience supports the claim.                  |
| 4   | MEDIUM   | Layout     | src/styles/global.scss:739    | Experience and all resources share equal two-column tiles.                | Use readable case rows and group the resource directory by existing page kind.                     | Separate proof from services and reading material.            |
| 5   | LOW      | Motion     | src/scripts/motion.ts:30      | Looping abstract canvas and scroll entrances decorate business content.   | Remove decorative canvas and entrance scripting; keep content available immediately.               | Motion does not explain an operational capability.            |
| 6   | LOW      | Writing    | src/pages/[...slug].astro:144 | “Konteks untuk langkah berikutnya” and repeated conversation slogans.     | Direct related-reading heading, useful preparation copy and sentence-case contact labels.          | Navigation should say what it opens.                          |

## Considered but rejected

| Location       | Candidate                                  | Rejected because                                            |
| -------------- | ------------------------------------------ | ----------------------------------------------------------- |
| global.scss:12 | Replace olive and warm neutral palette     | Existing identity is specific; a new palette adds no value. |
| global.scss:38 | Replace Plex                               | Sans for prose and Mono for navigation have explicit roles. |
| pages.ts       | Invent performance metrics or client logos | No evidence authorizes new claims.                          |

## Walkthrough

Header → hero → company → AI → services → experience → FAQ → resource directory → contact. Main hierarchy is weakened by slogan repetition and panel repetition. Detail template: breadcrumb → title → optional illustration → contents links → prose → related reading → contact. Preserve anonymous case details and article illustrations.

## Verification

Inspected: index.astro, [...slug].astro, global.scss, motion.ts, pages.ts, existing home integration tests. Native WhatsApp destinations and anchors inspected in source.

Not verified at diagnostic time: rendered reflow, keyboard focus, screen reader output, mobile touch, performance measurement. Local server started; browser verification pending.

## Applied fixes and final verification

Findings 1–6 are implemented. The hero names the software house and AI offering with an actual QA case link. Open section rules replace rounded panels. Founder experience is contextual prose. Experience uses rows and all 11 resource links are grouped by kind. Canvas, GSAP entrances and watermark are removed. Related-reading and contact copy use direct wording.

Verified commands: `bun test` (13 passed, 0 failed, 165 assertions), `bun run check` (0 errors/warnings), `bun run build` (12 static pages), `bun run format:check`, and `git diff --check`.

Browser: headless Chromium rendered all 12 routes at 320, 375, 768, 1024, 1440 and 2560px (72 page/width combinations): no horizontal document overflow, one h1, correct WhatsApp links, no page errors. Visually inspected desktop and mobile homepage screenshots and the illustrated Excel guide. Exercised first nine keyboard stops with visible solid outlines; activated skip link to #main. Homepage heading and hero contact visible with JavaScript disabled. At 768px with 200% root text sizing, no horizontal overflow. Reduced-motion probe: no canvas; a development-tool animation was still counted, so this is not a claim of zero browser animations.

Not verified: screen-reader speech, physical touch devices, cross-browser behavior, full 200% browser zoom (root text resizing was exercised), external WhatsApp app handoff. No remaining actionable findings from this scoped deslop pass.

## Verdict

Approve
