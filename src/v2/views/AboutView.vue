<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGsap, gsap, prefersReduced } from '../composables/motion'
import { STATS, DIFFERENTIAL_IDS, waLink } from '../data/site'
import { IMAGES } from '../data/portfolio'
import { vMagnetic } from '../directives/magnetic'
import PageHeader from '../components/shared/PageHeader.vue'
import CoverageRadar from '../components/home/CoverageRadar.vue'
import FinalCta from '../components/home/FinalCta.vue'
import Icon from '../components/shared/Icon.vue'

const { t } = useI18n()
const root = ref(null)
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const titleHtml = computed(() => `${esc(t('about.title'))} <span class="hr-grad">${esc(t('about.titleHighlight'))}</span>`)
const ICON = { qualidade: '4k', cinema: 'eye', atendimento: 'user', entrega: 'clock', seguranca: 'shield', edicao: 'sliders' }

useGsap(root, () => {
  // números contam até o valor final
  root.value.querySelectorAll('.hr-stat b').forEach((b) => {
    const end = Number(b.dataset.value), suffix = b.dataset.suffix
    if (prefersReduced()) return
    const o = { v: 0 }
    gsap.to(o, { v: end, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: b, start: 'top 85%' }, onUpdate: () => (b.textContent = Math.round(o.v) + suffix) })
  })
  gsap.from('.hr-diff', { y: 40, duration: 1, stagger: 0.06, ease: 'expo.out', scrollTrigger: { trigger: '.hr-diffs', start: 'top 80%' } })
  if (!prefersReduced()) {
    root.value.querySelectorAll('.hr-band img').forEach((img, i) => {
      gsap.fromTo(img, { yPercent: i ? -4 : -8 }, { yPercent: i ? 4 : 8, ease: 'none', scrollTrigger: { trigger: '.hr-band', start: 'top bottom', end: 'bottom top', scrub: true } })
    })
    gsap.from('.hr-verse > *', { y: 30, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'expo.out', scrollTrigger: { trigger: '.hr-verse', start: 'top 80%' } })
  }
})
</script>

<template>
  <div ref="root">
    <PageHeader :eyebrow="t('about.eyebrow')" :title-html="titleHtml" :lead="t('about.description')" :image="IMAGES.portals.sobre" code="/sobre">
      <a v-magnetic class="hr-btn hr-btn-mint" :href="waLink(t('waMessages.about'))" target="_blank" rel="noopener"><Icon name="chat" />{{ t('about.ctaPrimary') }}</a>
      <RouterLink class="hr-btn hr-btn-ghost" to="/servicos">{{ t('about.ctaSecondary') }}<Icon name="arrow" /></RouterLink>
    </PageHeader>

    <section class="hr-wrap">
      <div class="hr-stats">
        <div v-for="s in STATS" :key="s.id" class="hr-stat">
          <b :data-value="s.value" :data-suffix="s.suffix">{{ s.value }}{{ s.suffix }}</b>
          <span>{{ t(`hero.stats.${s.id}`) }}</span>
        </div>
      </div>
    </section>

    <section class="hr-sec hr-wrap">
      <div class="hr-sec-head">
        <div><span class="hr-eyebrow">{{ t('v2.about.diffEyebrow') }}</span><h2 class="hr-h2">{{ t('v2.about.diffTitle') }}</h2></div>
      </div>
      <div class="hr-diffs">
        <article v-for="id in DIFFERENTIAL_IDS" :key="id" class="hr-diff">
          <span class="ic"><Icon :name="ICON[id]" /></span>
          <h3 class="hr-h3">{{ t(`about.differentials.${id}.title`) }}</h3>
          <p>{{ t(`about.differentials.${id}.desc`) }}</p>
        </article>
      </div>
    </section>

    <section class="hr-wrap">
      <div class="hr-band">
        <div><img :src="IMAGES.aboutBand[0]" :alt="t('portfolio.items.dr030')" loading="lazy" /></div>
        <div><img :src="IMAGES.aboutBand[1]" :alt="t('portfolio.items.dr025')" loading="lazy" /></div>
      </div>
    </section>

    <section class="hr-sec hr-wrap">
      <div class="hr-verse">
        <blockquote>{{ t('verse.text') }}</blockquote>
        <span class="hr-eyebrow">{{ t('verse.ref') }}</span>
      </div>
    </section>

    <CoverageRadar />
    <FinalCta wa-key="waMessages.about" />
  </div>
</template>
