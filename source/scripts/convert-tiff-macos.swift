import AppKit
import Foundation
import ImageIO

func fail(_ message: String) -> Never {
    FileHandle.standardError.write(Data((message + "\n").utf8))
    exit(1)
}

guard CommandLine.arguments.count == 3 else {
    fail("Uso: convert-tiff-macos <imagen.tif> <directorio-salida>")
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2], isDirectory: true)
try? FileManager.default.createDirectory(
    at: outputURL,
    withIntermediateDirectories: true
)

guard let source = CGImageSourceCreateWithURL(inputURL as CFURL, nil) else {
    fail("macOS no pudo leer la imagen TIFF")
}

let pageCount = CGImageSourceGetCount(source)
guard pageCount > 0 else {
    fail("La imagen TIFF no contiene páginas")
}

var outputPaths: [String] = []
for index in 0..<pageCount {
    guard let image = CGImageSourceCreateImageAtIndex(source, index, nil) else {
        fail("No se pudo leer la página \(index + 1) del TIFF")
    }
    let bitmap = NSBitmapImageRep(cgImage: image)
    guard let png = bitmap.representation(using: .png, properties: [:]) else {
        fail("No se pudo convertir la página \(index + 1) a PNG")
    }
    let fileURL = outputURL.appendingPathComponent(
        String(format: "pagina-%04d.png", index + 1)
    )
    do {
        try png.write(to: fileURL, options: .atomic)
    } catch {
        fail("No se pudo guardar la página \(index + 1): \(error.localizedDescription)")
    }
    outputPaths.append(fileURL.path)
}

do {
    FileHandle.standardOutput.write(try JSONEncoder().encode(outputPaths))
    FileHandle.standardOutput.write(Data("\n".utf8))
} catch {
    fail("No se pudo generar la respuesta TIFF: \(error.localizedDescription)")
}
