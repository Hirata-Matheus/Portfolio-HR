# HR Drone — Aerial Imaging Portfolio

Professional drone photography and videography portfolio website for **HR Drone**, showcasing aerial footage for real estate, events, corporate, weddings, clients and social media content.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`) |
| Build Tool | [Vite 6](https://vitejs.dev/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| Icons | [Material Symbols Rounded](https://fonts.google.com/icons) (Google Fonts) |
| Fonts | Space Grotesk · Manrope · Space Mono |
| Runtime | Node 24 (via nvm) |

---

## Project Structure

```
├── index.html
├── vercel.json            → SPA rewrite (rotas funcionam ao recarregar)
├── public/
│   ├── Drone/             → symlink to ../Drone (local media assets)
│   └── images/
└── src/
    ├── main.js            # App entry: router + i18n (+ v2 messages) + Vercel analytics
    ├── assets/main.css    # Tailwind directives
    ├── i18n/              # 8 idiomas (locales/*.json)
    └── v2/                # Site multipágina (ver abaixo)
        ├── App.vue, router.js
        ├── views/         # Home, Services, Portfolio, About, Contact
        ├── components/    # layout/, home/, shared/
        ├── composables/   # motion.js (GSAP + Lenis), ui.js
        ├── data/          # site.js (contatos, cidades), portfolio.js (itens)
        ├── i18n/messages.js  # textos novos nos 8 idiomas
        └── styles/hr-v2.css
```

Rotas: `/`, `/servicos`, `/portfolio`, `/sobre`, `/contato`.
Stack extra: vue-router, GSAP (ScrollTrigger/SplitText), Lenis, motion-v.

| Quero mudar… | Arquivo |
|---|---|
| WhatsApp, telefone, Instagram, e-mail, cidades | `src/v2/data/site.js` |
| Itens do portfólio e fotos de cada página | `src/v2/data/portfolio.js` |
| Textos novos (todos os idiomas) | `src/v2/i18n/messages.js` |
| Cores e espaçamentos | `src/v2/styles/hr-v2.css` |

---

## Getting Started

### Prerequisites

- [nvm](https://github.com/nvm-sh/nvm)
- Node 24

```bash
nvm use 24
```

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
npm run preview
```

---

## Media Assets

Drone footage and photos live in the `Drone/` folder at the project root. This folder is **git-ignored** due to file sizes (some videos exceed 400 MB).

```
Drone/
├── drone_01.mp4 … drone_09.mp4   # Portfolio videos
├── drone_06.mp4                   # Hero background video (faststart optimized)
├── *.JPG                          # Portfolio photos
└── *_web.mp4                      # Web-optimized (moov atom at start) versions
```

The `public/Drone` symlink makes these files available to Vite's dev server at `/Drone/…`.

> **Production note:** for a deployed site, host the media files on a CDN (Cloudflare R2, AWS S3, etc.) and update the paths in `src/data/portfolio.js` and `src/components/HeroSection.vue`.

---

## Features

- **Hero video** — full-screen background video with cinematic dark overlays and animated fallback gradient
- **Portfolio grid** — filterable masonry-style grid with photos (lazy-loaded) and videos (play on hover/click, `preload="metadata"` for instant thumbnail)
- **Scroll-reveal animations** — global `v-reveal` directive using IntersectionObserver
- **Theme panel** — live dark/light theme toggle, heading font picker, corner style and hero animation controls
- **WhatsApp quote form** — contact form that generates a pre-filled WhatsApp message
- **Responsive** — mobile-first layout with animated mobile menu

---

## Global Directives

| Directive | Description |
|---|---|
| `v-reveal` | Fade + slide-up animation on scroll into view. Accepts delay in ms: `v-reveal="200"` |

---

## Contact

- WhatsApp: [(18) 99810-4185](https://wa.me/5518998104185)
- Instagram: [@hirata.math](https://instagram.com/hirata.math)
- Email: matheushirata2001@outlook.com
