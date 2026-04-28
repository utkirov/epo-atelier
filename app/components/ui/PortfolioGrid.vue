<!-- app/components/ui/PortfolioGrid.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '#i18n'
import { onKeyStroke } from '@vueuse/core'

const { t } = useI18n()

interface PortfolioItemData {
  id: number
  src: string
  title: string
  description: string
  category: string
  material?: string
  dimensions?: string
  year?: string
}

defineProps<{
  items: PortfolioItemData[]
}>()

const lightboxOpen = ref(false)
const lightboxItem = ref<PortfolioItemData | null>(null)

function openLightbox(item: PortfolioItemData) {
  lightboxItem.value = item
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
  setTimeout(() => { lightboxItem.value = null }, 300)
}

onKeyStroke('Escape', () => {
  if (lightboxOpen.value) closeLightbox()
})
</script>

<template>
  <div>
    <MasonryWall :items="items" :column-width="300" :gap="16">
      <template #default="{ item }">
        <PortfolioItem
          :src="item.src"
          :title="item.title"
          :category="item.category"
          @open="openLightbox(item)"
        />
      </template>
    </MasonryWall>

    <Teleport to="body">
      <Transition name="lb-fade">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          :aria-label="lightboxItem?.title"
          @click.self="closeLightbox"
        >
          <!-- Backdrop -->
          <div
            class="absolute inset-0 bg-black/92 backdrop-blur-sm"
            aria-hidden="true"
            @click="closeLightbox"
          />

          <!-- Panel -->
          <div
            v-if="lightboxItem"
            class="lb-panel relative z-10 w-full max-w-3xl shadow-2xl"
          >
            <!-- Image area -->
            <div class="relative overflow-hidden bg-surface">
              <img
                :src="lightboxItem.src"
                :alt="lightboxItem.title"
                class="w-full max-h-[55vh] object-cover"
                @error="(e) => { const el = e.target as HTMLImageElement; el.style.minHeight = '280px'; el.style.background = 'linear-gradient(135deg,#111 0%,#1a1208 100%)' }"
              />

              <!-- Category badge -->
              <span
                v-if="lightboxItem.category"
                class="absolute top-4 left-4 label-tag text-gold bg-black/60 px-3 py-1.5 backdrop-blur-sm"
              >
                {{ t(`portfolio.filters.${lightboxItem.category}`) }}
              </span>

              <!-- Close button -->
              <button
                class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/60 border border-border hover:border-gold hover:text-gold text-text transition-all duration-200 backdrop-blur-sm"
                :aria-label="t('portfolio.close')"
                @click="closeLightbox"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Info -->
            <div class="bg-surface border border-t-0 border-border p-6 lg:p-8">
              <div class="flex items-start justify-between gap-4 mb-3">
                <h3 class="font-display text-2xl lg:text-3xl text-text leading-tight">
                  {{ lightboxItem.title }}
                </h3>
                <span
                  v-if="lightboxItem.year"
                  class="label-tag text-muted shrink-0 pt-1"
                >
                  {{ lightboxItem.year }}
                </span>
              </div>

              <p class="text-muted text-sm leading-relaxed mb-6">
                {{ lightboxItem.description }}
              </p>

              <!-- Specs -->
              <div
                v-if="lightboxItem.material || lightboxItem.dimensions"
                class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 mb-6 border-t border-border"
              >
                <div v-if="lightboxItem.material">
                  <p class="label-tag text-gold mb-1">{{ t('portfolio.material') }}</p>
                  <p class="text-text text-sm">{{ lightboxItem.material }}</p>
                </div>
                <div v-if="lightboxItem.dimensions">
                  <p class="label-tag text-gold mb-1">{{ t('portfolio.dimensions') }}</p>
                  <p class="text-text text-sm">{{ lightboxItem.dimensions }}</p>
                </div>
              </div>

              <!-- CTA -->
              <NuxtLink
                to="/#contact"
                class="btn-gold w-full text-center block"
                @click="closeLightbox"
              >
                {{ t('portfolio.order') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.lb-fade-enter-active {
  transition: opacity 260ms ease;
}
.lb-fade-leave-active {
  transition: opacity 220ms ease;
}
.lb-fade-enter-from,
.lb-fade-leave-to {
  opacity: 0;
}

.lb-panel {
  animation: lbPanelIn 300ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
.lb-fade-leave-active .lb-panel {
  animation: none;
  transition: opacity 220ms ease, transform 220ms ease;
  opacity: 0;
  transform: scale(0.96);
}

@keyframes lbPanelIn {
  from {
    opacity: 0;
    transform: scale(0.93) translateY(16px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .lb-fade-enter-active,
  .lb-fade-leave-active {
    transition: opacity 120ms ease;
  }
  .lb-panel {
    animation: none;
  }
}
</style>
