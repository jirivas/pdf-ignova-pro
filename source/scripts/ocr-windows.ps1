param(
    [Parameter(Mandatory=$true)][string]$InputPath
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Console]::OutputEncoding = New-Object System.Text.UTF8Encoding($false)
$OutputEncoding = [Console]::OutputEncoding

function Await-WinRT($Operation, $ResultType) {
    $asTask = [System.WindowsRuntimeSystemExtensions].GetMethods() |
        Where-Object {
            $_.Name -eq 'AsTask' -and
            $_.IsGenericMethod -and
            $_.GetParameters().Count -eq 1 -and
            $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
        } |
        Select-Object -First 1
    if ($null -eq $asTask) { throw "Windows no expone el método necesario para ejecutar el OCR" }
    $task = $asTask.MakeGenericMethod($ResultType).Invoke($null, @($Operation))
    return $task.GetAwaiter().GetResult()
}

[Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapPixelFormat, Windows.Graphics.Imaging, ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapAlphaMode, Windows.Graphics.Imaging, ContentType=WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType=WindowsRuntime] | Out-Null
[Windows.Globalization.Language, Windows.Globalization, ContentType=WindowsRuntime] | Out-Null

$stream = $null
$bitmap = $null
try {
    $file = Await-WinRT ([Windows.Storage.StorageFile]::GetFileFromPathAsync((Resolve-Path $InputPath).Path)) ([Windows.Storage.StorageFile])
    # StorageFile.OpenAsync(FileAccessMode) returns IRandomAccessStream.  Passing
    # IRandomAccessStreamWithContentType here makes PowerShell construct the
    # wrong generic IAsyncOperation<T> and reject the WinRT COM object before
    # OCR starts.
    $stream = Await-WinRT ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
    $decoder = Await-WinRT ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
    $bitmap = Await-WinRT ($decoder.GetSoftwareBitmapAsync(
        [Windows.Graphics.Imaging.BitmapPixelFormat]::Bgra8,
        [Windows.Graphics.Imaging.BitmapAlphaMode]::Premultiplied
    )) ([Windows.Graphics.Imaging.SoftwareBitmap])

    $engine = $null
    try {
        $spanish = [Windows.Globalization.Language]::new("es-ES")
        $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($spanish)
    } catch {
        $engine = $null
    }
    if ($null -eq $engine) {
        $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
    }
    if ($null -eq $engine) { throw "Instala en Windows el reconocimiento óptico de caracteres del idioma Español" }

    $result = Await-WinRT ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
    $lines = @()
    foreach ($line in $result.Lines) {
        $words = @()
        foreach ($word in $line.Words) {
            $r = $word.BoundingRect
            $words += [ordered]@{
                text = $word.Text
                x = [double]$r.X
                y = [double]$r.Y
                width = [double]$r.Width
                height = [double]$r.Height
            }
        }
        $lines += [ordered]@{ text = $line.Text; words = @($words) }
    }

    [ordered]@{
        text = $result.Text
        lines = @($lines)
        width = [double]$bitmap.PixelWidth
        height = [double]$bitmap.PixelHeight
        language = $engine.RecognizerLanguage.LanguageTag
    } | ConvertTo-Json -Depth 8 -Compress
} finally {
    if ($null -ne $bitmap) { $bitmap.Dispose() }
    if ($null -ne $stream) { $stream.Dispose() }
}
