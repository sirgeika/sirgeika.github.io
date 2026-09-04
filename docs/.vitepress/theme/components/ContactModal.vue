<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'
import ContactForm from './ContactForm.vue'

const props = defineProps({
  buttonText: {
    type: String,
    default: ''
  }
})

const { lang } = useData()
const isDe = computed(() => lang.value === 'de')

const isOpen = ref(false)

const defaultBtnText = computed(() => {
  return isDe.value ? '✉️ Nachricht senden' : '✉️ Send Message'
})

function openModal() {
  isOpen.value = true
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

function closeModal() {
  isOpen.value = false
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

function handleKeydown(e) {
  if (e.key === 'Escape' && isOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <span class="contact-modal-wrapper">
    <button 
      type="button" 
      class="contact-trigger" 
      :title="buttonText || defaultBtnText"
      @click="openModal"
    >
      <span class="btn-icon">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      </span>
      <span>{{ buttonText || defaultBtnText }}</span>
    </button>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal">
          <div class="modal-dialog" role="dialog" aria-modal="true">
            <button 
              type="button" 
              class="modal-close-btn" 
              :aria-label="isDe ? 'Schließen' : 'Close'"
              @click="closeModal"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <ContactForm 
              :compact="true" 
              :title="isDe ? 'Nachricht an Sergei' : 'Message to Sergei'"
              @submitted="() => {}"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </span>
</template>

<style scoped>
.contact-modal-wrapper {
  display: inline-block;
  vertical-align: middle;
}

.contact-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-soft);
  border-radius: 8px;
  padding: 4px 12px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1.4;
}

.contact-trigger:hover {
  background: var(--vp-c-brand-1);
  color: #ffffff;
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(62, 175, 124, 0.25);
}

.btn-icon {
  display: inline-flex;
  align-items: center;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-dialog {
  position: relative;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.35);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-text-1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

