<template>
  <div class="font-sans text-slate-200 bg-ink-950 antialiased">
    <TheHeader />
    <main>
      <HeroSection />
      <LazySection placeholder="60vh" anchorId="servicos">
        <ServicesSection />
      </LazySection>
      <LazySection placeholder="80vh" anchorId="portfolio">
        <PortfolioSection />
      </LazySection>
      <LazySection placeholder="60vh" anchorId="sobre">
        <AboutSection />
      </LazySection>
      <LazySection placeholder="50vh" anchorId="processo">
        <ProcessSection />
      </LazySection>
      <LazySection placeholder="40vh">
        <CtaBand />
      </LazySection>
      <LazySection placeholder="70vh" anchorId="contato">
        <ContactSection />
      </LazySection>
      <LazySection placeholder="20vh">
        <VerseBanner />
      </LazySection>
    </main>
    <LazySection placeholder="20vh">
      <TheFooter />
    </LazySection>
    <TweaksPanel />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import TheHeader       from './components/TheHeader.vue'
import HeroSection     from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import AboutSection    from './components/AboutSection.vue'
import ProcessSection  from './components/ProcessSection.vue'
import CtaBand         from './components/CtaBand.vue'
import ContactSection  from './components/ContactSection.vue'
import VerseBanner     from './components/VerseBanner.vue'
import TheFooter       from './components/TheFooter.vue'
import TweaksPanel     from './components/TweaksPanel.vue'
import LazySection     from './components/LazySection.vue'
import { useTweaks }   from './composables/useTweaks.js'

const { applyTweaks } = useTweaks()
const { t } = useI18n()

onMounted(() => applyTweaks())

// Internal `#id` links target sections that render lazily (LazySection),
// so the browser's native anchor jump can land far off target — it computes
// the destination once, before sections above it have expanded to real height.
// Force everything to mount first, let layout settle, then scroll for real.
function onAnchorClick(e) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  const a = e.target.closest('a[href^="#"]')
  if (!a) return
  const id = a.getAttribute('href').slice(1)
  const target = id && document.getElementById(id)
  if (!target) return

  e.preventDefault()
  window.dispatchEvent(new Event('force-mount-lazy'))
  history.pushState(null, '', `#${id}`)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })
}

onMounted(() => document.addEventListener('click', onAnchorClick))
onUnmounted(() => document.removeEventListener('click', onAnchorClick))

watchEffect(() => {
  document.title = t('meta.title')
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'))
})
</script>
