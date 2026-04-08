// app/composables/useCounter.ts
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export function useCounter(target: number, duration = 2000) {
  const count = ref(0)
  const elementRef = ref<HTMLElement | null>(null)
  const started = ref(false)

  function animateCount() {
    if (started.value) return
    if (!target || target <= 0 || isNaN(target)) {
      count.value = 0
      return
    }
    if (typeof requestAnimationFrame === 'undefined') {
      count.value = target
      return
    }
    started.value = true

    const startTime = performance.now()
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      count.value = Math.round(eased * target)
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }

  const { stop } = useIntersectionObserver(
    elementRef,
    ([entry]) => {
      if (entry.isIntersecting) {
        animateCount()
        stop()
      }
    },
    { threshold: 0.3 }
  )

  return { count, elementRef }
}
