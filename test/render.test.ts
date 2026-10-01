// SSR render test — exercises the real App, router, and i18n instance.
// Run from the repo root (outDir must stay INSIDE the repo so node can
// resolve `vue` etc. — /tmp would fail with ERR_MODULE_NOT_FOUND):
//   bunx vite build --ssr test/render.test.ts --outDir node_modules/.tmp/ssr
//   node node_modules/.tmp/ssr/render.test.js
await import('./stubs')

const { createSSRApp } = await import('vue')
const { renderToString } = await import('@vue/server-renderer')
const { default: i18n } = await import('@/i18n')
const { default: router } = await import('@/router')
const { default: App } = await import('@/App.vue')
const { projectLinks } = await import('@/data/projects')

type Combo = { locale: 'id' | 'en'; path: string }

const combos: Combo[] = [
  { locale: 'id', path: '/' },
  { locale: 'en', path: '/' },
  { locale: 'id', path: '/projects/amp' },
  { locale: 'en', path: '/projects/amp' },
  { locale: 'id', path: '/projects/microamp' },
  { locale: 'en', path: '/projects/microamp' },
  { locale: 'id', path: '/projects/furuhibi' },
  { locale: 'en', path: '/projects/furuhibi' },
]

// Unresolved vue-i18n keys leak into the HTML as e.g. ">hero.title"
const KEY_LEAK = />(nav|hero|about|projects|skills|experience|contact|footer|microamp|furuhibi|amp|meta|common)\.[a-zA-Z]/
// ... or into attribute values as e.g. alt="microamp.mascotAlt"
const ATTR_KEY_LEAK = /"(microamp|furuhibi)\.[a-zA-Z]/

const expected: Record<string, string[]> = {
  'id:/': ['Karya pilihan', 'Mendengarkan musik', 'Beranda', 'Dibuat dengan Vue', 'Apa yang saya kerjakan'],
  'en:/': ['Selected work', 'Listening to music', 'Home', 'Built with Vue', 'What I do'],
  'id:/projects/amp': ['Catatan dan Referensi', 'Kembali ke proyek', 'Uji Daya Keluar Menggunakan Oscilloscope', 'Block Diagram Amplifier'],
  'en:/projects/amp': ['Notes and References', 'Back to projects', 'Power Output Test Using an Oscilloscope', 'Block Diagram Amplifier'],
  'id:/projects/microamp': ['Kembali ke proyek', 'Informasi Tambahan', 'Block Diagram Amplifier', 'Catatan dan Referensi', 'SE Buffer PNP'],
  'en:/projects/microamp': ['Back to projects', 'Additional Information', 'Block Diagram Amplifier', 'Notes and References', 'SE Buffer PNP'],
  'id:/projects/furuhibi': ['Kembali ke proyek', 'Download Center', 'Satu ecosystem, dari hardware hingga preset.', 'Tentang FuruHibi', 'Modern Design, Analog Heritage.'],
  'en:/projects/furuhibi': ['Back to projects', 'Download Center', 'One ecosystem, from hardware to presets.', 'About FuruHibi', 'Modern Design, Analog Heritage.'],
}

const outputs: Record<string, string> = {}
const failures: string[] = []

for (const { locale, path } of combos) {
  const key = `${locale}:${path}`
  try {
    i18n.global.locale.value = locale
    await router.push(path)
    await router.isReady()

    const app = createSSRApp(App)
    app.use(router)
    app.use(i18n)

    const html = await renderToString(app)
    outputs[key] = html

    if (html.length < 500) failures.push(`${key}: suspiciously short render (${html.length} chars)`)
    if (KEY_LEAK.test(html)) {
      const m = html.match(KEY_LEAK)
      failures.push(`${key}: unresolved i18n key leaked -> ${m?.[0]}`)
    }
    if (ATTR_KEY_LEAK.test(html)) {
      const m = html.match(ATTR_KEY_LEAK)
      failures.push(`${key}: unresolved i18n key leaked in attribute -> ${m?.[0]}`)
    }
    for (const s of expected[key]) {
      if (!html.includes(s)) failures.push(`${key}: missing expected text ${JSON.stringify(s)}`)
    }
  } catch (e) {
    failures.push(`${key}: THREW ${(e as Error).stack ?? e}`)
  }
}

// The two locales must produce genuinely different HTML on the same route
for (const path of ['/', '/projects/amp', '/projects/microamp', '/projects/furuhibi']) {
  const idHtml = outputs[`id:${path}`]
  const enHtml = outputs[`en:${path}`]
  if (idHtml && enHtml && idHtml === enHtml) failures.push(`${path}: id and en rendered IDENTICAL html`)
}

// Known content must be present on the amp page (white diagrams, 3D, osci)
const ampEn = outputs['en:/projects/amp'] ?? ''
if (!ampEn.includes('TopologiAmp.png')) failures.push('amp: topology diagram img missing')
if (!ampEn.includes('BlockSupply.png')) failures.push('amp: psu diagram img missing')
if (!ampEn.includes('model-viewer')) failures.push('amp: model-viewer elements missing')
if (!ampEn.includes('saia.png')) {
  // expected — profile block must be REMOVED
} else {
  failures.push('amp: profile block (saia.png) still present — should be removed')
}
if (!ampEn.includes('Tentang Saya')) {
  // expected — removed
} else {
  failures.push('amp: "Tentang Saya" still present — should be removed')
}
if (!ampEn.includes('bg-white')) failures.push('amp: white diagram wrapper missing')

// microamp matches the live site: diagram images, 3D, and oscilloscope are all
// commented out on the origin page, so they must be absent here too
const microEn = outputs['en:/projects/microamp'] ?? ''
if (microEn.includes('TopologiAmp.png')) failures.push('microamp: topology diagram img should be absent (commented out on live site)')
if (microEn.includes('BlockSupply.png')) failures.push('microamp: psu diagram img should be absent (commented out on live site)')
if (microEn.includes('model-viewer')) failures.push('microamp: 3D model-viewer should be absent (live site has no 3D section)')
if (microEn.includes('maxmode.jpg')) failures.push('microamp: oscilloscope photo should be absent (commented out on live site)')

// furuhibi: light pipeline diagram on a white panel; the DSP/preset apps
// are served from the hub (the retired subdomain must be gone from hrefs)
const fhEn = outputs['en:/projects/furuhibi'] ?? ''
if (!fhEn.includes('audiopipeline.png')) failures.push('furuhibi: pipeline diagram img missing')
if (!fhEn.includes('project.nyaahibi.web.id/furuhibi/dsp.html')) failures.push('furuhibi: hub DSP link missing')
if (!fhEn.includes('project.nyaahibi.web.id/furuhibi/preset.html')) failures.push('furuhibi: hub presets link missing')
if (fhEn.includes('furuhibi.nyaahibi.web.id')) failures.push('furuhibi: retired subdomain still linked')

// No project page may carry the personal profile block
for (const key of ['id:/projects/amp', 'en:/projects/amp', 'id:/projects/microamp', 'en:/projects/microamp', 'id:/projects/furuhibi', 'en:/projects/furuhibi']) {
  const html = outputs[key] ?? ''
  if (html.includes('saia.png')) failures.push(`${key}: profile photo (saia.png) still present — should be removed`)
  if (html.includes('Tentang Saya')) failures.push(`${key}: "Tentang Saya" still present — should be removed`)
  if (html.includes('nyaahibi.nggonku.web.id')) failures.push(`${key}: dead nggonku link still present`)
}

const homeEn = outputs['en:/'] ?? ''

// Every link in the project registry must render on the home card
for (const [slug, links] of Object.entries(projectLinks)) {
  for (const link of links) {
    if (!homeEn.includes(link.href)) failures.push(`home: "${slug}" link missing: ${link.href}`)
  }
}

// Cards route to the hub — the legacy /projects/* pages stay unlinked
// (the "See more projects" CTA at the end of the section targets the hub)
const homeId = outputs['id:/'] ?? ''
for (const [key, html] of [['en:/', homeEn], ['id:/', homeId]] as const) {
  if (html.includes('href="/projects/')) failures.push(`${key}: home still links legacy /projects/ pages`)
  if (!html.includes('project.nyaahibi.web.id/nyaahibiamp')) failures.push(`${key}: hub gen1 link missing`)
  if (!html.includes('project.nyaahibi.web.id/microhibiamp')) failures.push(`${key}: hub microhibi link missing`)
}
if (!homeEn.includes('See more projects')) failures.push('home (en): seeMore CTA missing')
if (!homeId.includes('Lihat proyek lainnya')) failures.push('home (id): seeMore CTA missing')

// Retired hosts must never reappear (nyaaop card link, microamp externals,
// furuhibi's retired subdomain — all links now target the hub)
for (const dead of ['nyaaop.nyaahibi.web.id', 'https://microamp.nyaahibi.web.id', 'https://furuhibi.nyaahibi.web.id']) {
  if (homeEn.includes(dead)) failures.push(`home: retired host present: ${dead}`)
}

// language switcher is a single flag toggle showing the current locale's flag
if (!homeId.includes('/flags/id.svg')) failures.push('home (id): language flag toggle missing')
if (!homeEn.includes('/flags/gb.svg')) failures.push('home (en): language flag toggle missing')
if (homeEn.includes('Switch language to')) failures.push('home: old ID/EN two-button switcher still present')
if (!homeEn.includes('Switch language')) failures.push('home: nav.languageToggle key not resolving')

// Brand: logo.png in the navbar (favicon/OG live in index.html, checked in preview)
if (!homeEn.includes('/logo.png')) failures.push('home: navbar brand logo missing')
if (!homeId.includes('/logo.png')) failures.push('home (id): navbar brand logo missing')

// Get in Touch icons: black in light mode, inverted only under .dark
if (!homeEn.includes('dark:brightness-0')) failures.push('home: contact icons missing dark-mode inversion classes')

console.log('rendered combos:', Object.keys(outputs).length)
for (const k of Object.keys(outputs)) console.log(`  ${k}: ${outputs[k].length} chars`)
console.log(failures.length ? '\nFAILURES:\n' + failures.join('\n') : '\nALL SSR RENDER CHECKS PASSED')
process.exit(failures.length ? 1 : 0)
