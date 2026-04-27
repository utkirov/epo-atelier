<!-- app/components/ui/PortfolioItem.vue -->
<script setup lang="ts">
import { useI18n } from '#i18n'

const { t } = useI18n()

defineProps<{
  src: string
  title: string
  category: string
}>()

const emit = defineEmits<{
  open: [payload: { src: string; title: string }]
}>()
</script>

<template>
  <article
    class="portfolio-item group relative overflow-hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_0_1px_rgba(201,169,110,0.45),0_12px_32px_rgba(0,0,0,0.5)]"
    tabindex="0"
    :aria-label="t('portfolio.open', { title })"
    role="button"
    @click="emit('open', { src, title })"
    @keydown.enter="emit('open', { src, title })"
    @keydown.space.prevent="emit('open', { src, title })"
  >
    <img
      :src="src"
      :alt="title"
      class="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-[1.06] group-hover:[object-position:55%_55%]"
      width="600"
      height="800"
      loading="lazy"
      @error="(e) => { const el = e.target as HTMLImageElement; el.style.display = 'none' }"
    />
    <!-- Shown when image fails to load -->
    <div class="img-placeholder absolute inset-0 flex items-center justify-center">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-gold-dim opacity-40" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="m3 9 5-5 4 4 3-3 6 6"/>
      </svg>
    </div>

    <!-- Hover overlay -->
    <div
      class="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300 flex flex-col justify-end p-5 lg:p-6"
    >
      <p
        class="label-tag text-gold translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 mb-1"
      >
        {{ category }}
      </p>
      <p
        class="font-display text-lg text-text translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-[30ms]"
      >
        {{ title }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.img-placeholder {
  background: linear-gradient(135deg, #111111 0%, #1a1208 100%);
  pointer-events: none;
  z-index: 0;
}
</style>
