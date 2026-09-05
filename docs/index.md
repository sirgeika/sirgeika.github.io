---
layout: home
title: "Frontend & Full-Stack Developer"
description: "Portfolio & Resume of Sergei Lediankin, Senior Frontend & Full-Stack Developer (Vue 3, TypeScript, Node.js) based in Stuttgart, Germany."

hero:
  name: "Sergei Lediankin"
  text: "Frontend & Full-Stack Developer (Vue 3 / Node.js)"
  tagline: "9+ Jahre Erfahrung in Enterprise-Webanwendungen (Aviation DCS/TWT) und KI-Systemen. 8+ Jahre Betriebstreue bei ORS.<br><span class=\"hero-status-badge\"><span class=\"pulse-dot\"></span> <strong>Verfügbar für langfristige Festanstellung</strong> • Open to Work</span>"
  image:
    src: /img/photo.jpg
    alt: Sergei Lediankin
  actions:
    - theme: brand
      text: "Deutsch (Lebenslauf)"
      link: /de/
    - theme: alt
      text: "English (Resume)"
      link: /en/

features:
  - icon:
      src: /img/vue.svg
    title: Vue 3 & Moderne Frontend-Architektur
    details: Mehr als 9 Jahre Praxis in komplexen Enterprise-Web-Clients (Vue 3 Composition API, Pinia, Vuetify, Vite, Performance-Tuning).
  - icon:
      src: /img/ai.svg
    title: Full-Stack & KI-Integration
    details: Node.js, Firebase und LLM-Integration. Gründer des KI-Sprachprojekts lingvochat.com.
  - icon:
      src: /img/work.svg
    title: Verlässlichkeit & 8+ Jahre Betriebstreue
    details: Über 8 Jahre bei ORS als Entwickler und Sub-Teamleiter (bestätigt durch Arbeitszeugnis mit Bestnote). Hohes Verantwortungsbewusstsein und Fokus auf langfristige Zusammenarbeit.
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // If user visits root without locale, redirect based on browser language if desired, or keep home
  // const lang = navigator.language?.toLowerCase() || ''
  // if (lang.startsWith('en')) {
  //   window.location.replace('./en/')
  // }
})
</script>

