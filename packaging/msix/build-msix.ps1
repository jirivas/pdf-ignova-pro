[CmdletBinding()]
param(
    [string]$AppDirectory,
    [string]$OutputDirectory
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$repoRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
if (-not $AppDirectory) {
    $AppDirectory = Join-Path $repoRoot 'source/release/PDF Ignova Pro-win32-x64'
}
if (-not $OutputDirectory) {
    $OutputDirectory = Join-Path $repoRoot 'release-msix'
}
$AppDirectory = (Resolve-Path -LiteralPath $AppDirectory).Path
$identity = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'store-identity.json') -Raw | ConvertFrom-Json
$packageJson = Get-Content -LiteralPath (Join-Path $repoRoot 'source/package.json') -Raw | ConvertFrom-Json
if ($packageJson.version -notmatch '^\d+\.\d+\.\d+$') { throw 'Expected a three-component release version.' }
$version = "$($packageJson.version).0"

# Verify the publisher copied from Partner Center against the independent PFN.
$sha = [System.Security.Cryptography.SHA256]::Create()
try { $digest = $sha.ComputeHash([Text.Encoding]::Unicode.GetBytes($identity.publisher)) }
finally { $sha.Dispose() }
$bits = (($digest[0..7] | ForEach-Object { [Convert]::ToString($_, 2).PadLeft(8, '0') }) -join '') + '0'
$alphabet = '0123456789abcdefghjkmnpqrstvwxyz'
$publisherId = -join (0..12 | ForEach-Object { $alphabet[[Convert]::ToInt32($bits.Substring($_ * 5, 5), 2)] })
if ("$($identity.name)_$publisherId" -cne $identity.packageFamilyName) { throw 'Publisher and package family name do not match.' }

$executable = Join-Path $AppDirectory 'PDF Ignova Pro.exe'
foreach ($required in @($executable, (Join-Path $AppDirectory 'resources/app.asar'),
    (Join-Path $AppDirectory 'resources/app.asar.unpacked/scripts/ocr-windows.ps1'),
    (Join-Path $AppDirectory 'resources/app.asar.unpacked/scripts/convert-office.ps1'))) {
    if (-not (Test-Path -LiteralPath $required -PathType Leaf)) { throw "Missing packaged component: $required" }
}
$exeVersion = [Diagnostics.FileVersionInfo]::GetVersionInfo($executable).ProductVersion
if ($exeVersion -notmatch ('^' + [regex]::Escape($packageJson.version) + '(\D|$)')) {
    throw "Executable version '$exeVersion' does not match source version '$($packageJson.version)'."
}

$sdkBin = Join-Path ${env:ProgramFiles(x86)} 'Windows Kits/10/bin'
$makeAppx = Get-ChildItem -LiteralPath $sdkBin -Directory |
    Where-Object { $_.Name -match '^10\.0\.\d+\.0$' } |
    Sort-Object { [version]$_.Name } -Descending |
    ForEach-Object { Join-Path $_.FullName 'x64/makeappx.exe' } |
    Where-Object { Test-Path -LiteralPath $_ -PathType Leaf } |
    Select-Object -First 1
if (-not $makeAppx) { throw 'MakeAppx.exe was not found. Install the Windows 10/11 SDK.' }

New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
$OutputDirectory = (Resolve-Path -LiteralPath $OutputDirectory).Path
$stage = Join-Path ([IO.Path]::GetTempPath()) ('ignova-msix-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $stage | Out-Null
try {
    $appStage = Join-Path $stage 'app'
    New-Item -ItemType Directory -Path $appStage | Out-Null
    Copy-Item -Path (Join-Path $AppDirectory '*') -Destination $appStage -Recurse -Force
    $assets = Join-Path $stage 'Assets'
    New-Item -ItemType Directory -Path $assets | Out-Null

    # Derive Store assets from the existing application icon; no new branding.
    Add-Type -AssemblyName System.Drawing
    $icon = [Drawing.Image]::FromFile((Join-Path $repoRoot 'source/app/icon-512.png'))
    try {
        foreach ($asset in @(
            @{ Name = 'StoreLogo.png'; Size = 50 },
            @{ Name = 'Square44x44Logo.png'; Size = 44 },
            @{ Name = 'Square150x150Logo.png'; Size = 150 }
        )) {
            $bitmap = New-Object Drawing.Bitmap $asset.Size, $asset.Size
            $graphics = [Drawing.Graphics]::FromImage($bitmap)
            try {
                $graphics.Clear([Drawing.Color]::Transparent)
                $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $graphics.DrawImage($icon, 0, 0, $asset.Size, $asset.Size)
                $bitmap.Save((Join-Path $assets $asset.Name), [Drawing.Imaging.ImageFormat]::Png)
            } finally { $graphics.Dispose(); $bitmap.Dispose() }
        }
    } finally { $icon.Dispose() }

    $name = [Security.SecurityElement]::Escape($identity.name)
    $publisher = [Security.SecurityElement]::Escape($identity.publisher)
    $publisherName = [Security.SecurityElement]::Escape($identity.publisherDisplayName)
    $displayName = [Security.SecurityElement]::Escape($identity.displayName)
    $applicationId = [Security.SecurityElement]::Escape($identity.applicationId)
    $manifest = @"
<?xml version="1.0" encoding="utf-8"?>
<Package xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10"
         xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10"
         xmlns:rescap="http://schemas.microsoft.com/appx/manifest/foundation/windows10/restrictedcapabilities"
         IgnorableNamespaces="uap rescap">
  <Identity Name="$name" Publisher="$publisher" Version="$version" ProcessorArchitecture="x64" />
  <Properties>
    <DisplayName>$displayName</DisplayName>
    <PublisherDisplayName>$publisherName</PublisherDisplayName>
    <Description>Editor PDF de escritorio con herramientas de edicion, conversion e impresion.</Description>
    <Logo>Assets\StoreLogo.png</Logo>
  </Properties>
  <Resources>
    <Resource Language="es-ES" />
    <Resource Language="en-US" />
    <Resource Language="pt-BR" />
    <Resource Language="de-DE" />
    <Resource Language="fr-FR" />
    <Resource Language="zh-CN" />
    <Resource Language="ms-MY" />
  </Resources>
  <Dependencies>
    <TargetDeviceFamily Name="Windows.Desktop" MinVersion="10.0.19041.0" MaxVersionTested="10.0.19041.0" />
  </Dependencies>
  <Applications>
    <Application Id="$applicationId" Executable="app\PDF Ignova Pro.exe" EntryPoint="Windows.FullTrustApplication">
      <uap:VisualElements DisplayName="$displayName" Description="Editor PDF de escritorio"
        Square150x150Logo="Assets\Square150x150Logo.png" Square44x44Logo="Assets\Square44x44Logo.png"
        BackgroundColor="transparent" />
      <Extensions>
        <uap:Extension Category="windows.fileTypeAssociation">
          <uap:FileTypeAssociation Name="ignovapdf">
            <uap:DisplayName>Documento PDF</uap:DisplayName>
            <uap:SupportedFileTypes><uap:FileType>.pdf</uap:FileType></uap:SupportedFileTypes>
          </uap:FileTypeAssociation>
        </uap:Extension>
      </Extensions>
    </Application>
  </Applications>
  <Capabilities><rescap:Capability Name="runFullTrust" /></Capabilities>
</Package>
"@
    $manifestPath = Join-Path $stage 'AppxManifest.xml'
    [IO.File]::WriteAllText($manifestPath, $manifest, [Text.UTF8Encoding]::new($false))
    $fileName = "PDF-IGNOVA-PRO-$version-x64-Store.msix"
    $msix = Join-Path $OutputDirectory $fileName
    # Keep SDK schema and semantic validation enabled (never use /nv).
    & $makeAppx pack /d $stage /p $msix /o
    if ($LASTEXITCODE -ne 0) { throw "MakeAppx packaging failed: $LASTEXITCODE" }
    $unpack = Join-Path $stage 'verified-package'
    & $makeAppx unpack /p $msix /d $unpack /o
    if ($LASTEXITCODE -ne 0) { throw "MakeAppx round-trip verification failed: $LASTEXITCODE" }
    [xml]$verified = Get-Content -LiteralPath (Join-Path $unpack 'AppxManifest.xml') -Raw
    if ($verified.Package.Identity.Name -cne $identity.name -or
        $verified.Package.Identity.Publisher -cne $identity.publisher -or
        $verified.Package.Identity.Version -ne $version) { throw 'MSIX identity mismatch after packaging.' }
    $unpackedExe = Join-Path $unpack 'app/PDF Ignova Pro.exe'
    if ((Get-FileHash $unpackedExe).Hash -ne (Get-FileHash $executable).Hash) { throw 'Executable changed during packaging.' }
    Copy-Item -LiteralPath $manifestPath -Destination (Join-Path $OutputDirectory 'AppxManifest.xml') -Force
    $hash = (Get-FileHash -Algorithm SHA256 $msix).Hash.ToLowerInvariant()
    "$hash  $fileName" | Set-Content -Encoding ascii (Join-Path $OutputDirectory "$fileName.sha256.txt")
    [ordered]@{
        applicationVersion = $packageJson.version
        packageVersion = $version
        identity = $identity
        sourceCommit = $env:GITHUB_SHA
        workflowRun = $env:GITHUB_RUN_ID
        sha256 = $hash
        sdkValidation = 'passed'
        roundTripVerification = 'passed'
        installationAndFunctionalTest = 'pending on Windows 10/11'
        storeCertification = 'pending'
        signed = $false
    } | ConvertTo-Json -Depth 5 | Set-Content -Encoding utf8 (Join-Path $OutputDirectory 'build-info.json')
    Write-Host "MSIX ready for Store upload: $msix"
} finally {
    # Only remove this invocation's uniquely named temporary staging folder.
    Remove-Item -LiteralPath $stage -Recurse -Force
}
