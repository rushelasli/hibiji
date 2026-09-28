import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import fs from 'node:fs'
import { hubSites, PROJECTS_BASE } from './src/data/projects'
import en from './src/locales/en.json'

// Second entry: the projects-hub landing page served at
// https://project.nyaahibi.web.id (built separately into dist-hub/).

/**
 * Per-slug <head>: crawlers see the project's own title/description
 * before the SPA mounts (site titles are locale-neutral brand names,
 * so English copy drives the metadata).
 */
function withSlugHead(html: string, slug: string): string {
  const site = en.hub.sites[slug as keyof typeof en.hub.sites]
  const esc = (s: string) => s.replace(/"/g, '&quot;')
  const title = esc(`${site.title} — ${en.hub.title}`)
  const desc = esc(site.desc)
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${desc}" />`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${desc}" />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${PROJECTS_BASE}/${slug}" />`,
    )
}

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
        fs.writeFileSync(path.join(dir, 'index.html'), withSlugHead(html, site.slug))
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
