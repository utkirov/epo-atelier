<!-- app/components/ui/CounterStat.vue -->
<script setup lang="ts">
import { useCounter } from '~/composables/useCounter'

const props = defineProps<{
  value: number
  suffix?: string
  label: string
}>()

const { count, elementRef } = useCounter(props.value)
</script>

<template>
  <div ref="elementRef" class="text-center">
    <div class="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-gold leading-none mb-2">
      {{ count }}<span v-if="suffix">{{ suffix }}</span>
    </div>
    <p class="label-tag text-muted">{{ label }}</p>
  </div>
</template>
