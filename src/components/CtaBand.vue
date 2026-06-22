<template>
  <section class="cta-band relative py-20 sm:py-28">
    <div class="max-w-container mx-auto px-5 sm:px-8">
      <div class="relative overflow-hidden rounded-[2rem] p-10 sm:p-16 text-center"
           style="background: linear-gradient(115deg, #0b4d87 0%, #106EBE 42%, #0ad6a3 100%);">
        <div class="grain opacity-30"></div>
        <div class="absolute -top-20 -left-10 w-72 h-72 rounded-full bg-mint/30 blur-3xl"></div>
        <div class="relative">
          <h2 v-reveal
              class="font-display font-bold text-white text-[clamp(1.8rem,4.5vw,3.2rem)] leading-[1.05] tracking-tight max-w-3xl mx-auto">
            Pronto para registrar seu projeto de um novo ângulo?
          </h2>
          <p v-reveal="120"
             class="mt-5 text-[17px] text-white/85 max-w-xl mx-auto">
            Resposta rápida, orçamento sem compromisso e entrega no padrão profissional.
          </p>
          <a v-reveal="240"
             :href="waLink('Olá! Vim pelo site e quero registrar meu projeto com a HR Drone.')"
             target="_blank" rel="noopener"
             class="btn mt-9 px-8 py-4 text-[16px] bg-ink-950 text-white hover:bg-ink-900 hover:-translate-y-0.5 shadow-2xl">
            <span class="ms fill text-[22px] text-mint">chat</span> Chamar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { waLink } from '../data/constants.js'
</script>
