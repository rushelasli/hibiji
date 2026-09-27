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

const liveSites = hubSites.filter((s) => s.status === 'live')
const soonSites = hubSites.filter((s) => s.status === 'soon')

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

    // Brand chrome: logo, mascots staying fixed at the sides (left one flipped
    // to face inward), both toggles
    if (!html.includes('/logo.png')) failures.push(`${locale}: navbar logo missing`)
    if (!html.includes('/maskotkiri.png') || !html.includes('/maskotkanan.png')) {
      failures.push(`${locale}: mascot images missing`)
    }
    if (!html.includes('fixed bottom-0 left-0') || !html.includes('fixed bottom-0 right-0')) {
      failures.push(`${locale}: mascots not fixed to the sides`)
    }
    if (!html.includes('-scale-x-100')) failures.push(`${locale}: left mascot not flipped inward`)
    if (!rendered(html, i18n.global.t('nav.theme'))) failures.push(`${locale}: theme toggle missing`)
    if (!rendered(html, i18n.global.t('nav.languageToggle'))) {
      failures.push(`${locale}: language toggle missing`)
    }
    const flag = locale === 'id' ? '/flags/id.svg' : '/flags/gb.svg'
    if (!html.includes(flag)) failures.push(`${locale}: flag ${flag} missing`)

    // Hero section: tagline, title, stats line (interpolated from the
    // registry), and the browse CTA — flat, no starfield
    for (const id of ['hero', 'live', 'soon']) {
      if (!html.includes(`id="${id}"`)) failures.push(`${locale}: section #${id} missing`)
    }
    if (html.includes('<canvas')) failures.push(`${locale}: star-rain canvas still present`)
    if (!rendered(html, i18n.global.t('hub.eyebrow'))) failures.push(`${locale}: hub tagline missing`)
    if (!rendered(html, i18n.global.t('hub.title'))) failures.push(`${locale}: hub title missing`)
    const stats = i18n.global.t('hub.stats', { live: liveSites.length, soon: soonSites.length })
    if (!rendered(html, stats)) failures.push(`${locale}: stats line missing: ${stats}`)
    if (html.includes('{live}') || html.includes('{soon}')) {
      failures.push(`${locale}: stats interpolation leaked`)
    }
    if (!rendered(html, i18n.global.t('hub.ctaBrowse'))) failures.push(`${locale}: browse CTA missing`)
    if (!html.includes(`href="${PORTFOLIO_BASE}"`)) {
      failures.push(`${locale}: portfolio link (navbar/footer) missing`)
    }

    // Live section header + 2-column grid of cards
    if (!rendered(html, i18n.global.t('hub.liveEyebrow'))) failures.push(`${locale}: live eyebrow missing`)
    if (!rendered(html, i18n.global.t('hub.liveTitle'))) failures.push(`${locale}: live title missing`)
    if (!html.includes('md:grid-cols-2')) failures.push(`${locale}: 2-column live grid missing`)

    // Every live card ends in a "See detail" text link, pinned to the card
    // bottom by the flex-end footer (mt-auto); the chips' fixed mb-5 keeps
    // the divider clear even when a description wraps to 2 lines
    const seeDetail = i18n.global.t('hub.seeDetail')
    const detailCount = count(html, seeDetail)
    if (detailCount !== liveSites.length) {
      failures.push(`${locale}: expected ${liveSites.length} "See detail" links, found ${detailCount}`)
    }
    if (!html.includes('mt-auto')) failures.push(`${locale}: card link footer not flex-end`)
    if (!html.includes('mt-5 mb-5')) {
      failures.push(`${locale}: chip gap fix missing — divider would touch the tags`)
    }

    for (const site of liveSites) {
      if (!rendered(html, i18n.global.t(`hub.sites.${site.slug}.title`))) {
        failures.push(`${locale}: card title missing for ${site.slug}`)
      }
      if (!rendered(html, i18n.global.t(`hub.sites.${site.slug}.desc`))) {
        failures.push(`${locale}: card description missing for ${site.slug}`)
      }
      if (!html.includes(`href="/${site.slug}"`)) {
        failures.push(`${locale}: visit link missing for ${site.slug}`)
      }
      const tags = i18n.global.tm(`hub.sites.${site.slug}.tags`) as unknown as string[]
      for (const tag of tags ?? []) {
        if (!rendered(html, tag)) failures.push(`${locale}: tag chip missing for ${site.slug}: ${tag}`)
      }
      // Extra link is labeled from the registry, not a raw URL
      if (site.extra && !rendered(html, site.extra.label)) {
        failures.push(`${locale}: extra button label missing for ${site.slug}`)
      }
      // No raw hub URLs may be displayed anywhere on the cards
      if (html.includes(`project.nyaahibi.web.id/${site.slug}`)) {
        failures.push(`${locale}: raw URL label still displayed for ${site.slug}`)
      }
    }

    // Coming-soon section: compact panel — titles/descs, badges, no links
    if (!rendered(html, i18n.global.t('hub.soonEyebrow'))) failures.push(`${locale}: soon eyebrow missing`)
    if (!rendered(html, i18n.global.t('hub.soonTitle'))) failures.push(`${locale}: soon title missing`)
    for (const site of soonSites) {
      if (!rendered(html, i18n.global.t(`hub.sites.${site.slug}.title`))) {
        failures.push(`${locale}: soon title missing for ${site.slug}`)
      }
      if (!rendered(html, i18n.global.t(`hub.sites.${site.slug}.desc`))) {
        failures.push(`${locale}: soon description missing for ${site.slug}`)
      }
      if (html.includes(`href="/${site.slug}"`)) {
        failures.push(`${locale}: coming-soon site ${site.slug} must not have a visit link`)
      }
    }
    // Badges are the only elements using the primary-outlined chip class
    const badgeCount = count(html, 'border-primary/40')
    if (badgeCount !== soonSites.length) {
      failures.push(`${locale}: expected ${soonSites.length} coming-soon badges, found ${badgeCount}`)
    }

    // The old "details → portfolio" duality is gone: no portfolio project
    // pages may be linked from the hub cards
    if (html.includes(`${PORTFOLIO_BASE}/projects/`)) {
      failures.push(`${locale}: stale portfolio detail link (/projects/) rendered on the hub`)
    }

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
