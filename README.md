# Gomzi Nutrition storefront

React 19 and Vite storefront using the existing Gomzi design and catalog API.

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and set the API URL. The default backend is `http://localhost:3005`.
3. Start the existing backend separately, then run `npm run dev`.
4. Open the URL printed by Vite, normally `http://localhost:5173`. Other laptops on the same network can open Vite's Network URL.

When the configured API is localhost, the development and preview servers forward `/api` requests to it. This lets other laptops load the same live banners and catalog without calling their own localhost. Public API URLs are used directly; production hosting still requires the public HTTPS `VITE_API_URL`.

The API backend is a separate project. Google sign-in requires a configured Google OAuth web client ID and authorized origin. Payments and order processing use the existing backend and Razorpay integration; frontend environment variables must never contain secret keys.

## Pages and behavior

- Homepage, searchable catalog, category filters, sorting, pagination, and product details.
- The default `/gomzi-supplement` page shows a separate section for each active admin category, with four live product previews, a live count and a View All link. Category jump links replace the long sidebar on that page. `?view=all` opens the full paginated catalog; search and individual category URLs keep their filtered product grids.
- Popular Categories, search category suggestions and the `/category` directory use `/public/v1/categories` for active names, images, ordering, links and live product counts. The hardcoded homepage category list has been removed. Manage categories at admin `/rag/categories`; refresh the storefront after saving changes.
- Homepage hero loads active slides from `/public/v1/hero-banner`, including desktop/mobile artwork, ordering and shop links. Manage them in the existing admin at `/rag/hero-banner`; reload the homepage after saving changes.
- The wide promotional banner below Flash Deals loads the first saved active banner from `/public/v1/ads-banner`. Manage its image, alt text, click destination and visibility at admin Content → Static Banner (`/rag/static-banner`). Use Make Active or reorder banners to choose which one displays, then refresh the homepage. The previous hardcoded `1.jpeg` banner is no longer used by that section.
- The promotion below the combo builder uses `/public/v1/promo-banners` and displays only one banner: the first saved active banner in admin order. Manage it at Content → Promo Banners (`/rag/promo-banners`). Move the desired banner to the top and refresh the homepage. The previous two-column pre-workout/mass-gainer banners have been removed.
- The nutrition banner below Combos & Value Stacks uses `/public/v1/nutrition-promo-banners`. Manage its artwork, link, visibility and ordering at Content → Nutrition Promo Banners (`/rag/nutrition-promo-banners`). The first saved active banner is displayed; the hardcoded peanut-butter artwork is no longer used by this section.
- Homepage deals load from `/public/v1/deals`, showing the first four active offers. `/deals` displays all active offers, with current deal prices, coupon codes and destination links. Manage images, prices, coupons, links, visibility and ordering in the admin under Content → Homepage Deals (`/rag/deals`). Reload the storefront after saving changes.
- Shared Gomzi header and footer across store, information, blog, and policy pages.
- Live catalog stack builder with item selection and current product prices.
- Persistent guest cart; signed-in cart uses the API. Cart state is shared across cards, navigation, sidebars, and checkout.
- Login, registration, email verification, account profile and orders. Checkout requires sign-in and returns users to checkout after login.
- About, contact, FAQ, ingredients, ambassadors, blog, shipping, returns, privacy, and terms pages.
- Wholesale & Gyms opens the local `/wholesale` page, adapted from the existing wholesale page in the other local website copy. It includes pricing tiers, FAQs and the application form. Applications submit to `/public/v1/contact-inquiry`; failed submissions retain the entered details and show an error.
- Brochure at `/pdf/gomzi-brochure.pdf` and lab report at `/pdf/product-report.pdf`.
- Loading, retry, empty-product, missing-page and route-error states.

India address options in `src/data/indiaLocations.json` were extracted from the installed `country-state-city` 3.2.1 dataset. Only Indian states and cities are shipped to the checkout. Other pages load on demand.

## Validation

Run the complete local production gate before deployment:

```sh
npm run check
npm audit --omit=dev --audit-level=high
```

`npm run check` runs lint, generates the current website-content schema, builds the production bundle, and executes the core cart and route-rendering regressions.

```sh
npm run build
node --test tests/cart-storage.test.mjs
node tests/cart-sync-smoke.mjs
node tests/render-smoke.mjs
node tests/wholesale-smoke.mjs
```

With the catalog backend running, also run:

```sh
node tests/catalog-smoke.mjs
node tests/hero-banner-smoke.mjs
node tests/ad-banner-smoke.mjs
node tests/promo-banner-smoke.mjs
node tests/nutrition-banner-smoke.mjs
node tests/deals-smoke.mjs
node tests/categories-smoke.mjs
node tests/shop-category-sections-smoke.mjs
```

The catalog check is read-only. Cart synchronization checks use a mocked API adapter. Render checks validate server-rendered component output; they do not replace browser layout and interaction testing. Payment, OTP, Google sign-in, and order submission need separate verification against the configured services.

## Build and hosting

`npm run build` creates `dist/`. Serve it with `npm run preview` for a local production preview. Hosting must route client-side paths to `index.html`; `vercel.json` already declares that rewrite. Set the production `VITE_API_URL`, `VITE_SITE_URL`, and Google client ID before building. This work is local; no deployment is configured or performed here.

### Production checklist

- Set `VITE_API_URL` to the public HTTPS API origin and `VITE_SITE_URL` to the final storefront origin.
- Set `VITE_GOOGLE_CLIENT_ID` only after authorizing the production origin in Google Cloud. Without it, the storefront safely falls back to email and OTP login.
- Confirm Razorpay's production key and webhook configuration in the backend; no secret key belongs in a `VITE_` variable.
- Run `npm run check` and the live read-only API smoke tests before every release.
- Verify payment, OTP, Google sign-in, email delivery and order webhooks once in the production environment; automated tests do not submit real payments or inquiries.
- Vercel security headers, immutable asset caching and the SPA route rewrite are defined in `vercel.json`.
