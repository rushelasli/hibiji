# Deploys the hibi portfolio to the served directory on the homeserver.
# Run manually or from Task Scheduler (after the pull, gates must pass
# before anything reaches the live folder).
#
# Layout:
#   C:\srv\repos\hibi         git clone of this repo (public — no token needed)
#   C:\srv\repos\projects\*   git clones of live project sites (optional)
#   C:\srv\sites\hibi         served by Caddy (built dist only)
#   C:\srv\sites\projects     served by Caddy (mirrored project folders)

$ErrorActionPreference = 'Stop'

$repos = 'C:\srv\repos'
$sites = 'C:\srv\sites'

Write-Host '[1/4] Updating portfolio repo...'
git -C "$repos\hibi" pull --ff-only
if ($LASTEXITCODE -ne 0) { throw 'git pull failed — is the working tree clean?' }

Push-Location "$repos\hibi"
try {
    Write-Host '[2/4] Building...'
    bun install --frozen-lockfile
    bun run build            # vue-tsc gate + vite build
    if ($LASTEXITCODE -ne 0) { throw 'build failed — aborting deploy.' }

    Write-Host '[3/4] Running SSR render gate...'
    bunx vite build --ssr test/render.test.ts --outDir node_modules\.tmp\ssr
    node node_modules\.tmp\ssr\render.test.js
    if ($LASTEXITCODE -ne 0) { throw 'SSR render test failed — aborting deploy.' }
}
finally {
    Pop-Location
}

Write-Host '[4/4] Mirroring dist -> sites\hibi...'
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
