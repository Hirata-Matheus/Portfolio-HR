<template>
  <footer class="border-t border-white/8 bg-ink-950 pt-16 pb-9">
    <div class="max-w-container mx-auto px-5 sm:px-8">
      <div class="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10 md:gap-8">
        <div v-reveal>
          <a href="#inicio" class="inline-flex mb-5">
            <img src="/images/HR_Drone_logo_transparente_melhorado.png" alt="HR Drone" class="h-12 w-auto object-contain" />
          </a>
          <p class="text-[14.5px] text-slate-300/65 leading-relaxed max-w-sm">
            Captação aérea profissional para imóveis, empresas, eventos e momentos especiais.
            Qualidade, segurança e olhar cinematográfico.
          </p>
          <div class="flex gap-3 mt-6">
            <a :href="instaUrl" target="_blank" rel="noopener" aria-label="Instagram"
               class="grid place-items-center w-11 h-11 rounded-xl glass text-slatey hover:text-mint hover:border-mint/40 transition">
              <span class="ms text-[22px]">photo_camera</span>
            </a>
            <a :href="waLink('Olá HR Drone!')" target="_blank" rel="noopener" aria-label="WhatsApp"
               class="grid place-items-center w-11 h-11 rounded-xl glass text-slatey hover:text-mint hover:border-mint/40 transition">
              <span class="ms text-[22px]">chat</span>
            </a>
            <a :href="`mailto:${email}`" aria-label="E-mail"
               class="grid place-items-center w-11 h-11 rounded-xl glass text-slatey hover:text-mint hover:border-mint/40 transition">
              <span class="ms text-[22px]">mail</span>
            </a>
          </div>
        </div>

        <div v-reveal="100">
          <h4 class="font-mono text-[11px] tracking-[0.25em] uppercase text-slatey/60 mb-5">Navegação</h4>
          <ul class="space-y-3">
            <li v-for="l in nav" :key="l.id">
              <a :href="'#'+l.id" class="text-[14.5px] text-slate-300/75 hover:text-mint transition">{{ l.label }}</a>
            </li>
          </ul>
        </div>

        <div v-reveal="200">
          <h4 class="font-mono text-[11px] tracking-[0.25em] uppercase text-slatey/60 mb-5">Contato</h4>
          <ul class="space-y-3 text-[14.5px]">
            <li>
              <a :href="waLink('Olá HR Drone!')" target="_blank" rel="noopener"
                 class="text-slate-300/75 hover:text-mint transition flex items-center gap-2">
                <span class="ms text-[17px] text-mint/70">chat</span>{{ phoneDisplay }}
              </a>
            </li>
            <li>
              <a :href="instaUrl" target="_blank" rel="noopener"
                 class="text-slate-300/75 hover:text-mint transition flex items-center gap-2">
                <span class="ms text-[17px] text-mint/70">photo_camera</span>{{ instaHandle }}
              </a>
            </li>
            <li>
              <a :href="`mailto:${email}`"
                 class="text-slate-300/75 hover:text-mint transition flex items-center gap-2 break-all">
                <span class="ms text-[17px] text-mint/70">mail</span>{{ email }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div v-reveal="100" class="mt-12 pt-7 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-[12.5px] text-slatey/55">© {{ year }} HR Drone — Todos os direitos reservados.</p>
        <p class="font-mono text-[11px] tracking-wider text-slatey/40">Aerial Imaging · Made with precision</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { nav, waLink, instaUrl, instaHandle, email, phoneDisplay } from '../data/constants.js'

const year = new Date().getFullYear()
</script>
