import { createApp } from 'vue'
import { inject } from '@vercel/analytics'
import App from './App.vue'
import { i18n } from './i18n'
import './assets/main.css'

inject()

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const app = createApp(App)
app.use(i18n)

app.directive('reveal', {
  mounted(el, binding) {
    if (prefersReducedMotion) return

    el.classList.add('reveal')
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`

    const show = () => el.classList.add('is-in')

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { show(); io.disconnect() }
    }, { threshold: 0.08 })

    requestAnimationFrame(() => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) show()
      else io.observe(el)
    })

    el._io = io
    el._revealTimer = setTimeout(show, 1500)
  },
  unmounted(el) {
    el._io?.disconnect()
    clearTimeout(el._revealTimer)
  },
})

app.mount('#app')
