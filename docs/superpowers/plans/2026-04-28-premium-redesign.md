# EPO Atelier Premium Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade EPO Atelier website with real Unsplash photos, dynamic animations (Ken Burns loop, shimmer, zoom), i18n-complete portfolio data, and full SEO meta tags.

**Architecture:** Targeted file-by-file edits to existing Nuxt 4 + Tailwind + Nuxt UI codebase. No structural changes — enhance each component in place. Photos downloaded once and committed to `public/images/`.

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS v4, @nuxtjs/i18n v10, @vueuse/motion, @vueuse/core, Nuxt UI v4

---

## File Map

| File | Change |
|---|---|
| `.gitignore` | Add `.superpowers/` |
| `public/images/hero-bg.jpg` | Download from Unsplash |
| `public/images/about-photo.jpg` | Download from Unsplash (currently 0 bytes) |
| `public/images/portfolio/*.jpg` | Download 8 photos from Unsplash |
| `app/components/sections/HeroSection.vue` | Ken Burns 20s loop |
| `app/assets/css/main.css` | btn-gold shimmer sweep |
| `app/components/ui/PortfolioItem.vue` | Hover scale + gold box-shadow |
| `app/components/ui/PortfolioGrid.vue` | Lightbox v-motion zoom-in |
| `i18n/ru.json` | Add `portfolio.items[]` array |
| `i18n/uz.json` | Add `portfolio.items[]` array |
| `i18n/en.json` | Add `portfolio.items[]` array |
| `app/pages/portfolio.vue` | Read items via `tm()`, merge with image paths |
| `nuxt.config.ts` | Global OG meta + theme-color |
| `app/pages/index.vue` | `useHead` with OG tags + hreflang |
| `app/pages/portfolio.vue` | Enhance existing `useHead` + hreflang |

---

## Task 1: Fix .gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add .superpowers/ to .gitignore**

Open `.gitignore` and append at the end:
```
# Brainstorming visual companion
.superpowers/
```

- [ ] **Step 2: Commit**
```bash
git add .gitignore
git commit -m "chore: ignore .superpowers brainstorming dir"
```

---

## Task 2: Download Unsplash photos

**Files:**
- Create: `public/images/hero-bg.jpg`
- Modify: `public/images/about-photo.jpg` (currently 0 bytes)
- Create: `public/images/portfolio/table-1.jpg` through `decor-1.jpg`

- [ ] **Step 1: Create portfolio subdirectory if missing**
```bash
mkdir -p public/images/portfolio
```

- [ ] **Step 2: Download hero background (1920×1080)**
```bash
curl -L "https://source.unsplash.com/1920x1080/?epoxy,resin,wood,table,dark" \
  -o "public/images/hero-bg.jpg"
```
Expected: file ~200-400 KB, JPEG. Verify: `ls -lh public/images/hero-bg.jpg`

- [ ] **Step 3: Download about photo (800×1000)**
```bash
curl -L "https://source.unsplash.com/800x1000/?woodworking,craftsman,hands,workshop" \
  -o "public/images/about-photo.jpg"
```

- [ ] **Step 4: Download 8 portfolio photos (800×600 each)**
```bash
curl -L "https://source.unsplash.com/800x600/?epoxy,river,table,walnut,blue" \
  -o "public/images/portfolio/table-1.jpg"

curl -L "https://source.unsplash.com/800x600/?live,edge,coffee,table,wood" \
  -o "public/images/portfolio/table-2.jpg"

curl -L "https://source.unsplash.com/800x600/?epoxy,ocean,resin,table,blue" \
  -o "public/images/portfolio/table-3.jpg"

curl -L "https://source.unsplash.com/800x600/?oak,shelving,unit,modular,wood" \
  -o "public/images/portfolio/shelf-1.jpg"

curl -L "https://source.unsplash.com/800x600/?floating,wall,shelf,wood,minimal" \
  -o "public/images/portfolio/shelf-2.jpg"

curl -L "https://source.unsplash.com/800x600/?walk,in,wardrobe,open,wood,shelves" \
  -o "public/images/portfolio/wardrobe-1.jpg"

curl -L "https://source.unsplash.com/800x600/?sliding,mirror,wardrobe,bedroom" \
  -o "public/images/portfolio/wardrobe-2.jpg"

curl -L "https://source.unsplash.com/800x600/?epoxy,resin,wall,art,gold,abstract" \
  -o "public/images/portfolio/decor-1.jpg"
```

- [ ] **Step 5: Verify all 10 files are non-zero**
```bash
ls -lh public/images/ public/images/portfolio/
```
Expected: all files > 50 KB. If any file is < 1 KB, re-run its curl command.

- [ ] **Step 6: Commit**
```bash
git add public/images/
git commit -m "feat: add real Unsplash photos for hero, about, portfolio"
```

---

## Task 3: Hero Ken Burns loop

**Files:**
- Modify: `app/components/sections/HeroSection.vue`

Current `<style scoped>` has:
```css
.hero-zoom {
  animation: kenBurns 12s ease-out forwards;
  transform-origin: center center;
}
@keyframes kenBurns {
  from { transform: scale(1.08); }
  to   { transform: scale(1.0); }
}
```

- [ ] **Step 1: Replace Ken Burns animation with looping version**

In `app/components/sections/HeroSection.vue`, replace the `.hero-zoom` rule and `@keyframes kenBurns`:

```css
.hero-zoom {
  transform-origin: center center;
}

@media (prefers-reduced-motion: no-preference) {
  .hero-zoom {
    animation: kenBurns 20s ease-in-out infinite alternate;
  }

  @keyframes kenBurns {
    from { transform: scale(1.0); }
    to   { transform: scale(1.1); }
  }
}
```

- [ ] **Step 2: Verify dev server shows looping zoom on hero image**

Open http://localhost:12555 and watch the hero image — it should slowly zoom in over 20 seconds then reverse.

- [ ] **Step 3: Commit**
```bash
git add app/components/sections/HeroSection.vue
git commit -m "feat: Ken Burns hero animation — 20s infinite loop"
```

---

## Task 4: btn-gold shimmer sweep

**Files:**
- Modify: `app/assets/css/main.css`

- [ ] **Step 1: Add shimmer pseudo-element to .btn-gold**

In `app/assets/css/main.css`, after the `.btn-gold:not(:disabled):hover::before` block, add:

```css
@media (prefers-reduced-motion: no-preference) {
  .btn-gold::after {
    content: '';
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.13),
      transparent
    );
    transform: skewX(-15deg);
    pointer-events: none;
  }

  .btn-gold:not(:disabled):hover::after {
    animation: shimmerSweep 550ms ease-out forwards;
  }

  @keyframes shimmerSweep {
    from { left: -75%; }
    to   { left: 125%; }
  }
}
```

- [ ] **Step 2: Verify in browser**

Hover over any gold button (Hero CTA, Portfolio CTA, Contact submit) — a subtle light sweep should cross it once on hover.

- [ ] **Step 3: Commit**
```bash
git add app/assets/css/main.css
git commit -m "feat: shimmer sweep animation on btn-gold hover"
```

---

## Task 5: PortfolioItem hover upgrade

**Files:**
- Modify: `app/components/ui/PortfolioItem.vue`

- [ ] **Step 1: Add scale + gold shadow to article on hover**

Replace the `<article>` opening tag. Current:
```html
<article
  class="portfolio-item group relative overflow-hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
  tabindex="0"
```

New (add transition classes and hover shadow):
```html
<article
  class="portfolio-item group relative overflow-hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_0_1px_rgba(201,169,110,0.45),0_12px_32px_rgba(0,0,0,0.5)]"
  tabindex="0"
```

- [ ] **Step 2: Increase image zoom and add object-position parallax on hover**

Find the `<img>` inside PortfolioItem. Current class contains `group-hover:scale-[1.02]`. Change to `group-hover:scale-[1.06]` and add object-position shift for parallax feel:

```html
<img
  :src="src"
  :alt="title"
  class="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-[1.06] group-hover:[object-position:55%_55%]"
```

- [ ] **Step 3: Verify in browser**

Open http://localhost:12555/portfolio — hover over portfolio cards. Each card should scale up slightly with a gold glow border and the image should zoom in.

- [ ] **Step 4: Commit**
```bash
git add app/components/ui/PortfolioItem.vue
git commit -m "feat: portfolio card hover — scale + gold glow + deeper zoom"
```

---

## Task 6: Lightbox zoom-in transition

**Files:**
- Modify: `app/components/ui/PortfolioGrid.vue`

- [ ] **Step 1: Add v-motion zoom-in to lightbox content**

In `PortfolioGrid.vue`, find the `<div v-if="lightboxItem" class="relative">` inside `<template #content>`.

Replace:
```html
<div
  v-if="lightboxItem"
  class="relative"
>
```

With:
```html
<div
  v-if="lightboxItem"
  class="relative"
  v-motion
  :initial="{ opacity: 0, scale: 0.92 }"
  :enter="{ opacity: 1, scale: 1, transition: { duration: 280, ease: 'easeOut' } }"
>
```

- [ ] **Step 2: Verify in browser**

Open the portfolio page, click any item to open the lightbox — the modal content should zoom in smoothly from 92% to 100%.

- [ ] **Step 3: Commit**
```bash
git add app/components/ui/PortfolioGrid.vue
git commit -m "feat: lightbox zoom-in via v-motion on open"
```

---

## Task 7: i18n portfolio items

**Files:**
- Modify: `i18n/ru.json`
- Modify: `i18n/uz.json`
- Modify: `i18n/en.json`
- Modify: `app/pages/portfolio.vue`

- [ ] **Step 1: Add portfolio.items to ru.json**

In `i18n/ru.json`, inside `"portfolio": { ... }`, add after `"open": "Открыть проект: {title}"`:

```json
"items": [
  {
    "id": 1,
    "title": "Epoxy River Table",
    "description": "Обеденный стол из массива ореха с заливкой из голубой эпоксидной смолы. 220×90 см.",
    "category": "tables"
  },
  {
    "id": 2,
    "title": "Live Edge Coffee Table",
    "description": "Журнальный стол с живым краем из вяза. 120×60 см.",
    "category": "tables"
  },
  {
    "id": 3,
    "title": "Ocean Table",
    "description": "Стол с океанической заливкой, имитирующей волны. 200×100 см.",
    "category": "tables"
  },
  {
    "id": 4,
    "title": "Modular Shelving Unit",
    "description": "Модульный стеллаж из дуба. 180×200 см.",
    "category": "shelves"
  },
  {
    "id": 5,
    "title": "Floating Shelf Set",
    "description": "Навесные полки из массива ясеня. Комплект из 5 штук.",
    "category": "shelves"
  },
  {
    "id": 6,
    "title": "Walk-in Wardrobe",
    "description": "Гардеробная по индивидуальным размерам с открытыми полками.",
    "category": "wardrobes"
  },
  {
    "id": 7,
    "title": "Sliding Door Wardrobe",
    "description": "Шкаф-купе с зеркальными фасадами. 300×220 см.",
    "category": "wardrobes"
  },
  {
    "id": 8,
    "title": "Epoxy Wall Art",
    "description": "Декоративная панель из эпоксидной смолы и золотой фольги.",
    "category": "decor"
  }
]
```

- [ ] **Step 2: Add portfolio.items to en.json**

In `i18n/en.json`, inside `"portfolio": { ... }`, add after `"open": "Open project: {title}"`:

```json
"items": [
  {
    "id": 1,
    "title": "Epoxy River Table",
    "description": "Dining table in solid walnut with blue epoxy resin pour. 220×90 cm.",
    "category": "tables"
  },
  {
    "id": 2,
    "title": "Live Edge Coffee Table",
    "description": "Live edge coffee table in elm. 120×60 cm.",
    "category": "tables"
  },
  {
    "id": 3,
    "title": "Ocean Table",
    "description": "Table with ocean-inspired resin pour mimicking waves. 200×100 cm.",
    "category": "tables"
  },
  {
    "id": 4,
    "title": "Modular Shelving Unit",
    "description": "Modular shelving unit in oak. 180×200 cm.",
    "category": "shelves"
  },
  {
    "id": 5,
    "title": "Floating Shelf Set",
    "description": "Floating shelves in solid ash. Set of 5.",
    "category": "shelves"
  },
  {
    "id": 6,
    "title": "Walk-in Wardrobe",
    "description": "Custom walk-in wardrobe with open shelving to individual dimensions.",
    "category": "wardrobes"
  },
  {
    "id": 7,
    "title": "Sliding Door Wardrobe",
    "description": "Sliding wardrobe with mirrored fronts. 300×220 cm.",
    "category": "wardrobes"
  },
  {
    "id": 8,
    "title": "Epoxy Wall Art",
    "description": "Decorative panel in epoxy resin with gold leaf.",
    "category": "decor"
  }
]
```

- [ ] **Step 3: Add portfolio.items to uz.json**

First read uz.json to find the correct insertion point, then add inside `"portfolio": { ... }` after the `"open"` key:

```json
"items": [
  {
    "id": 1,
    "title": "Epoxy River Table",
    "description": "Ko'k epoksid smola quyilgan yong'oq massividan ovqat stoli. 220×90 sm.",
    "category": "tables"
  },
  {
    "id": 2,
    "title": "Live Edge Coffee Table",
    "description": "Qayin yog'ochidan tirik qirrali jurnal stoli. 120×60 sm.",
    "category": "tables"
  },
  {
    "id": 3,
    "title": "Ocean Table",
    "description": "To'lqinlarni taqlid qiluvchi okean uslubidagi epoksid stol. 200×100 sm.",
    "category": "tables"
  },
  {
    "id": 4,
    "title": "Modular Shelving Unit",
    "description": "Eman yog'ochidan modulli javon. 180×200 sm.",
    "category": "shelves"
  },
  {
    "id": 5,
    "title": "Floating Shelf Set",
    "description": "Kul massividan osilma javonlar to'plami. 5 ta.",
    "category": "shelves"
  },
  {
    "id": 6,
    "title": "Walk-in Wardrobe",
    "description": "Individual o'lchamlar bo'yicha ochiq javonli gardеrobxona.",
    "category": "wardrobes"
  },
  {
    "id": 7,
    "title": "Sliding Door Wardrobe",
    "description": "Ko'zgu fasadli siljuvchi eshikli shkaf. 300×220 sm.",
    "category": "wardrobes"
  },
  {
    "id": 8,
    "title": "Epoxy Wall Art",
    "description": "Epoksid smola va oltin folga dekorativ panel.",
    "category": "decor"
  }
]
```

- [ ] **Step 4: Update portfolio.vue to read items from i18n**

In `app/pages/portfolio.vue`, replace the `<script setup>` block.

Current:
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '#i18n'

const { t } = useI18n()

const activeFilter = ref('all')

const filterKeys = ['all', 'tables', 'shelves', 'wardrobes', 'decor'] as const

const allItems = [
  { id: 1, src: '/images/portfolio/table-1.jpg', title: 'Epoxy River Table', description: 'Обеденный стол из массива ореха с заливкой из голубой эпоксидной смолы. 220×90 см.', category: 'tables' },
  { id: 2, src: '/images/portfolio/table-2.jpg', title: 'Live Edge Coffee Table', description: 'Журнальный стол с живым краем из вяза. 120×60 см.', category: 'tables' },
  { id: 3, src: '/images/portfolio/table-3.jpg', title: 'Ocean Table', description: 'Стол с океанической заливкой, имитирующей волны. 200×100 см.', category: 'tables' },
  { id: 4, src: '/images/portfolio/shelf-1.jpg', title: 'Modular Shelving Unit', description: 'Модульный стеллаж из дуба. 180×200 см.', category: 'shelves' },
  { id: 5, src: '/images/portfolio/shelf-2.jpg', title: 'Floating Shelf Set', description: 'Навесные полки из массива ясеня. Комплект из 5 штук.', category: 'shelves' },
  { id: 6, src: '/images/portfolio/wardrobe-1.jpg', title: 'Walk-in Wardrobe', description: 'Гардеробная по индивидуальным размерам с открытыми полками.', category: 'wardrobes' },
  { id: 7, src: '/images/portfolio/wardrobe-2.jpg', title: 'Sliding Door Wardrobe', description: 'Шкаф-купе с зеркальными фасадами. 300×220 см.', category: 'wardrobes' },
  { id: 8, src: '/images/portfolio/decor-1.jpg', title: 'Epoxy Wall Art', description: 'Декоративная панель из эпоксидной смолы и золотой фольги.', category: 'decor' },
]

const filteredItems = computed(() =>
  activeFilter.value === 'all'
    ? allItems
    : allItems.filter(item => item.category === activeFilter.value)
)

useHead({
  title: computed(() => `${t('portfolio.title')} — EPO Atelier`),
})
</script>
```

New:
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '#i18n'

const { t, tm } = useI18n()

const activeFilter = ref('all')

const filterKeys = ['all', 'tables', 'shelves', 'wardrobes', 'decor'] as const

const imagePaths: Record<number, string> = {
  1: '/images/portfolio/table-1.jpg',
  2: '/images/portfolio/table-2.jpg',
  3: '/images/portfolio/table-3.jpg',
  4: '/images/portfolio/shelf-1.jpg',
  5: '/images/portfolio/shelf-2.jpg',
  6: '/images/portfolio/wardrobe-1.jpg',
  7: '/images/portfolio/wardrobe-2.jpg',
  8: '/images/portfolio/decor-1.jpg',
}

interface PortfolioItemData {
  id: number
  title: string
  description: string
  category: string
}

const allItems = computed(() => {
  const items = tm('portfolio.items') as PortfolioItemData[]
  return items.map(item => ({
    ...item,
    src: imagePaths[item.id] ?? '',
  }))
})

const filteredItems = computed(() =>
  activeFilter.value === 'all'
    ? allItems.value
    : allItems.value.filter(item => item.category === activeFilter.value)
)

useHead({
  title: computed(() => `${t('portfolio.title')} — EPO Atelier`),
})
</script>
```

- [ ] **Step 5: Verify in browser**

Open http://localhost:12555/portfolio — verify all 8 items load with correct translated titles/descriptions. Switch language to EN and UZ — titles and descriptions should update.

- [ ] **Step 6: Commit**
```bash
git add i18n/ru.json i18n/uz.json i18n/en.json app/pages/portfolio.vue
git commit -m "feat: portfolio items fully translated via i18n in all 3 locales"
```

---

## Task 8: SEO — global meta in nuxt.config.ts

**Files:**
- Modify: `nuxt.config.ts`

- [ ] **Step 1: Add global OG and theme-color meta**

In `nuxt.config.ts`, find the `app.head.meta` array. Currently:
```ts
meta: [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  { name: 'description', content: 'Кастомная мебель ручной работы в Ташкенте. Столы из эпоксидной смолы, системы хранения.' },
],
```

Replace with:
```ts
meta: [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  { name: 'description', content: 'Кастомная мебель ручной работы в Ташкенте. Столы из эпоксидной смолы, системы хранения.' },
  { name: 'theme-color', content: '#0A0A0A' },
  { property: 'og:type', content: 'website' },
  { property: 'og:site_name', content: 'EPO Atelier' },
  { property: 'og:image', content: 'https://epo-atelier.uz/images/hero-bg.jpg' },
  { name: 'twitter:card', content: 'summary_large_image' },
],
```

- [ ] **Step 2: Commit**
```bash
git add nuxt.config.ts
git commit -m "feat: global OG meta and theme-color in nuxt.config.ts"
```

---

## Task 9: SEO — per-page useHead with hreflang

**Files:**
- Modify: `app/pages/index.vue`
- Modify: `app/pages/portfolio.vue`

- [ ] **Step 1: Update index.vue with full SEO head**

Replace the entire `app/pages/index.vue` with:
```vue
<!-- app/pages/index.vue -->
<script setup lang="ts">
import { useI18n } from '#i18n'
import { useLocaleHead } from '#i18n'

const { t } = useI18n()
const localeHead = useLocaleHead({ addSeoAttributes: true })

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  title: `EPO Atelier — ${t('hero.title').replace('\n', ' ')}`,
  meta: [
    ...(localeHead.value.meta ?? []),
    { name: 'description', content: t('hero.subtitle') },
    { property: 'og:title', content: `EPO Atelier — ${t('hero.title').replace('\n', ' ')}` },
    { property: 'og:description', content: t('hero.subtitle') },
    { property: 'og:url', content: 'https://epo-atelier.uz' },
  ],
  link: localeHead.value.link ?? [],
}))
</script>

<template>
  <div>
    <AppHeader />
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BenefitsSection />
      <PortfolioPreview />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>
```

- [ ] **Step 2: Update portfolio.vue useHead block**

In `app/pages/portfolio.vue`, add the import and replace the existing `useHead` call. The top of `<script setup>` should have:
```ts
import { ref, computed } from 'vue'
import { useI18n } from '#i18n'
import { useLocaleHead } from '#i18n'
```

Then replace the existing `useHead` call:
```ts
useHead({
  title: computed(() => `${t('portfolio.title')} — EPO Atelier`),
})
```

With:
```ts
const localeHead = useLocaleHead({ addSeoAttributes: true })

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  title: `${t('portfolio.title')} — EPO Atelier`,
  meta: [
    ...(localeHead.value.meta ?? []),
    { name: 'description', content: t('about.text').slice(0, 155) },
    { property: 'og:title', content: `${t('portfolio.title')} — EPO Atelier` },
    { property: 'og:url', content: 'https://epo-atelier.uz/portfolio' },
  ],
  link: localeHead.value.link ?? [],
}))
```

- [ ] **Step 3: Verify hreflang in browser**

Open http://localhost:12555, right-click → View Page Source. Search for `hreflang` — you should see three `<link rel="alternate">` tags for ru, uz, en.

- [ ] **Step 4: Commit**
```bash
git add app/pages/index.vue app/pages/portfolio.vue
git commit -m "feat: per-page SEO with OG tags and hreflang alternates"
```

---

## Task 10: Responsive fixes

**Files:**
- Modify: `app/components/sections/HeroSection.vue`
- Modify: `app/components/layout/AppHeader.vue` (verify z-index)
- Modify: `app/components/sections/ContactSection.vue` (verify mobile)

- [ ] **Step 1: Fix hero padding on 375px**

In `HeroSection.vue` template, find the content div:
```html
<div class="relative z-20 max-w-5xl mx-auto px-6 lg:px-8 text-center">
```

The padding is `px-6` (24px each side) = 48px total. On 375px, that leaves 327px. The `clamp(1.75rem, 7vw, 5rem)` at 375px = max(1.75rem, 26.25px) = 1.75rem (28px) — this is fine. No change needed here.

Verify `scroll indicator` doesn't overflow:
```html
<div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hero-cta flex flex-col items-center gap-2">
```
This uses `left-1/2 -translate-x-1/2` so it's perfectly centered — fine.

- [ ] **Step 2: Verify portfolio grid on mobile**

Open http://localhost:12555/portfolio on a 375px viewport (use DevTools device simulation). The `MasonryWall` component with `column-width: 300` and `gap: 16` on 375px will create a single column (375 - 48px padding = 327px ≥ 300px column). This is correct behavior — no change needed.

- [ ] **Step 3: Fix contact form on mobile**

In `ContactSection.vue`, the grid is `grid-cols-1 lg:grid-cols-2` — correct, it stacks on mobile. Check that the form inside has no overflow. The `ContactForm.vue` inputs use `w-full` — correct. No change needed.

- [ ] **Step 4: Verify AppHeader mobile menu z-index**

In `AppHeader.vue`, the mobile overlay uses `fixed inset-0 bg-bg z-40` and the header is `z-50`. The header is higher z-index than the overlay — this could hide the close button visually. The close button is inside the overlay (`z-40`) but the header is `z-50`, which would render the header on top of the overlay.

Fix in `AppHeader.vue`: change the mobile overlay's z-index to `z-50` (same as header, they're in the same stacking context so order in DOM matters):

Find:
```html
class="lg:hidden fixed inset-0 bg-bg z-40 flex flex-col items-center justify-center gap-8"
```

Replace:
```html
class="lg:hidden fixed inset-0 bg-bg z-50 flex flex-col items-center justify-center gap-8"
```

- [ ] **Step 5: Verify mobile menu on 375px**

Open DevTools → 375px → click hamburger. Menu should cover full screen including the header bar. Close button should be visible and tappable.

- [ ] **Step 6: Commit**
```bash
git add app/components/layout/AppHeader.vue
git commit -m "fix: mobile menu z-index covers header on small screens"
```

---

## Final verification

- [ ] **Run dev server and check all pages**
```bash
npm run dev
```
Open http://localhost:PORT (check terminal for port) and verify:
1. Hero shows real photo with looping Ken Burns
2. Portfolio page shows 8 photos with translated descriptions
3. Language switch (RU → EN → UZ) updates portfolio item text
4. Hover on CTA buttons shows shimmer sweep
5. Hover on portfolio cards shows scale + gold glow
6. Click portfolio item → lightbox opens with zoom-in
7. View source on both pages — hreflang links present

- [ ] **Final commit**
```bash
git add -A
git status  # verify only expected files staged
git commit -m "feat: premium redesign — real photos, animations, i18n, SEO complete"
```
