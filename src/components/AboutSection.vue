<template>
  <section id="sobre" class="relative py-24 sm:py-32 overflow-hidden">
    <div class="absolute -right-40 top-20 w-[40rem] h-[40rem] rounded-full bg-brand/10 blur-[120px] pointer-events-none"></div>
    <div class="max-w-container mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
      <div>
        <div v-reveal>
          <span class="font-mono text-[12px] tracking-[0.3em] uppercase text-mint">{{ t('about.eyebrow') }}</span>
          <h2 class="mt-4 font-display font-bold text-white text-[clamp(2rem,4vw,3rem)] leading-[1.07] tracking-tight">
            {{ t('about.title') }} <span class="grad-brand">{{ t('about.titleHighlight') }}</span>
          </h2>
          <p class="mt-7 text-[17px] text-slate-300/85 leading-relaxed">
            {{ t('about.description') }}
          </p>
        </div>
        <div v-reveal="150" class="mt-9 flex flex-wrap gap-3">
          <a :href="aboutWaLink"
             target="_blank" rel="noopener"
             class="btn btn-primary px-6 py-3 text-[15px]">
            <span class="ms text-[19px]">chat</span> {{ t('about.ctaPrimary') }}
          </a>
          <a href="#processo" class="btn btn-ghost px-6 py-3 text-[15px]">
            <span class="ms text-[19px]">timeline</span> {{ t('about.ctaSecondary') }}
          </a>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-4">
        <div
          v-for="(d, i) in differentials" :key="d.id"
          v-reveal="i * 80"
          class="glass rounded-2xl p-6 hover:border-mint/40 hover:bg-mint/[.03] transition group"
        >
          <span class="ms text-[26px] text-mint group-hover:scale-110 transition-transform inline-block">{{ d.icon }}</span>
          <h3 class="mt-4 font-display font-semibold text-[16.5px] text-white leading-snug">{{ t(`about.differentials.${d.id}.title`) }}</h3>
          <p class="mt-1.5 text-[13.5px] text-slate-300/65 leading-relaxed">{{ t(`about.differentials.${d.id}.desc`) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { waLink, differentials } from '../data/constants.js'

const { t } = useI18n()
const aboutWaLink = computed(() => waLink(t('waMessages.about')))
</script>
