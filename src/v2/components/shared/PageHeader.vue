<script setup>
// Cabeçalho das páginas internas: foto de fundo com parallax + título que sobe linha a linha.
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGsap, gsap, SplitText, prefersReduced } from '../../composables/motion'
import { introReady } from '../../composables/ui'

const props = defineProps({
  eyebrow: String,
  titleHtml: String, // HTML simples (ex.: texto + <span class="hr-grad">destaque</span>)
  lead: String,
  image: String,
  code: String
})
const { t, locale } = useI18n()
const root = ref(null)
const titleKey = computed(() => `${locale.value}-${props.titleHtml}`)

useGsap(root, () => {
  if (prefersReduced()) return
  gsap.to('.hr-page-head-bg img', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true } })
  const tl = gsap.timeline({ paused: true })
  tl.fromTo('.hr-page-head-bg img', { scale: 1.18 }, { scale: 1, duration: 2.2, ease: 'expo.out' }, 0)
  tl.from('.hr-page-head .hr-reveal', { y: 24, opacity: 0, duration: 1, stagger: 0.08, ease: 'expo.out' }, 0.3)
  let started = false
  let lines = null
  SplitText.create('.hr-page-title', {
    type: 'lines', mask: 'lines', linesClass: 'hr-line-mask', autoSplit: true,
    // devolver a animação permite ao SplitText refazer a divisão no resize mantendo o progresso
    onSplit: (self) => (lines = gsap.from(self.lines, { yPercent: 115, duration: 1.1, stagger: 0.09, ease: 'expo.out', delay: started ? 0 : 0.1, paused: !started }))
  })
  introReady().then(() => { started = true; tl.play(); lines?.play() })
})
</script>

<template>
  <section ref="root" class="hr-page-head">
    <div class="hr-page-head-bg"><img v-if="image" :src="image" alt="" fetchpriority="high" /></div>
    <div class="hr-wrap hr-page-head-in">
      <div class="hr-crumbs hr-mono hr-reveal">
        <RouterLink to="/">{{ t('nav.inicio') }}</RouterLink><span aria-hidden="true">/</span><span style="color: var(--hr-mint)">{{ code }}</span>
      </div>
      <span v-if="eyebrow" class="hr-eyebrow hr-reveal">{{ eyebrow }}</span>
      <h1 :key="titleKey" class="hr-h1 hr-page-title" v-html="titleHtml"></h1>
      <p v-if="lead" class="hr-lead hr-reveal">{{ lead }}</p>
      <div v-if="$slots.default" class="hr-reveal flex flex-wrap gap-3"><slot /></div>
    </div>
  </section>
</template>
