<!-- app/components/layout/AppFooter.vue -->
<script setup lang="ts">
import { useI18n } from '#i18n'
const { t } = useI18n()
</script>

<template>
  <footer class="border-t border-border bg-surface">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="font-display text-xl font-bold text-gold tracking-widest hover:opacity-80 transition-opacity"
        >
          EPO ATELIER
        </NuxtLink>

        <!-- Nav -->
        <nav class="flex flex-wrap gap-6" aria-label="Навигация в подвале">
          <a href="#about" class="label-tag text-muted hover:text-gold transition-colors duration-200">{{ t('nav.about') }}</a>
          <a href="#services" class="label-tag text-muted hover:text-gold transition-colors duration-200">{{ t('nav.services') }}</a>
          <NuxtLink to="/portfolio" class="label-tag text-muted hover:text-gold transition-colors duration-200">{{ t('nav.portfolio') }}</NuxtLink>
          <a href="#contact" class="label-tag text-muted hover:text-gold transition-colors duration-200">{{ t('nav.contact') }}</a>
        </nav>

        <!-- Socials -->
        <div class="flex items-center gap-4">
          <a
            href="https://t.me/epo_atelier"
            target="_blank"
            rel="noopener noreferrer"
            class="min-w-[44px] min-h-[44px] flex items-center justify-center text-muted hover:text-gold transition-colors duration-200"
            aria-label="Telegram EPO Atelier"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.26l-2.947-.924c-.64-.203-.654-.64.136-.954l11.57-4.461c.532-.194.998.13.975.3z"/>
            </svg>
          </a>
          <a
            href="https://instagram.com/epo_atelier"
            target="_blank"
            rel="noopener noreferrer"
            class="min-w-[44px] min-h-[44px] flex items-center justify-center text-muted hover:text-gold transition-colors duration-200"
            aria-label="Instagram EPO Atelier"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-border">
        <p class="label-tag text-muted text-center">{{ t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>
