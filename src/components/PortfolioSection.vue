<template>
  <section id="portfolio" class="relative py-24 sm:py-32 bg-ink-900/60 border-y border-white/5">
    <div class="max-w-container mx-auto px-5 sm:px-8">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12" v-reveal>
        <div class="max-w-2xl">
          <span class="font-mono text-[12px] tracking-[0.3em] uppercase text-mint">/ Portfólio</span>
          <h2 class="mt-4 font-display font-bold text-white text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-tight">
            Trabalhos vistos de outro ângulo
          </h2>
        </div>
        <p class="text-[15px] text-slate-300/70 md:max-w-xs">
          Uma seleção de capturas aéreas com imagens e vídeos reais.
        </p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-2.5 mb-9" v-reveal>
        <button
          v-for="c in categories" :key="c"
          @click="activeCat = c"
          :class="[
            'px-4 py-2 rounded-full text-[13.5px] font-semibold transition border',
            activeCat === c
              ? 'bg-mint text-ink-950 border-mint shadow-lg shadow-mint/20'
              : 'glass text-slatey hover:text-white hover:border-mint/40'
          ]"
        >{{ c }}</button>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-4">
        <TransitionGroup name="folio">
          <figure
            v-for="item in filtered" :key="item.id"
            :class="[
              'group relative rounded-2xl border border-white/8 cursor-pointer overflow-hidden',
              item.span,
              item.src ? 'bg-ink-950' : 'media-ph'
            ]"
          >
            <img
              v-if="item.src && item.type === 'image'"
              :src="item.src" :alt="item.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <video
              v-if="item.src && item.type === 'video'"
              :src="item.src"
              class="absolute inset-0 w-full h-full object-cover"
              muted loop playsinline preload="metadata"
              @mouseenter="$event.target.play()"
              @mouseleave="e => { e.target.pause(); e.target.currentTime = 0 }"
              @click="e => e.target.paused ? e.target.play() : e.target.pause()"
            ></video>
            <div v-if="!item.src" class="absolute inset-0 grid place-items-center text-white/15">
              <span class="ms text-[44px]">{{ item.type === 'video' ? 'videocam' : 'photo_camera' }}</span>
            </div>

            <div class="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent pointer-events-none"></div>

            <span v-if="item.type === 'video'"
                  class="absolute top-3 right-3 z-10 grid place-items-center w-9 h-9 rounded-full bg-ink-950/60 backdrop-blur border border-white/15 text-mint">
              <span class="ms fill text-[18px]">play_arrow</span>
            </span>

            <figcaption class="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition">
              <span class="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-mint mb-1.5">{{ item.cat }}</span>
              <h3 class="font-display font-semibold text-gray-300 text-[15px] sm:text-[17px] leading-snug">{{ item.title }}</h3>
            </figcaption>
            <span class="absolute top-3 left-3 z-10 font-mono text-[9px] tracking-wider text-white/30 select-none">{{ item.code }}</span>
          </figure>
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { categories, portfolioItems } from '../data/portfolio.js'

const activeCat = ref('Todos')
const filtered = computed(() =>
  activeCat.value === 'Todos' ? portfolioItems : portfolioItems.filter(p => p.cat === activeCat.value)
)
</script>
