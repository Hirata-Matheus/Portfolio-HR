<template>
  <section id="servicos" class="relative py-24 sm:py-32">
    <div class="max-w-container mx-auto px-5 sm:px-8">
      <div class="max-w-2xl mb-14" v-reveal>
        <span class="font-mono text-[12px] tracking-[0.3em] uppercase text-mint">/ Serviços</span>
        <h2 class="mt-4 font-display font-bold text-white text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-tight">
          Tudo o que o seu projeto<br />precisa ver de cima
        </h2>
        <p class="mt-5 text-[17px] text-slate-300/80 leading-relaxed">
          Soluções completas de captação aérea, do briefing à entrega final — com olhar cinematográfico e padrão profissional.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <article
          v-for="(s, i) in services" :key="s.title"
          v-reveal="i % 3 * 70"
          class="svc-card glass rounded-2xl p-7 group"
        >
          <div class="svc-ic grid place-items-center w-14 h-14 rounded-2xl bg-white/5 text-mint mb-6 border border-white/8">
            <span class="ms text-[28px]">{{ s.icon }}</span>
          </div>
          <h3 class="font-display font-semibold text-[20px] text-white">{{ s.title }}</h3>
          <p class="mt-3 text-[15px] text-slate-300/75 leading-relaxed">{{ s.desc }}</p>
          <div class="mt-6 flex items-center gap-1.5 text-[13.5px] font-semibold text-slatey group-hover:text-mint transition">
            Saiba mais <span class="ms text-[17px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { services } from '../data/constants.js'
</script>
