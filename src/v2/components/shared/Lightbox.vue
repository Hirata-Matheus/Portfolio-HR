<script setup>
import { computed, watch, onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { AnimatePresence, motion } from 'motion-v'
import { lightbox, closeLightbox, stepLightbox } from '../../composables/ui'
import Icon from './Icon.vue'

const { t } = useI18n()
const item = computed(() => lightbox.items[lightbox.index])
const closeBtn = ref(null)
let lastFocus = null
let touchX = null

const onKey = (e) => {
  if (!lightbox.open) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowRight') stepLightbox(1)
  else if (e.key === 'ArrowLeft') stepLightbox(-1)
}
watch(() => lightbox.open, async (o) => {
  if (o) { lastFocus = document.activeElement; await nextTick(); closeBtn.value?.focus() }
  else lastFocus?.focus?.()
})
onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))

const onTouchStart = (e) => { touchX = e.touches[0].clientX }
const onTouchEnd = (e) => {
  if (touchX === null) return
  const dx = e.changedTouches[0].clientX - touchX
  if (Math.abs(dx) > 50) stepLightbox(dx < 0 ? 1 : -1)
  touchX = null
}
</script>

<template>
  <AnimatePresence>
    <motion.div
      v-if="lightbox.open && item"
      class="hr-lb"
      role="dialog"
      aria-modal="true"
      :aria-label="t(`portfolio.items.${item.titleKey}`)"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      :transition="{ duration: 0.3 }"
      @click.self="closeLightbox"
      @touchstart.passive="onTouchStart"
      @touchend="onTouchEnd"
    >
      <button ref="closeBtn" class="hr-pill-btn hr-lb-close" type="button" @click="closeLightbox">{{ t('v2.media.close') }} · Esc</button>
      <AnimatePresence mode="wait">
        <motion.figure
          :key="item.code"
          :initial="{ opacity: 0, scale: 0.94 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0.97 }"
          :transition="{ type: 'spring', stiffness: 240, damping: 26 }"
        >
          <video v-if="item.type === 'video'" :src="item.src" controls autoplay playsinline></video>
          <img v-else :src="item.src" :alt="t(`portfolio.items.${item.titleKey}`)" />
          <figcaption>
            <strong>{{ t(`portfolio.items.${item.titleKey}`) }}</strong>
            <span class="hr-mono">{{ t(`portfolio.categories.${item.cat}`) }} · {{ item.code }} · {{ lightbox.index + 1 }}/{{ lightbox.items.length }}</span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
      <template v-if="lightbox.items.length > 1">
        <button class="hr-lb-nav prev" type="button" :aria-label="t('v2.media.prev')" @click="stepLightbox(-1)"><Icon name="arrow-left" /></button>
        <button class="hr-lb-nav next" type="button" :aria-label="t('v2.media.next')" @click="stepLightbox(1)"><Icon name="arrow" /></button>
      </template>
    </motion.div>
  </AnimatePresence>
</template>
