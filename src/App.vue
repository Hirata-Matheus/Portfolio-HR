<template>
  <div class="font-sans text-slate-200 bg-ink-950 antialiased">
    <TheHeader />
    <main>
      <HeroSection />
      <LazySection placeholder="60vh">
        <ServicesSection />
      </LazySection>
      <LazySection placeholder="80vh">
        <PortfolioSection />
      </LazySection>
      <LazySection placeholder="60vh">
        <AboutSection />
      </LazySection>
      <LazySection placeholder="50vh">
        <ProcessSection />
      </LazySection>
      <LazySection placeholder="40vh">
        <CtaBand />
      </LazySection>
      <LazySection placeholder="70vh">
        <ContactSection />
      </LazySection>
    </main>
    <LazySection placeholder="20vh">
      <TheFooter />
    </LazySection>
    <TweaksPanel />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import TheHeader       from './components/TheHeader.vue'
import HeroSection     from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import AboutSection    from './components/AboutSection.vue'
import ProcessSection  from './components/ProcessSection.vue'
import CtaBand         from './components/CtaBand.vue'
import ContactSection  from './components/ContactSection.vue'
import TheFooter       from './components/TheFooter.vue'
import TweaksPanel     from './components/TweaksPanel.vue'
import LazySection     from './components/LazySection.vue'
import { useTweaks }   from './composables/useTweaks.js'

const { applyTweaks } = useTweaks()

onMounted(() => applyTweaks())
</script>
