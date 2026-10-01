/**
 * Single source of truth for the project-card links on the portfolio home.
 *
 * Links aren't language-dependent — titles/descriptions live in the locale
 * files under `projects.items`, keyed by the same slug. Adding a new project
 * means: one entry here (+ a locale block for its card text if it has one).
 *
 * Link policy (enforced by test/render.test.ts):
 *  - live projects link to their hub detail page (`${PROJECTS_BASE}/<slug>`)
 *    — the hub is the single front door; the portfolio's `/projects/*`
 *    pages remain as legacy mirrors, reachable by direct URL only
 *  - retired hosts never reappear (see RETIRED_HOSTS in the test)
 */

export interface ProjectLink {
  /** Display text — the hub URL for project links. */
  label: string
  /** Internal router path (`/projects/...`) or an absolute external URL. */
  href: string
  /** Rendered as an in-app RouterLink; absent → plain `<a target="_blank">`. */
  internal?: boolean
}

/**
 * The self-hosted projects hub: home server behind a Cloudflare Tunnel, one
 * subdomain + path routing — every live site is a folder under it, e.g.
 * `https://project.nyaahibi.web.id/furuhibi`.
 *
 * When a live site's folder is served from the hub, point its external
 * entry's `href` at `${PROJECTS_BASE}/<slug>` — the SSR test derives its
 * assertions from this file, so nothing else needs to change.
 */
export const PROJECTS_BASE = 'https://project.nyaahibi.web.id'

/** The portfolio itself — pointed at by the hub's hero CTA and footer link. */
export const PORTFOLIO_BASE = 'https://ulilhibi.my.id'

export const projectLinks: Record<string, ProjectLink[]> = {
  amps: [
    { label: 'project.nyaahibi.web.id/nyaahibiamp', href: `${PROJECTS_BASE}/nyaahibiamp` },
    { label: 'project.nyaahibi.web.id/microhibiamp', href: `${PROJECTS_BASE}/microhibiamp` },
  ],
  furuhibi: [
    { label: 'project.nyaahibi.web.id/furuhibi', href: `${PROJECTS_BASE}/furuhibi` },
  ],
}

export function linksFor(id: string): ProjectLink[] {
  return projectLinks[id] ?? []
}

/** One project site listed on the hub landing page. */
export interface HubSite {
  /** Path on the hub — the site is served at `${PROJECTS_BASE}/<slug>`. */
  slug: string
  /** `soon` sites render a badge and no visit link. */
  status: 'live' | 'soon'
  /** Extra link shown on the card (e.g. FuruHibi's WebUSB DSP panel). */
  extra?: { label: string; href: string }
}

/** All sites shown on `project.nyaahibi.web.id` — order = curated order. */
export const hubSites: HubSite[] = [
  { slug: 'nyaahibiamp', status: 'live' },
  { slug: 'nyaahibiv2', status: 'live' },
  { slug: 'amahibi', status: 'soon' },
  { slug: 'microhibiamp', status: 'live' },
  { slug: 'nyaaop', status: 'soon' },
  { slug: 'tubeseamp', status: 'live' },
  { slug: 'nyaatubefda', status: 'soon' },
  {
    slug: 'furuhibi',
    status: 'live',
    extra: { label: 'WebUSB DSP', href: '/furuhibi/dsp.html' },
  },
]
