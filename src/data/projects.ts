/**
 * Single source of truth for the project-card links on the portfolio home.
 *
 * Links aren't language-dependent — titles/descriptions live in the locale
 * files under `projects.items`, keyed by the same slug. Adding a new project
 * means: one entry here (+ a locale block for its card text if it has one).
 *
 * Link policy (enforced by test/render.test.ts):
 *  - an internal detail page when the portfolio has one (`internal: true`)
 *  - an absolute live-site URL only while a live demo exists
 *  - retired hosts never reappear (see RETIRED_HOSTS in the test)
 */

export interface ProjectLink {
  /** Display text — pseudo-subdomain labels for internal pages. */
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

/** The portfolio itself (detail-page links point here from the hub). */
export const PORTFOLIO_BASE = 'https://nyaahibi.web.id'

export const projectLinks: Record<string, ProjectLink[]> = {
  amps: [
    { label: 'amp.nyaahibi.web.id', href: '/projects/amp', internal: true },
    { label: 'microamp.nyaahibi.web.id', href: '/projects/microamp', internal: true },
  ],
  furuhibi: [
    { label: 'furuhibi.nyaahibi.web.id', href: '/projects/furuhibi', internal: true },
    // TODO(hub): switch to `${PROJECTS_BASE}/furuhibi` once the homeserver hub is up
    { label: 'Live site — furuhibi.nyaahibi.web.id', href: 'https://furuhibi.nyaahibi.web.id' },
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
  /** Portfolio detail-page route, when one exists. */
  detail?: string
  /** Extra link shown on the card (e.g. FuruHibi's WebUSB DSP panel). */
  extra?: { label: string; href: string }
  /** Language-neutral chip labels, same style as the portfolio cards. */
  tags: string[]
}

/** All sites shown on `project.nyaahibi.web.id` — order = curated order. */
export const hubSites: HubSite[] = [
  { slug: 'nyaahibiamp', status: 'live', tags: ['Headphone Amp', 'Gen 1', 'Analog'] },
  { slug: 'nyaahibiv2', status: 'live', detail: '/projects/amp', tags: ['Headphone Amp', 'Gen 2', 'Hybrid', 'SMD'] },
  { slug: 'amahibi', status: 'soon', tags: ['Headphone Amp', 'Balanced', 'TPA6120'] },
  { slug: 'microhibiamp', status: 'live', detail: '/projects/microamp', tags: ['Headphone Amp', 'Micro', 'Discrete'] },
  { slug: 'nyaaop', status: 'soon', tags: ['Op-Amp', 'Discrete'] },
  { slug: 'tubeseamp', status: 'live', tags: ['Tube', 'Headphone Amp', 'SE'] },
  { slug: 'nyaatubefda', status: 'soon', tags: ['Tube', 'Fully Differential'] },
  {
    slug: 'furuhibi',
    status: 'live',
    detail: '/projects/furuhibi',
    extra: { label: 'WebUSB DSP', href: '/furuhibi/dsp.html' },
    tags: ['R2R DAC', 'PCM56', 'ESP32-S3'],
  },
]
