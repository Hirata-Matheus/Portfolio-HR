<script setup>
import { ref } from 'vue'
import { gsap, prefersReduced, lockScroll } from '../../composables/motion'

const root = ref(null)
const panel = ref(null)
const label = ref(null)
const code = ref('/')
const title = ref('')

function cover(c, t) {
  code.value = c
  title.value = t
  root.value.classList.add('is-on')
  lockScroll(true)
  if (prefersReduced()) return Promise.resolve()
  return new Promise((resolve) => {
    gsap.timeline({ onComplete: resolve })
      .set(panel.value, { transformOrigin: '50% 100%' })
      .fromTo(panel.value, { scaleY: 0 }, { scaleY: 1, duration: 0.7, ease: 'expo.inOut' })
      .fromTo(label.value, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, 0.3)
      .to({}, { duration: 0.15 })
  })
}

function reveal() {
  const finish = () => { root.value.classList.remove('is-on'); lockScroll(false) }
  if (prefersReduced()) { finish(); return Promise.resolve() }
  return new Promise((resolve) => {
    gsap.timeline({ onComplete: () => { finish(); resolve() } })
      .to(label.value, { opacity: 0, y: -40, duration: 0.4, ease: 'expo.in' })
      .set(panel.value, { transformOrigin: '50% 0%' })
      .to(panel.value, { scaleY: 0, duration: 0.75, ease: 'expo.inOut' }, 0.15)
  })
}

defineExpose({ cover, reveal })
</script>

<template>
  <div ref="root" class="hr-wipe" aria-hidden="true">
    <div ref="panel" class="hr-wipe-panel"></div>
    <div ref="label" class="hr-wipe-label">
      <span class="hr-mono" style="color: var(--hr-mint)">{{ code }}</span>
      <strong>{{ title }}</strong>
    </div>
  </div>
</template>
