# Codex project handoff

Last updated: 2 November 2026 (Asia/Jakarta).

## Start here on another device

1. Clone `git@github.com:dendyswaran/etd-website.git`, or pull the latest `main` in an existing checkout.
2. Open the repository as the Codex project. Read `AGENTS.md`, this document, `docs/seo.md`, and `docs/content-plan-ai.md`.
3. Use Node.js 22.12+ (24 recommended) and Bun matching `package.json`; run `bun install --frozen-lockfile`.
4. Run `bun run dev` to preview the site. Before publishing changes, run `bun test`, `bun run check`, `bun run format:check`, and `bun run build`.

## Current state and next work

The website implementation, including bilingual pages, selected work, workflow diagrams, and the project brief, was already committed before this handoff. This handoff adds documentation and portable Codex configuration; it does not publish new articles or illustrations.

The user selected a 12-week content plan focused on AI automation, especially customer service and other practical business use cases. Audience: business owners and operations managers in Indonesia. Cadence: one original article per week. The user specifically requires warm, soft editorial illustrations with a Medium-like feel. The full calendar, illustration concepts, production checks, and measurement plan are in `docs/content-plan-ai.md`.

Next content task when requested: research and produce week 1, including its unique illustration and English localization. No articles in the new plan have been drafted, generated, or published. The first publication date has not been scheduled; the default is Wednesday in the first execution week. Do not interpret this handoff as an automation or a request to publish all 12 articles immediately.

The latest user request is to commit and push all project updates, including portable Codex configuration, so work can continue on another device. Preserve project decisions in repository documentation when they would otherwise exist only in chat.

## Portable configuration and local setup

`AGENTS.md` contains repository instructions; `.codex/config.toml` preserves the existing medium reasoning preference. Model selection, permissions, credentials, connected services, and installed skills/plugins remain device/account configuration. There was no existing project `.codex` directory to migrate. The previous device's global settings and account files are not copied into this repository.

Project configuration loads only for trusted projects. Sign in and trust this checkout on the new device as appropriate. See the [official configuration documentation](https://learn.chatgpt.com/docs/config-file/config-basic).

Personal skill paths and plugin-cache paths from the previous chat are not portable. Use equivalent capabilities available on the new device; retain the visual/content requirements in the content plan. Image generation is needed when producing the illustrations. Git authentication, Vercel access, and analytics access must be configured through the new device's normal sign-in flows. Do not store credentials in Git.

This repository carries project context, not the original chat history, app state, or active sessions. To resume in a new chat, use: “Read AGENTS.md, docs/codex-handoff.md, and docs/content-plan-ai.md, then continue with [the specific task].”
