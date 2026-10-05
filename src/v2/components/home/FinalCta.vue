<script setup>
// "Vamos voar?" — letras reagem ao mouse; WhatsApp + telefone com botão de copiar.
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGsap, gsap, SplitText, finePointer, prefersReduced } from '../../composables/motion'
import { waLink, PHONE_DISPLAY } from '../../data/site'
import { vMagnetic } from '../../directives/magnetic'
import Icon from '../shared/Icon.vue'

const props = defineProps({ waKey: { type: String, default: 'waMessages.ctaBand' } })
const { t, locale } = useI18n()
const root = ref(null)
const copied = ref(false)
const titleKey = computed(() => `${locale.value}-final`)

async function copyPhone(e) {
  try {
    await navigator.clipboard.writeText(PHONE_DISPLAY)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch {
    const span = e.currentTarget.previousElementSibling
    window.getSelection()?.selectAllChildren(span)
  }
}

useGsap(root, () => {
  gsap.from('.hr-final-in > *', { y: 50, duration: 1.2, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: root.value, start: 'top 75%' } })
  if (!finePointer() || prefersReduced()) return
  const title = root.value.querySelector('.hr-final-title')
  const split = SplitText.create(title, { type: 'chars', charsClass: 'char' })
  const setters = split.chars.map((ch) => ({ ch, y: gsap.quickTo(ch, 'y', { duration: 0.6, ease: 'power3' }), r: gsap.quickTo(ch, 'rotation', { duration: 0.6, ease: 'power3' }) }))
  const move = (e) => setters.forEach((s) => {
    const b = s.ch.getBoundingClientRect()
    const dx = e.clientX - (b.left + b.width / 2), dy = e.clientY - (b.top + b.height / 2)
    const k = Math.max(0, 1 - Math.hypot(dx, dy) / 260)
    s.y(-k * 46); s.r(gsap.utils.clamp(-8, 8, dx / 40) * k)
  })
  const leave = () => setters.forEach((s) => { s.y(0); s.r(0) })
  root.value.addEventListener('pointermove', move)
  root.value.addEventListener('pointerleave', leave)
  return () => { root.value?.removeEventListener('pointermove', move); root.value?.removeEventListener('pointerleave', leave) }
})
</script>

<template>
  <section ref="root" class="hr-final">
    <div class="hr-wrap hr-final-in">
      <span class="hr-eyebrow">{{ t('v2.final.eyebrow') }}</span>
      <h2 :key="titleKey" class="hr-h1 hr-final-title">{{ t('v2.final.title') }}</h2>
      <p class="hr-lead" style="margin-inline: auto">{{ t('cta.subtitle') }}</p>
      <div class="hr-final-actions">
        <a v-magnetic class="hr-btn hr-btn-mint hr-btn-lg" :href="waLink(t(props.waKey))" target="_blank" rel="noopener"><Icon name="chat" />{{ t('cta.button') }}</a>
        <div class="hr-phone"><span>{{ PHONE_DISPLAY }}</span><button type="button" @click="copyPhone">{{ copied ? t('v2.final.copied') : t('v2.final.copy') }}</button></div>
      </div>
    </div>
  </section>
</template>
