<script setup>
import ContactModal from './ContactModal.vue'

defineProps({
  buttonText: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <ContactModal :button-text="buttonText" />
</template>
