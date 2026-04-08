<!-- app/components/ui/ContactForm.vue -->
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from '#i18n'

const { t } = useI18n()

const form = reactive({ name: '', phone: '', message: '' })
const errors = reactive({ name: '', phone: '', message: '' })
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

function validate() {
  let valid = true
  errors.name = form.name.trim() ? '' : t('contact.form.required')
  errors.phone = form.phone.trim() ? '' : t('contact.form.required')
  errors.message = form.message.trim() ? '' : t('contact.form.required')
  if (errors.name || errors.phone || errors.message) valid = false
  return valid
}

async function submit() {
  if (!validate()) return
  status.value = 'sending'
  try {
    // Simulated form submission (replace with real API endpoint)
    await new Promise(resolve => setTimeout(resolve, 1200))
    status.value = 'success'
    form.name = ''
    form.phone = ''
    form.message = ''
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <form
    class="space-y-6"
    novalidate
    @submit.prevent="submit"
    aria-label="Форма обратной связи"
  >
    <!-- Name -->
    <div>
      <label for="contact-name" class="label-tag text-muted block mb-2">
        {{ t('contact.form.name') }} <span class="text-gold" aria-hidden="true">*</span>
      </label>
      <input
        id="contact-name"
        v-model="form.name"
        type="text"
        autocomplete="name"
        :aria-describedby="errors.name ? 'name-error' : undefined"
        :aria-invalid="!!errors.name"
        class="w-full bg-transparent border border-border px-4 py-3 text-text text-sm focus:border-gold focus:outline-none transition-colors duration-200 min-h-[44px]"
      />
      <p
        v-if="errors.name"
        id="name-error"
        role="alert"
        class="mt-1.5 text-xs text-red-400"
      >
        {{ errors.name }}
      </p>
    </div>

    <!-- Phone -->
    <div>
      <label for="contact-phone" class="label-tag text-muted block mb-2">
        {{ t('contact.form.phone') }} <span class="text-gold" aria-hidden="true">*</span>
      </label>
      <input
        id="contact-phone"
        v-model="form.phone"
        type="tel"
        autocomplete="tel"
        :aria-describedby="errors.phone ? 'phone-error' : undefined"
        :aria-invalid="!!errors.phone"
        class="w-full bg-transparent border border-border px-4 py-3 text-text text-sm focus:border-gold focus:outline-none transition-colors duration-200 min-h-[44px]"
      />
      <p
        v-if="errors.phone"
        id="phone-error"
        role="alert"
        class="mt-1.5 text-xs text-red-400"
      >
        {{ errors.phone }}
      </p>
    </div>

    <!-- Message -->
    <div>
      <label for="contact-message" class="label-tag text-muted block mb-2">
        {{ t('contact.form.message') }} <span class="text-gold" aria-hidden="true">*</span>
      </label>
      <textarea
        id="contact-message"
        v-model="form.message"
        rows="4"
        :aria-describedby="errors.message ? 'message-error' : undefined"
        :aria-invalid="!!errors.message"
        class="w-full bg-transparent border border-border px-4 py-3 text-text text-sm focus:border-gold focus:outline-none transition-colors duration-200 resize-none min-h-[44px]"
      />
      <p
        v-if="errors.message"
        id="message-error"
        role="alert"
        class="mt-1.5 text-xs text-red-400"
      >
        {{ errors.message }}
      </p>
    </div>

    <!-- Submit -->
    <button
      type="submit"
      :disabled="status === 'sending'"
      class="btn-gold w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
      :aria-busy="status === 'sending'"
    >
      {{ status === 'sending' ? t('contact.form.sending') : t('contact.form.submit') }}
    </button>

    <!-- Status messages -->
    <div
      v-if="status === 'success' || status === 'error'"
      role="status"
      aria-live="polite"
      class="text-sm text-center"
      :class="status === 'success' ? 'text-green-400' : 'text-red-400'"
    >
      {{ status === 'success' ? t('contact.form.success') : t('contact.form.error') }}
    </div>
  </form>
</template>

<style scoped>
/* btn-gold defined globally in assets/css/main.css */
/* text-align: center is applied via Tailwind class on the element */
</style>
