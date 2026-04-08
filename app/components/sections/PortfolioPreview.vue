<!-- app/components/sections/PortfolioPreview.vue -->
<script setup lang="ts">
import { useI18n } from '#i18n'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { t } = useI18n()
const { isVisible, elementRef } = useScrollAnimation()

const previewItems = [
  { id: 1, src: '/images/portfolio/table-1.jpg', title: 'Epoxy River Table', category: 'tables' },
  { id: 2, src: '/images/portfolio/shelf-1.jpg', title: 'Modular Shelving', category: 'shelves' },
  { id: 3, src: '/images/portfolio/wardrobe-1.jpg', title: 'Custom Wardrobe', category: 'wardrobes' },
  { id: 4, src: '/images/portfolio/table-2.jpg', title: 'Live Edge Table', category: 'tables' },
]
</script>

<template>
  <section
    id="portfolio-preview"
    class="section-padding bg-bg"
    aria-labelledby="portfolio-preview-heading"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Header -->
      <div
        ref="elementRef"
        class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 lg:mb-14 transition-all duration-700 ease-out"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <div>
          <p class="label-tag text-gold mb-3">{{ t('portfolio.label') }}</p>
          <h2
            id="portfolio-preview-heading"
            class="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-text leading-[1.15]"
          >
            {{ t('portfolio.title') }}
          </h2>
        </div>
        <NuxtLink
          to="/portfolio"
          class="btn-gold flex-shrink-0"
          :aria-label="t('portfolio.ctaAria')"
        >
          {{ t('portfolio.cta') }}
        </NuxtLink>
      </div>

      <!-- Preview grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(item, i) in previewItems"
          :key="item.id"
          class="group relative overflow-hidden aspect-[4/3] transition-all duration-700 ease-out"
          :class="[
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            i === 0 ? 'md:row-span-2 md:aspect-auto' : ''
          ]"
          :style="{ transitionDelay: `${i * 100}ms` }"
        >
          <img
            :src="item.src"
            :alt="item.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            width="600"
            height="400"
            loading="lazy"
            @error="(e) => { const el = e.target as HTMLImageElement; el.style.display = 'none' }"
          />
          <!-- Placeholder when image fails -->
          <div class="preview-placeholder absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-gold-dim opacity-30">
              <rect x="3" y="3" width="18" height="18" rx="2"/><path d="m3 9 5-5 4 4 3-3 6 6"/>
            </svg>
          </div>
          <!-- Overlay -->
          <div
            class="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end p-6"
          >
            <p
              class="font-display text-xl text-text translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
            >
              {{ item.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.preview-placeholder {
  background: linear-gradient(135deg, #111111 0%, #1a1208 100%);
  z-index: 0;
}

/* btn-gold defined globally in assets/css/main.css */
</style>
