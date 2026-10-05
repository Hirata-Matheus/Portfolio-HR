<script setup>
// Altímetro lateral: "sobe" de 12 m a 120 m conforme a rolagem da página.
import { ref, onMounted, onBeforeUnmount } from 'vue'

const alt = ref('012')
const tape = ref(null)
let raf = 0

function update() {
  raf = 0
  const max = document.documentElement.scrollHeight - window.innerHeight
  const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
  const a = 12 + p * 108
  alt.value = String(Math.round(a)).padStart(3, '0')
  if (tape.value) tape.value.style.backgroundPosition = `0 ${a * 3}px`
}
const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); update() })
onBeforeUnmount(() => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) })
</script>

<template>
  <div class="hr-alti" aria-hidden="true">
    <div class="hr-alti-read"><span>ALT</span><b>{{ alt }}</b><span>m</span></div>
    <div ref="tape" class="hr-alti-tape"></div>
  </div>
</template>
