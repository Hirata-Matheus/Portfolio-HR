import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

const app = createApp(App)

// Global v-reveal directive: fade-in + slide-up on scroll into view
app.directive('reveal', {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('is-in')
        io.disconnect()
      }
    }, { threshold: 0.08 })

    requestAnimationFrame(() => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
        el.classList.add('is-in')
      } else {
        io.observe(el)
      }
    })

    el._revealTimer = setTimeout(() => el.classList.add('is-in'), 1500)
  },
  unmounted(el) {
    clearTimeout(el._revealTimer)
  },
})


app.mount('#app')
