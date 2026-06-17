export const phoneIntl    = '5518981765530'
export const phoneDisplay = '(18) 98176-5530'
export const instaHandle  = '@hirata.math'
export const instaUrl     = 'https://instagram.com/hirata.math'
export const email        = 'matheushirata2001@outlook.com'

export const waLink = (msg) =>
  `https://wa.me/${phoneIntl}?text=${encodeURIComponent(msg)}`

export const nav = [
  { id: 'inicio',   label: 'Início' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'portfolio', label: 'Portfólio' },
  { id: 'sobre',    label: 'Sobre' },
  { id: 'contato',  label: 'Contato' },
]

export const heroStats = [
  { v: '4K',   l: 'Resolução cinematográfica' },
  { v: '100%', l: 'Voos com segurança' },
  { v: '48h',  l: 'Entrega ágil' },
]

export const services = [
  { icon: 'movie',           title: 'Filmagem aérea',       desc: 'Tomadas cinematográficas com movimentos suaves e estabilizados para vídeos que prendem o olhar.' },
  { icon: 'photo_camera',    title: 'Fotografia com drone',  desc: 'Imagens em alta resolução de ângulos impossíveis no solo, prontas para destaque.' },
  { icon: 'real_estate_agent', title: 'Imóveis e terrenos', desc: 'Valorize propriedades com vistas aéreas que mostram dimensão, entorno e potencial.' },
  { icon: 'celebration',     title: 'Eventos e shows',       desc: 'Registre a energia e a escala do seu evento com planos abertos e impactantes.' },
  { icon: 'trending_up',     title: 'Conteúdo para redes',   desc: 'Vídeos verticais e dinâmicos pensados para Instagram, Reels e campanhas digitais.' },
  { icon: 'corporate_fare',  title: 'Vídeos institucionais', desc: 'Conte a história da sua empresa de cima, com uma narrativa visual profissional.' },
]

export const differentials = [
  { icon: 'high_quality',   title: 'Captação em alta qualidade', desc: 'Equipamentos 4K e ajustes técnicos precisos.' },
  { icon: 'theaters',       title: 'Olhar cinematográfico',      desc: 'Composição e movimento com linguagem de cinema.' },
  { icon: 'support_agent',  title: 'Atendimento personalizado',  desc: 'Cada projeto tratado de forma única, do início ao fim.' },
  { icon: 'bolt',           title: 'Entrega rápida',             desc: 'Prazos ágeis sem abrir mão do acabamento.' },
  { icon: 'verified_user',  title: 'Segurança nos voos',         desc: 'Planejamento responsável e operação cuidadosa.' },
  { icon: 'auto_fix_high',  title: 'Edição profissional',        desc: 'Cor, ritmo e finalização que elevam o resultado.' },
]

export const process = [
  { icon: 'forum',          title: 'Briefing do projeto',  desc: 'Entendemos seu objetivo, referências e o que precisa ser capturado.' },
  { icon: 'route',          title: 'Planejamento do voo',  desc: 'Definimos locais, horários de luz e a melhor estratégia de captação.' },
  { icon: 'flight_takeoff', title: 'Captação das imagens', desc: 'Voamos com segurança para registrar cada ângulo no padrão ideal.' },
  { icon: 'movie_edit',     title: 'Edição e entrega final', desc: 'Tratamento, cor e finalização — entregando o material pronto para uso.' },
]

export const channels = [
  { icon: 'chat',         label: 'WhatsApp',  value: phoneDisplay, href: waLink('Olá! Vim pelo site da HR Drone.'), ext: true },
  { icon: 'photo_camera', label: 'Instagram', value: instaHandle,  href: instaUrl, ext: true },
  { icon: 'mail',         label: 'E-mail',    value: email,        href: `mailto:${email}`, ext: false },
]
