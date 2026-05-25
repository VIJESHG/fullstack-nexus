import DefaultTheme from 'vitepress/theme'
import './custom.css'

console.log('🚀 Nexus Custom Theme Engine Activated!');

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {}
}