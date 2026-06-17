<template>
  <section id="inicio" class="relative min-h-screen flex items-center overflow-hidden">
    <div class="hero-fallback"></div>
    <video v-if="videoSrc" class="absolute inset-0 w-full h-full object-cover"
           autoplay muted loop playsinline :src="videoSrc"></video>
    <div class="grain"></div>
    <div class="scanline"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-ink-950/55 via-ink-950/35 to-ink-950"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/10 to-transparent"></div>

    <div class="relative z-10 max-w-container mx-auto px-5 sm:px-8 w-full pt-28 pb-20">
      <div class="max-w-3xl">
        <div v-reveal class="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-7">
          <span class="relative flex w-2 h-2">
            <span class="absolute inline-flex w-full h-full rounded-full bg-mint opacity-60 animate-ping"></span>
            <span class="relative inline-flex w-2 h-2 rounded-full bg-mint"></span>
          </span>
          <span class="text-[12.5px] font-medium tracking-wide text-slate-200">Captação aérea profissional com drone</span>
        </div>

        <h1 v-reveal class="font-display font-bold text-white leading-[1.02] tracking-[-0.02em] text-[clamp(2.6rem,7vw,5.2rem)]">
          Imagens aéreas que<br class="hidden sm:block" />
          <span class="grad-text">elevam</span> sua perspectiva
        </h1>

        <p v-reveal class="mt-7 text-[clamp(1.05rem,2vw,1.3rem)] text-slate-300/90 leading-relaxed max-w-2xl">
          Filmagens, fotos e vídeos profissionais com drone para
          <span class="text-white font-medium">eventos, imóveis, empresas, turismo e redes sociais</span>.
        </p>

        <div v-reveal class="mt-10 flex flex-col sm:flex-row gap-3.5">
          <a :href="waLink('Olá! Gostaria de solicitar um orçamento com a HR Drone.')"
             target="_blank" rel="noopener"
             class="btn btn-primary px-7 py-3.5 text-[15.5px] justify-center">
            <span class="ms text-[20px]">request_quote</span> Solicitar orçamento
          </a>
          <a href="#portfolio" class="btn btn-ghost px-7 py-3.5 text-[15.5px] justify-center">
            <span class="ms text-[20px]">play_circle</span> Ver portfólio
          </a>
        </div>

        <dl v-reveal class="mt-14 flex flex-wrap gap-x-10 gap-y-5">
          <div v-for="s in heroStats" :key="s.l">
            <dt class="font-display font-bold text-[clamp(1.6rem,3vw,2.2rem)] text-white leading-none">{{ s.v }}</dt>
            <dd class="mt-1.5 text-[12.5px] font-medium tracking-wide text-slatey uppercase">{{ s.l }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <a href="#servicos"
       class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 text-slatey/60 hover:text-mint transition"
       aria-label="Rolar para serviços">
      <span class="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
      <span class="ms text-[22px] animate-bounce">keyboard_arrow_down</span>
    </a>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { waLink, heroStats } from '../data/constants.js'

const videoSrc = ref('')

onMounted(() => {
  videoSrc.value = '/Drone/drone_06.mp4'
})
</script>
