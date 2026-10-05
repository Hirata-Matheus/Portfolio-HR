// Preset do Tailwind da versão 2 — adicione em tailwind.config.js:  presets: [require('./src/v2/tailwind.preset.js')]
// (ou import, se o seu config for ESM). Não sobrescreve nada do seu tema: só acrescenta.
export default {
  theme: {
    extend: {
      colors: {
        hr: {
          ink: '#061015',
          ink2: '#0b1a21',
          ink3: '#12262e',
          fg: '#e9f4f2',
          muted: '#8ea6a9',
          mint: '#19f0c4',
          azure: '#1b8fd9',
          onmint: '#03251e'
        }
      },
      fontFamily: {
        display: ['Archivo', '"Arial Narrow"', 'system-ui', 'sans-serif'],
        hud: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      maxWidth: { site: '1480px' }
    }
  }
}
