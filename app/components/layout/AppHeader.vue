<!-- app/components/layout/AppHeader.vue -->
<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useI18n, useSwitchLocalePath } from '#i18n'
import { navigateTo } from '#app'

const { t, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isScrolled = ref(false)
const mobileOpen = ref(false)
const mobileMenuRef = ref<HTMLElement | null>(null)

function onScroll() {
  isScrolled.value = window.scrollY > 60
}

function onKeydown(e: KeyboardEvent) {
  if (!mobileOpen.value) return

  if (e.key === 'Escape') {
    mobileOpen.value = false
    return
  }

  // Focus trap
  if (e.key !== 'Tab') return
  const menu = mobileMenuRef.value
  if (!menu) return

  const focusable = Array.from(
    menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  )
  if (!focusable.length) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault()
      last.focus()
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

watch(mobileOpen, async (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
    await nextTick()
    mobileMenuRef.value?.querySelector<HTMLElement>('a, button')?.focus()
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

const navLinks = [
  { key: 'nav.about', anchor: '#about' },
  { key: 'nav.services', anchor: '#services' },
  { key: 'nav.portfolio', anchor: '/portfolio' },
  { key: 'nav.contact', anchor: '#contact' },
]

const langItems = [
  [
    { label: 'RU', onSelect: () => navigateTo(switchLocalePath('ru')) },
    { label: 'UZ', onSelect: () => navigateTo(switchLocalePath('uz')) },
    { label: 'EN', onSelect: () => navigateTo(switchLocalePath('en')) },
  ]
]
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'bg-[#0A0A0ACC] backdrop-blur-md border-b border-border' : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="font-display text-xl lg:text-2xl font-bold text-gold tracking-widest hover:opacity-80 transition-opacity"
        aria-label="EPO Atelier — главная страница"
      >
        EPO ATELIER
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden lg:flex items-center gap-8" aria-label="Основная навигация">
        <template v-for="link in navLinks" :key="link.key">
          <NuxtLink
            v-if="link.anchor.startsWith('/')"
            :to="link.anchor"
            class="nav-link label-tag text-muted hover:text-gold transition-colors duration-200"
          >
            {{ t(link.key) }}
          </NuxtLink>
          <a
            v-else
            :href="link.anchor"
            class="nav-link label-tag text-muted hover:text-gold transition-colors duration-200"
          >
            {{ t(link.key) }}
          </a>
        </template>
      </nav>

      <!-- Right: lang + mobile trigger -->
      <div class="flex items-center gap-4">
        <!-- Lang switcher -->
        <UDropdownMenu :items="langItems">
          <button
            class="label-tag text-muted hover:text-gold transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
            :aria-label="t('nav.langLabel')"
          >
            {{ locale.toUpperCase() }}
          </button>
        </UDropdownMenu>

        <!-- Mobile hamburger -->
        <button
          class="lg:hidden flex flex-col gap-1.5 p-2 min-w-[44px] min-h-[44px] items-center justify-center"
          :aria-label="mobileOpen ? 'Закрыть меню' : 'Открыть меню'"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <span
            class="block w-6 h-px bg-text transition-all duration-300"
            :class="mobileOpen ? 'translate-y-[7px] rotate-45' : ''"
          />
          <span
            class="block w-6 h-px bg-text transition-all duration-300"
            :class="mobileOpen ? 'opacity-0' : ''"
          />
          <span
            class="block w-6 h-px bg-text transition-all duration-300"
            :class="mobileOpen ? '-translate-y-[7px] -rotate-45' : ''"
          />
        </button>
      </div>
    </div>

    <!-- Mobile overlay menu -->
    <Transition name="mobile-menu">
      <div
        v-if="mobileOpen"
        ref="mobileMenuRef"
        class="lg:hidden fixed inset-0 bg-bg z-50 flex flex-col items-center justify-center gap-8"
        role="dialog"
        aria-modal="true"
        aria-label="Мобильное меню"
      >
        <!-- Close button -->
        <button
          class="absolute top-5 right-5 min-w-[44px] min-h-[44px] flex items-center justify-center text-muted hover:text-gold transition-colors duration-200"
          :aria-label="t('nav.close') || 'Закрыть меню'"
          @click="mobileOpen = false"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <template v-for="(link, i) in navLinks" :key="link.key">
          <NuxtLink
            v-if="link.anchor.startsWith('/')"
            :to="link.anchor"
            class="font-display text-2xl sm:text-3xl font-bold text-text hover:text-gold transition-colors duration-200"
            :style="{ transitionDelay: `${i * 60}ms` }"
            @click="mobileOpen = false"
          >
            {{ t(link.key) }}
          </NuxtLink>
          <a
            v-else
            :href="link.anchor"
            class="font-display text-2xl sm:text-3xl font-bold text-text hover:text-gold transition-colors duration-200"
            :style="{ transitionDelay: `${i * 60}ms` }"
            @click="mobileOpen = false"
          >
            {{ t(link.key) }}
          </a>
        </template>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.nav-link {
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-gold);
  transition: width 250ms ease;
}
.nav-link:hover::after,
.router-link-active::after {
  width: 100%;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 300ms ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}
</style>
