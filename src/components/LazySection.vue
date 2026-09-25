<template>
  <div ref="sentinel" :id="mounted ? null : anchorId" :class="{ 'scroll-mt-[84px]': anchorId }">
    <slot v-if="mounted" />
    <div v-else :style="{ minHeight: placeholder }" aria-hidden="true" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  placeholder: { type: String, default: '40vh' },
  margin:      { type: String, default: '400px' },
  anchorId:    { type: String, default: null },
})

const sentinel = ref(null)
const mounted  = ref(false)

let io

function forceMount() {
  mounted.value = true
  io?.disconnect()
}

onMounted(() => {
  io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) forceMount()
    },
    { rootMargin: props.margin }
  )
  io.observe(sentinel.value)
  window.addEventListener('force-mount-lazy', forceMount)
})

onUnmounted(() => {
  io?.disconnect()
  window.removeEventListener('force-mount-lazy', forceMount)
})
</script>
