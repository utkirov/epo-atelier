<!-- app/pages/index.vue -->
<script setup lang="ts">
import { useI18n } from '#i18n'
import { useLocaleHead } from '#i18n'

const { t } = useI18n()
const localeHead = useLocaleHead({ addSeoAttributes: true })

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  title: `EPO Atelier — ${t('hero.title').replace('\n', ' ')}`,
  meta: [
    ...(localeHead.value.meta ?? []),
    { name: 'description', content: t('hero.subtitle') },
    { property: 'og:title', content: `EPO Atelier — ${t('hero.title').replace('\n', ' ')}` },
    { property: 'og:description', content: t('hero.subtitle') },
    { property: 'og:url', content: 'https://epo-atelier.uz' },
  ],
  link: localeHead.value.link ?? [],
}))
</script>

<template>
  <div>
    <AppHeader />
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BenefitsSection />
      <PortfolioPreview />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>
