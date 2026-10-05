<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { AnimatePresence, motion } from 'motion-v'
import { LANGUAGES, persistLocale } from '../../data/site'

const props = defineProps({ up: { type: Boolean, default: false } })
const { t, locale } = useI18n({ useScope: 'global' })
const open = ref(false)
const root = ref(null)
const current = computed(() => LANGUAGES.find((l) => l.code === locale.value) || LANGUAGES[0])

function choose(code) {
  locale.value = code
  persistLocale(code)
  open.value = false
}
const onDoc = (e) => { if (open.value && root.value && !root.value.contains(e.target)) open.value = false }
const onKey = (e) => { if (e.key === 'Escape') open.value = false }
onMounted(() => { document.addEventListener('pointerdown', onDoc); document.addEventListener('keydown', onKey) })
onBeforeUnmount(() => { document.removeEventListener('pointerdown', onDoc); document.removeEventListener('keydown', onKey) })
</script>

<template>
  <div ref="root" class="hr-lang">
    <button class="hr-pill-btn" type="button" :aria-expanded="open" aria-haspopup="listbox" :aria-label="t('header.language')" @click="open = !open">
      <span aria-hidden="true">{{ current.flag }}</span>{{ current.code.toUpperCase() }}
    </button>
    <AnimatePresence>
      <motion.div
        v-if="open"
        class="hr-lang-list"
        role="listbox"
        :style="props.up ? { top: 'auto', bottom: 'calc(100% + 8px)', left: 0, right: 'auto' } : {}"
        :initial="{ opacity: 0, y: props.up ? 8 : -8, scale: 0.97 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :exit="{ opacity: 0, y: props.up ? 8 : -8, scale: 0.97 }"
        :transition="{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }"
      >
        <button v-for="l in LANGUAGES" :key="l.code" type="button" role="option" :aria-selected="l.code === locale" :aria-current="l.code === locale" @click="choose(l.code)">
          <span aria-hidden="true">{{ l.flag }}</span>{{ l.label }}
        </button>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
