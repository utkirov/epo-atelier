<!-- app/components/ui/ServiceCard.vue -->
<script setup lang="ts">
defineProps<{
  title: string
  description: string
  index: number
}>()
</script>

<template>
  <article class="service-card group relative border border-border bg-surface p-8 lg:p-10 hover:border-gold cursor-default [transition:border-color_300ms_ease]">
    <!-- Index number -->
    <span class="label-tag text-border group-hover:text-gold-dim transition-colors duration-300 mb-6 block">
      0{{ index + 1 }}
    </span>

    <h3 class="font-display text-xl lg:text-2xl font-bold text-text mb-4 leading-snug">
      {{ title }}
    </h3>

    <p class="text-muted text-sm leading-relaxed">
      {{ description }}
    </p>

    <!-- Gold left border on hover -->
    <div
      class="absolute left-0 top-0 bottom-0 w-0.5 bg-gold scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"
      aria-hidden="true"
    />
  </article>
</template>
