# Homeserver runbook — Windows 10 + Caddy + Cloudflare Tunnel

One box serves everything: the portfolio (this repo) and the projects hub
(`project.nyaahibi.web.id` — landing page + all live sites under one
subdomain with path routing). No open inbound ports — cloudflared makes
outbound-only connections to Cloudflare.

## Safety rules (repo is public)

1. **The one secret is the cloudflared tunnel token.** It lives on the box
   only (service config), never in this repo, never in screenshots. Rotate
   it from the Cloudflare dashboard if leaked.
2. **Serve `C:\srv\sites\*` only — never the git clones.** `.env` being
   gitignored does *not* protect it if Caddy's `root` points at the clone:
   the file exists on disk and would be published.
3. Future private repos deploy with a read-only deploy key / fine-grained
   PAT (`contents:read`) stored on the box — never committed, never in CI YAML.

## Folder layout

```
C:\srv\repos\hibi            git clone of https://github.com/rushelasli/hibiji
C:\srv\repos\project\<slug>  git clones of live project sites (optional)
C:\srv\sites\hibi            served portfolio (dist mirror)
C:\srv\sites\project         served hub:
                             index.html + assets/ + flags/ + logo/mascots
                             (the dist-hub landing, mirrored with /MIR)
                             <slug>/                    ... one folder per site
                             dash/                      ... existing dashboard
```

## One-time setup

1. **Windows prep**
   - Install [Git](https://git-scm.com/download/win) and
     [Bun](https://bun.sh/docs/installation) (system-wide).
   - Power plan: never sleep (`powercfg /change standby-timeout-ac 0`).
   - Windows Update: pause auto-restart (Win10 is EOL — keep updates manual
     and Defender on; the box has zero inbound exposure).
2. **cloudflared**
   - `winget install Cloudflare.cloudflared` (runs as a Windows service).
   - Create a tunnel in Zero Trust → Networks → Tunnels, add two public
     hostnames, both pointing at `http://localhost:8080`:
     - `nyaahibi.web.id` → portfolio
     - `project.nyaahibi.web.id` → hub (landing + site folders)
3. **Caddy**
   - Put this `ops/Caddyfile` at `C:\srv\caddy\Caddyfile`, adjust the
     portfolio hostname if your apex differs.
   - Run as a service: `caddy run --config C:\srv\caddy\Caddyfile` wrapped
     by WinSW or a Task Scheduler *At startup* task.
4. **Deploy script**
   - Clone the repo to `C:\srv\repos\hibi`, run `ops\deploy.ps1` once by
     hand, then schedule it (Task Scheduler, daily or on demand).
   - One run builds **both** sites (`bun run build` → `dist/`,
     `bun run build:hub` → `dist-hub/`), runs both SSR gates, then mirrors
     in the only safe order: hub landing (`/MIR`, resets the root) →
     portfolio → per-site folders.

## Cloudflare edge rules

- **Cache rule / Always Online** for both hostnames — keeps the site
  serving from cache when the box is offline.
- **Redirect Rules (301)** for the move to the hub:
  - `furuhibi.nyaahibi.web.id/*` → `project.nyaahibi.web.id/furuhibi/$1`
  - same pattern for `amp.`/`microamp.` subdomains when they retire.

## Hub landing page (this repo)

- Source: `hub.html` + `src/hub/` — shares the portfolio's theme tokens,
  locale files (`hub.*` keys), `ThemeToggle`, `LocaleToggle`, and logo.
- Cards are driven by `hubSites` in `src/data/projects.ts`
  (`slug`, `status: live|soon`, optional `detail` route, optional `extra`
  link, language-neutral `tags` chips). Adding a site = one registry
  entry + two `hub.sites.<slug>` locale keys per language.
- Mascots (`maskotkiri.png` / `maskotkanan.png`) and `logo.png` live in
  `public/` and ship with both builds.

## Migrating a live site's card to the hub

1. Ensure `C:\srv\repos\project\<slug>` is a clone and `deploy.ps1` mirrored
   it to `C:\srv\sites\project\<slug>`.
2. In this repo: point the entry's `href` at `` `${PROJECTS_BASE}/<slug>` ``
   (`src/data/projects.ts`) — the SSR test derives its assertions from the
   registry, so nothing else changes.
3. Deploy the portfolio; add the Cloudflare 301 from the old subdomain.
