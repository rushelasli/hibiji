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
]

// Unresolved vue-i18n keys leak into the HTML as e.g. ">hero.title"
const KEY_LEAK = />(nav|hero|about|projects|skills|experience|contact|footer|amp|meta|common)\.[a-zA-Z]/

const expected: Record<string, string[]> = {
  'id:/': ['Karya pilihan', 'Mendengarkan musik', 'Beranda', 'Dibuat dengan Vue', 'Apa yang saya kerjakan'],
  'en:/': ['Selected work', 'Listening to music', 'Home', 'Built with Vue', 'What I do'],
  'id:/projects/amp': ['Catatan dan Referensi', 'Kembali ke proyek', 'Uji Daya Keluar Menggunakan Oscilloscope', 'Block Diagram Amplifier'],
  'en:/projects/amp': ['Notes and References', 'Back to projects', 'Power Output Test Using an Oscilloscope', 'Block Diagram Amplifier'],
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
    for (const s of expected[key]) {
      if (!html.includes(s)) failures.push(`${key}: missing expected text ${JSON.stringify(s)}`)
    }
  } catch (e) {
    failures.push(`${key}: THREW ${(e as Error).stack ?? e}`)
  }
}

// The two locales must produce genuinely different HTML on the same route
for (const path of ['/', '/projects/amp']) {
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

const homeEn = outputs['en:/'] ?? ''
if (!homeEn.includes('projects/amp')) failures.push('home: internal amp route link missing')

console.log('rendered combos:', Object.keys(outputs).length)
for (const k of Object.keys(outputs)) console.log(`  ${k}: ${outputs[k].length} chars`)
console.log(failures.length ? '\nFAILURES:\n' + failures.join('\n') : '\nALL SSR RENDER CHECKS PASSED')
process.exit(failures.length ? 1 : 0)
