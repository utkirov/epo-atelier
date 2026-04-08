<!-- app/components/ui/PortfolioGrid.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '#i18n'

const { t } = useI18n()

interface PortfolioItemData {
  id: number
  src: string
  title: string
  description: string
  category: string
}

defineProps<{
  items: PortfolioItemData[]
}>()

const lightboxOpen = ref(false)
const lightboxItem = ref<{ src: string; title: string; description: string } | null>(null)

function openLightbox(item: { src: string; title: string; description?: string }) {
  lightboxItem.value = { src: item.src, title: item.title, description: item.description ?? '' }
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
  setTimeout(() => { lightboxItem.value = null }, 300)
}
</script>

<template>
  <div>
    <!-- Masonry grid (MasonryWall is globally registered via app/plugins/masonry.client.ts) -->
    <MasonryWall
      :items="items"
      :column-width="300"
      :gap="16"
    >
      <template #default="{ item }">
        <PortfolioItem
          :src="item.src"
          :title="item.title"
          :category="item.category"
          @open="openLightbox({ ...item, description: item.description })"
        />
      </template>
    </MasonryWall>

    <!-- Lightbox -->
    <UModal
      v-model:open="lightboxOpen"
      :close="false"
      :ui="{
        overlay: 'bg-black/90 backdrop-blur-md',
        content: 'bg-transparent shadow-none ring-0 max-w-4xl w-full mx-4',
      }"
    >
      <template #content>
        <div
          v-if="lightboxItem"
          class="relative"
        >
          <button
            class="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center text-text bg-black/40 hover:bg-black/70 transition-colors duration-200"
            :aria-label="t('portfolio.close')"
            @click="closeLightbox"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <img
            :src="lightboxItem.src"
            :alt="lightboxItem.title"
            class="w-full max-h-[80vh] object-contain"
          />

          <div class="p-6 bg-surface border-t border-border">
            <h3 class="font-display text-xl text-text mb-2">{{ lightboxItem.title }}</h3>
            <p v-if="lightboxItem.description" class="text-muted text-sm">{{ lightboxItem.description }}</p>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
