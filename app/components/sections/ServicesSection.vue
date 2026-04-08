<!-- app/components/sections/ServicesSection.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '#i18n'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { t, tm } = useI18n()
const { isVisible, elementRef } = useScrollAnimation()

const services = computed(() => tm('services.items') as Array<{ title: string; description: string }>)
</script>

<template>
  <section
    id="services"
    class="section-padding bg-surface"
    aria-labelledby="services-heading"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Header -->
      <div
        ref="elementRef"
        class="mb-12 lg:mb-16 transition-all duration-700 ease-out"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <p class="label-tag mb-4">{{ t('services.label') }}</p>
        <h2
          id="services-heading"
          class="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-text leading-[1.15]"
        >
          {{ t('services.title') }}
        </h2>
      </div>

      <!-- Cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        <ServiceCard
          v-for="(service, i) in services"
          :key="i"
          :title="service.title"
          :description="service.description"
          :index="i"
          :style="{ transitionDelay: `${i * 150}ms` }"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          class="transition-all duration-700 ease-out"
        />
      </div>
    </div>
  </section>
</template>
