// SSR render test — exercises the real App, router, and i18n instance.
// Run: bunx vite build --ssr test/render.test.ts --outDir /tmp/opencode/ssr && node /tmp/opencode/ssr/render.test.mjs
await import('./stubs')

const { createSSRApp } = await import('vue')
const { renderToString } = await import('@vue/server-renderer')
const { default: i18n } = await import('@/i18n')
const { default: router } = await import('@/router')
const { default: App } = await import('@/App.vue')

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
  'id:/projects/microamp': ['Kembali ke proyek', 'Informasi Tambahan', 'Block Diagram Amplifier', 'Catatan dan Referensi', 'Test Power Output Menggunakan Oscilloscope'],
  'en:/projects/microamp': ['Back to projects', 'Additional Information', 'Block Diagram Amplifier', 'Notes and References', 'Power Output Test Using an Oscilloscope'],
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

// microamp reuses the amp project's local assets; profile block must stay removed
const microEn = outputs['en:/projects/microamp'] ?? ''
if (!microEn.includes('TopologiAmp.png')) failures.push('microamp: topology diagram img missing')
if (!microEn.includes('BlockSupply.png')) failures.push('microamp: psu diagram img missing')
if (!microEn.includes('model-viewer')) failures.push('microamp: model-viewer elements missing')
if (!microEn.includes('maxmode.jpg')) failures.push('microamp: oscilloscope photo missing')

// furuhibi: light pipeline diagram on a white panel, apps stay on live origin
const fhEn = outputs['en:/projects/furuhibi'] ?? ''
if (!fhEn.includes('audiopipeline.png')) failures.push('furuhibi: pipeline diagram img missing')
if (!fhEn.includes('furuhibi.nyaahibi.web.id/dsp.html')) failures.push('furuhibi: external DSP link missing')
if (!fhEn.includes('furuhibi.nyaahibi.web.id/preset.html')) failures.push('furuhibi: external presets link missing')

// No project page may carry the personal profile block
for (const key of ['id:/projects/amp', 'en:/projects/amp', 'id:/projects/microamp', 'en:/projects/microamp', 'id:/projects/furuhibi', 'en:/projects/furuhibi']) {
  const html = outputs[key] ?? ''
  if (html.includes('saia.png')) failures.push(`${key}: profile photo (saia.png) still present — should be removed`)
  if (html.includes('Tentang Saya')) failures.push(`${key}: "Tentang Saya" still present — should be removed`)
}

const homeEn = outputs['en:/'] ?? ''
if (!homeEn.includes('projects/amp')) failures.push('home: internal amp route link missing')
if (!homeEn.includes('projects/microamp')) failures.push('home: internal microamp route link missing')
if (!homeEn.includes('projects/furuhibi')) failures.push('home: internal furuhibi route link missing')
if (homeEn.includes('https://microamp.nyaahibi.web.id')) failures.push('home: microamp still linked to external subdomain')
if (!homeEn.includes('https://furuhibi.nyaahibi.web.id')) failures.push('home: furuhibi external live link missing')

console.log('rendered combos:', Object.keys(outputs).length)
for (const k of Object.keys(outputs)) console.log(`  ${k}: ${outputs[k].length} chars`)
console.log(failures.length ? '\nFAILURES:\n' + failures.join('\n') : '\nALL SSR RENDER CHECKS PASSED')
process.exit(failures.length ? 1 : 0)
