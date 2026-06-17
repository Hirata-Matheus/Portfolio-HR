<template>
  <section id="processo" class="relative py-24 sm:py-32 bg-ink-900/60 border-y border-white/5">
    <div class="max-w-container mx-auto px-5 sm:px-8">
      <div class="max-w-2xl mb-16" v-reveal>
        <span class="font-mono text-[12px] tracking-[0.3em] uppercase text-mint">/ Processo</span>
        <h2 class="mt-4 font-display font-bold text-white text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-tight">
          Do briefing à entrega, sem turbulência
        </h2>
      </div>

      <div class="relative grid md:grid-cols-4 gap-6 md:gap-4">
        <div class="hidden md:block absolute top-9 left-[12%] right-[12%] h-px step-line"></div>
        <div
          v-for="(p, i) in process" :key="p.title"
          v-reveal="i * 90"
          class="relative"
        >
          <div class="relative z-10 grid place-items-center w-[72px] h-[72px] rounded-2xl glass border-white/10 mb-6 mx-auto md:mx-0">
            <span class="ms text-[30px] text-mint">{{ p.icon }}</span>
            <span class="absolute -top-2 -right-2 grid place-items-center w-7 h-7 rounded-full bg-brand text-white font-display font-bold text-[13px] border-2 border-ink-900">
              {{ i + 1 }}
            </span>
          </div>
          <h3 class="font-display font-semibold text-[19px] text-white text-center md:text-left">{{ p.title }}</h3>
          <p class="mt-2.5 text-[14.5px] text-slate-300/70 leading-relaxed text-center md:text-left">{{ p.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { process } from '../data/constants.js'
</script>
