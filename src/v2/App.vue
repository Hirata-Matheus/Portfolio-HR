<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { initSmoothScroll, scrollToTarget, ScrollTrigger, prefersReduced } from './composables/motion'
import { bootDone, setMenu, holdIntro } from './composables/ui'
import BootScreen from './components/layout/BootScreen.vue'
import CustomCursor from './components/layout/CustomCursor.vue'
import SiteHeader from './components/layout/SiteHeader.vue'
import Altimeter from './components/layout/Altimeter.vue'
import PageWipe from './components/layout/PageWipe.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import Lightbox from './components/shared/Lightbox.vue'

const { t, locale } = useI18n({ useScope: 'global' })
const route = useRoute()
const router = useRouter()
const wipe = ref(null)
const showBoot = ref(false)
let nextNav = null

if (typeof document !== 'undefined') document.documentElement.classList.add('hr-v2')

// Tela de "calibrando" só na primeira visita da sessão
try { showBoot.value = !prefersReduced() && !sessionStorage.getItem('hr-v2-boot') } catch { showBoot.value = false }
if (!showBoot.value) bootDone.value = true
let releaseIntro = showBoot.value ? holdIntro() : null
const onBootDone = () => {
  releaseIntro?.(); releaseIntro = null
  try { sessionStorage.setItem('hr-v2-boot', '1') } catch {}
  showBoot.value = false
  bootDone.value = true
}

router.beforeEach((to, from) => {
  if (from.matched.length && to.path !== from.path) {
    nextNav = to.meta.nav
    releaseIntro?.()
    releaseIntro = holdIntro()
  }
  setMenu(false)
})

// Transição entre páginas: cortina cobre → troca a página no topo → cortina revela
async function onLeave(el, done) {
  const nav = nextNav || 'inicio'
  await wipe.value?.cover(nav === 'inicio' ? '/' : `/${nav}`, t(`nav.${nav}`))
  done()
}
function onAfterLeave() {
  scrollToTarget(0, { immediate: true })
  window.scrollTo(0, 0)
}
async function onEnter(el, done) {
  await nextTick()
  ScrollTrigger.refresh()
  const revealing = wipe.value?.reveal()
  setTimeout(() => { releaseIntro?.(); releaseIntro = null }, 250)
  await revealing
  nextNav = null
  done()
}

// Título da aba e idioma do documento
function updateTitle() {
  const nav = route.meta.nav
  document.title = !nav || nav === 'inicio' ? t('meta.title') : `${t(`nav.${nav}`)} — HR Drone`
  document.documentElement.lang = locale.value
}
watch(() => [route.fullPath, locale.value], updateTitle)

onMounted(() => {
  initSmoothScroll()
  updateTitle()
  document.fonts?.ready.then(() => ScrollTrigger.refresh())
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
})
</script>

<template>
  <a class="hr-skip" href="#conteudo">{{ t('v2.skip') }}</a>
  <BootScreen v-if="showBoot" @done="onBootDone" />
  <CustomCursor />
  <SiteHeader />
  <Altimeter />
  <main id="conteudo" tabindex="-1">
    <RouterView v-slot="{ Component, route: r }">
      <Transition :css="false" mode="out-in" @leave="onLeave" @after-leave="onAfterLeave" @enter="onEnter">
        <component :is="Component" :key="r.path" />
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
  <Lightbox />
  <PageWipe ref="wipe" />
</template>
