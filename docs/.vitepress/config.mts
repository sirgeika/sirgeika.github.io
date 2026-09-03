import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Sergei Lediankin",
  description: "Frontend & Full-Stack Developer (Vue 3 / Node.js)",
  base: process.env.VITEPRESS_BASE || '/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],
  locales: {
    root: {
      label: 'Deutsch',
      lang: 'de',
      link: '/de/',
      themeConfig: {
        nav: [
          { text: 'Lebenslauf', link: '/de/lebenslauf' },
          { text: 'Über mich / Anschreiben', link: '/de/anschreiben' },
          { text: 'Zeugnisse & Diplom', link: '/de/dokumente' },
          { 
            text: 'PDF Download', 
            link: '/Lebenslauf_Sergei_Lediankin_DE.pdf',
            target: '_blank' 
          }
        ],
        sidebar: [
          {
            text: 'Bewerbungsprofil',
            items: [
              { text: 'Übersicht', link: '/de/' },
              { text: 'Lebenslauf (CV)', link: '/de/lebenslauf' },
              { text: 'Motivationsschreiben', link: '/de/anschreiben' },
              { text: 'Qualifikationen & Nachweise', link: '/de/dokumente' }
            ]
          }
        ]
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Resume', link: '/en/resume' },
          { text: 'Cover Letter', link: '/en/cover-letter' },
          { text: 'Credentials', link: '/en/credentials' },
          { 
            text: 'Download CV (PDF)', 
            link: '/Resume_Sergei_Lediankin_EN.pdf',
            target: '_blank' 
          }
        ],
        sidebar: [
          {
            text: 'Portfolio & Profile',
            items: [
              { text: 'Overview', link: '/en/' },
              { text: 'Resume (CV)', link: '/en/resume' },
              { text: 'Cover Letter', link: '/en/cover-letter' },
              { text: 'Diplomas & References', link: '/en/credentials' }
            ]
          }
        ]
      }
    }
  },

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sirgeika' },
      { icon: 'linkedin', link: 'https://linkedin.com/in/lediankin' }
    ],
    footer: {
      message: 'Sergei Lediankin • Stuttgart, Germany • sirgeika@gmail.com',
      copyright: 'Aufenthaltstitel vorhanden (Arbeitserlaubnis uneingeschränkt)'
    },
    search: {
      provider: 'local'
    }
  }
})
