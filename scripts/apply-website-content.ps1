$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path -Parent $PSScriptRoot
$stageRoot = Join-Path $taskRoot 'website-content-update'
$projects = @{
    api = (Resolve-Path -LiteralPath 'D:\FG Group\RAG\gomzi-nutrition-rag-api').Path
    admin = (Resolve-Path -LiteralPath 'D:\FG Group\RAG\gomzi-nutrition-rag-admin').Path
}
$entries = Get-Content -LiteralPath (Join-Path $stageRoot 'manifest.json') -Raw | ConvertFrom-Json
foreach ($entry in $entries) {
    $projectRoot = $projects[$entry.project]
    if (-not $projectRoot) { throw 'Unknown target project.' }
    $target = [IO.Path]::GetFullPath((Join-Path $projectRoot $entry.path))
    if (-not $target.StartsWith($projectRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Target is outside the intended project.' }
    if ($null -eq $entry.sha256) {
        if (Test-Path -LiteralPath $target) { throw ('A new target already exists: ' + $entry.path) }
    } else {
        if (-not (Test-Path -LiteralPath $target)) { throw ('Missing original: ' + $entry.path) }
        if ((Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash.ToLowerInvariant() -ne $entry.sha256) { throw ('The original changed. Regenerate and review before applying: ' + $entry.path) }
    }
}
foreach ($entry in $entries) {
    $target = Join-Path $projects[$entry.project] $entry.path
    $backup = Join-Path $stageRoot ('originals/' + $entry.project + '/' + $entry.path)
    if (Test-Path -LiteralPath $target) {
        New-Item -ItemType Directory -Path (Split-Path -Parent $backup) -Force | Out-Null
        Copy-Item -LiteralPath $target -Destination $backup
    }
    New-Item -ItemType Directory -Path (Split-Path -Parent $target) -Force | Out-Null
    Copy-Item -LiteralPath (Join-Path (Join-Path $stageRoot $entry.project) $entry.path) -Destination $target
    Write-Output ('Updated ' + $entry.project + ': ' + $entry.path)
}
