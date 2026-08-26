# Content (CMS)

Site content is managed in **Sanity Studio**, not JSON files.

## Open Studio

Visit `/studio` on the running site (or your deployed Studio URL) and sign in with a Sanity account that has access to the StructroTech project.

## What to edit in Studio

| Document type | Used on the site |
|---------------|------------------|
| **Blog Post** (`post`) | `/blogs` listing and `/blogs/[slug]` |
| **Interesting Trick** (`interestingTrick`) | homepage tricks, `/interesting-tricks`, and `/interesting-tricks/[slug]` |
| **Category** | `/categories` and category pages |
| **Author** | bylines and avatars on articles |
| **Resource** | `/resources` |

## Article body blocks

Inside a post or trick body you can insert:

- Images (with size/alignment)
- Affiliate Box
- Sponsor Banner
- Download Box
- Google Ad Placeholder (`adSensePlaceholder`)

Document-level **Ad Placeholders** (top / middle / bottom) are toggles on each post or trick, not body blocks.

## Local JSON files

`content/interesting-tricks.json` is leftover from an earlier mock-data setup. Live pages fetch from Sanity via `sanity/client.ts` and `sanity/queries.ts`. Do not treat those JSON files as the source of published content.
