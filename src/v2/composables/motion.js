// Núcleo de animação: GSAP (+ ScrollTrigger, SplitText) e rolagem suave com Lenis.
import { onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

export const isBrowser = typeof window !== 'undefined'
export const prefersReduced = () => isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const finePointer = () => isBrowser && window.matchMedia('(pointer: fine)').matches

let lenis = null

export function initSmoothScroll() {
  if (lenis || !isBrowser || prefersReduced()) return lenis
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export const getLenis = () => lenis

export function scrollToTarget(target, { immediate = false, offset = 0 } = {}) {
  if (lenis) return lenis.scrollTo(target, { immediate, offset, duration: 1.3, force: true })
  let y = 0
  if (typeof target === 'number') y = target
  else {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (el) y = el.getBoundingClientRect().top + window.scrollY + offset
  }
  window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' })
}

let locks = 0
export function lockScroll(on) {
  locks = Math.max(0, locks + (on ? 1 : -1))
  const locked = locks > 0
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

/**
 * Cria um gsap.context() preso ao componente: tudo que for criado dentro (tweens,
 * ScrollTriggers, SplitText, matchMedia) é desfeito automaticamente ao sair da página.
 */
export function useGsap(scopeRef, setup) {
  let ctx
  onMounted(() => {
    ctx = gsap.context((self) => setup(self), scopeRef.value)
  })
  onBeforeUnmount(() => ctx && ctx.revert())
  return () => ctx
}

export { gsap, ScrollTrigger, SplitText }
