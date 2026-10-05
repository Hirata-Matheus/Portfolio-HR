<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { PAGES, LOGO_SRC, waLink } from '../../data/site'
import { menuOpen, setMenu } from '../../composables/ui'
import { vMagnetic } from '../../directives/magnetic'
import LanguageSwitcher from './LanguageSwitcher.vue'
import MobileMenu from './MobileMenu.vue'

const { t } = useI18n()
const scrolled = ref(false)
const hidden = ref(false)
let lastY = 0

function onScroll() {
  const y = window.scrollY
  scrolled.value = y > 40
  hidden.value = y > lastY && y > 400 && !menuOpen.value
  lastY = y
}
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="hr-nav" :class="{ 'is-scrolled': scrolled, 'is-hidden': hidden }">
    <div class="hr-wrap hr-nav-in">
      <RouterLink to="/" class="hr-brand" :aria-label="t('header.logoAria')">
        <img :src="LOGO_SRC" alt="" width="36" height="36" />HR DRONE
      </RouterLink>
      <nav class="hr-links" :aria-label="t('header.navAria')">
        <RouterLink v-for="p in PAGES" :key="p.id" :to="p.path">{{ t(`nav.${p.id}`) }}</RouterLink>
      </nav>
      <LanguageSwitcher class="hidden lg:block" />
      <a v-magnetic class="hr-btn hr-btn-mint hr-nav-cta" :href="waLink(t('waMessages.hero'))" target="_blank" rel="noopener">{{ t('header.requestQuote') }}</a>
      <button class="hr-pill-btn hr-menu-btn" type="button" :aria-expanded="menuOpen" aria-controls="hr-menu" :aria-label="t('header.menuOpenAria')" @click="setMenu(true)">
        {{ t('v2.menu.open') }}
      </button>
    </div>
  </header>
  <MobileMenu />
</template>
