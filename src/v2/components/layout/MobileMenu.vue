<script setup>
import { watch, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { AnimatePresence, motion } from 'motion-v'
import { PAGES, waLink } from '../../data/site'
import { menuOpen, setMenu } from '../../composables/ui'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const links = [{ id: 'inicio', path: '/' }, ...PAGES]
const ease = [0.16, 1, 0.3, 1]
const onKey = (e) => { if (e.key === 'Escape' && menuOpen.value) setMenu(false) }
onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))
watch(menuOpen, (o) => { if (o) requestAnimationFrame(() => document.querySelector('#hr-menu .hr-menu-close')?.focus()) })
</script>

<template>
  <AnimatePresence>
    <motion.div
      v-if="menuOpen"
      id="hr-menu"
      class="hr-menu"
      role="dialog"
      aria-modal="true"
      :initial="{ clipPath: 'inset(0 0 100% 0)' }"
      :animate="{ clipPath: 'inset(0 0 0% 0)' }"
      :exit="{ clipPath: 'inset(0 0 100% 0)' }"
      :transition="{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }"
    >
      <button class="hr-pill-btn hr-menu-close" type="button" @click="setMenu(false)">{{ t('v2.menu.close') }}</button>
      <motion.div
        v-for="(l, i) in links"
        :key="l.id"
        :initial="{ opacity: 0, y: 40 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.15 + i * 0.06, ease }"
      >
        <RouterLink class="hr-menu-link" :to="l.path" @click="setMenu(false)"><small>/{{ String(i).padStart(2, '0') }}</small>{{ t(`nav.${l.id}`) }}</RouterLink>
      </motion.div>
      <div class="hr-menu-foot">
        <a class="hr-btn hr-btn-mint" :href="waLink(t('waMessages.hero'))" target="_blank" rel="noopener">{{ t('header.requestQuote') }}</a>
        <LanguageSwitcher up />
      </div>
    </motion.div>
  </AnimatePresence>
</template>
