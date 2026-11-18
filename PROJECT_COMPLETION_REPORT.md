# Gomzi Nutrition — Website Completion Report & Master Plan

**Project:** Gomzi Supplement by RAG (RAG Nutrition, Surat)
**Repo:** `gomzi-nutrition-rag-website` · branch `dev` · origin `GomziServies/gomzi-nutrition-rag-website`
**Stack:** React 19.2 · Vite 8 (beta/Rolldown) · Tailwind CSS 4 · React Router 7 · Axios · react-helmet-async · react-hot-toast
**Report date:** 2026-10-21
**Codebase size:** 151 source files · ~29,700 lines in `src/` · 24 routes · 80 components · 17 API modules

---

## 1. Executive Summary

### The headline answer

| Scenario | Working days | Calendar weeks | Notes |
|---|---|---|---|
| **MVP / Launch-ready** (bug-free, secure, fast, SEO basics, deployed) | **22 days** | **~4.5 weeks** | Sellable. Missing nice-to-haves. |
| **Full production completion** (everything shipped) | **52 days** | **~11 weeks** | All phases done, tested, documented. |
| Full completion with **2 developers** in parallel | **~30 days** | **~6 weeks** | Recommended minimum. |
| Full completion with **3 developers** in parallel | **~22 days** | **~4.5 weeks** | Requires strict task ownership. |

**My recommendation: target 4 weeks for MVP, 10 weeks for full production.**
Do not treat the site as "80% done" — it is roughly **70% code-written but only ~45% production-ready**, because the remaining 30% is exactly the part that determines whether a customer can trust you with their card.

### Completion scorecard (verified against the running code)

| Area | Status | % Done |
|---|---|---|
| Product catalogue, filters, sorting, pagination | Complete | 95% |
| Product detail page (variants, zoom, reviews, related) | Complete | 95% |
| Cart (guest + authenticated + merge on login) | Complete | 90% |
| Checkout (address, coupon, COD, Razorpay) | Complete | 85% |
| Order creation + thank-you + order history | Complete | 90% |
| Auth (password, OTP, Google, register, verify, logout) | Complete but unsafe | 80% |
| Profile / address / orders screen | Complete | 85% |
| Blog, FAQ, About, Categories, Contact, Inquiry | Complete | 85% |
| Landing page sections | Complete | 80% |
| **Route protection (ProtectedRoute)** | **Missing** | **0%** |
| **404 page / Error boundary** | **Missing** | **0%** |
| **Forgot password / change password UI** | **Missing** (API exists) | **0%** |
| **Order tracking / Invoice / Wishlist / Address book** | **Missing** (APIs exist) | **0%** |
| **Test suite (unit + E2E)** | **Missing** | **0%** |
| **Code splitting** (9.88 MB single bundle) | **Missing** | **0%** |
| **SEO completeness** (14 pages bare, canonicals broken) | Partial | 40% |
| **Category page content** (3 of ~14 categories built) | Partial | 20% |
| **Dead-code cleanup** (~4,500 lines orphaned) | Not started | 0% |
| **CI / Docs / Env template** | Not started | 0% |

**Overall production readiness: ~45%.**

---

## 2. What Is Actually Blocking You Right Now

These are ordered by damage. Fix in this order — each one either breaks the build, loses money, or loses Google rankings.

### P0 — Breaks the build / breaks the repo
1. **`src/hooks/useRelatedProducts.js:3` imports `getProductsApi` which `services/product.service.js` does not export.**
   The main build survives only because the file is orphaned. The moment you wire it in (or a future dev imports it), the build dies with `[MISSING_EXPORT]`. Fix the import or export the function.
2. **90 uncommitted changes** (87 modified/deleted tracked files + 2 untracked). `src/component/common/CarouselControls.jsx` and `src/component/common/SectionHeader.jsx` are **untracked but already imported by tracked files** — if anyone else clones this branch, the build breaks. **Commit or stash today.**
3. **38 ESLint errors across 22 files.** `npm run lint` currently fails, so it cannot be used as a CI gate. Includes a real bug: `marketplace-availability.jsx:213` "Cannot access variable before it is declared".
4. **Dead wizard handlers in `src/pages/Inquiry/Inquiry.jsx` (lines 341, 663–665):** `validateStep`, `goToNextStep`, `goToPrevStep`, `setCurrentStep` are defined but **never called**. The 5-step partner inquiry form does not actually gate step progression — users can skip required steps. This is a real data-quality bug.

### P0 — Money / security / trust
5. **Production OTP leak.** `src/pages/Auth/Login.jsx` reads `result.data.data.OTP` from the backend and **auto-fills it into the field and shows it in a toast** ("Dev Auto-fill"). If the backend returns the OTP in production, **any visitor can read another user's OTP out of their screen.** Must be gated behind `import.meta.env.DEV` and the backend must never return the OTP outside sandbox.
6. **No `ProtectedRoute`.** `/profile`, `/checkouts`, `/thank-you` are fully public. A guest can reach checkout; `/profile` has a **completely empty guard** (`ProfilePage.jsx:16–21` — the `useEffect` body is a comment only). The only real auth gate is a `LoginModal` popup inside the Cart UI — that is not a security boundary.
7. **No 401 interceptor.** `src/api/axios.js` injects the token but has **no response interceptor**. An expired token silently returns 401 and the user sees a generic error instead of being logged out.
8. **Raw token in `localStorage` under the key `authorization`, no `Bearer` prefix**, not namespaced per user, never cleared on 401, and not cleared on logout alongside `guest_cart` / `checkout_coupon` / `recently_viewed_products`.
9. **7 native `alert()` calls** in `component/checkout/CheckoutForm.jsx` (lines 87, 93, 124) and `component/ui/CustomerReviews.jsx` (lines 126, 131, 136, 155) — mixed with `react-hot-toast`. Native alerts look broken on mobile and block the UI thread.

### P1 — Growth blocked
10. **Bundle is 9.88 MB (2.73 MB gzipped) in a single chunk, zero code splitting.** Vite itself warns about it. On Indian 4G this is a multi-second blank page — directly killing conversion and Core Web Vitals.
11. **Canonical URLs are broken site-wide.** `src/component/SEO.jsx` accepts a `url` prop but **no call site passes it**, so every canonical points to the bare homepage. Google is being told all 24 pages are duplicates of `/`.
12. **Product canonical is wrong:** the route is `/product/:slug` but the canonical emits `/gomzi-supplement/:slug`.
13. **14 of 24 routes have no `<SEO>` tag** — login, register, cart, checkout, thank-you, profile, ingredients, ambassador, and all 4 legal pages.
14. **No `robots.txt`, no `sitemap.xml`, no `manifest.webmanifest`, no JSON-LD structured data.** For a health-supplement site, `Product` + `BreadcrumbList` + `FAQPage` schema is what earns rich results.
15. **`config/categoryConfig.js` is 1,117 lines but only defines 3 categories** (`default`, `bcaa`, `creatine`). `whey-protein`, `mass-gainer`, `pre-workout`, `plant-protein`, `wellness-health` etc. all silently fall back to the generic page. **Category pages are your highest-intent SEO surface and 85% of them are thin duplicates of each other.**

### P2 — Wasted asset / maintenance risk
16. **~4,500 lines of finished, API-wired, but unreachable UI** (≈25 orphaned components). This is a trap: every future dev must reverse-engineer whether a file is live or dead. Includes `BrandCompanyShowcaseSection` (850 lines, fully API-wired), `BankOffersBannerSlider` (253), `CompanyAdsSection` (310), plus 13 About-page sections that were clearly built for `/about` and never inserted.
17. **4 API modules never consumed:** `api/cart.api.js`, `api/invoice.api.js`, `api/promo-banner.api.js`, `api/nutrition-promo-banner.api.js` — while `promo-banner.api.js` has a live counterpart (`api/banner.api.js`) feeding `HeroSection`.
18. **`zod@^4.4.3` is installed and imported nowhere.** `sweetalert2` is also installed and unused.
19. **`src/services/cart.service.js` is a 0-byte file.** `src/utils/constants.js` is unused.
20. **The Landing page renders hardcoded promo banners** (`PromoBannerSlider.jsx` — 4 static brand cards with static coupon codes; `NutritionPromoBannerSlider.jsx` — 1 static image) while the dynamic APIs for both sit unused.
21. **README.md is still the Vite scaffold template.** A new developer cloning this repo learns nothing.
22. **No `.env.example`.** `.env` has only `VITE_API_URL`. `VITE_GOOGLE_CLIENT_ID` and `VITE_SITE_URL` are referenced in code but **not defined anywhere** — Google OAuth breaks on any fresh clone.
23. **No tests, no CI, no lint/typecheck gate.** Nothing prevents regression.

---

## 3. Master Plan — 10 Phases, 52 Person-Days

Day numbering assumes **1 developer, 8h/day, 5-day week**. Effort is in **person-days** so you can scale the team by assigning phases to different people.

| # | Phase | Effort (person-days) | Days (solo) | Depends on | Gate to pass |
|---|---|---|---|---|---|
| **P0** | Stabilize & secure (build green, secrets, auth guards) | **8** | 1–2 | — | Build ✅, Lint ✅ 0 errors, no OTP leak, guarded routes |
| **P1** | Clean up & consolidate (dead code, zod validation, alerts→toast) | **6** | 1–2 | P0 | `src/` has zero orphaned files; all forms validated |
| **P2** | Performance & code splitting (9.88 MB → <600 KB initial) | **4** | 1 | P0 | Lighthouse Perf ≥ 85 on mobile |
| **P3** | Auth completion (forgot password, change password, unify login) | **5** | 1 | P0 | All auth flows E2E-tested |
| **P4** | Wire the orphaned features (25 components) | **6** | 1–2 | P1 | Zero orphaned components remain |
| **P5** | New feature set (tracking, invoice, wishlist, address book, 404) | **8** | 2 | P1, P3 | Each feature has an E2E test |
| **P6** | Category + content pages (14 category SEO pages) | **8** | 1.5–2 | P1 | Every category URL has unique content |
| **P7** | SEO hardening (canonical, schema, sitemap, 14 pages) | **4** | 1 | P2, P4 | Lighthouse SEO = 100 |
| **P8** | Test suite (Vitest unit + Playwright E2E) | **8** | 1.5–2 | P0–P7 | 80%+ coverage on hooks & flows |
| **P9** | Deploy, document, CI, launch (Vercel, env, README, GH Actions) | **3** | 1 | P2, P7, P8 | Live on domain + SSL + CI green |
| | **TOTAL** | **60** | **~12 weeks** | | |

> Effort includes 15% buffer for review/QA/rework. Order P0 → P1 → P2/P3 in parallel → P4/P5/P6 in parallel → P7 → P8 → P9.

### Sprint-by-sprint calendar (solo)

| Sprint | Days | Focus | Deliverable you can demo |
|---|---|---|---|
| **Sprint 0** | 1–3 | P0a: commit everything, fix broken import, kill 38 lint errors, remove `console.log`, fix Inquiry wizard handlers | Build + lint green, branch clean |
| **Sprint 1** | 4–6 | P0b: `ProtectedRoute` + guards, 401 interceptor, dev-OTP gating, token hygiene, error boundary, 404 page | Secure app, no blank screens |
| **Sprint 2** | 7–9 | P1: zod schemas for all 8 forms, replace 7 `alert()`s, delete/complete orphan files, wire dynamic promo banners | Consistent UX, single source of truth |
| **Sprint 3** | 10–11 | P2: route-level lazy loading + manual chunks + image optimization | Fast first paint |
| **Sprint 4** | 12–14 | P3: forgot/reset password, change password, unified `useAuth` hook, `navigate()` instead of `window.location.reload()` | Full auth suite |
| **Sprint 5** | 15–17 | P4: wire the 13 About sections + brand/bank-offer/company-ad sections + category grid | Rich About & brand pages |
| **Sprint 6** | 18–21 | P5: order tracking, invoice PDF, wishlist, address book, error/empty states | Full customer self-service |
| **Sprint 7** | 22–24 | P6: 14 category pages with unique SEO content (parallelize with a content writer) | No duplicate category pages |
| **Sprint 8** | 25–27 | P7: canonical fix, schema, sitemap.xml, robots.txt, OG images, SEO on 14 routes | Indexable, rich results |
| **Sprint 9** | 28–32 | P8: Vitest setup, 60 unit tests, Playwright E2E for 8 critical journeys, cross-device QA | Confidence to ship |
| **Sprint 10** | 33–36 | P9: Vercel prod config, headers, `.env.example`, real README, CI workflow, Lighthouse ≥90, launch | **LIVE** |

**Solo full completion: 36 working days ≈ 7–8 weeks.** (Sprints overlap where a phase can start earlier; add 1 week of buffer for content review cycles and staging → **8 weeks realistic**.)

**If you have 2 developers:** split P5/P6/P7 and P8 across both, run P2 in parallel with P3 → **~5 weeks**.
**If you have 3 developers:** one on P5+P6, one on P8, one on P9 → **~4 weeks**.

---

## 4. Detailed Task Plan

### P0 — Stabilize & Secure (8 person-days) — START TODAY

**P0a — Repo & build health (3 days)**
- [ ] Commit or stash all 90 uncommitted changes. **Never leave `CarouselControls.jsx` / `SectionHeader.jsx` untracked** — they are imported by tracked files.
- [ ] Fix `src/hooks/useRelatedProducts.js:3` → import `getProductsApi` from the correct module (`src/api/product.api.js`) or export it from `services/product.service.js`.
- [ ] Clear all 38 ESLint errors + 5 warnings. Priority real bugs first:
  - `src/component/ui/marketplace-availability.jsx:213` — TDZ error, access-before-declaration.
  - `src/pages/Inquiry/Inquiry.jsx:341,663–665` — wire `validateStep` / `goToNextStep` / `goToPrevStep` into the wizard so steps are actually gated.
  - `src/pages/Thank-you.jsx:21` — unused `navigate`.
  - ~14 unused-var errors across the tree.
  - 9 `react-hooks/set-state-in-effect` — refactor to derive state during render instead of `useEffect`+`setState`.
- [ ] Remove debug logs: `src/hooks/useCheckout.js:54`, `src/component/ui/ProductsGrid.jsx:52`, `src/component/ui/CustomerReviews.jsx:382–384`.
- [ ] Delete empty `src/services/cart.service.js`; delete unused `src/utils/constants.js`.

**P0b — Security & route protection (3 days)**
- [ ] Create `src/component/auth/ProtectedRoute.jsx`: waits for `loading` → redirects to `/login?redirect=<path>` if no token.
- [ ] Apply to `/profile`, `/checkouts`, `/thank-you` in `src/Routes/Route.jsx`.
- [ ] Add a **response interceptor** in `src/api/axios.js`: on `401` → clear token, clear cart caches, redirect to `/login`, show a toast. On `5xx` → normalised error toast.
- [ ] **Gate the dev OTP**: in `src/pages/Auth/Login.jsx`, wrap the `result.data.data.OTP` auto-fill in `if (import.meta.env.DEV)`. Confirm with the backend that the OTP is never returned in production.
- [ ] Token hygiene: on logout, also clear `guest_cart`, `checkout_coupon`, `recently_viewed_products`, and all `gomzi_*_cache` keys.
- [ ] Replace all 7 `alert()` calls with `errorToast()` / inline field errors (`CheckoutForm.jsx:87,93,124`, `CustomerReviews.jsx:126,131,136,155`).
- [ ] Replace `window.location.replace("/")` / `window.location.href = "/"` with react-router `navigate("/")` in `Login.jsx`, `Register.jsx`, `AuthContext.jsx` (avoids full reloads and losing SPA state).

**P0c — Resilience (2 days)**
- [ ] Add `src/component/ErrorBoundary.jsx` and wrap `<Outlet />` in `src/HOC/Wrapper.jsx`.
- [ ] Add `src/pages/NotFound.jsx` + `path: "*"` route in `src/Routes/Route.jsx`.
- [ ] Add `errorElement` to the router for lazy-load failures.
- [ ] Audit every `useEffect` data-fetch: ensure a `catch` sets an error state instead of leaving a permanent skeleton.

---

### P1 — Clean Up & Consolidate (6 person-days)

**Validation with zod (3 days)** — zod is already a dependency; wire it up.
- [ ] `src/schemas/auth.schema.js` — register, login, OTP verify.
- [ ] `src/schemas/checkout.schema.js` — address, email format, 10-digit mobile, 6-digit PIN.
- [ ] `src/schemas/profile.schema.js`, `contact.schema.js`, `review.schema.js`, `inquiry.schema.js`.
- [ ] Replace every hand-rolled `if (!x) { errorToast(...); return; }` with schema parse + per-field inline errors.
- [ ] Extract a shared `FormField` component so label / error / hint styling is identical everywhere.

**Dead-code resolution (3 days)** — for each of the 25 orphans: **wire it or delete it.** Do not leave it in limbo.
- [ ] Wire to `/about`: `StorySection`, `TrustAndGoalSection`, `TrustExpertsSection`, `ManufacturingSection`, `ManufacturingAdvantageSection`, `transparency`, `ensure-quality`, `AthleteCircleSection`, `FuelingAthletesSection`, `BrandJourneySection`, `BrandPromiseSection`, `WellnessHealthSection`, `About-HealthSection`, `AboutFAQSection`.
- [ ] Wire to `/` or a new `/brands` route: `BrandCompanyShowcaseSection`, `TopBrandsSection`, `BankOffersBannerSlider`, `CompanyAdsSection`, `CreatineSection`, `PlantProteinSection`, `MarketplaceAvailabilitySection`, `CustomerReviewsHome`, `LatestBlogs`, `Blogs`, `InfoCard`.
- [ ] Wire `CategorySection.jsx` into `src/pages/Categories.jsx`.
- [ ] Delete `src/component/CategorySection.jsx` if not needed, `src/component/common/CertificationBadges.jsx` if not wired, and the 4 unused API modules (`cart.api.js`, `invoice.api.js`, `promo-banner.api.js`, `nutrition-promo-banner.api.js`) **only after** P5 confirms the feature is not being built.
- [ ] Replace `PromoBannerSlider` hardcoded cards + `NutritionPromoBannerSlider` hardcoded image with the live `promo-banners` / `nutrition-promo-banners` endpoints.

---

### P2 — Performance & Code Splitting (4 person-days)

- [ ] Convert `src/Routes/Route.jsx` from static imports to `React.lazy()` + `<Suspense>` per route. Keep `Landing` eager (it is the entry point).
- [ ] Add a route-level `<Suspense fallback={<PageSkeleton />}>` wrapper using the existing `src/component/common/SkeletonLoaders.jsx`.
- [ ] Add `build.rolldownOptions.output.codeSplitting` / manual chunks in `vite.config.js`: split `react`, `react-router`, `swiper`, `country-state-city`, `react-helmet-async`, `@react-oauth/google`.
- [ ] Lazy-load `swiper` (only used by 3 carousels), `country-state-city` (only on checkout/profile), `react-confetti` (only on order success).
- [ ] **Convert all 188 images in `public/images` to WebP/AVIF** with `<picture>` + `loading="lazy"` + explicit `width`/`height` to prevent CLS. `public/images` currently holds raw heavy marketing art.
- [ ] Target: initial JS < 600 KB raw / < 200 KB gzip. Currently 9.88 MB / 2.73 MB.
- [ ] Add `build.chunkSizeWarningLimit` and a bundle-size check to CI.

---

### P3 — Auth Completion (5 person-days)

- [ ] **Forgot / reset password** — `POST /user/v1/account/change-password` already exists in `src/api/auth.api.js` but is unused. Add `/forgot-password` + `/reset-password` routes, screens, and wire the API.
- [ ] Replace the dead "Forgot password?" `<span>` at `src/pages/Auth/Login.jsx:585–588` with a real link.
- [ ] **Unify the two auth surfaces.** `src/component/auth/LoginModal.jsx` (248 lines) duplicates `src/pages/Auth/Login.jsx` (619 lines) — password + OTP + Google logic exists twice with different behaviour (no resend countdown in the modal; modal OTP field is `type="text"` not numeric). Extract one `src/hooks/useAuthFlow.js` and have both consume it. **This alone removes ~200 lines and a class of bugs.**
- [ ] Add resend countdown + numeric OTP input to the modal.
- [ ] Handle `ERR#VERIFICATION-REQUIRED` → `/verify-email` in the modal too (currently only the page does).
- [ ] Google OAuth: `VITE_GOOGLE_CLIENT_ID` is undefined — add `.env.example`, wire Vercel env vars, and add a graceful "Google sign-in unavailable" fallback if the client ID is missing.
- [ ] Enforce password policy server-side-consistent: length ≥ 8, upper, digit, symbol (the Register strength meter currently only *advisors*).

---

### P4 — Wire the Orphaned Features (6 person-days)

- [ ] Restructure `src/pages/About/About.jsx` to a clean section order: Hero → Story → TrustAndGoal → Manufacturing → ManufacturingAdvantage → Transparency → EnsureQuality → Athletes → BrandJourney → BrandPromise → Experts → FAQ.
- [ ] Add `/brands` route for `BrandCompanyShowcaseSection` (850 lines, already API-wired against `/public/v1/companies` + `/public/v1/company-ads`).
- [ ] Add `BankOffersBannerSlider` to the Landing or a `/bank-offers` strip (already calls `/public/v1/bank-offers`).
- [ ] Add `CompanyAdsSection` to the Landing or product pages (already calls `/public/v1/company-ads`).
- [ ] Add `CreatineSection` / `PlantProteinSection` / `WellnessHealthSection` as category landing sections.
- [ ] Add `MarketplaceAvailabilitySection` (Amazon/Flipkart/etc. presence) to the Footer or About.
- [ ] Add `CustomerReviewsHome` + `LatestBlogs` to the Landing page.
- [ ] Add `CategorySection` grid to `/category`.
- [ ] Ensure every newly-wired section has a loading skeleton + empty state + mobile layout.

---

### P5 — New Feature Set (8 person-days)

- [ ] **Order tracking page** `/track-order` — `getTrackingOrderApi` exists in `src/api/order.api.js` (`POST /user/v1/meals/get-product-tracking`) but has no UI.
- [ ] **Invoice list + PDF download** — `src/api/invoice.api.js` (get / sign-invoice / generate-invoice-pdf) is fully written but unused. Add the screen + "Download invoice" button in `OrdersSection`.
- [ ] **Wishlist** — currently a local `useState` inside `PreIntraWorkoutSection` only. Needs to be a shared, persisted (localStorage now / backend later) store + a `/wishlist` page + a heart icon on `ProductCard`.
- [ ] **Address book** — the profile stores exactly one address. Add a list, add/edit/delete, and a "use this address" selector in `CheckoutForm`.
- [ ] **Newsletter subscribe** — `src/pages/Blog.jsx:170–176` only flips local state. Wire to the backend endpoint (or add a `subscribe` endpoint to the backend task list) and persist.
- [ ] **404 + error pages** — delivered in P0c; verify design quality here.
- [ ] **Empty states** — empty cart, no search results, no reviews, no orders. Currently several sections show nothing at all.
- [ ] **Order confirmation email / invoice trigger** — verify the backend fires it after `POST /user/v1/meals/create-order`.

---

### P6 — Category & Content Pages (8 person-days)

This is the **highest-ROI SEO work** and the longest-lead item. Start content drafting in parallel with P4.

- [ ] `src/config/categoryConfig.js` currently defines only `default`, `bcaa`, `creatine`. Add full configs for:
  `whey-protein`, `mass-gainer`, `pre-workout`, `post-workout`, `plant-protein`, `creatine`, `bcaa`, `pre-workout`, `immunity`, `wellness-health`, `weight-management`, `sports-nutrition`, `multivitamin`, `omega-3`.
- [ ] Each config needs: unique `<SEO>` title (~55 chars) + meta description (~150 chars) + H1 + 400–700 words of unique intro + comparison table + 6–8 FAQs + internal links to 3 related categories + 3 related blog posts.
- [ ] Wire `config/categoryConfig.js` lookup in `src/pages/Allproducts.jsx` so `categoryConfig[categorySlug]` resolves; add a safe fallback + a dev warning when a slug has no config.
- [ ] Build a **category ↔ product ↔ blog** internal-linking map. Orphaned content is a ranking killer.
- [ ] Ensure `filterProductsByCategory` in `src/utils/productAdapter.js` matches the backend category taxonomy exactly (verify against `src/data/navigationCategories.js`).
- [ ] Content review loop: 2 rounds with the brand/marketing owner. **Book this meeting now** — it is the longest calendar dependency.

---

### P7 — SEO Hardening (4 person-days)

- [ ] **Fix `src/component/SEO.jsx`** so the `url` prop is actually used for `canonical` and OG `og:url`. Right now every canonical is the homepage.
- [ ] Fix the product canonical mismatch: route `/product/:slug` vs canonical `/gomzi-supplement/:slug` — pick one and 301 the other.
- [ ] Add `<SEO>` to the 14 bare routes: `/login`, `/register`, `/verify-email`, `/profile`, `/cart`, `/checkouts`, `/thank-you`, `/ingredients`, `/about/ambassador`, `/privacy-policy`, `/terms-and-conditions`, `/refund-policy`, `/shipping-policy`.
- [ ] Add **JSON-LD structured data**:
  - `Product` + `Offer` + `AggregateRating` on the PDP (price, availability, SKU, brand).
  - `BreadcrumbList` on every page.
  - `FAQPage` on `/faq` and category pages.
  - `Article` on `/blog/:slug`.
  - `Organization` + `WebSite` (with `SearchAction`) in `index.html`.
- [ ] Generate `sitemap.xml` dynamically (a small Node script over the route table + product/blog slugs from the API). Submit to Google Search Console + Bing.
- [ ] Add `public/robots.txt` (allow all, reference the sitemap, disallow `/checkouts`, `/thank-you`, `/profile`).
- [ ] Add `public/manifest.webmanifest` + favicon set (192/512 PNG, maskable icon, apple-touch-icon).
- [ ] Per-page OG images. At minimum, dynamic OG for PDP and blog via an `og-image` endpoint on the backend.
- [ ] Fix meta title lengths (≤60 chars) and descriptions (≤155 chars) — the SEO component appends `| Gomzi Supplement by RAG` to every custom title, which pushes many over the limit.
- [ ] Add `hreflang`/`en-IN` locale hints and `og:locale`.
- [ ] Validate with Lighthouse SEO = 100 and Google Rich Results Test on a PDP and a blog post.

---

### P8 — Test Suite (8 person-days)

No test infrastructure exists today. This is what prevents the next regression.

- [ ] Add **Vitest + @testing-library/react + jsdom** (dev deps), `npm run test` script, `npm run test:coverage`.
- [ ] Unit tests for the logic-bearing hooks (these hold the real business rules):
  - `src/hooks/useCart.js` — guest cart, qty ±, remove, clear, server sync.
  - `src/hooks/useCheckout.js` — form state, payload shape for `create-order`.
  - `src/hooks/useCoupon.js` — apply, persist, clear.
  - `src/utils/productAdapter.js` — `normalizeProduct`, `isRealProduct`, `getProductImageUrl`.
  - `src/utils/syncGuestCart.js` — guest→server merge, dedupe, partial-failure handling.
  - `src/utils/storage.js` — TTL cache expiry.
- [ ] Add **Playwright** with 8 critical E2E journeys:
  1. Browse → filter → sort → paginate → open PDP.
  2. Guest add-to-cart → login → guest cart merged.
  3. Cart → checkout → COD → order created → thank-you.
  4. Cart → checkout → coupon applied → price recalculated.
  5. Register → verify email → login.
  6. Google OAuth sign-in (mocked).
  7. Profile → edit address → order history visible.
  8. Submit a product review.
- [ ] Cross-device QA matrix (they already have `test_desktop.jpg` / `test_mobile.jpg` — formalise this): iPhone 12/13 (390px), Pixel 5 (393px), iPad (768/1024px), 1440px, 1920px. Check navbar mega-menu, cart popover, product grid, checkout form, tables.
- [ ] Accessibility pass: keyboard nav on navbar/mega-menu/cart, focus rings, `aria-label` on icon buttons, contrast on the orange/black brand palette, alt text on the 188 images.
- [ ] Lighthouse budget: Perf ≥ 85, A11y ≥ 90, SEO = 100, Best Practices ≥ 90 (mobile, throttled).

---

### P9 — Deploy, Document, Launch (3 person-days)

- [ ] **`.env.example`** — document all three vars:
  ```
  VITE_API_URL=https://api.ragnutrition.in
  VITE_GOOGLE_CLIENT_ID=<google-oauth-client-id>
  VITE_SITE_URL=https://ragnutrition.in
  ```
- [ ] **Vercel** — set the 3 env vars per Preview/Production, confirm the SPA rewrite works on deep links (`/product/:slug`, `/blog/:slug`, `/checkouts`), add a custom domain + SSL, add a Vercel deployment comment.
- [ ] **vercel.json** — add security headers (CSP, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`), and long-lived `cache-control` for hashed `/assets/*`.
- [ ] **README.md** — replace the Vite template with: project description, feature list, tech stack, setup/run/build instructions, env-var table, API endpoint table, folder structure, deployment steps, scripts reference, contributor guide, contact.
- [ ] **CI** — GitHub Actions: `lint` → `build` → `test` → `e2e` on every PR to `dev`; deploy to Vercel Preview on PR, to Production on merge to `main`.
- [ ] Replace `vite@8.0.0-beta.13` with the stable release, or explicitly pin + document why the beta is required. A beta toolchain on a production site is a risk.
- [ ] Remove the committed `test_desktop.jpg` / `test_mobile.jpg` from the repo root — move them into `docs/screenshots/`.
- [ ] Set up **Google Search Console**, **Google Analytics 4** (note: two Meta Pixel IDs already exist in `index.html` — confirm only the right one fires in production), and a **basic error tracker (Sentry)** with source-map upload.
- [ ] Post-launch monitoring checklist: uptime, API 5xx rate, checkout conversion rate, Core Web Vitals, 404 report.

---

## 5. Definition of Done (ship criteria)

The website is "complete" only when **all** of these are true:

- [ ] `npm run lint` → 0 errors, 0 warnings
- [ ] `npm run build` → succeeds with no chunk > 600 KB; initial JS < 200 KB gzip
- [ ] `npm run test` → all unit tests pass, coverage > 80% on `src/hooks` and `src/utils`
- [ ] `npm run test:e2e` → all 8 critical journeys pass on Chromium + WebKit + Firefox
- [ ] Zero orphaned components — every file in `src/component` is imported somewhere
- [ ] Every route is either public-by-design or wrapped in `ProtectedRoute`
- [ ] No `alert()`, no `console.log`, no `TODO`, no `FIXME` in `src/`
- [ ] No hardcoded product/category/blog data in components (fallbacks allowed only where intentional and documented)
- [ ] Every route has a unique `<SEO>` title + description + correct canonical
- [ ] `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, JSON-LD on PDP/blog/category are live
- [ ] All 14 category pages have unique content (no duplicate body text)
- [ ] `.env.example` exists; Vercel Preview + Production env vars set
- [ ] README documents setup, env vars, and deployment
- [ ] CI is green on `dev` and `main`
- [ ] Lighthouse mobile: Perf ≥ 85, A11y ≥ 90, SEO = 100, BP ≥ 90
- [ ] Cross-device QA signed off on 5 breakpoints
- [ ] Live on the production domain with SSL + monitoring

---

## 6. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | **Backend endpoints missing** (invoice, tracking, wishlist, newsletter, forgot-password) | High | High | Confirm the backend API contract **in week 1**. Every "missing feature" above depends on an endpoint existing. Block P5 on this. |
| R2 | Category content needs marketing review cycles | High | Medium | Start content drafting during P4; book review slots now |
| R3 | 87 uncommitted files lost / conflicts | Medium | **Critical** | Commit immediately; enforce PR-only workflow on `dev` |
| R4 | Vite 8 beta breaks on a Node/Vercel version bump | Medium | High | Pin Node version in Vercel + `engines` in `package.json`; migrate to stable Vite |
| R5 | Scope creep from newly-wired orphan components | Medium | Medium | Time-box P4 to 6 days; anything extra goes to a backlog |
| R6 | Vercel build env differs from local (env vars missing) | Medium | High | `.env.example` + Vercel env config + a CI smoke test that hits the API |
| R7 | Rewriting everything to TypeScript mid-flight | Low | High | **Do not migrate to TS now.** Finish the JS site; TS migration is a separate post-launch project |
| R8 | Performance regression as more sections get wired | Medium | Medium | Set a bundle-size CI gate in P2 before P4 adds more code |
| R9 | Razorpay / COD failure paths untested | Medium | High | Add explicit sandbox test cases in P8 before going live |

---

## 7. Team Allocation (recommended 2–3 developers)

| Person | Ownership | Phases |
|---|---|---|
| **Dev A — Lead / Frontend** | Build health, routing, auth, performance | P0, P2, P3, P9 |
| **Dev B — Features** | Wire orphans, new feature set | P1, P4, P5 |
| **Dev C — Content/SEO** | Category pages, schema, content ops | P6, P7 (and assists P8) |
| **Shared** | P8 testing + QA is everyone; P9 launch is Dev A + Dev C |

If only **one developer** is available, follow the sprint calendar in §3 sequentially — it lands in **8 weeks**.

---

## 8. Week-1 Action Checklist (do these Monday morning)

1. `git add -A && git commit -m "chore: wip checkpoint before stabilization"` — **save the 90 changes now.**
2. Fix the `getProductsApi` import in `src/hooks/useRelatedProducts.js`.
3. `npm run lint` → work the 38 errors down to zero.
4. Gate the dev OTP behind `import.meta.env.DEV` in `src/pages/Auth/Login.jsx` — **ask the backend to confirm the OTP is never returned in production.**
5. Create `src/component/auth/ProtectedRoute.jsx`; guard `/profile`, `/checkouts`, `/thank-you`.
6. Add the 401 response interceptor in `src/api/axios.js`.
7. Wire `validateStep`/`goToNextStep`/`goToPrevStep` in `src/pages/Inquiry/Inquiry.jsx`.
8. Add `NotFound.jsx` + `path: "*"` + `ErrorBoundary.jsx`.
9. Create `.env.example`; confirm `VITE_GOOGLE_CLIENT_ID` and `VITE_SITE_URL` exist in Vercel.
10. Send the backend a one-page list of the endpoints you still need: **invoice (3), order tracking, wishlist, newsletter subscribe, forgot/reset password, category list with SEO content, per-page OG image.**
11. Write `.env.example` + a fresh `README.md` skeleton.
12. Schedule the marketing/content review meeting for the 14 category pages.

---

## 9. Quick Reference — File Map for the Work

| Area | Key files |
|---|---|
| Routing | `src/Routes/Route.jsx` (24 routes), `src/App.jsx` |
| Layout | `src/HOC/Wrapper.jsx`, `src/HOC/Header/*`, `src/HOC/Footer/Footer.jsx` |
| Auth | `src/pages/Auth/{Login,Register,VerifyEmail}.jsx`, `src/component/auth/LoginModal.jsx`, `src/context/AuthContext.jsx`, `src/hooks/useAuth.js`, `src/services/auth.service.js` |
| API layer | `src/api/axios.js`, `src/api/*.js` (17 modules), `src/services/*.js` |
| State/hooks | `src/hooks/{useCart,useCheckout,useCoupon,useProducts,useProductCategories,useRecentlyViewed,useRelatedProducts}.js` |
| Commerce | `src/component/ui/{Cart,Products,ProductDetail,CheckoutForm,CheckoutSummary}.jsx` |
| SEO | `src/component/SEO.jsx`, `src/config/categoryConfig.js` (1117 lines, 3 of 14 configured) |
| Content | `src/data/{blogs.js,navigationCategories.js}` |
| Assets | `public/images` (188 files — optimise to WebP), `public/font-family` (99), `public/videos` (7) |
| Orphan cleanup | 25 components listed in §2.16 — grep `grep -rn "componentName" src/` to find importers |

---

**Bottom line:** the codebase is large and visually ambitious, but it is sitting at ~45% production readiness. The path to a sellable site is **4 weeks** (P0–P3 + P9 core); the path to a genuinely complete, SEO-competitive, trustworthy site is **8 weeks solo / 5 weeks with two developers / 4 weeks with three**. Start with P0 today — the uncommitted work and the OTP leak are the two things that can hurt you right now.
