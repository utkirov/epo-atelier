# EPO Atelier — Premium Redesign Spec
Date: 2026-04-28

## Overview

Targeted improvements to the existing Nuxt 4 + Tailwind + Nuxt UI site for EPO Atelier (custom furniture workshop, Tashkent). No structural rewrites — upgrade visuals, animations, photos, i18n completeness, and SEO.

**Chosen direction:**
- Visual style: Minimalist luxury (gold on black, Cormorant Garamond display font)
- Animations: Dynamic — Ken Burns loop, scroll-triggered count-up counters, scale reveals
- Photos: Real images from Unsplash (downloaded to `public/images/`, free license)
- Contact form: Simulated submission (no backend integration yet)

---

## 1. Photos

### Sources
All images downloaded from Unsplash (free commercial license). No hotlinking — files committed to `public/images/`.

### Files

| Path | Subject |
|---|---|
| `public/images/hero-bg.jpg` | Dark workshop with epoxy river table, dramatic side lighting |
| `public/images/about-photo.jpg` | Close-up of craftsman hands working with wood |
| `public/images/portfolio/table-1.jpg` | Epoxy river table (walnut + blue resin) |
| `public/images/portfolio/table-2.jpg` | Live edge coffee table (elm) |
| `public/images/portfolio/table-3.jpg` | Ocean-style epoxy table |
| `public/images/portfolio/shelf-1.jpg` | Oak modular shelving unit |
| `public/images/portfolio/shelf-2.jpg` | Floating ash shelves |
| `public/images/portfolio/wardrobe-1.jpg` | Open walk-in wardrobe |
| `public/images/portfolio/wardrobe-2.jpg` | Mirrored sliding wardrobe |
| `public/images/portfolio/decor-1.jpg` | Epoxy wall art panel |

### Download approach
Fetch via `curl` from `https://source.unsplash.com/` using targeted search queries:
- Hero: query `epoxy resin table workshop dark`
- About: query `woodworking craftsman hands`
- Portfolio tables: query `epoxy river table walnut`, `live edge coffee table`, `epoxy ocean table`
- Portfolio shelves: query `oak modular shelving`, `floating wood shelves wall`
- Portfolio wardrobes: query `open walk-in wardrobe wood`, `sliding mirror wardrobe`
- Portfolio decor: query `epoxy resin wall art`

Save at 1920×1080px for hero, 800×600px for portfolio items. Use `?w=1920&q=85` parameters.

---

## 2. Animations

### Hero section (`HeroSection.vue`)
- **Ken Burns:** change `animation` from `12s ease-out forwards` to `20s ease-in-out infinite alternate` so it loops back and forth instead of stopping.
- **Overlay:** keep current fade-in.
- **Text reveal sequence:** keep existing clip-path + fadeUp chain.

### About section (`AboutSection.vue`)
- **Count-up counters:** `CounterStat.vue` gets animated counting via `useCounter.ts` (already exists). Trigger starts when element enters viewport via `IntersectionObserver`.
- **Section entrance:** `v-motion` fade-up on heading and text block.

### All sections (scroll-triggered)
- Wrap each `<section>` content with `v-motion` preset `visibleOnce` + `initial: { opacity: 0, y: 40 }` → `enter: { opacity: 1, y: 0 }`.
- Stagger child elements where applicable (benefits grid, services grid).

### Portfolio cards (`PortfolioItem.vue`)
- Hover: `transform: scale(1.03)` + gold border fade-in (200ms ease).
- Image: `object-position` shift on hover (subtle parallax feel via CSS).

### CTA button (`btn-gold` in `main.css`)
- Add shimmer sweep animation on hover: pseudo-element `::after` with `background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)` sliding across.

### Lightbox (`PortfolioGrid.vue`)
- Replace fade with zoom-in: `transform: scale(0.92) → scale(1)` + `opacity: 0 → 1` on open.

### Accessibility
- Wrap all keyframe animations in `@media (prefers-reduced-motion: no-preference)`.
- Motion components: use `v-motion` only when `prefers-reduced-motion` is not set (check via `usePreferredReducedMotion` from `@vueuse/core`).

---

## 3. i18n — Portfolio data

### Problem
`app/pages/portfolio.vue` has `allItems` array hardcoded in Russian. Titles and descriptions are not translated.

### Fix
- Move `allItems` data into i18n files under `portfolio.items[]` with `id`, `title`, `description`, `category` keys.
- `portfolio.vue` reads items via `t('portfolio.items')` (array of objects via `tm()`).
- Apply to all three locales: `ru.json`, `uz.json`, `en.json`.

---

## 4. SEO

### `nuxt.config.ts`
Add default Open Graph meta:
```ts
meta: [
  { property: 'og:type', content: 'website' },
  { property: 'og:site_name', content: 'EPO Atelier' },
  { property: 'og:image', content: '/images/hero-bg.jpg' },
  { name: 'theme-color', content: '#0A0A0A' },
]
```

### Per-page `useHead()`
- `index.vue`: title + description from i18n, og:title, og:description, og:url.
- `portfolio.vue`: already has `useHead` — add og tags + hreflang alternates.

### `hreflang` alternates
Add `<link rel="alternate" hreflang="ru|uz|en" href="...">` via `useHead` on both pages using `useSwitchLocalePath`.

---

## 5. Responsive fixes

### Mobile (375px)
- `HeroSection`: ensure `clamp(1.75rem, 7vw, 5rem)` doesn't overflow on narrow screens — verify padding.
- `AppHeader`: mobile menu z-index above all content.
- `ContactSection`: form fields full-width, no horizontal scroll.

### Tablet (768px)
- Portfolio grid: 2 columns masonry (MasonryWall `column-width: 340`).
- Services grid: 2 columns.

### Desktop (1440px)
- Max-width containers stay at `max-w-7xl` (1280px) centered.

---

## 6. `.gitignore` update

Add `.superpowers/` to `.gitignore`.

---

## Out of scope

- Real contact form backend integration (Formspree / Telegram bot)
- CMS or dynamic portfolio data
- New pages beyond index + portfolio
- Video hero background
