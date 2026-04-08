<!-- app/components/sections/ContactSection.vue -->
<script setup lang="ts">
import { useI18n } from '#i18n'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { t } = useI18n()
const { isVisible, elementRef } = useScrollAnimation()
</script>

<template>
  <section
    id="contact"
    class="section-padding bg-surface"
    aria-labelledby="contact-heading"
  >
    <div
      ref="elementRef"
      class="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 transition-all duration-700 ease-out"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <!-- Left: info -->
      <div>
        <p class="label-tag mb-4">{{ t('contact.label') }}</p>
        <h2
          id="contact-heading"
          class="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-text mb-8 leading-[1.15]"
        >
          {{ t('contact.title') }}
        </h2>

        <div class="space-y-4 mb-8">
          <a
            :href="`tel:${t('contact.phone').replace(/\s/g, '')}`"
            class="flex items-center gap-3 text-muted hover:text-gold transition-colors duration-200 group min-h-[44px]"
          >
            <svg class="w-5 h-5 text-gold-dim group-hover:text-gold transition-colors flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
            <span class="text-sm">{{ t('contact.phone') }}</span>
          </a>

          <a
            :href="`mailto:${t('contact.email')}`"
            class="flex items-center gap-3 text-muted hover:text-gold transition-colors duration-200 group min-h-[44px]"
          >
            <svg class="w-5 h-5 text-gold-dim group-hover:text-gold transition-colors flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
            <span class="text-sm">{{ t('contact.email') }}</span>
          </a>

          <div class="flex items-start gap-3 text-muted min-h-[44px]">
            <svg class="w-5 h-5 text-gold-dim mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
            <span class="text-sm">{{ t('contact.address') }}</span>
          </div>
        </div>

        <!-- Socials -->
        <div class="flex items-center gap-4">
          <a
            href="https://t.me/epo_atelier"
            target="_blank"
            rel="noopener noreferrer"
            class="label-tag text-muted hover:text-gold transition-colors duration-200 min-h-[44px] flex items-center"
            aria-label="Telegram"
          >
            Telegram
          </a>
          <span class="text-border" aria-hidden="true">·</span>
          <a
            href="https://instagram.com/epo_atelier"
            target="_blank"
            rel="noopener noreferrer"
            class="label-tag text-muted hover:text-gold transition-colors duration-200 min-h-[44px] flex items-center"
            aria-label="Instagram"
          >
            Instagram
          </a>
        </div>
      </div>

      <!-- Right: form -->
      <div>
        <ContactForm />
      </div>
    </div>
  </section>
</template>
