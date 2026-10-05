import { createApp } from 'vue'
import { inject } from '@vercel/analytics'
import App from './v2/App.vue'
import { router } from './v2/router'
import { i18n } from './i18n'
import { mergeV2Messages } from './v2/i18n'
import './assets/main.css'
import './v2/styles/hr-v2.css'

inject()

mergeV2Messages(i18n)

createApp(App).use(i18n).use(router).mount('#app')
