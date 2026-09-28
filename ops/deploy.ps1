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
# root), so it must run BEFORE the per-site folder mirrors. Those mirrors then
# reset every folder to the old live site, so the hub detail-page overlay
# (index.html onto each live slug folder) must run LAST.

$ErrorActionPreference = 'Stop'

$repos = 'C:\srv\repos'
$sites = 'C:\srv\sites'

Write-Host '[1/6] Updating portfolio repo...'
git -C "$repos\hibi" pull --ff-only
if ($LASTEXITCODE -ne 0) { throw 'git pull failed — is the working tree clean?' }

Push-Location "$repos\hibi"
try {
    Write-Host '[2/6] Building portfolio + hub landing...'
    bun install --frozen-lockfile
    bun run build            # vue-tsc gate + vite build (dist/)
    if ($LASTEXITCODE -ne 0) { throw 'build failed — aborting deploy.' }
    bun run build:hub        # vite build --config vite.hub.config.ts (dist-hub/)
    if ($LASTEXITCODE -ne 0) { throw 'hub build failed — aborting deploy.' }

    Write-Host '[3/6] Running SSR render gates...'
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

Write-Host '[4/6] Mirroring hub landing -> sites\projects (first — /MIR resets root)...'
# The build emits hub.html; the site is served as index.html at the root.
Copy-Item "$repos\hibi\dist-hub\hub.html" "$repos\hibi\dist-hub\index.html" -Force
Remove-Item "$repos\hibi\dist-hub\hub.html"
# dist-hub\projects ships WITH the hub — detail pages load images + GLB
# models from it (/<slug>/ pages), so it must never be stripped here.
robocopy "$repos\hibi\dist-hub" "$sites\projects" /MIR /XD .git node_modules /NFL /NDL /NJH
if ($LASTEXITCODE -ge 8) { throw "robocopy (hub landing) failed ($LASTEXITCODE)" }
$global:LASTEXITCODE = 0   # robocopy 0-7 = success

Write-Host '[5/6] Mirroring portfolio dist -> sites\hibi + site folders...'
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

# The per-site mirrors just restored each old live site with its ORIGINAL
# index.html. Point every live slug at the hub app instead — HubApp reads
# window.location and renders the matching detail page; everything else in
# the folder (dsp.html, images, legacy pages) stays untouched.
# Slugs are derived from hubSites (status: 'live') — one source of truth.
Write-Host '[6/6] Overlaying hub detail pages onto live site folders...'
Push-Location "$repos\hibi"
try {
    $liveOut = & bun -e "const { hubSites } = await import('./src/data/projects'); console.log(hubSites.filter((s) => s.status === 'live').map((s) => s.slug).join(' '))"
    if ($LASTEXITCODE -ne 0) { throw 'could not derive live slugs from hubSites' }
} finally {
    Pop-Location
}
$liveSlugs = ($liveOut -join ' ').Trim() -split '\s+'
if (-not $liveSlugs -or -not $liveSlugs[0]) { throw 'derived live slug list is empty' }
foreach ($slug in $liveSlugs) {
    $src = "$repos\hibi\dist-hub\$slug\index.html"
    $dst = "$sites\projects\$slug"
    if ((Test-Path $src) -and (Test-Path $dst)) {
        Copy-Item $src "$dst\index.html" -Force
        Write-Host "      $slug <- hub detail page"
    } else {
        Write-Warning "      $slug skipped — source index.html or target folder missing"
    }
}

Write-Host 'Deploy complete.'
