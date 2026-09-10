import { createI18n } from 'vue-i18n'
import pt from './locales/pt.json'
import en from './locales/en.json'
import nl from './locales/nl.json'
import fr from './locales/fr.json'
import de from './locales/de.json'
import pl from './locales/pl.json'
import tr from './locales/tr.json'
import es from './locales/es.json'

export const STORAGE_KEY = 'hr-drone-locale'

export const locales = [
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'nl', flag: '🇳🇱', label: 'Nederlands' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'pl', flag: '🇵🇱', label: 'Polski' },
  { code: 'tr', flag: '🇹🇷', label: 'Türkçe' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
]

const SUPPORTED = locales.map(l => l.code)

function detectLocale() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && SUPPORTED.includes(saved)) return saved

  const browserLangs = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const lang of browserLangs) {
    const code = lang.toLowerCase().split('-')[0]
    if (SUPPORTED.includes(code)) return code
  }
  return 'en'
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: { pt, en, nl, fr, de, pl, tr, es },
})

export function setLocale(code) {
  if (!SUPPORTED.includes(code)) return
  i18n.global.locale.value = code
  localStorage.setItem(STORAGE_KEY, code)
  document.documentElement.lang = code
}

document.documentElement.lang = i18n.global.locale.value
