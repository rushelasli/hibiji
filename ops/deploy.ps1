# Deploys the hibi portfolio AND the projects-hub landing page to the
# served directories on the homeserver. Run manually or from Task
# Scheduler (gates must pass before anything reaches the live folders).
#
# Layout:
#   C:\srv\repos\hibi         git clone of this repo (public — no token needed)
#   C:\srv\repos\projects\*   git clones of live project sites (optional)
#   C:\srv\sites\hibi         served portfolio (dist mirror)
#   C:\srv\sites\projects     served hub: landing (index.html) + site folders
#
# CRITICAL ORDER: the hub landing is mirrored with /MIR (replaces the whole
# root), so it must run BEFORE the per-site folder mirrors.

$ErrorActionPreference = 'Stop'

$repos = 'C:\srv\repos'
$sites = 'C:\srv\sites'

Write-Host '[1/5] Updating portfolio repo...'
git -C "$repos\hibi" pull --ff-only
if ($LASTEXITCODE -ne 0) { throw 'git pull failed — is the working tree clean?' }

Push-Location "$repos\hibi"
try {
    Write-Host '[2/5] Building portfolio + hub landing...'
    bun install --frozen-lockfile
    bun run build            # vue-tsc gate + vite build (dist/)
    if ($LASTEXITCODE -ne 0) { throw 'build failed — aborting deploy.' }
    bun run build:hub        # vite build --config vite.hub.config.ts (dist-hub/)
    if ($LASTEXITCODE -ne 0) { throw 'hub build failed — aborting deploy.' }

    Write-Host '[3/5] Running SSR render gates...'
    bunx vite build --ssr test/render.test.ts --outDir node_modules\.tmp\ssr
    node node_modules\.tmp\ssr\render.test.js
    if ($LASTEXITCODE -ne 0) { throw 'portfolio SSR test failed — aborting deploy.' }
    bunx vite build --ssr test/hub.render.test.ts --outDir node_modules\.tmp\ssr-hub
    node node_modules\.tmp\ssr-hub\hub.render.test.js
    if ($LASTEXITCODE -ne 0) { throw 'hub SSR test failed — aborting deploy.' }
}
finally {
    Pop-Location
}

Write-Host '[4/5] Mirroring hub landing -> sites\projects (first — /MIR resets root)...'
# The build emits hub.html; the site is served as index.html at the root.
Copy-Item "$repos\hibi\dist-hub\hub.html" "$repos\hibi\dist-hub\index.html" -Force
Remove-Item "$repos\hibi\dist-hub\hub.html"
# public/ ships portfolio-only images too — the hub doesn't serve them.
Remove-Item "$repos\hibi\dist-hub\projects" -Recurse -Force -ErrorAction SilentlyContinue
robocopy "$repos\hibi\dist-hub" "$sites\projects" /MIR /XD .git node_modules /NFL /NDL /NJH
if ($LASTEXITCODE -ge 8) { throw "robocopy (hub landing) failed ($LASTEXITCODE)" }
$global:LASTEXITCODE = 0   # robocopy 0-7 = success

Write-Host '[5/5] Mirroring portfolio dist -> sites\hibi + site folders...'
robocopy "$repos\hibi\dist" "$sites\hibi" /MIR /XD .git node_modules /NFL /NDL /NJH
if ($LASTEXITCODE -ge 8) { throw "robocopy failed ($LASTEXITCODE)" }
$global:LASTEXITCODE = 0   # robocopy 0-7 = success

# Mirror each cloned live site into the hub folder (folder name = URL path).
if (Test-Path "$repos\projects") {
    Get-ChildItem "$repos\projects" -Directory | ForEach-Object {
        Write-Host "      mirroring $($_.Name)"
        robocopy $_.FullName "$sites\projects\$($_.Name)" /MIR /XD .git node_modules /NFL /NDL /NJH
        if ($LASTEXITCODE -ge 8) { throw "robocopy failed for $($_.Name) ($LASTEXITCODE)" }
    }
}

Write-Host 'Deploy complete.'
