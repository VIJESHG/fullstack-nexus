
import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
export default withMermaid(
defineConfig({
  title: "Full Stack Nexus",
  description: "The convergence point of UI, Backend, DB, Systems Design, and Algorithms.",
  base: '/fullstack-nexus/', // Match this to your GitHub repository name exactly
  head: [
    ['link', { rel: 'icon', href: '/fullstack-nexus/logo-icon.svg' }]
  ],
  themeConfig: {
    logo: '/logo-text.svg',

    siteTitle: false,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'UI', link: '/ui/basics' },
      { text: 'Backend', link: '/backend/basics' }
    ],

    sidebar: [
      {
        text: '🖥️ UI Architecture',
        collapsed: false,
        items: [
          { text: 'UI Core Basics', link: '/ui/basics' },
          { text: 'Deep Dive JavaScript', link: '/ui/javascript-typescript' },
          { text: 'ReactJS Principles', link: '/ui/reactjs' }
        ]
      },
      {
        text: '⚙️ Backend Development',
        collapsed: false,
        items: [
          { text: 'Backend Fundamental Concepts', link: '/backend/basics' },
          { text: 'Core & Advanced Java', link: '/backend/java' },
          { text: 'Spring Boot Architecture', link: '/backend/springboot' },
          { text: 'Python Frameworks & Engine', link: '/backend/python' }
        ]
      },
      {
        text: '🗄️ Database & Storage',
        collapsed: false,
        items: [
          { text: 'Database Basics & ACID', link: '/db/basics' },
          { text: 'MSSQL Server Deep Dive', link: '/db/mssql' }
        ]
      },
      {
        text: '🧠 Competitive Coding',
        collapsed: false,
        items: [
          { text: 'Data Structures', link: '/competitive-coding/data-structures' },
          { text: 'Algorithmic Patterns', link: '/competitive-coding/algorithms' }
        ]
      },
      {
        text: '📐 Design & Patterns',
        collapsed: false,
        items: [
          { text: 'Creational & Structural Patterns', link: '/design-patterns/creational-structural' },
          { text: 'System Design Scaling', link: '/design-patterns/system-design' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/VIJESHG/fullstack-nexus' }
    ]
  },
  // Optional: You can pass custom configurations to the global mermaid engine here
  mermaid: {
    // theme: 'dark' // forces dark theme if desired, though plugin handles it dynamically
  }
}))
