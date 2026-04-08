// app/composables/useScrollAnimation.ts
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export function useScrollAnimation(threshold = 0.15) {
  const isVisible = ref(false)
  const elementRef = ref<HTMLElement | null>(null)

  const { stop } = useIntersectionObserver(
    elementRef,
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        stop()
      }
    },
    { threshold }
  )

  return { isVisible, elementRef }
}
