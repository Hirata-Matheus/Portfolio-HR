<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGsap, gsap, prefersReduced } from '../../composables/motion'
import { PAGES, SERVICE_IDS } from '../../data/site'
import { IMAGES, PORTFOLIO } from '../../data/portfolio'
import Icon from '../shared/Icon.vue'

const { t } = useI18n()
const root = ref(null)
const meta = {
  servicos: () => t('v2.portals.servicesCount', { n: SERVICE_IDS.length }),
  portfolio: () => t('v2.portals.worksCount', { n: PORTFOLIO.length }),
  sobre: () => 'Araçatuba · SP',
  contato: () => 'WhatsApp'
}

useGsap(root, () => {
  gsap.from('.hr-sec-head', { y: 60, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.hr-sec-head', start: 'top 88%' } })
  if (prefersReduced()) return
  gsap.from('.hr-portal', { clipPath: 'inset(18% 0 0 0 round 6px)', y: 50, duration: 1.3, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: '.hr-portals', start: 'top 85%' } })
})
</script>

<template>
  <section ref="root" class="hr-sec">
    <div class="hr-wrap">
      <div class="hr-sec-head">
        <div><span class="hr-eyebrow">{{ t('v2.portals.eyebrow') }}</span><h2 class="hr-h2">{{ t('v2.portals.title') }}</h2></div>
        <p class="hr-lead">{{ t('v2.portals.lead') }}</p>
      </div>
      <div class="hr-portals">
        <RouterLink v-for="p in PAGES" :key="p.id" class="hr-portal" :to="p.path" :data-cursor="t('v2.cursor.enter')">
          <img :src="IMAGES.portals[p.id]" alt="" loading="lazy" />
          <div class="hr-portal-top hr-mono"><span>{{ p.path }}</span><span>{{ meta[p.id]() }}</span></div>
          <div class="hr-portal-body">
            <h3 class="hr-h3">{{ t(`nav.${p.id}`) }}</h3>
            <p>{{ t(`v2.portals.${p.id}`) }}</p>
            <span class="hr-go"><Icon name="arrow" /></span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
