<script setup>
// Processo em 4 etapas ligadas por uma rota que se desenha com a rolagem.
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGsap, gsap, ScrollTrigger, prefersReduced } from '../../composables/motion'
import { PROCESS_IDS, pad } from '../../data/site'

const { t } = useI18n()
const root = ref(null)
const path = ref(null)
const on = ref([false, false, false, false])
const WP = [{ l: 12.5, tp: 73.3 }, { l: 37.5, tp: 26.7 }, { l: 62.5, tp: 73.3 }, { l: 87.5, tp: 26.7 }]
const THR = [0.125, 0.375, 0.625, 0.875]

useGsap(root, () => {
  const len = path.value.getTotalLength()
  path.value.style.strokeDasharray = len
  const upd = (p) => {
    path.value.style.strokeDashoffset = len * (1 - p)
    on.value = THR.map((x) => p >= x - 0.02)
  }
  if (prefersReduced()) { upd(1); return }
  upd(0)
  ScrollTrigger.create({ trigger: root.value, start: 'top 75%', end: 'bottom 75%', scrub: true, onUpdate: (s) => upd(s.progress) })
  gsap.to('.hr-rail', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.hr-steps', start: 'top 70%', end: 'bottom 60%', scrub: true } })
  gsap.from('.hr-sec-head, .hr-step', { y: 50, duration: 1.1, stagger: 0.07, ease: 'expo.out', scrollTrigger: { trigger: root.value, start: 'top 80%' } })
})
</script>

<template>
  <section ref="root" id="processo" class="hr-sec">
    <div class="hr-wrap">
      <div class="hr-sec-head">
        <div><span class="hr-eyebrow">{{ t('process.eyebrow') }}</span><h2 class="hr-h2">{{ t('process.title') }}</h2></div>
      </div>
      <div class="hr-plan-map" aria-hidden="true">
        <svg viewBox="0 0 1200 150" preserveAspectRatio="none">
          <path class="ghost" d="M0,110 L150,110 C300,110 300,40 450,40 C600,40 600,110 750,110 C900,110 900,40 1050,40 L1200,40" />
          <path ref="path" class="live" d="M0,110 L150,110 C300,110 300,40 450,40 C600,40 600,110 750,110 C900,110 900,40 1050,40 L1200,40" />
        </svg>
        <span v-for="(w, i) in WP" :key="i" class="hr-wp" :class="{ on: on[i] }" :style="{ left: w.l + '%', top: w.tp + '%' }"></span>
      </div>
      <div class="hr-steps">
        <span class="hr-rail"></span>
        <article v-for="(id, i) in PROCESS_IDS" :key="id" class="hr-step">
          <span class="hr-mono">WP-{{ pad(i + 1) }}</span>
          <h3 class="hr-h3">{{ t(`process.items.${id}.title`) }}</h3>
          <p>{{ t(`process.items.${id}.desc`) }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
