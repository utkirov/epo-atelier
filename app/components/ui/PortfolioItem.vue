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
    class="portfolio-item group relative overflow-hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
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
      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      width="600"
      height="800"
      loading="lazy"
    />

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
