<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGsap, gsap, prefersReduced } from '../composables/motion'
import { SERVICE_IDS, waLink, pad } from '../data/site'
import { IMAGES } from '../data/portfolio'
import { vMagnetic } from '../directives/magnetic'
import PageHeader from '../components/shared/PageHeader.vue'
import FlightPlan from '../components/home/FlightPlan.vue'
import FinalCta from '../components/home/FinalCta.vue'
import Icon from '../components/shared/Icon.vue'

const { t } = useI18n()
const root = ref(null)
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const titleHtml = computed(() => `${esc(t('services.titleLine1'))} <span class="hr-grad">${esc(t('services.titleLine2'))}</span>`)
const ICON = { filmagem: 'film', fotografia: 'camera', imoveis: 'home', eventos: 'spark', redes: 'phone', institucional: 'building' }
const examples = (id) => ({ path: '/portfolio', query: IMAGES.serviceCategory[id] !== 'all' ? { cat: IMAGES.serviceCategory[id] } : {} })

useGsap(root, () => {
  root.value.querySelectorAll('.hr-svc').forEach((row) => {
    const img = row.querySelector('img')
    if (!prefersReduced()) {
      gsap.fromTo(row.querySelector('.hr-svc-media'), { clipPath: 'inset(12% 8% 12% 8% round 6px)' }, { clipPath: 'inset(0% 0% 0% 0% round 6px)', ease: 'none', scrollTrigger: { trigger: row, start: 'top 90%', end: 'top 35%', scrub: true } })
      gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true } })
    }
    gsap.from(row.querySelectorAll('.hr-svc-copy > *'), { y: 40, duration: 1, stagger: 0.07, ease: 'expo.out', scrollTrigger: { trigger: row, start: 'top 75%' } })
  })
})
</script>

<template>
  <div ref="root">
    <PageHeader :eyebrow="t('services.eyebrow')" :title-html="titleHtml" :lead="t('services.subtitle')" :image="IMAGES.portals.servicos" code="/servicos" />
    <section class="hr-wrap" style="padding-bottom: clamp(40px, 6vw, 80px)">
      <article v-for="(id, i) in SERVICE_IDS" :key="id" class="hr-svc">
        <div class="hr-svc-media"><img :src="IMAGES.services[id]" :alt="t(`services.items.${id}.title`)" loading="lazy" /></div>
        <div class="hr-svc-copy">
          <span class="hr-mono" style="color: var(--hr-mint); display: flex; align-items: center; gap: 10px">
            <span class="hr-go" style="width: 38px; height: 38px"><Icon :name="ICON[id]" /></span>{{ pad(i + 1) }} / {{ pad(SERVICE_IDS.length) }}
          </span>
          <h2 class="hr-h2">{{ t(`services.items.${id}.title`) }}</h2>
          <p>{{ t(`services.items.${id}.desc`) }}</p>
          <div class="hr-svc-actions">
            <a v-magnetic class="hr-btn hr-btn-mint" :href="waLink(t('v2.services.waInterest', { service: t(`services.items.${id}.title`) }))" target="_blank" rel="noopener"><Icon name="chat" />{{ t('v2.services.quote') }}</a>
            <RouterLink class="hr-btn hr-btn-ghost" :to="examples(id)">{{ t('v2.services.examples') }}<Icon name="arrow" /></RouterLink>
          </div>
        </div>
      </article>
    </section>
    <FlightPlan />
    <FinalCta />
  </div>
</template>
