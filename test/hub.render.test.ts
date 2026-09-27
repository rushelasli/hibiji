// SSR render test for the projects-hub landing page (hub.html → dist-hub/).
// Run: bunx vite build --ssr test/hub.render.test.ts --outDir node_modules/.tmp/ssr-hub
//      && node node_modules/.tmp/ssr-hub/hub.render.test.js
await import('./stubs')

const { createSSRApp } = await import('vue')
const { renderToString } = await import('@vue/server-renderer')
const { default: i18n } = await import('@/i18n')
const { default: HubApp } = await import('@/hub/HubApp.vue')
const { hubSites, PORTFOLIO_BASE } = await import('@/data/projects')

// Unresolved vue-i18n keys leak into the HTML as e.g. ">hub.title"
const KEY_LEAK = />(nav|hub|footer|common)\.[a-zA-Z]/
// ... or into attribute values as e.g. alt="hub.sites.x"
const ATTR_KEY_LEAK = /"(nav|hub|footer|common)\.[a-zA-Z]/

const outputs: Record<string, string> = {}
const failures: string[] = []

function count(haystack: string, needle: string): number {
  return haystack.split(needle).length - 1
}

// Vue SSR escapes text/attribute content (&, <, >, ", ') — mirror it so
// expectations containing apostrophes (e.g. "Rod Elliot's") still match.
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function rendered(html: string, text: string): boolean {
  return html.includes(text) || html.includes(esc(text))
}

for (const locale of ['id', 'en'] as const) {
  try {
    i18n.global.locale.value = locale
    const app = createSSRApp(HubApp)
    app.use(i18n)

    const html = await renderToString(app)
    outputs[locale] = html

    if (html.length < 500) failures.push(`${locale}: suspiciously short render (${html.length} chars)`)

    const leak = html.match(KEY_LEAK)
    if (leak) failures.push(`${locale}: unresolved i18n key leaked -> ${leak[0]}`)
    const attrLeak = html.match(ATTR_KEY_LEAK)
    if (attrLeak) failures.push(`${locale}: unresolved key in attribute -> ${attrLeak[0]}`)

    // Brand chrome: logo, mascots staying fixed at the sides, both toggles
    if (!html.includes('/logo.png')) failures.push(`${locale}: navbar logo missing`)
    if (!html.includes('/maskotkiri.png') || !html.includes('/maskotkanan.png')) {
      failures.push(`${locale}: mascot images missing`)
    }
    if (!html.includes('fixed bottom-0 left-0') || !html.includes('fixed bottom-0 right-0')) {
      failures.push(`${locale}: mascots not fixed to the sides`)
    }
    if (!rendered(html, i18n.global.t('nav.theme'))) failures.push(`${locale}: theme toggle missing`)
    if (!rendered(html, i18n.global.t('nav.languageToggle'))) {
      failures.push(`${locale}: language toggle missing`)
    }
    const flag = locale === 'id' ? '/flags/id.svg' : '/flags/gb.svg'
    if (!html.includes(flag)) failures.push(`${locale}: flag ${flag} missing`)

    // Hero
    if (!rendered(html, i18n.global.t('hub.eyebrow'))) failures.push(`${locale}: hub tagline missing`)
    if (!rendered(html, i18n.global.t('hub.title'))) failures.push(`${locale}: hub title missing`)

    // Every registry site renders as a card
    let liveCards = 0
    let soonCards = 0
    for (const site of hubSites) {
      const title = i18n.global.t(`hub.sites.${site.slug}.title`)
      if (!rendered(html, title)) failures.push(`${locale}: card title missing for ${site.slug}`)
      if (!rendered(html, i18n.global.t(`hub.sites.${site.slug}.desc`))) {
        failures.push(`${locale}: card description missing for ${site.slug}`)
      }

      if (site.status === 'live') {
        liveCards++
        if (!html.includes(`href="/${site.slug}"`)) {
          failures.push(`${locale}: visit link missing for ${site.slug}`)
        }
      } else {
        soonCards++
        // A coming-soon site must never link anywhere
        if (html.includes(`href="/${site.slug}"`)) {
          failures.push(`${locale}: coming-soon site ${site.slug} must not have a visit link`)
        }
      }

      if (site.detail && !html.includes(`${PORTFOLIO_BASE}${site.detail}`)) {
        failures.push(`${locale}: portfolio detail link missing for ${site.slug}`)
      }
      if (site.extra && !html.includes(site.extra.href)) {
        failures.push(`${locale}: extra link missing for ${site.slug}`)
      }
    }

    const badgeCount = count(html, esc(i18n.global.t('hub.comingSoon')))
    if (badgeCount !== soonCards) {
      failures.push(`${locale}: expected ${soonCards} coming-soon badges, found ${badgeCount}`)
    }
    if (liveCards + soonCards !== hubSites.length) failures.push(`${locale}: registry size mismatch`)

    // The hub lives on the singular subdomain — the plural must never appear
    if (html.includes('projects.nyaahibi.web.id')) {
      failures.push(`${locale}: stale plural subdomain projects.nyaahibi.web.id present`)
    }

    // Footer points back to the portfolio
    if (!html.includes(PORTFOLIO_BASE)) failures.push(`${locale}: portfolio link missing in footer`)
    if (!rendered(html, i18n.global.t('hub.backToMain'))) {
      failures.push(`${locale}: back-to-main link missing`)
    }
  } catch (e) {
    failures.push(`${locale}: THREW ${(e as Error).stack ?? e}`)
  }
}

// The two locales must produce genuinely different HTML
if (outputs.id && outputs.en && outputs.id === outputs.en) {
  failures.push('id and en rendered IDENTICAL html')
}

console.log('hub locales rendered:', Object.keys(outputs).length)
for (const k of Object.keys(outputs)) console.log(`  ${k}: ${outputs[k].length} chars`)
console.log(failures.length ? '\nFAILURES:\n' + failures.join('\n') : '\nALL HUB RENDER CHECKS PASSED')
process.exit(failures.length ? 1 : 0)
