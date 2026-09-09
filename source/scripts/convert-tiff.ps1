param(
  [Parameter(Mandatory = $true)][string]$InputPath,
  [Parameter(Mandatory = $true)][string]$OutputDir
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing
$image = [System.Drawing.Image]::FromFile($InputPath)
$dimension = New-Object System.Drawing.Imaging.FrameDimension($image.FrameDimensionsList[0])
$count = $image.GetFrameCount($dimension)
$files = @()

try {
  for ($index = 0; $index -lt $count; $index++) {
    [void]$image.SelectActiveFrame($dimension, $index)
    $output = Join-Path $OutputDir ("pagina_{0:D5}.png" -f $index)
    $bitmap = New-Object System.Drawing.Bitmap($image.Width, $image.Height)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try { $graphics.DrawImage($image, 0, 0, $image.Width, $image.Height) }
      finally { $graphics.Dispose() }
      $bitmap.Save($output, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally { $bitmap.Dispose() }
    $files += $output
  }
}
finally { $image.Dispose() }

$files | ConvertTo-Json -Compress
