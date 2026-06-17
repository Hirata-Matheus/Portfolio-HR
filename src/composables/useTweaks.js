import { reactive } from 'vue'

const DEFAULTS = {
  theme:       'light',
  headingFont: 'grotesk',
  heroAnim:    true,
  corners:     'round',
}

const FONT_ATTR = { grotesk: '', sora: 'sora', archivo: 'archivo' }

const tweaks = reactive({ ...DEFAULTS })

function applyTweaks() {
  const b = document.body
  b.setAttribute('data-theme',    tweaks.theme)
  b.setAttribute('data-font',     FONT_ATTR[tweaks.headingFont] || '')
  b.setAttribute('data-heroanim', tweaks.heroAnim ? 'on' : 'off')
  b.setAttribute('data-corners',  tweaks.corners)
}

function setTweak(key, val) {
  tweaks[key] = val
  applyTweaks()
  window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*')
}

export function useTweaks() {
  return { tweaks, setTweak, applyTweaks, DEFAULTS }
}
