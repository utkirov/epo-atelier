<!-- app/components/sections/HeroSection.vue -->
<script setup lang="ts">
import { useI18n } from '#i18n'
const { t } = useI18n()
</script>

<template>
  <section
    class="relative min-h-dvh flex items-center justify-center overflow-hidden"
    aria-label="Главный баннер"
  >
    <!-- Background image with Ken Burns -->
    <div class="hero-bg absolute inset-0 z-0">
      <img
        src="/images/hero-bg.jpg"
        alt=""
        role="presentation"
        class="w-full h-full object-cover hero-zoom"
        width="1920"
        height="1080"
        fetchpriority="high"
        @error="(e) => ((e.target as HTMLImageElement).style.display = 'none')"
      />
    </div>

    <!-- Dark overlay -->
    <div class="hero-overlay absolute inset-0 z-10 bg-black" />

    <!-- Content -->
    <div class="relative z-20 max-w-5xl mx-auto px-6 lg:px-8 text-center">
      <p class="label-tag text-gold hero-label mb-6">EPO ATELIER · TASHKENT</p>

      <h1 class="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-text leading-[1.1] mb-6 hero-title whitespace-pre-line">
        {{ t('hero.title') }}
      </h1>

      <p class="text-muted text-sm md:text-md max-w-lg mx-auto mb-10 hero-subtitle">
        {{ t('hero.subtitle') }}
      </p>

      <NuxtLink
        to="/portfolio"
        class="hero-cta inline-block btn-gold"
        aria-label="Перейти к портфолио работ"
      >
        {{ t('hero.cta') }}
      </NuxtLink>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hero-cta flex flex-col items-center gap-2">
      <span class="label-tag text-muted opacity-60">scroll</span>
      <div class="w-px h-12 bg-gradient-to-b from-gold to-transparent" aria-hidden="true" />
    </div>
  </section>
</template>

<style scoped>
/* Fallback gradient when hero-bg.jpg is missing */
.hero-bg {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1208 50%, #0f0d07 100%);
}

/* Ken Burns zoom */
.hero-zoom {
  animation: kenBurns 12s ease-out forwards;
  transform-origin: center center;
}

@keyframes kenBurns {
  from { transform: scale(1.08); }
  to   { transform: scale(1.0); }
}

/* Dark overlay fade in */
.hero-overlay {
  animation: overlayFade 1.2s ease-out forwards;
  opacity: 0;
}

@keyframes overlayFade {
  from { opacity: 0; }
  to   { opacity: 0.65; }
}

/* Label reveal */
.hero-label {
  animation: fadeUp 600ms ease-out 0.4s both;
}

/* Title clip-path reveal */
.hero-title {
  animation: titleReveal 900ms cubic-bezier(0.16, 1, 0.3, 1) 0.8s both;
  clip-path: inset(100% 0 0 0);
}

@keyframes titleReveal {
  from { clip-path: inset(100% 0 0 0); }
  to   { clip-path: inset(0% 0 0 0); }
}

/* Subtitle fade up */
.hero-subtitle {
  animation: fadeUp 700ms ease-out 1.4s both;
}

/* CTA fade */
.hero-cta {
  animation: fadeUp 600ms ease-out 2.0s both;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* btn-gold defined globally in assets/css/main.css */
</style>
