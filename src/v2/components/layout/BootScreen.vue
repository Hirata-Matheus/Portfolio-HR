<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from '../../composables/motion'
import { LOGO_SRC } from '../../data/site'

const emit = defineEmits(['done'])
const { t } = useI18n()
const root = ref(null)
const bar = ref(null)
const pct = ref('000')

onMounted(() => {
  const o = { v: 0 }
  const fail = setTimeout(() => emit('done'), 4000) // segurança: nunca prende a tela
  gsap.to(o, {
    v: 100,
    duration: 1.05,
    ease: 'power2.inOut',
    onUpdate: () => {
      pct.value = String(Math.round(o.v)).padStart(3, '0')
      if (bar.value) bar.value.style.transform = `scaleX(${o.v / 100})`
    },
    onComplete: () => {
      gsap.to(root.value, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut', onComplete: () => { clearTimeout(fail); emit('done') } })
    }
  })
})
</script>

<template>
  <div ref="root" class="hr-boot" aria-hidden="true">
    <div class="hr-boot-inner">
      <img :src="LOGO_SRC" alt="" />
      <div class="hr-boot-row hr-mono"><span>{{ t('v2.boot.calibrating') }}</span><b>{{ pct }}</b></div>
      <div class="hr-boot-bar"><i ref="bar"></i></div>
      <div class="hr-boot-row hr-mono"><span>{{ t('v2.boot.gps') }}</span><span>21°12′S 50°25′W</span></div>
    </div>
  </div>
</template>
