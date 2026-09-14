# Localized marketing page

The marketing route group introduces the existing inventory and sales application. It does not restore the shopping storefront or public checkout.

## Routes and language selection

- `src/app/(marketing)/page.tsx`: redirects `/` to the existing locale preference (cookie, then browser language, then French).
- `src/app/(marketing)/[locale]/page.tsx`: serves `/ar`, `/fr`, and `/en`. Unsupported locale segments return 404.
- `i18n/en.json`, `fr.json`, `ar.json`: complete copy, including accessibility labels, product previews, scanner steps, and FAQ answers. `dictionaries.ts` checks each language against the English shape and loads only the selected dictionary on the server.
- Marketing URLs take precedence over cookies. The proxy forwards a sanitized locale header so the shared root HTML has the correct `lang` and `dir` on the first response. It remembers the language in the existing locale cookie for login and application pages.
- Language switches use real links, so all language versions are crawlable and the root document updates without relying on a client-side language effect.
- Arabic uses RTL layout, logical alignment, isolated SKUs/brand text, and direction-aware arrow-key navigation. Chart chronology stays left-to-right; labels and number formatting are localized.

## Components

- `reference-hero.tsx` and `reference-hero.module.css`: reference-inspired split hero, angled temporary dashboard, invoice extraction cards, and six-module navigation.
- `sections.tsx`: server-rendered sections and native FAQ accordions.
- `product-preview.tsx`: representative interfaces based on existing modules. All numbers, products, and supplier records are explicitly illustrative. No operational records are queried.
- `product-tabs.tsx`: keyboard-accessible tabs receiving server-rendered panels and only their relevant translated strings.
- `scanner-demo.tsx`: user-stepped demonstration. It uploads nothing, calls no API, and writes no records.
- `navigation.tsx`: responsive navigation, language links, Escape handling, and focus return.
- `marketing.module.css`: scoped light theme, responsive layouts, RTL support, and reduced-motion handling.

Public branding is defined in `branding.ts`: `sytemano` with the short name `STM`. The name appears across all languages, previews, footer, SEO metadata and structured data. The supplied `public/marketing/logoSTM.png` is used for the header/footer logo and marketing favicon. The short name appears in the logo alternative text, application-name metadata and structured-data alternate names. Dashboard company settings are not changed. Typography uses Arial for Latin copy and Cairo for Arabic; icons use Lucide. No dependencies added. The root layout retains its database-backed theme/settings dependency.

## SEO

`seo.ts` uses the trusted `SITE_URL` environment variable, defaulting to the supplied production origin `https://demo.sytemano.com`. It never derives canonical URLs from request headers. Change `SITE_URL` when deploying to another public origin.

Each language has:

- Localized title and description, a self-referencing canonical URL, and reciprocal `ar`, `fr`, `en`, and `x-default` language alternatives.
- Localized Open Graph and Twitter metadata.
- Safely serialized WebSite/WebPage structured data describing the application without invented ratings or prices.
- Correct document language and direction in server-rendered HTML.

`src/app/(marketing)/sitemap.ts` publishes the three marketing URLs and their language alternatives at `/sitemap.xml`. It does not invent modification timestamps. `src/app/robots.ts` must live at the actual app root for Next.js to publish `/robots.txt`; it references the sitemap and excludes application/authentication/API paths. Root metadata defaults to noindex; valid marketing pages explicitly opt into indexing. Crawler directives complement, and do not replace, authentication.

The alternate-link design follows [Google’s localized-page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions).

## Product integrity

Trial CTAs link directly to /dashboard and /caisse; sign-in and registration links are not displayed. Authenticated permission checks, database schema, and business calculations are unchanged. An existing POS dashboard link uses Next Link to satisfy the routing lint rule exposed by the new locale route.

No pricing, testimonials, customer logos, public registration, trial, booking, contact, or legal links are rendered without verified content or existing functionality.

## Validation

Production build (including TypeScript) passed. Repository lint has no errors and the existing 13 warnings. Translation-key and array-shape parity checks passed for all three dictionaries.

Browser checks passed in every language at widths 320, 375, 390, 768, 1024 and 1440: no horizontal document overflow, working menus/tabs/scanner/FAQ, correct RTL arrow keys, and valid anchors. Locale switching updates the HTML language, persists the preference, and carries it to login. Reduced-motion behavior passed. No browser console errors or hydration errors were observed. Arabic and French desktop/mobile screenshots were visually reviewed.

Checked per-language canonical/hreflang links, Open Graph/Twitter metadata, structured data, public index directives, private login noindex, sitemap contents, and robots output. Crawler-style requests receive localized metadata in the initial HTML head. Invalid locales and removed storefront URLs return 404. Unauthenticated private routes still redirect to login; a proxy unit check covers signed-in passthrough and header sanitization. A full authenticated dashboard session was not exercised.

## Replace the temporary system preview

Add your screenshot under `public/marketing/`, then set `systemPreviewImage` in `branding.ts` to its public path, for example `"/marketing/system.png"`. The existing frame and responsive layout will display it automatically. Keep the value `null` to use the illustrative HTML dashboard. The original `logoSTM.png` remains the site logo and icon.

## Section image filenames

Save PNG screenshots in `public/marketing/`. Images retain their natural proportions and use the same file across Arabic, French, and English. `SectionImage` checks for files on the server and keeps the existing visual when an optional image is missing. Add files before deployment and redeploy/restart the production application after adding them.

| Filename | Location |
| --- | --- |
| `system.png` | Hero and dashboard product tab |
| `orders.png` | Orders product tab |
| `pos.png` | POS workflow section |
| `inventory.png` | Inventory tab and workflow |
| `purchases.png` | Purchases tab and workflow |
| `reports.png` | Reports tab and workflow |
| `scanner.png` | AI scanner section, replacing the interactive sample |
| `outcomes.png` | Benefits section, above the benefit cards |
| `features.png` | Features section, above the feature cards |
| `about.png` | Getting started section, above the steps |
| `faq.png` | FAQ introduction |
| `cta.png` | Final call to action |

Only the screenshot previews are replaced; headings, descriptions, navigation, and account links remain functional. Optional section screenshots use localized section titles as alternative text.

The landing page advertises a 10-day trial for individuals and companies. Trial requests open WhatsApp at +212 714922577 with a localized message; no trial account is provisioned automatically. Override the contact using WHATSAPP_NUMBER (international digits only). The fixed contact button and trial copy support Arabic, French and English. The technology section reflects the application dependencies and invoice extraction provider.

The Orders tab uses public/marketing/orders.png (previously sales.png). The reports workflow uses public/marketing/statistics.png; reports.png remains the Reports tab image. A language banner explicitly lists Arabic, French and English.
