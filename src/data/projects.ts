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
 * Origin of the future self-hosted projects hub: home server behind a
 * Cloudflare Tunnel, one subdomain + path routing, e.g.
 * `https://projects.nyaahibi.web.id/furuhibi`.
 *
 * When the hub is live, point each external entry's `href` at
 * `${PROJECTS_BASE}/<slug>` — the SSR test derives its assertions from this
 * file, so nothing else needs to change.
 */
export const PROJECTS_BASE = 'https://projects.nyaahibi.web.id'

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
