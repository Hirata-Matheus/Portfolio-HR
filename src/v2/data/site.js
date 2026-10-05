// Dados fixos do site — os mesmos valores usados na versão atual do hr-drone.com.br.

export const WA_NUMBER = '5518998104185'
export const PHONE_DISPLAY = '(18) 98176-5530'
export const INSTAGRAM_HANDLE = '@_hrdrone'
export const INSTAGRAM_URL = 'https://www.instagram.com/_hrdrone'
export const EMAIL = 'orcamentos@hr-drone.com.br'
export const LOGO_SRC = '/images/HR_Drone_logo_transparente_melhorado.png'

export const waLink = (message) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`

// Idiomas — mesma lista e mesma chave de localStorage do site atual.
export const LOCALE_KEY = 'hr-drone-locale'
export const LANGUAGES = [
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'nl', flag: '🇳🇱', label: 'Nederlands' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'pl', flag: '🇵🇱', label: 'Polski' },
  { code: 'tr', flag: '🇹🇷', label: 'Türkçe' },
  { code: 'es', flag: '🇪🇸', label: 'Español' }
]
const CODES = LANGUAGES.map((l) => l.code)

export function getInitialLocale() {
  try {
    const saved = localStorage.getItem(LOCALE_KEY)
    if (saved && CODES.includes(saved)) return saved
  } catch {}
  const prefs = typeof navigator !== 'undefined' ? (navigator.languages?.length ? navigator.languages : [navigator.language]) : []
  for (const p of prefs) {
    const c = String(p).toLowerCase().split('-')[0]
    if (CODES.includes(c)) return c
  }
  return 'en'
}

export function persistLocale(code) {
  try { localStorage.setItem(LOCALE_KEY, code) } catch {}
  document.documentElement.lang = code
}

// Rotas principais (a chave é usada em nav.<id> do i18n existente)
export const PAGES = [
  { id: 'servicos', path: '/servicos' },
  { id: 'portfolio', path: '/portfolio' },
  { id: 'sobre', path: '/sobre' },
  { id: 'contato', path: '/contato' }
]

export const SERVICE_IDS = ['filmagem', 'fotografia', 'imoveis', 'eventos', 'redes', 'institucional']
export const PROCESS_IDS = ['briefing', 'planejamento', 'captacao', 'finalizacao']
export const DIFFERENTIAL_IDS = ['qualidade', 'cinema', 'atendimento', 'entrega', 'seguranca', 'edicao']
export const STATS = [
  { id: 'resolution', value: 4, suffix: 'K' },
  { id: 'safety', value: 100, suffix: '%' },
  { id: 'delivery', value: 48, suffix: 'h' }
]

// Base e cidades atendidas (mesma lista do site atual) com coordenadas aproximadas do centro.
export const BASE = { name: 'Araçatuba', lat: -21.2089, lon: -50.4328 }
export const CITIES = [
  { name: 'Birigui', lat: -21.2886, lon: -50.3400 },
  { name: 'Coroados', lat: -21.3519, lon: -50.2856 },
  { name: 'Penápolis', lat: -21.4196, lon: -50.0775 },
  { name: 'Guararapes', lat: -21.2608, lon: -50.6428 },
  { name: 'Buritama', lat: -21.0661, lon: -50.1475 },
  { name: 'Bilac', lat: -21.4033, lon: -50.4747 }
]

// Distância (km) e rumo (graus a partir do norte) de Araçatuba até cada cidade.
export function project(c, base = BASE) {
  const x = (c.lon - base.lon) * 111.32 * Math.cos((base.lat * Math.PI) / 180)
  const y = -(c.lat - base.lat) * 110.57 // y positivo = sul (eixo da tela)
  return { x, y, km: Math.hypot(x, y), bearing: (Math.atan2(x, -y) * 180 / Math.PI + 360) % 360 }
}

export const pad = (n, l = 2) => String(n).padStart(l, '0')
