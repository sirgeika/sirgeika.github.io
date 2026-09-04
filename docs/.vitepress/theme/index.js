import DefaultTheme from 'vitepress/theme'
import './custom.css'
import EmailContact from './components/EmailContact.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('EmailContact', EmailContact)
  }
}