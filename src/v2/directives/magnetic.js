// v-magnetic: o elemento "puxa" levemente em direção ao cursor (só com mouse).
import { gsap, finePointer, prefersReduced } from '../composables/motion'

export const vMagnetic = {
  mounted(el, binding) {
    if (!finePointer() || prefersReduced()) return
    const strength = typeof binding.value === 'number' ? binding.value : 0.32
    const move = (e) => {
      const r = el.getBoundingClientRect()
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength * 1.2, duration: 0.4, ease: 'power3' })
    }
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' })
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    el._magnetic = { move, leave }
  },
  unmounted(el) {
    if (!el._magnetic) return
    el.removeEventListener('pointermove', el._magnetic.move)
    el.removeEventListener('pointerleave', el._magnetic.leave)
    gsap.killTweensOf(el)
  }
}
