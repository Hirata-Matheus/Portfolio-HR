<template>
  <div ref="sentinel">
    <slot v-if="mounted" />
    <div v-else :style="{ minHeight: placeholder }" aria-hidden="true" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  placeholder: { type: String, default: '40vh' },
  margin:      { type: String, default: '400px' },
})

const sentinel = ref(null)
const mounted  = ref(false)

let io

onMounted(() => {
  io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        mounted.value = true
        io.disconnect()
      }
    },
    { rootMargin: props.margin }
  )
  io.observe(sentinel.value)
})

onUnmounted(() => io?.disconnect())
</script>
