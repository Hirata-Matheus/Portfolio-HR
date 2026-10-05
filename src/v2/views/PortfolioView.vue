<script setup>
// Portfólio com filtros: a grade se reorganiza com animação de layout (Motion para Vue).
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { motion, AnimatePresence, LayoutGroup } from 'motion-v'
import { prefersReduced, ScrollTrigger } from '../composables/motion'
import { openLightbox } from '../composables/ui'
import { PORTFOLIO, CATEGORIES, IMAGES } from '../data/portfolio'
import PageHeader from '../components/shared/PageHeader.vue'
import FinalCta from '../components/home/FinalCta.vue'
import Icon from '../components/shared/Icon.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const valid = (c) => (CATEGORIES.includes(c) ? c : 'all')
const cat = ref(valid(route.query.cat))
const items = computed(() => (cat.value === 'all' ? PORTFOLIO : PORTFOLIO.filter((p) => p.cat === cat.value)))
const counts = Object.fromEntries(CATEGORIES.map((c) => [c, c === 'all' ? PORTFOLIO.length : PORTFOLIO.filter((p) => p.cat === c).length]))
const reduce = prefersReduced()
const spring = reduce ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 30, mass: 0.8 }

function setCat(c) {
  cat.value = c
  router.replace({ query: c === 'all' ? {} : { cat: c } })
}
watch(() => route.query.cat, (c) => { cat.value = valid(c) })
watch(items, () => setTimeout(() => ScrollTrigger.refresh(), 700))

// vídeos tocam ao passar o mouse
const play = (e) => { const v = e.currentTarget.querySelector('video'); v && v.play().catch(() => {}) }
const stop = (e) => { const v = e.currentTarget.querySelector('video'); if (v) { v.pause(); v.currentTime = 0.5 } }
</script>

<template>
  <div>
    <PageHeader :eyebrow="t('portfolio.eyebrow')" :title-html="t('portfolio.title')" :lead="t('portfolio.subtitle')" :image="IMAGES.portals.portfolio" code="/portfolio" />
    <section class="hr-wrap" style="padding-block: clamp(20px, 3vw, 40px) clamp(60px, 8vw, 120px)">
      <LayoutGroup>
        <div class="hr-filters" role="tablist">
          <button v-for="c in CATEGORIES" :key="c" class="hr-filter" :class="{ on: cat === c }" role="tab" :aria-selected="cat === c" type="button" @click="setCat(c)">
            <motion.span v-if="cat === c" layout-id="hr-filter-pill" class="hr-filter-pill" :transition="spring" />
            {{ t(`portfolio.categories.${c}`) }} <span class="hr-mono" style="opacity: .7">{{ counts[c] }}</span>
          </button>
          <span class="hr-filter-count hr-mono">{{ t('v2.portfolio.count', { n: items.length }) }}</span>
        </div>
        <motion.div class="hr-grid" layout :transition="spring">
          <AnimatePresence mode="popLayout">
            <motion.button
              v-for="(it, i) in items"
              :key="it.code"
              type="button"
              class="hr-tile"
              :class="it.span"
              layout
              :initial="{ opacity: 0, scale: 0.92 }"
              :animate="{ opacity: 1, scale: 1 }"
              :exit="{ opacity: 0, scale: 0.92 }"
              :transition="spring"
              :data-cursor="it.type === 'video' ? t('v2.cursor.play') : t('v2.cursor.zoom')"
              :aria-label="t(`portfolio.items.${it.titleKey}`)"
              @click="openLightbox(items, i)"
              @pointerenter="play"
              @pointerleave="stop"
            >
              <video v-if="it.type === 'video'" :src="`${it.src}#t=0.5`" muted loop playsinline preload="metadata"></video>
              <img v-else :src="it.src" :alt="t(`portfolio.items.${it.titleKey}`)" loading="lazy" />
              <span class="hr-badge hr-mono">{{ t(`portfolio.categories.${it.cat}`) }}</span>
              <span v-if="it.type === 'video'" class="hr-play"><Icon name="play" /></span>
              <span class="hr-tile-cap"><strong>{{ t(`portfolio.items.${it.titleKey}`) }}</strong><span class="hr-mono">{{ it.code }}</span></span>
            </motion.button>
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </section>
    <FinalCta />
  </div>
</template>
