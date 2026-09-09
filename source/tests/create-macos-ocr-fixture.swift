import AppKit
import Foundation

guard CommandLine.arguments.count == 2 else {
    FileHandle.standardError.write(Data("Uso: create-macos-ocr-fixture <salida.png>\n".utf8))
    exit(1)
}

let size = NSSize(width: 1600, height: 320)
let image = NSImage(size: size)
image.lockFocus()
NSColor.white.setFill()
NSRect(origin: .zero, size: size).fill()
let attributes: [NSAttributedString.Key: Any] = [
    .font: NSFont.systemFont(ofSize: 64, weight: .regular),
    .foregroundColor: NSColor.black,
]
("PRUEBA OCR PDF IGNOVA 198" as NSString).draw(
    at: NSPoint(x: 40, y: 105),
    withAttributes: attributes
)
image.unlockFocus()

guard
    let tiff = image.tiffRepresentation,
    let bitmap = NSBitmapImageRep(data: tiff),
    let png = bitmap.representation(using: .png, properties: [:])
else {
    FileHandle.standardError.write(Data("No se pudo crear la imagen de prueba\n".utf8))
    exit(1)
}

do {
    try png.write(to: URL(fileURLWithPath: CommandLine.arguments[1]), options: .atomic)
} catch {
    FileHandle.standardError.write(Data((error.localizedDescription + "\n").utf8))
    exit(1)
}
