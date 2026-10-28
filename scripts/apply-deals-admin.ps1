$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path -Parent $PSScriptRoot
$stagedRoot = Join-Path $taskRoot 'admin-deals-update'
$adminRoot = (Resolve-Path -LiteralPath 'D:\FG Group\RAG\gomzi-nutrition-rag-admin').Path
$entries = Get-Content -LiteralPath (Join-Path $stagedRoot 'manifest.json') -Raw | ConvertFrom-Json
# Validate every original before applying any update, so newer user edits are preserved.
foreach ($entry in $entries) {
    $target = [IO.Path]::GetFullPath((Join-Path $adminRoot $entry.path))
    if (-not $target.StartsWith($adminRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Target is outside the admin project.' }
    if ($null -eq $entry.sha256) {
        if (Test-Path -LiteralPath $target) { throw ('A new target already exists: ' + $entry.path) }
    } else {
        if (-not (Test-Path -LiteralPath $target)) { throw ('Missing original file: ' + $entry.path) }
        $hash = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash.ToLowerInvariant()
        if ($hash -ne $entry.sha256) { throw ('The original has changed; regenerate the update: ' + $entry.path) }
    }
}
foreach ($entry in $entries) {
    $target = Join-Path $adminRoot $entry.path
    $parent = Split-Path -Parent $target
    if (-not (Test-Path -LiteralPath $parent)) { New-Item -ItemType Directory -Path $parent | Out-Null }
    Copy-Item -LiteralPath (Join-Path $stagedRoot $entry.path) -Destination $target
    Write-Output ('Updated ' + $entry.path)
}
