import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Sergei Lediankin",
  description: "Frontend & Full-Stack Developer (Vue 3 / Node.js)",
  base: '/',
  head: [
    [
      'link',
      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: '/fonts/lobster-v32-latin/lobster-v32-latin-regular.woff2',
        crossorigin: 'anonymous'
      }
    ],
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],
  locales: {
    root: {
      label: 'Deutsch',
      lang: 'de',
      link: '/de/',
      themeConfig: {
        nav: [
          { text: 'Lebenslauf', link: '/de/resume' },
          { text: 'Über mich / Anschreiben', link: '/de/cover-letter' },
          { text: 'Zeugnisse & Diplom', link: '/de/credentials' },
          { 
            text: 'PDF Download', 
            link: '/docs/Lebenslauf_Sergei_Lediankin_DE.pdf',
            target: '_blank' 
          }
        ],
        sidebar: [
          {
            text: 'Bewerbungsprofil',
            items: [
              { text: 'Übersicht', link: '/de/' },
              { text: 'Lebenslauf (CV)', link: '/de/resume' },
              { text: 'Motivationsschreiben', link: '/de/cover-letter' },
              { text: 'Qualifikationen & Nachweise', link: '/de/credentials' }
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
            link: '/docs/Resume_Sergei_Lediankin_EN.pdf',
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
      message: 'Sergei Lediankin • Stuttgart, Germany',
      copyright: 'Aufenthaltstitel vorhanden (Arbeitserlaubnis uneingeschränkt)'
    },
    search: {
      provider: 'local'
    }
  }
})

