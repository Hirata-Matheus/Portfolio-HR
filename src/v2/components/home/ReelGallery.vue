<script setup>
// Rolo horizontal: no desktop a seção fica fixa e as fotos andam para o lado com a rolagem.
// No celular (ou com movimento reduzido) vira um carrossel com arraste e encaixe.
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGsap, gsap } from '../../composables/motion'
import { openLightbox } from '../../composables/ui'
import { REEL } from '../../data/portfolio'
import { pad } from '../../data/site'
import Icon from '../shared/Icon.vue'

const { t } = useI18n()
const root = ref(null)
const view = ref(null)
const track = ref(null)
const progress = ref(0.08)
const idx = ref(0)

const setFrame = (p) => {
  progress.value = Math.max(0.04, p)
  idx.value = Math.min(REEL.length - 1, Math.round(p * (REEL.length - 1)))
}
const onNativeScroll = () => {
  const m = view.value.scrollWidth - view.value.clientWidth
  if (m > 0) setFrame(view.value.scrollLeft / m)
}

useGsap(root, () => {
  const mm = gsap.matchMedia()
  mm.add('(min-width: 820px) and (prefers-reduced-motion: no-preference)', () => {
    const dist = () => Math.max(0, track.value.scrollWidth - view.value.clientWidth)
    const tw = gsap.to(track.value, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, onUpdate: (s) => setFrame(s.progress) }
    })
    root.value.querySelectorAll('.hr-shot').forEach((s) => {
      gsap.fromTo(s.querySelector('img, video'), { xPercent: -6 }, { xPercent: 6, ease: 'none', scrollTrigger: { trigger: s, containerAnimation: tw, start: 'left right', end: 'right left', scrub: true } })
    })
  })
  gsap.from('.hr-sec-head', { y: 60, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: root.value, start: 'top 85%' } })
})
</script>

<template>
  <section ref="root" class="hr-reel">
    <div class="hr-reel-in">
      <div class="hr-wrap hr-sec-head" style="margin-bottom: 0">
        <div><span class="hr-eyebrow">{{ t('portfolio.eyebrow') }}</span><h2 class="hr-h2">{{ t('v2.reel.title') }}</h2></div>
        <p class="hr-lead">{{ t('v2.reel.lead') }}</p>
      </div>
      <div ref="view" class="hr-reel-view" @scroll.passive="onNativeScroll">
        <div ref="track" class="hr-reel-track">
          <figure v-for="(it, i) in REEL" :key="it.code" class="hr-shot">
            <div class="hr-shot-frame">
              <video v-if="it.type === 'video'" :src="`${it.src}#t=0.5`" muted playsinline preload="metadata"></video>
              <img v-else :src="it.src" :alt="t(`portfolio.items.${it.titleKey}`)" loading="lazy" />
              <span class="hr-badge hr-mono">{{ t(`portfolio.categories.${it.cat}`) }}</span>
              <span v-if="it.type === 'video'" class="hr-play"><Icon name="play" /></span>
            </div>
            <figcaption>
              <strong>{{ t(`portfolio.items.${it.titleKey}`) }}</strong>
              <span class="hr-mono">{{ it.type === 'video' ? t('v2.media.video') : t('v2.media.photo') }}</span>
            </figcaption>
            <button
              class="hr-cover-btn"
              type="button"
              :data-cursor="it.type === 'video' ? t('v2.cursor.play') : t('v2.cursor.zoom')"
              :aria-label="t(`portfolio.items.${it.titleKey}`)"
              @click="openLightbox(REEL, i)"
            ></button>
          </figure>
          <RouterLink class="hr-shot-more" to="/portfolio" :data-cursor="t('v2.cursor.enter')">
            <span class="hr-mono" style="color: var(--hr-mint)">/portfolio</span>
            <strong>{{ t('v2.reel.more') }}</strong>
            <span class="hr-go"><Icon name="arrow" /></span>
          </RouterLink>
        </div>
      </div>
      <div class="hr-wrap hr-scrub hr-mono" aria-hidden="true">
        <span>{{ t('v2.reel.counter') }} <b>{{ t(`portfolio.categories.${REEL[idx].cat}`) }}</b></span>
        <div class="hr-scrub-bar"><i :style="{ transform: `scaleX(${progress})` }"></i></div>
        <span><b>{{ pad(idx + 1) }}</b> / {{ pad(REEL.length) }}</span>
      </div>
    </div>
  </section>
</template>
