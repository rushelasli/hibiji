import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import fs from 'node:fs'
import { hubSites } from './src/data/projects'

// Second entry: the projects-hub landing page served at
// https://project.nyaahibi.web.id (built separately into dist-hub/).

/**
 * The hub has no router — every live project is a static folder
 * (dist-hub/<slug>/index.html) serving the same app; HubApp picks the
 * page from window.location.pathname. Mirroring hub.html into each live
 * slug folder keeps local previews (`vite preview`) identical to the
 * deployed layout.
 */
function hubSlugPages(): Plugin {
  return {
    name: 'hub-slug-pages',
    closeBundle() {
      const outDir = path.resolve(import.meta.dirname, 'dist-hub')
      const html = fs.readFileSync(path.join(outDir, 'hub.html'), 'utf8')
      for (const site of hubSites.filter((s) => s.status === 'live')) {
        const dir = path.join(outDir, site.slug)
        fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(path.join(dir, 'index.html'), html)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('model-viewer'),
        },
      },
    }),
    tailwindcss(),
    hubSlugPages(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    outDir: 'dist-hub',
    rollupOptions: {
      input: path.resolve(import.meta.dirname, 'hub.html'),
    },
  },
})
