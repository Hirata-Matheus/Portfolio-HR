// Acervo do portfólio. DR-001 a DR-021 são os itens do site atual (mesmas URLs).
// DR-022 em diante são as fotos novas — os arquivos estão em public/Drone/novas/.
// Para adicionar um item: copie uma linha, troque code/titleKey/src e crie o título em
// portfolio.items.<titleKey> nos arquivos de idioma (src/v2/i18n/messages.js).

const R2 = 'https://pub-8c3e4308a94c4528a085cf91c8140cf6.r2.dev'
const NEW = '/Drone/novas'

export const CATEGORIES = ['all', 'realestate', 'events', 'cities', 'nature']

// span: tamanho na grade do portfólio (desktop). 'wide' = 2 colunas, 'tall' = 2 linhas, 'big' = 2x2
export const PORTFOLIO = [
  // novas fotos
  { code: 'DR-022', cat: 'realestate', type: 'image', span: 'big', src: `${NEW}/condominio-entardecer.webp` },
  { code: 'DR-023', cat: 'events', type: 'image', span: 'wide', src: `${NEW}/cerimonia-ar-livre.webp` },
  { code: 'DR-024', cat: 'events', type: 'image', span: '', src: `${NEW}/circo-noite.webp` },
  { code: 'DR-025', cat: 'realestate', type: 'image', span: '', src: `${NEW}/condominio-lavoura.webp` },
  { code: 'DR-026', cat: 'events', type: 'image', span: 'tall', src: `${NEW}/carros-antigos.webp` },
  { code: 'DR-027', cat: 'events', type: 'image', span: '', src: `${NEW}/carros-antigos-galpao.webp` },
  { code: 'DR-028', cat: 'events', type: 'image', span: 'wide', src: `${NEW}/festa-junina.webp` },
  { code: 'DR-029', cat: 'cities', type: 'image', span: '', src: `${NEW}/ponte-luz-dourada.webp` },
  { code: 'DR-030', cat: 'cities', type: 'image', span: 'wide', src: `${NEW}/ponte-estaiada.webp` },
  { code: 'DR-031', cat: 'cities', type: 'image', span: 'tall', src: `${NEW}/marco-tres-fronteiras.webp` },
  { code: 'DR-032', cat: 'cities', type: 'image', span: '', src: `${NEW}/bairro-por-do-sol.webp` },
  { code: 'DR-033', cat: 'cities', type: 'image', span: '', src: `${NEW}/rodovia-vista-de-cima.webp` },
  { code: 'DR-034', cat: 'realestate', type: 'image', span: 'wide', src: `${NEW}/terreno-cidade-ao-fundo.webp` },
  { code: 'DR-035', cat: 'realestate', type: 'image', span: '', src: `${NEW}/terreno-urbano.webp` },
  // acervo atual
  { code: 'DR-001', cat: 'events', type: 'image', span: 'big', src: `${R2}/DJI_20260501173113_0113_D.JPG` },
  { code: 'DR-002', cat: 'realestate', type: 'image', span: '', src: `${R2}/DJI_20260509150217_0128_D.JPG` },
  { code: 'DR-003', cat: 'cities', type: 'image', span: '', src: `${R2}/DJI_20260526212416_0141_D.JPG` },
  { code: 'DR-005', cat: 'realestate', type: 'image', span: '', src: `${R2}/DJI_20260501173324_0122_D.JPG` },
  { code: 'DR-006', cat: 'cities', type: 'image', span: '', src: `${R2}/DJI_20260604174038_0187_D.JPG` },
  { code: 'DR-012', cat: 'nature', type: 'image', span: '', src: '/Drone/parque_foz01.jpeg' },
  { code: 'DR-013', cat: 'nature', type: 'image', span: '', src: '/Drone/parque_foz02.jpeg' },
  { code: 'DR-014', cat: 'nature', type: 'image', span: 'wide', src: '/Drone/parque_foz03.jpeg' },
  { code: 'DR-004', cat: 'events', type: 'video', span: 'wide', src: `${R2}/drone_01.mp4` },
  { code: 'DR-007', cat: 'events', type: 'video', span: 'wide', src: `${R2}/drone_02.mp4` },
  { code: 'DR-008', cat: 'events', type: 'video', span: '', src: `${R2}/drone_03.mp4` },
  { code: 'DR-009', cat: 'cities', type: 'video', span: 'wide', src: `${R2}/drone_04.mp4` },
  { code: 'DR-010', cat: 'cities', type: 'video', span: 'tall', src: `${R2}/drone_05.mp4` },
  { code: 'DR-011', cat: 'cities', type: 'video', span: 'tall', src: `${R2}/drone_06.mp4` },
  { code: 'DR-015', cat: 'events', type: 'video', span: 'tall', src: '/Drone/evento_igreja_noite.mp4' },
  { code: 'DR-016', cat: 'events', type: 'video', span: '', src: '/Drone/evento_moto.mp4' },
  { code: 'DR-017', cat: 'realestate', type: 'video', span: 'tall', src: '/Drone/predio.mp4' },
  { code: 'DR-018', cat: 'cities', type: 'video', span: 'wide', src: '/Drone/foz_horizontal.mp4' },
  { code: 'DR-019', cat: 'cities', type: 'video', span: 'tall', src: '/Drone/roda_gigante_tarde.mp4' },
  { code: 'DR-020', cat: 'nature', type: 'video', span: 'tall', src: '/Drone/parque.mp4' },
  { code: 'DR-021', cat: 'cities', type: 'video', span: '', src: '/Drone/transito.mp4' }
].map((it) => ({ ...it, titleKey: it.code.replace('DR-', 'dr') }))

export const byCode = (code) => PORTFOLIO.find((p) => p.code === code)

// Ordem do rolo horizontal da página inicial
export const REEL = ['DR-023', 'DR-025', 'DR-024', 'DR-026', 'DR-028', 'DR-031', 'DR-035', 'DR-029', 'DR-015', 'DR-019'].map(byCode)

// Imagens de apoio usadas nas páginas
export const IMAGES = {
  hero: `${NEW}/condominio-entardecer.webp`,
  portals: {
    servicos: `${NEW}/rodovia-vista-de-cima.webp`,
    portfolio: `${NEW}/ponte-estaiada.webp`,
    sobre: `${NEW}/terreno-cidade-ao-fundo.webp`,
    contato: `${NEW}/bairro-por-do-sol.webp`
  },
  services: {
    filmagem: `${NEW}/ponte-luz-dourada.webp`,
    fotografia: `${NEW}/marco-tres-fronteiras.webp`,
    imoveis: `${NEW}/condominio-lavoura.webp`,
    eventos: `${NEW}/circo-noite.webp`,
    redes: `${NEW}/festa-junina.webp`,
    institucional: `${NEW}/carros-antigos-galpao.webp`
  },
  // categoria do portfólio que mostra exemplos de cada serviço
  serviceCategory: { imoveis: 'realestate', eventos: 'events', filmagem: 'all', fotografia: 'all', redes: 'events', institucional: 'all' },
  aboutBand: [`${NEW}/ponte-estaiada.webp`, `${NEW}/condominio-lavoura.webp`]
}
