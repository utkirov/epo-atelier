<!-- app/pages/portfolio.vue -->
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

<template>
  <div>
    <AppHeader />
    <main id="main-content" class="pt-24 lg:pt-32 pb-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <!-- Page title -->
        <div class="mb-10 lg:mb-14">
          <p class="label-tag mb-4">{{ t('portfolio.label') }}</p>
          <h1 class="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-text leading-[1.1]">
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
