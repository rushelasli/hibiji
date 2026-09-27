# Homeserver runbook — Windows 10 + Caddy + Cloudflare Tunnel

One box serves everything: the portfolio (this repo) and the projects hub
(all live sites under one subdomain with path routing). No open inbound
ports — cloudflared makes outbound-only connections to Cloudflare.

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
C:\srv\repos\projects\<slug> git clones of live project sites (optional)
C:\srv\sites\hibi            served portfolio (dist mirror)
C:\srv\sites\projects\hub    ...served hub folders (mirrors, one per slug)
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
     - `projects.nyaahibi.web.id` → hub
3. **Caddy**
   - Put this `ops/Caddyfile` at `C:\srv\caddy\Caddyfile`, adjust the
     portfolio hostname if your apex differs.
   - Run as a service: `caddy run --config C:\srv\caddy\Caddyfile` wrapped
     by WinSW or a Task Scheduler *At startup* task.
4. **Deploy script**
   - Clone the repo to `C:\srv\repos\hibi`, run `ops\deploy.ps1` once by
     hand, then schedule it (Task Scheduler, daily or on demand).

## Cloudflare edge rules

- **Cache rule / Always Online** for both hostnames — keeps the site
  serving from cache when the box is offline.
- **Redirect Rules (301)** for the move to the hub:
  - `furuhibi.nyaahibi.web.id/*` → `projects.nyaahibi.web.id/furuhibi/$1`
  - same pattern for `amp.`/`microamp.` subdomains when they retire.

## Migrating a live site to the hub

1. Ensure `C:\srv\repos\projects\<slug>` is a clone and `deploy.ps1` mirrored
   it to `C:\srv\sites\projects\<slug>`.
2. In this repo: point the entry's `href` at `` `${PROJECTS_BASE}/<slug>` ``
   (`src/data/projects.ts`) — the SSR test derives its assertions from the
   registry, so nothing else changes.
3. Deploy the portfolio; add the Cloudflare 301 from the old subdomain.

## Later: hub index page

`src/data/projects.ts` is already the single source of truth — the hub's
`index.html` can be generated from `projectLinks` + `PROJECTS_BASE`.
