<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 translate-y-3"
    leave-active-class="transition duration-150"
    leave-to-class="opacity-0 translate-y-3"
  >
    <div v-if="panelOpen" ref="panelEl" class="twkx-panel">
      <div class="twkx-hd" @mousedown="startDrag">
        <b><i></i> Tweaks</b>
        <button class="twkx-x" @mousedown.stop @click="dismiss" aria-label="Fechar">✕</button>
      </div>
      <div class="twkx-body">
        <div class="twkx-sect">Aparência</div>
        <div class="twkx-row">
          <label>Tema</label>
          <div class="twkx-seg">
            <button v-for="o in ['dark','light']" :key="o"
                    :class="{ on: tweaks.theme === o }"
                    @click="setTweak('theme', o)">
              {{ o === 'dark' ? 'Escuro' : 'Claro' }}
            </button>
          </div>
        </div>
        <div class="twkx-row">
          <label>Fonte dos títulos</label>
          <div class="twkx-seg">
            <button v-for="o in fontOptions" :key="o.v"
                    :class="{ on: tweaks.headingFont === o.v }"
                    @click="setTweak('headingFont', o.v)">{{ o.l }}</button>
          </div>
        </div>

        <div class="twkx-sect">Movimento</div>
        <div class="twkx-row h">
          <label>Animação do hero</label>
          <button class="twkx-tog" :data-on="tweaks.heroAnim ? '1' : '0'"
                  role="switch" :aria-checked="tweaks.heroAnim"
                  @click="setTweak('heroAnim', !tweaks.heroAnim)">
            <i></i>
          </button>
        </div>

        <div class="twkx-sect">Cards</div>
        <div class="twkx-row">
          <label>Cantos</label>
          <div class="twkx-seg">
            <button v-for="o in ['round','sharp']" :key="o"
                    :class="{ on: tweaks.corners === o }"
                    @click="setTweak('corners', o)">
              {{ o === 'round' ? 'Arredondados' : 'Retos' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTweaks } from '../composables/useTweaks.js'

const { tweaks, setTweak } = useTweaks()
const panelOpen = ref(false)
const panelEl   = ref(null)

const fontOptions = [
  { v: 'grotesk', l: 'Grotesk' },
  { v: 'sora',    l: 'Sora'    },
  { v: 'archivo', l: 'Archivo' },
]

function dismiss() {
  panelOpen.value = false
  window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*')
}

function onMsg(e) {
  const t = e?.data?.type
  if (t === '__activate_edit_mode')   panelOpen.value = true
  if (t === '__deactivate_edit_mode') panelOpen.value = false
}

function startDrag(e) {
  const panel = panelEl.value
  if (!panel) return
  const r = panel.getBoundingClientRect()
  const sx = e.clientX, sy = e.clientY
  const startRight  = window.innerWidth  - r.right
  const startBottom = window.innerHeight - r.bottom
  const move = (ev) => {
    panel.style.right  = Math.max(8, startRight  - (ev.clientX - sx)) + 'px'
    panel.style.bottom = Math.max(8, startBottom - (ev.clientY - sy)) + 'px'
  }
  const up = () => {
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', up)
  }
  window.addEventListener('mousemove', move)
  window.addEventListener('mouseup', up)
}

onMounted(() => {
  window.addEventListener('message', onMsg)
  window.parent.postMessage({ type: '__edit_mode_available' }, '*')
})
onBeforeUnmount(() => window.removeEventListener('message', onMsg))
</script>
