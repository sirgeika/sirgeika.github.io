import DefaultTheme from 'vitepress/theme'
import './custom.css'
import EmailContact from './components/EmailContact.vue'
import ContactForm from './components/ContactForm.vue'
import ContactModal from './components/ContactModal.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('EmailContact', EmailContact)
    app.component('ContactForm', ContactForm)
    app.component('ContactModal', ContactModal)
  }
}