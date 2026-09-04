<script setup>
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  compact: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submitted'])

const { lang } = useData()
const isDe = computed(() => lang.value === 'de')

const formRef = ref(null)
const status = ref('idle') // 'idle' | 'submitting' | 'success' | 'error'
const errorMessage = ref('')
const mountedAt = ref(Date.now())

const formData = ref({
  name: '',
  email: '',
  message: '',
  botcheck: '',
  decoy: ''
})

const texts = computed(() => {
  if (isDe.value) {
    return {
      title: 'Nachricht senden',
      subtitle: 'Haben Sie Fragen oder ein Stellenangebot? Schreiben Sie mir direkt über dieses Formular.',
      nameLabel: 'Ihr Name',
      namePlaceholder: 'z.B. Anna Schmidt',
      emailLabel: 'Ihre E-Mail-Adresse',
      emailPlaceholder: 'name@unternehmen.de',
      messageLabel: 'Ihre Nachricht',
      messagePlaceholder: 'Beschreiben Sie kurz Ihr Anliegen oder Ihre Vakanz...',
      submitBtn: 'Nachricht senden',
      sendingBtn: 'Wird gesendet...',
      successTitle: 'Vielen Dank!',
      successDesc: 'Ihre Nachricht wurde erfolgreich übermittelt. Ich werde mich zeitnah bei Ihnen melden.',
      sendAnother: 'Weitere Nachricht senden',
      errorGeneric: 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.'
    }
  }
  return {
    title: 'Send a Message',
    subtitle: 'Have a question or a job opportunity? Send me a message directly using this form.',
    nameLabel: 'Your Name',
    namePlaceholder: 'e.g. John Doe',
    emailLabel: 'Your Email Address',
    emailPlaceholder: 'john@company.com',
    messageLabel: 'Your Message',
    messagePlaceholder: 'Briefly describe your project or opportunity...',
    submitBtn: 'Send Message',
    sendingBtn: 'Sending...',
    successTitle: 'Thank You!',
    successDesc: 'Your message has been sent successfully. I will get back to you shortly.',
    sendAnother: 'Send another message',
    errorGeneric: 'An error occurred while sending. Please try again.'
  }
})

async function handleSubmit(e) {
  // Anti-spam 1: Decoy & Honeypot traps
  if (formData.value.botcheck || formData.value.decoy) {
    status.value = 'success'
    formData.value.name = ''
    formData.value.email = ''
    formData.value.message = ''
    formData.value.botcheck = ''
    formData.value.decoy = ''
    return
  }

  // Anti-spam 2: Time Trap (<2.5s to fill 3 fields is an automated script)
  const elapsed = Date.now() - mountedAt.value
  if (elapsed < 2500) {
    status.value = 'success'
    return
  }

  status.value = 'submitting'
  errorMessage.value = ''

  try {
    const payload = {
      access_key: '7a427feb-2489-4352-b889-c14492c3fee9',
      name: formData.value.name,
      email: formData.value.email,
      message: formData.value.message,
      subject: `Kontaktanfrage von ${formData.value.name} (sergeika-resume)`,
      from_name: 'Sergei Lediankin Resume'
    }

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (res.ok && data.success) {
      status.value = 'success'
      formData.value.name = ''
      formData.value.email = ''
      formData.value.message = ''
      formData.value.botcheck = ''
      formData.value.decoy = ''
      emit('submitted')
    } else {
      status.value = 'error'
      errorMessage.value = data.message || texts.value.errorGeneric
    }
  } catch (err) {
    status.value = 'error'
    errorMessage.value = texts.value.errorGeneric
  }
}

function resetForm() {
  status.value = 'idle'
  errorMessage.value = ''
  mountedAt.value = Date.now()
}
</script>

<template>
  <div class="contact-card" :class="{ 'compact': compact }">
    <div v-if="status === 'success'" class="success-state">
      <div class="success-icon">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h3 class="success-title">{{ texts.successTitle }}</h3>
      <p class="success-desc">{{ texts.successDesc }}</p>
      <button type="button" class="btn-secondary" @click="resetForm">
        {{ texts.sendAnother }}
      </button>
    </div>

    <form v-else ref="formRef" action="https://api.web3forms.com/submit" method="POST" class="contact-form"
      @submit.prevent="handleSubmit">
      <input type="hidden" name="access_key" value="7a427feb-2489-4352-b889-c14492c3fee9">
      <!-- Web3Forms Standard Botcheck Honeypot -->
      <input v-model="formData.botcheck" type="checkbox" name="botcheck" tabindex="-1" autocomplete="off"
        style="display: none !important;">

      <!-- Advanced Decoy Honeypot (off-screen, not display:none, catches smarter bots) -->
      <div class="decoy-trap" aria-hidden="true">
        <label for="cf-extra-field">Leave this empty</label>
        <input id="cf-extra-field" v-model="formData.decoy" type="text" name="user_website_url" tabindex="-1"
          autocomplete="off">
      </div>

      <div v-if="title || !compact" class="form-header">
        <h3 class="form-title">{{ title || texts.title }}</h3>
        <p v-if="!compact" class="form-subtitle">{{ texts.subtitle }}</p>
      </div>

      <div v-if="status === 'error'" class="error-banner">
        {{ errorMessage }}
      </div>

      <div class="form-group">
        <label for="cf-name" class="form-label">{{ texts.nameLabel }} <span class="required">*</span></label>
        <input id="cf-name" v-model="formData.name" type="text" name="name" required
          :placeholder="texts.namePlaceholder" class="form-input" :disabled="status === 'submitting'">
      </div>

      <div class="form-group">
        <label for="cf-email" class="form-label">{{ texts.emailLabel }} <span class="required">*</span></label>
        <input id="cf-email" v-model="formData.email" type="email" name="email" required
          :placeholder="texts.emailPlaceholder" class="form-input" :disabled="status === 'submitting'">
      </div>

      <div class="form-group">
        <label for="cf-message" class="form-label">{{ texts.messageLabel }} <span class="required">*</span></label>
        <textarea id="cf-message" v-model="formData.message" name="message" required rows="4"
          :placeholder="texts.messagePlaceholder" class="form-textarea" :disabled="status === 'submitting'"></textarea>
      </div>

      <button type="submit" class="submit-btn" :disabled="status === 'submitting'">
        <span v-if="status === 'submitting'" class="spinner"></span>
        <span>{{ status === 'submitting' ? texts.sendingBtn : texts.submitBtn }}</span>
      </button>
    </form>
  </div>
</template>

<style scoped>
.contact-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 1.75rem;
  max-width: 600px;
  margin: 1.5rem 0;
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.05);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.contact-card.compact {
  padding: 1.25rem;
  margin: 0;
  border-radius: 12px;
  border: none;
  background: transparent;
  box-shadow: none;
}

.form-header {
  margin-bottom: 1.25rem;
}

.form-title {
  margin: 0 0 0.4rem 0 !important;
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  color: var(--vp-c-text-1) !important;
  border-top: none !important;
  padding-top: 0 !important;
}

.form-subtitle {
  margin: 0 !important;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.35rem;
  color: var(--vp-c-text-1);
}

.required {
  color: #ef4444;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.925rem;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.form-textarea {
  resize: vertical;
  min-height: 90px;
}

.error-banner {
  padding: 0.75rem 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.dark .error-banner {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.3);
  color: #fca5a5;
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand-1);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.submit-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.success-state {
  text-align: center;
  padding: 1.5rem 0.5rem;
}

.success-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
  margin-bottom: 1rem;
}

.success-title {
  margin: 0 0 0.5rem 0 !important;
  font-size: 1.35rem !important;
  color: var(--vp-c-text-1) !important;
  border-top: none !important;
  padding-top: 0 !important;
}

.success-desc {
  margin: 0 0 1.25rem 0 !important;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.5;
}

.btn-secondary {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.decoy-trap {
  position: absolute !important;
  left: -9999px !important;
  top: -9999px !important;
  width: 1px !important;
  height: 1px !important;
  opacity: 0 !important;
  pointer-events: none !important;
  overflow: hidden !important;
}
</style>
