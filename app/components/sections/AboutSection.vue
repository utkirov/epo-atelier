<!-- app/components/sections/AboutSection.vue -->
<script setup lang="ts">
import { useI18n } from '#i18n'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { t } = useI18n()
const { isVisible, elementRef } = useScrollAnimation()
</script>

<template>
  <section
    id="about"
    class="section-padding bg-bg"
    aria-labelledby="about-heading"
  >
    <div
      ref="elementRef"
      class="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-700 ease-out"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <!-- Text side -->
      <div>
        <p class="label-tag mb-4">{{ t('about.label') }}</p>
        <h2
          id="about-heading"
          class="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-text mb-6 leading-[1.15]"
        >
          {{ t('about.title') }}
        </h2>
        <p class="text-muted leading-relaxed max-w-prose mb-10">
          {{ t('about.text') }}
        </p>

        <!-- Stats -->
        <div class="flex flex-wrap gap-10">
          <CounterStat :value="120" suffix="+" :label="t('about.stats.projects')" />
          <CounterStat :value="5" :label="t('about.stats.experience')" />
          <CounterStat :value="3" :label="t('about.stats.masters')" />
        </div>
      </div>

      <!-- Photo side -->
      <div class="relative aspect-[4/5] overflow-hidden">
        <img
          src="/images/about-photo.jpg"
          :alt="t('about.title')"
          class="w-full h-full object-cover"
          width="600"
          height="750"
          loading="lazy"
        />
        <!-- Gold corner accent -->
        <div
          class="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-gold opacity-60"
          aria-hidden="true"
        />
        <div
          class="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-gold opacity-60"
          aria-hidden="true"
        />
      </div>
    </div>
  </section>
</template>
