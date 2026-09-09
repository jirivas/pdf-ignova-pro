param(
  [Parameter(Mandatory = $true)][string]$InputPath,
  [Parameter(Mandatory = $true)][string]$OutputPath
)

$ErrorActionPreference = "Stop"
$extension = [System.IO.Path]::GetExtension($InputPath).ToLowerInvariant()
$application = $null
$document = $null

try {
  if ($extension -in @(".doc", ".docx", ".odt")) {
    $application = New-Object -ComObject Word.Application
    $application.Visible = $false
    $application.DisplayAlerts = 0
    $document = $application.Documents.Open($InputPath, $false, $true)
    $document.ExportAsFixedFormat($OutputPath, 17)
  }
  elseif ($extension -in @(".xls", ".xlsx", ".ods")) {
    $application = New-Object -ComObject Excel.Application
    $application.Visible = $false
    $application.DisplayAlerts = $false
    $document = $application.Workbooks.Open($InputPath, 0, $true)
    $document.ExportAsFixedFormat(0, $OutputPath)
  }
  elseif ($extension -in @(".ppt", ".pptx", ".odp")) {
    $application = New-Object -ComObject PowerPoint.Application
    $document = $application.Presentations.Open($InputPath, $true, $false, $false)
    $document.SaveAs($OutputPath, 32)
  }
  else {
    throw "Formato de Office no reconocido: $extension"
  }
}
finally {
  if ($document -ne $null) {
    try {
      if ($extension -in @(".ppt", ".pptx", ".odp")) { $document.Close() }
      else { $document.Close($false) }
    } catch {}
    [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($document)
  }
  if ($application -ne $null) {
    try { $application.Quit() } catch {}
    [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($application)
  }
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}
