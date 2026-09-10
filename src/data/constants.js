export const phoneIntl    = '5518981765530'
export const phoneDisplay = '(18) 98176-5530'
export const instaHandle  = '@_hrdrone'
export const instaUrl     = 'https://www.instagram.com/_hrdrone'
export const email        = 'orcamentos@hr-drone.com.br'

export const waLink = (msg) =>
  `https://wa.me/${phoneIntl}?text=${encodeURIComponent(msg)}`

export const nav = [
  { id: 'inicio' },
  { id: 'servicos' },
  { id: 'portfolio' },
  { id: 'sobre' },
  { id: 'contato' },
]

export const heroStats = [
  { id: 'resolution', v: '4K' },
  { id: 'safety',     v: '100%' },
  { id: 'delivery',   v: '48h' },
]

export const services = [
  { id: 'filmagem',      icon: 'movie' },
  { id: 'fotografia',    icon: 'photo_camera' },
  { id: 'imoveis',       icon: 'real_estate_agent' },
  { id: 'eventos',       icon: 'celebration' },
  { id: 'redes',         icon: 'trending_up' },
  { id: 'institucional', icon: 'corporate_fare' },
]

export const differentials = [
  { id: 'qualidade',   icon: 'high_quality' },
  { id: 'cinema',      icon: 'theaters' },
  { id: 'atendimento', icon: 'support_agent' },
  { id: 'entrega',     icon: 'bolt' },
  { id: 'seguranca',   icon: 'verified_user' },
  { id: 'edicao',      icon: 'auto_fix_high' },
]

export const process = [
  { id: 'briefing',     icon: 'forum' },
  { id: 'planejamento', icon: 'route' },
  { id: 'captacao',     icon: 'flight_takeoff' },
  { id: 'finalizacao',  icon: 'movie_edit' },
]

export const channels = [
  { id: 'whatsapp',  icon: 'chat',         value: phoneDisplay, href: null,        ext: true },
  { id: 'instagram', icon: 'photo_camera', value: instaHandle,  href: instaUrl,    ext: true },
  { id: 'email',     icon: 'mail',         value: email,        href: `mailto:${email}`, ext: false },
]
