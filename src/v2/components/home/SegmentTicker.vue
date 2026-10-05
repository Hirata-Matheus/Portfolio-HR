<script setup>
// Duas faixas em loop; aceleram e inclinam conforme a velocidade da rolagem.
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGsap, gsap, ScrollTrigger, prefersReduced } from '../../composables/motion'
import { SERVICE_IDS } from '../../data/site'

const { t } = useI18n()
const root = ref(null)
const SEGMENTS = ['eventos', 'imoveis', 'agro', 'turismo', 'comercial']

useGsap(root, () => {
  if (prefersReduced()) return
  const tweens = []
  root.value.querySelectorAll('.hr-marquee').forEach((m) => {
    const dir = Number(m.dataset.dir)
    tweens.push(gsap.fromTo(m, { xPercent: dir < 0 ? 0 : -50 }, { xPercent: dir < 0 ? -50 : 0, duration: m.classList.contains('sm') ? 38 : 30, ease: 'none', repeat: -1 }))
  })
  const skew = gsap.quickTo(root.value.querySelectorAll('.hr-marquee-track'), 'skewX', { duration: 0.5, ease: 'power3' })
  ScrollTrigger.create({
    trigger: root.value, start: 'top bottom', end: 'bottom top',
    onUpdate: (s) => {
      const v = s.getVelocity()
      const k = 1 + Math.min(Math.abs(v) / 350, 6)
      tweens.forEach((tw) => gsap.to(tw, { timeScale: k, duration: 0.15, overwrite: true, onComplete: () => gsap.to(tw, { timeScale: 1, duration: 1.2 }) }))
      skew(gsap.utils.clamp(-12, 12, -v / 220))
    }
  })
  const reset = () => skew(0)
  ScrollTrigger.addEventListener('scrollEnd', reset)
  return () => ScrollTrigger.removeEventListener('scrollEnd', reset)
})
</script>

<template>
  <section ref="root" class="hr-ticker" :aria-label="t('hero.subtitleHighlight')">
    <div class="hr-marquee" data-dir="-1">
      <div v-for="n in 2" :key="n" class="hr-marquee-track" :aria-hidden="n === 2">
        <template v-for="(s, i) in SEGMENTS" :key="s"><span :class="{ o: i % 2 }">{{ t(`v2.ticker.${s}`) }}</span><i class="hr-sep"></i></template>
      </div>
    </div>
    <div class="hr-marquee sm" data-dir="1">
      <div v-for="n in 2" :key="n" class="hr-marquee-track" :aria-hidden="n === 2">
        <template v-for="s in SERVICE_IDS" :key="s"><span>{{ t(`services.items.${s}.title`) }}</span><i class="hr-sep"></i></template>
      </div>
    </div>
  </section>
</template>
