import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const app = createApp(App)

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
