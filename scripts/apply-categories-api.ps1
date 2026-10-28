$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path -Parent $PSScriptRoot
$stage = Join-Path $taskRoot 'category-api-update'
$apiRoot = (Resolve-Path -LiteralPath 'D:\FG Group\RAG\gomzi-nutrition-rag-api').Path
$entries = Get-Content -LiteralPath (Join-Path $stage 'manifest.json') -Raw | ConvertFrom-Json
foreach ($entry in $entries) {
    $target = [IO.Path]::GetFullPath((Join-Path $apiRoot $entry.path))
    if (-not $target.StartsWith($apiRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Target is outside the API project.' }
    $hash = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($hash -ne $entry.sha256) { throw ('Original file changed; regenerate the patch: ' + $entry.path) }
}
foreach ($entry in $entries) {
    Copy-Item -LiteralPath (Join-Path $stage $entry.path) -Destination (Join-Path $apiRoot $entry.path)
    Write-Output ('Updated ' + $entry.path)
}
