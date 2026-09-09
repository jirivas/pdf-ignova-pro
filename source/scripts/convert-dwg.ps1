param(
  [Parameter(Mandatory = $true)][string]$InputPath,
  [Parameter(Mandatory = $true)][string]$OutputPath
)

$ErrorActionPreference = "Stop"
$application = $null
$document = $null

try {
  try { $application = New-Object -ComObject AutoCAD.Application }
  catch { throw "Para convertir DWG/DXF es necesario tener AutoCAD instalado." }

  $application.Visible = $false
  $document = $application.Documents.Open($InputPath, $true)
  $layout = $document.ActiveLayout
  try { $layout.ConfigName = "DWG To PDF.pc3" } catch {}
  $document.SetVariable("BACKGROUNDPLOT", 0)
  $ok = $document.Plot.PlotToFile($OutputPath)
  if (-not $ok) { throw "AutoCAD no pudo trazar el dibujo con la presentación activa." }
}
finally {
  if ($document -ne $null) {
    try { $document.Close($false) } catch {}
    [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($document)
  }
  if ($application -ne $null) {
    try { $application.Quit() } catch {}
    [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($application)
  }
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}
