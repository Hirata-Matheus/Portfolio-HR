<script setup>
// Cursor em forma de mira. Elementos com data-cursor="Texto" fazem a mira crescer e mostrar o texto.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap, finePointer, prefersReduced } from '../../composables/motion'

const el = ref(null)
const label = ref('')
const active = ref(false)
const hidden = ref(true)
const enabled = ref(false)
let xTo, yTo

const move = (e) => { hidden.value = false; xTo(e.clientX); yTo(e.clientY) }
const over = (e) => {
  const tgt = e.target.closest?.('[data-cursor]')
  active.value = !!tgt
  if (tgt) label.value = tgt.dataset.cursor
}
const out = (e) => { if (!e.relatedTarget) hidden.value = true }

onMounted(() => {
  if (!finePointer() || prefersReduced()) return
  enabled.value = true
  document.documentElement.classList.add('hr-has-cursor')
  requestAnimationFrame(() => {
    xTo = gsap.quickTo(el.value, 'x', { duration: 0.3, ease: 'power3' })
    yTo = gsap.quickTo(el.value, 'y', { duration: 0.3, ease: 'power3' })
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    document.addEventListener('pointerout', out)
  })
})
onBeforeUnmount(() => {
  document.documentElement.classList.remove('hr-has-cursor')
  window.removeEventListener('pointermove', move)
  document.removeEventListener('pointerover', over)
  document.removeEventListener('pointerout', out)
})
</script>

<template>
  <div v-if="enabled" ref="el" class="hr-cursor" :class="{ 'is-active': active, 'is-hidden': hidden }" aria-hidden="true">
    <i></i><i></i><i></i><i></i><span>{{ label }}</span>
  </div>
</template>
