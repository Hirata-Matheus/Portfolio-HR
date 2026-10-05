<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGsap, gsap, SplitText, prefersReduced, finePointer } from '../../composables/motion'
import { introReady } from '../../composables/ui'
import { waLink, STATS, pad } from '../../data/site'
import { IMAGES } from '../../data/portfolio'
import { vMagnetic } from '../../directives/magnetic'
import Icon from '../shared/Icon.vue'

// Para usar um vídeo no topo, passe :video="'/Drone/seu-video.mp4'" — a foto vira o poster.
const props = defineProps({ image: { type: String, default: IMAGES.hero }, video: { type: String, default: '' } })

const { t, locale } = useI18n()
const root = ref(null)
const tc = ref('00:00:00:00')
const hdg = ref(274)
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const titleHtml = computed(() => `${esc(t('hero.titleLine1'))} <span class="hr-grad">${esc(t('hero.titleHighlight'))}</span> ${esc(t('hero.titleSuffix'))}`)

let raf = 0
const t0 = performance.now()
function tick(now) {
  const f = Math.floor(((now - t0) / 1000) * 30)
  tc.value = `${pad(Math.floor(f / 108000))}:${pad(Math.floor(f / 1800) % 60)}:${pad(Math.floor(f / 30) % 60)}:${pad(f % 30)}`
  raf = requestAnimationFrame(tick)
}
onMounted(() => { if (!prefersReduced()) raf = requestAnimationFrame(tick) })
onBeforeUnmount(() => cancelAnimationFrame(raf))

useGsap(root, () => {
  if (prefersReduced()) return
  const media = root.value.querySelector('.hr-hero-media')
  const cross = root.value.querySelector('.hr-cross')
  gsap.to('.hr-hero-media > *', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true } })
  gsap.to('.hr-hero-copy', { y: -70, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: root.value, start: 'center center', end: 'bottom top', scrub: true } })

  const tl = gsap.timeline({ paused: true })
  tl.fromTo('.hr-hero-media > *', { scale: 1.32 }, { scale: 1.08, duration: 2.6, ease: 'expo.out' }, 0)
    .from('.hr-corner', { scale: 0.3, opacity: 0, duration: 0.9, stagger: 0.06, ease: 'expo.out' }, 0.1)
    .from('.hr-hud-tl, .hr-hud-tr, .hr-hud-br, .hr-cross', { opacity: 0, duration: 0.6, stagger: 0.08 }, 0.4)
    .from('.hr-hero .hr-reveal', { y: 26, opacity: 0, duration: 1, stagger: 0.09, ease: 'expo.out' }, 0.45)
  let started = false
  let lines = null
  SplitText.create('.hr-hero-title', {
    type: 'lines', mask: 'lines', linesClass: 'hr-line-mask', autoSplit: true,
    onSplit: (self) => (lines = gsap.from(self.lines, { yPercent: 115, duration: 1.15, stagger: 0.1, ease: 'expo.out', delay: started ? 0 : 0.15, paused: !started }))
  })
  introReady().then(() => { started = true; tl.play(); lines?.play() })

  if (finePointer()) {
    const mx = gsap.quickTo(media, 'x', { duration: 1.2, ease: 'power3' })
    const my = gsap.quickTo(media, 'y', { duration: 1.2, ease: 'power3' })
    const cx = gsap.quickTo(cross, 'x', { duration: 0.9, ease: 'power3' })
    const cy = gsap.quickTo(cross, 'y', { duration: 0.9, ease: 'power3' })
    const onMove = (e) => {
      const r = root.value.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      mx(-nx * 26); my(-ny * 18); cx(nx * 60); cy(ny * 40)
      hdg.value = Math.round((274 + nx * 40 + 360) % 360)
    }
    root.value.addEventListener('pointermove', onMove)
    return () => root.value?.removeEventListener('pointermove', onMove)
  }
})
</script>

<template>
  <section ref="root" class="hr-hero">
    <div class="hr-hero-media">
      <video v-if="video" :src="video" :poster="image" autoplay muted loop playsinline></video>
      <img v-else :src="image" :alt="t('portfolio.items.dr022')" fetchpriority="high" />
    </div>
    <div class="hr-hero-shade"></div>
    <div class="hr-hud" aria-hidden="true">
      <span class="hr-corner tl"></span><span class="hr-corner tr"></span><span class="hr-corner bl"></span><span class="hr-corner br"></span>
      <div class="hr-hud-tl"><span class="hr-rec">REC</span><span class="hr-tc">{{ tc }}</span></div>
      <div class="hr-hud-tr"><span>4K</span><span>30 FPS</span><span>ISO 100</span><span>HDG {{ pad(hdg, 3) }}°</span></div>
      <div class="hr-cross"></div>
      <div class="hr-hud-br">21°12′32″S · 50°25′58″W<br />Araçatuba · SP</div>
    </div>
    <div class="hr-wrap hr-hero-copy">
      <span class="hr-eyebrow hr-reveal">{{ t('hero.badge') }}</span>
      <h1 :key="locale" class="hr-h1 hr-hero-title" v-html="titleHtml"></h1>
      <p class="hr-hero-sub hr-reveal">{{ t('hero.subtitle') }} <strong>{{ t('hero.subtitleHighlight') }}</strong>.</p>
      <div class="hr-reveal flex flex-wrap gap-3">
        <a v-magnetic class="hr-btn hr-btn-mint" :href="waLink(t('waMessages.hero'))" target="_blank" rel="noopener"><Icon name="chat" />{{ t('hero.ctaPrimary') }}</a>
        <RouterLink v-magnetic class="hr-btn hr-btn-ghost" to="/portfolio"><Icon name="play-circle" />{{ t('hero.ctaSecondary') }}</RouterLink>
      </div>
      <div class="hr-hero-meta hr-mono hr-reveal">
        <span v-for="s in STATS" :key="s.id"><b>{{ s.value }}{{ s.suffix }}</b>{{ t(`hero.stats.${s.id}`) }}</span>
      </div>
    </div>
  </section>
</template>
