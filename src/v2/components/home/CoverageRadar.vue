<script setup>
// Radar de cobertura em <canvas>: Araçatuba no centro, cidades na distância e rumo reais.
// Passar o mouse mede a distância até qualquer ponto; a lista destaca a cidade no radar.
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGsap, gsap, prefersReduced } from '../../composables/motion'
import { BASE, CITIES, project, pad } from '../../data/site'

const props = defineProps({ radiusKm: { type: Number, default: 50 } })
const { t } = useI18n()
const root = ref(null)
const cv = ref(null)
const focus = ref(null)
const reading = ref('')
const cities = CITIES.map((c) => ({ ...c, ...project(c) })).sort((a, b) => a.km - b.km)
const defaultRead = computed(() => t('v2.coverage.radius', { km: props.radiusKm }))
const fmtKm = (km) => km.toFixed(1).replace('.', ',')

let ctx, W = 0, S = 1, dpr = 1, ang = -Math.PI / 2, hover = null, last = 0, running = false, raf = 0, ro, io
const C = {}

function readColors() {
  const cs = getComputedStyle(document.documentElement)
  for (const k of ['mint', 'fg', 'muted', 'line', 'line-2']) C[k] = cs.getPropertyValue(`--hr-${k}`).trim()
}

function size() {
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  W = cv.value.clientWidth
  cv.value.width = W * dpr
  cv.value.height = W * dpr
  S = (W / 2 - 30) / props.radiusKm
  draw(performance.now())
}

function draw(now) {
  if (!W || !ctx) return
  const reduce = prefersReduced()
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, W, W)
  const cx = W / 2, cy = W / 2, R = props.radiusKm * S
  const mono = '500 10px "JetBrains Mono", ui-monospace, monospace'
  const sans = '600 12px "Manrope", system-ui, sans-serif'
  ctx.lineWidth = 1
  ctx.font = mono
  for (let k = 10; k <= props.radiusKm; k += 10) {
    ctx.strokeStyle = k === props.radiusKm ? C['line-2'] : C.line
    ctx.beginPath(); ctx.arc(cx, cy, k * S, 0, Math.PI * 2); ctx.stroke()
    ctx.fillStyle = C.muted; ctx.fillText(`${k} km`, cx + 5, cy - k * S + 13)
  }
  ctx.strokeStyle = C.line
  ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke()
  ctx.fillStyle = C.mint; ctx.textAlign = 'center'; ctx.fillText('N', cx, cy - R - 10); ctx.textAlign = 'left'

  // varredura
  if (!reduce) {
    if (ctx.createConicGradient) {
      const w = 0.95, e = w / (Math.PI * 2), g = ctx.createConicGradient(ang - w, cx, cy)
      g.addColorStop(0, 'rgba(25,240,196,0)'); g.addColorStop(e, 'rgba(25,240,196,.30)')
      g.addColorStop(Math.min(e + 0.001, 1), 'rgba(25,240,196,0)'); g.addColorStop(1, 'rgba(25,240,196,0)')
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill()
    }
    ctx.strokeStyle = C.mint; ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(ang) * R, cy + Math.sin(ang) * R); ctx.stroke()
  }

  // cidades
  for (const c of cities) {
    const px = cx + c.x * S, py = cy + c.y * S
    const a = Math.atan2(c.y, c.x)
    const d = ((((ang - a) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2))
    const hit = reduce ? 1 : Math.max(0, 1 - d / 2.6)
    const on = focus.value === c.name
    ctx.globalAlpha = 0.35 + 0.65 * Math.max(hit, on ? 1 : 0)
    ctx.fillStyle = C.mint; ctx.beginPath(); ctx.arc(px, py, on ? 5.5 : 4, 0, Math.PI * 2); ctx.fill()
    if (hit > 0.6 || on) {
      ctx.strokeStyle = C.mint; ctx.lineWidth = 1; ctx.globalAlpha = on ? 0.7 : hit * 0.6
      ctx.beginPath(); ctx.arc(px, py, 9 + (1 - hit) * 14, 0, Math.PI * 2); ctx.stroke()
    }
    ctx.globalAlpha = 1
    const left = c.x < 0
    const lx = left ? px - 11 : px + 11
    ctx.textAlign = left ? 'right' : 'left'
    ctx.fillStyle = C.fg; ctx.font = sans; ctx.fillText(c.name, lx, py - 3)
    ctx.fillStyle = C.muted; ctx.font = mono; ctx.fillText(`${Math.round(c.km)} KM`, lx, py + 10)
    ctx.textAlign = 'left'
  }

  // base
  const pulse = reduce ? 0.5 : (now / 1600) % 1
  ctx.strokeStyle = C.mint; ctx.globalAlpha = 1 - pulse
  ctx.beginPath(); ctx.arc(cx, cy, 6 + pulse * 22, 0, Math.PI * 2); ctx.stroke()
  ctx.globalAlpha = 1
  ctx.fillStyle = C.fg; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill()
  ctx.font = sans; ctx.textAlign = 'right'; ctx.fillText(BASE.name, cx - 12, cy - 3)
  ctx.fillStyle = C.mint; ctx.font = mono; ctx.fillText(t('v2.coverage.base').toUpperCase(), cx - 12, cy + 10)
  ctx.textAlign = 'left'

  // medição
  if (hover) {
    ctx.setLineDash([4, 5]); ctx.strokeStyle = C.fg; ctx.globalAlpha = 0.7
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(hover.x, hover.y); ctx.stroke()
    ctx.setLineDash([]); ctx.globalAlpha = 1
    ctx.strokeStyle = C.mint; ctx.beginPath(); ctx.arc(hover.x, hover.y, 7, 0, Math.PI * 2); ctx.stroke()
  }
}

function loop(now) {
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  ang += dt * 1.15
  draw(now)
  if (running) raf = requestAnimationFrame(loop)
}

function onMove(e) {
  const r = cv.value.getBoundingClientRect()
  const x = e.clientX - r.left, y = e.clientY - r.top
  const dx = (x - W / 2) / S, dy = (y - W / 2) / S, km = Math.hypot(dx, dy)
  if (km > props.radiusKm) { hover = null; reading.value = '' }
  else {
    hover = { x, y }
    reading.value = `${fmtKm(km)} km · ${t('v2.coverage.heading')} ${pad(Math.round((Math.atan2(dx, -dy) * 180 / Math.PI + 360) % 360), 3)}°`
  }
  if (!running) draw(performance.now())
}
function onLeave() { hover = null; reading.value = ''; if (!running) draw(performance.now()) }
function setFocus(name) { focus.value = name; if (!running) draw(performance.now()) }

onMounted(() => {
  ctx = cv.value.getContext('2d')
  readColors()
  ro = new ResizeObserver(size); ro.observe(cv.value)
  if (!prefersReduced()) {
    io = new IntersectionObserver(([en]) => {
      const was = running
      running = en.isIntersecting
      if (running && !was) { last = performance.now(); raf = requestAnimationFrame(loop) }
    })
    io.observe(cv.value)
  }
  document.fonts?.ready.then(() => draw(performance.now()))
})
onBeforeUnmount(() => { running = false; cancelAnimationFrame(raf); ro?.disconnect(); io?.disconnect() })

useGsap(root, () => {
  gsap.from('.hr-cover-grid > *', { y: 60, duration: 1.2, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: root.value, start: 'top 80%' } })
})
</script>

<template>
  <section ref="root" class="hr-sec">
    <div class="hr-wrap hr-cover-grid">
      <div class="grid gap-5 content-start">
        <span class="hr-eyebrow">{{ t('v2.coverage.eyebrow') }}</span>
        <h2 class="hr-h2">{{ t('v2.coverage.title') }}</h2>
        <p class="hr-lead">{{ t('v2.coverage.lead') }}</p>
        <ul class="hr-cities">
          <li class="base"><button type="button" @pointerenter="setFocus(null)"><span class="name">{{ BASE.name }}</span><span class="hr-mono">{{ t('v2.coverage.base') }} · 0 km</span></button></li>
          <li v-for="c in cities" :key="c.name">
            <button type="button" :class="{ on: focus === c.name }" @pointerenter="setFocus(c.name)" @pointerleave="setFocus(null)" @focus="setFocus(c.name)" @blur="setFocus(null)">
              <span class="name">{{ c.name }}</span><span class="hr-mono">{{ Math.round(c.km) }} km · {{ pad(Math.round(c.bearing), 3) }}°</span>
            </button>
          </li>
        </ul>
      </div>
      <div class="hr-radar">
        <canvas ref="cv" role="img" :aria-label="t('v2.coverage.aria')" @pointermove="onMove" @pointerleave="onLeave"></canvas>
        <span class="hr-radar-read hr-mono">{{ reading || defaultRead }}</span>
      </div>
    </div>
  </section>
</template>
