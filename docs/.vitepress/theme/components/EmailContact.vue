<script setup>
import { ref, onMounted, computed } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  user: {
    type: String,
    default: 'sirgeika'
  },
  domain: {
    type: String,
    default: 'gmail.com'
  }
})

const { lang } = useData()
const isMounted = ref(false)
const copied = ref(false)

const email = computed(() => `${props.user}@${props.domain}`)

onMounted(() => {
  isMounted.value = true
})

function copyEmail(e) {
  e.preventDefault()
  e.stopPropagation()
  if (navigator.clipboard) {
    navigator.clipboard.writeText(email.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>

<template>
  <span class="email-contact-wrapper">
    <template v-if="isMounted">
      <a :href="'mailto:' + email" class="email-link">
        {{ email }}
      </a>
      <button 
        type="button" 
        class="copy-btn" 
        :title="lang === 'de' ? 'E-Mail kopieren' : 'Copy email'"
        :aria-label="lang === 'de' ? 'E-Mail kopieren' : 'Copy email'"
        @click="copyEmail"
      >
        <span v-if="!copied" class="icon-wrap">
          <svg class="copy-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </span>
        <span v-else class="copied-badge">
          <svg class="check-icon" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span class="copied-text">{{ lang === 'de' ? 'Kopiert' : 'Copied' }}</span>
        </span>
      </button>
    </template>
  </span>
</template>

<style scoped>
.email-contact-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  vertical-align: middle;
}

.email-link {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.email-link:hover {
  color: var(--vp-c-brand-2);
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-default-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 2px 6px;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
  font-size: 0.75rem;
  line-height: 1;
}

.copy-btn:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.icon-wrap {
  display: inline-flex;
  align-items: center;
}

.copied-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: #10b981;
  font-weight: 600;
}

.email-obfuscated {
  color: var(--vp-c-text-1);
}

.email-at {
  color: var(--vp-c-text-3);
  font-size: 0.9em;
}
</style>

