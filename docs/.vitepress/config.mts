import { defineConfig, type HeadConfig } from 'vitepress'

const siteUrl = process.env.NODE_ENV === 'production' 
  ? 'https://sirgeika.github.io' 
  : 'http://localhost:5173';

export default defineConfig({
  title: "Sergei Lediankin",
  titleTemplate: ':title | Sergei Lediankin',
  description: "Frontend & Full-Stack Developer (Vue 3 / Node.js)",
  base: '/',

  sitemap: {
    hostname: siteUrl
  },

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
    ['meta', { name: 'author', content: 'Sergei Lediankin' }],
    [
      'meta',
      {
        name: 'keywords',
        content: 'Sergei Lediankin, Frontend Developer, Full-Stack Developer, Vue.js, Vue 3, TypeScript, Node.js, Stuttgart, Software Engineer, Web Development, Lebenslauf, Resume, Portfolio, DCS, TWT'
      }
    ],
    ['meta', { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' }],

    // Open Graph
    ['meta', { property: 'og:site_name', content: 'Sergei Lediankin - Portfolio & Resume' }],
    ['meta', { property: 'og:type', content: 'profile' }],
    ['meta', { property: 'og:image', content: `${siteUrl}/img/photo.jpg` }],
    ['meta', { property: 'og:image:alt', content: 'Sergei Lediankin - Frontend & Full-Stack Developer' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: `${siteUrl}/img/photo.jpg` }],

    // Analytics
    [
      'script',
      {
        defer: '',
        src: 'https://cloud.umami.is/script.js',
        'data-website-id': 'edd5d96f-1e3f-4d40-a53d-e548cf956a8f'
      }
    ],

    // Structured Data (JSON-LD)
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Sergei Lediankin',
        jobTitle: 'Frontend & Full-Stack Developer',
        description: 'Frontend & Full-Stack Developer with 9+ years experience in Vue.js, Node.js, and AI systems. Based in Stuttgart, Germany.',
        url: siteUrl,
        image: `${siteUrl}/img/photo.jpg`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Stuttgart',
          addressCountry: 'DE'
        },
        sameAs: [
          'https://github.com/sirgeika',
          'https://linkedin.com/in/lediankin',
          'https://lingvochat.com'
        ],
        knowsAbout: [
          'Vue.js',
          'Vue 3',
          'JavaScript',
          'TypeScript',
          'Node.js',
          'Firebase',
          'Enterprise Web Applications',
          'Full-Stack Web Development',
          'Artificial Intelligence',
          'LLM Integration'
        ]
      })
    ]
  ],

  transformHead({ pageData }) {
    const head: HeadConfig[] = []

    let path = pageData.relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '')

    if (path && !path.startsWith('/')) {
      path = '/' + path
    }
    const pageUrl = `${siteUrl}${path}`

    // Canonical link
    head.push(['link', { rel: 'canonical', href: pageUrl }])

    // Dynamic Open Graph and Twitter tags
    head.push(['meta', { property: 'og:url', content: pageUrl }])
    if (pageData.title) {
      const fullTitle = pageData.title.includes('Sergei Lediankin')
        ? pageData.title
        : `${pageData.title} | Sergei Lediankin`
      head.push(['meta', { property: 'og:title', content: fullTitle }])
      head.push(['meta', { name: 'twitter:title', content: fullTitle }])
    }
    if (pageData.description) {
      head.push(['meta', { property: 'og:description', content: pageData.description }])
      head.push(['meta', { name: 'twitter:description', content: pageData.description }])
    }

    // Multilingual Hreflang alternates
    if (path.startsWith('/de/')) {
      const enEquivalent = path.replace(/^\/de\//, '/en/')
      head.push(['link', { rel: 'alternate', hreflang: 'de', href: pageUrl }])
      head.push(['link', { rel: 'alternate', hreflang: 'en', href: `${siteUrl}${enEquivalent}` }])
      head.push(['link', { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/` }])
      head.push(['meta', { property: 'og:locale', content: 'de_DE' }])
      head.push(['meta', { property: 'og:locale:alternate', content: 'en_US' }])
    } else if (path.startsWith('/en/')) {
      const deEquivalent = path.replace(/^\/en\//, '/de/')
      head.push(['link', { rel: 'alternate', hreflang: 'de', href: `${siteUrl}${deEquivalent}` }])
      head.push(['link', { rel: 'alternate', hreflang: 'en', href: pageUrl }])
      head.push(['link', { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/` }])
      head.push(['meta', { property: 'og:locale', content: 'en_US' }])
      head.push(['meta', { property: 'og:locale:alternate', content: 'de_DE' }])
    } else {
      head.push(['link', { rel: 'alternate', hreflang: 'de', href: `${siteUrl}/de/` }])
      head.push(['link', { rel: 'alternate', hreflang: 'en', href: `${siteUrl}/en/` }])
      head.push(['link', { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/` }])
    }

    return head
  },

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
    logo: '/img/logo.svg',
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
