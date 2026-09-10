<template>
  <header :class="[
    'fixed top-0 inset-x-0 z-50 transition-all duration-300',
    scrolled ? 'bg-ink-950/85 backdrop-blur-xl border-b border-white/8 py-3' : 'py-5 border-b border-transparent'
  ]">
    <div class="max-w-container mx-auto px-5 sm:px-8 flex items-center justify-between">
      <a href="#inicio" class="flex items-center group" :aria-label="t('header.logoAria')">
        <img src="/images/HR_Drone_logo_transparente_melhorado.png" alt="HR Drone" class="h-12 w-auto object-contain drop-shadow-lg" />
      </a>

      <nav class="hidden lg:flex items-center gap-1" :aria-label="t('header.navAria')">
        <a v-for="l in nav" :key="l.id" :href="'#'+l.id"
           class="px-4 py-2 rounded-full text-[14.5px] font-medium text-slatey hover:text-white hover:bg-white/5 transition">
          {{ t(`nav.${l.id}`) }}
        </a>
      </nav>

      <div class="hidden lg:flex items-center gap-3">
        <LanguageSwitcher />
        <a href="#contato" class="btn btn-primary px-5 py-2.5 text-[14px]">
          <span class="ms text-[18px]" aria-hidden="true">request_quote</span> {{ t('header.requestQuote') }}
        </a>
      </div>

      <div class="flex items-center gap-2 lg:hidden">
        <LanguageSwitcher />
        <button @click="menuOpen = !menuOpen"
                class="grid place-items-center w-11 h-11 rounded-xl glass text-white ring-glow"
                :aria-expanded="menuOpen" :aria-label="t('header.menuOpenAria')">
          <span class="ms text-[26px]">{{ menuOpen ? 'close' : 'menu' }}</span>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      leave-active-class="transition duration-200"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div v-if="menuOpen" class="lg:hidden mt-3 mx-4 rounded-2xl glass p-3">
        <a v-for="l in nav" :key="l.id" :href="'#'+l.id" @click="menuOpen = false"
           class="flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium text-slate-200 hover:bg-white/5 hover:text-mint transition">
          {{ t(`nav.${l.id}`) }}
          <span class="ms text-[18px] text-slatey/50">chevron_right</span>
        </a>
        <a href="#contato" @click="menuOpen = false" class="btn btn-primary w-full justify-center mt-2 py-3">
          <span class="ms text-[18px]">request_quote</span> {{ t('header.requestQuote') }}
        </a>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { nav } from '../data/constants.js'
import { useScrolled } from '../composables/useScrolled.js'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const { scrolled } = useScrolled()
const menuOpen = ref(false)
</script>
