# SEO operations

## Canonical site

The public site resolves to `https://www.easttowndigital.com/`. Astro's `site` setting is the source for canonical URLs, organization data, the sitemap, and crawler instructions. Keep the Vercel apex-to-www redirect aligned with it. `vercel.json` permanently redirects the previous `etd-website-seven.vercel.app` hostname to the custom domain while preserving paths. Deployment preview hostnames are unaffected.

- Homepage: https://www.easttowndigital.com/
- Sitemap: https://www.easttowndigital.com/sitemap.xml
- Crawler instructions: https://www.easttowndigital.com/robots.txt

The sitemap is generated from the homepage and the nine published entries in `src/data/pages.ts`. Add only published, canonical routes when new pages are introduced. Do not list fragment links such as `#layanan` as separate pages or fabricate modification dates.

## Content and evidence

The primary language is Indonesian. Core topics are software development for businesses in Indonesia, websites and CMS, custom business applications, mobile experiences, and API integration. Service descriptions should explain the customer's problem and relevant scope rather than repeat keywords.

Keep project examples factual. Publish only generalized capabilities from approved recent work; do not expose private repository names, client identities, internal URLs, source code, credentials, or screenshots without explicit publication authorization. Do not invent customer testimonials, certifications, delivery guarantees, prices, or performance statistics. The 15+ years claim describes IT experience, not the age of the company.

No office address or city-specific local-business schema is configured because a business location has not been provided.

## Search Console

The canonical URL-prefix property `https://www.easttowndigital.com/` is verified through Google Analytics. Preserve the production `gtag.js` snippet to retain this verification. A separate `easttowndigital.com` domain property can be added if needed. Domain verification requires access to DNS. Existing Google Analytics ownership may also support URL-prefix verification, depending on account permissions.

The sitemap `https://www.easttowndigital.com/sitemap.xml` was submitted on 31 October 2026. The initial submission reported Success and one discovered page; the expanded sitemap now lists ten canonical pages. Submit new sitemap locations when changed, and inspect updated URLs to request indexing when available. Submission does not guarantee indexing or rankings. Review impressions, queries, clicks, and country filters over time before expanding landing pages.

References: [Google Search Console setup](https://developers.google.com/search/docs/monitor-debug/search-console-start), [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

## Lead measurement

GA4 property: `G-C4DHWJTYQL`. Production WhatsApp clicks send `contact_whatsapp` with `link_location` (`header`, `hero`, `contact`, or `phone`). This measures intent to contact, not a sent message or a qualified lead. The event adds no message text or visitor contact information. It never delays or cancels navigation.

Review the event in GA4 and mark it as a key event if it fits the reporting plan. Analytics may be unavailable when visitors block it. Local development excludes tracking; production preview builds include it.

## Publishing checks

Run `bun test`, `bun run check`, `bun run format:check`, and `bun run build`. Check narrow mobile layouts after copy changes. Verify live HTML, canonical URL, JSON-LD, `robots.txt`, the sitemap, and the social-preview PNG after deployment. Review Google Search Console for crawl and indexing results; local tests do not prove ranking improvements.
