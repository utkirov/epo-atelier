<!-- app/pages/portfolio.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n, useLocaleHead } from '#i18n'

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
</script>

<template>
  <div>
    <AppHeader />
    <main id="main-content" class="pt-24 lg:pt-32 pb-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <!-- Page title -->
        <div class="mb-10 lg:mb-14">
          <p class="label-tag text-gold mb-4">{{ t('portfolio.label') }}</p>
          <h1 class="font-display text-[clamp(2rem,6vw,5rem)] lg:text-5xl xl:text-6xl font-bold text-text leading-[1.1]">
            {{ t('portfolio.title') }}
          </h1>
        </div>

        <!-- Filters -->
        <div
          class="flex flex-wrap gap-2 mb-10 lg:mb-14"
          role="group"
          :aria-label="t('portfolio.label')"
        >
          <button
            v-for="key in filterKeys"
            :key="key"
            class="label-tag px-4 py-2 border transition-all duration-200 min-h-[44px]"
            :class="activeFilter === key
              ? 'border-gold text-gold'
              : 'border-border text-muted hover:border-muted hover:text-text'"
            :aria-pressed="activeFilter === key"
            @click="activeFilter = key"
          >
            {{ t(`portfolio.filters.${key}`) }}
          </button>
        </div>

        <!-- Grid -->
        <PortfolioGrid :items="filteredItems" />
      </div>
    </main>
    <AppFooter />
  </div>
</template>
