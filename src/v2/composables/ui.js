// Estado compartilhado da interface (sem Pinia, para não adicionar dependência).
import { reactive, ref } from 'vue'
import { lockScroll } from './motion'

export const bootDone = ref(false)
export const menuOpen = ref(false)

export function setMenu(open) {
  if (menuOpen.value === open) return
  menuOpen.value = open
  lockScroll(open)
}

// Lightbox global (portfólio e rolo da home)
export const lightbox = reactive({ open: false, items: [], index: 0 })

export function openLightbox(items, index = 0) {
  lightbox.items = items
  lightbox.index = index
  if (!lightbox.open) {
    lightbox.open = true
    lockScroll(true)
  }
}

export function closeLightbox() {
  if (!lightbox.open) return
  lightbox.open = false
  lockScroll(false)
}

export function stepLightbox(dir) {
  const n = lightbox.items.length
  if (n) lightbox.index = (lightbox.index + dir + n) % n
}

// Portão das animações de entrada: as páginas montam por trás da cortina/tela de boot
// e só tocam a animação de entrada quando a cortina começa a abrir.
let gate = null
export function holdIntro() {
  let release
  gate = new Promise((res) => { release = res })
  const g = gate
  return () => { release(); if (gate === g) gate = null }
}
export const introReady = () => gate || Promise.resolve()
