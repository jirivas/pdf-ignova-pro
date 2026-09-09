import AppKit
import Foundation
import ImageIO
import Vision

struct OCRWord: Codable {
    let text: String
    let x: Double
    let y: Double
    let width: Double
    let height: Double
}

struct OCRLine: Codable {
    let text: String
    let words: [OCRWord]
}

struct OCRResult: Codable {
    let text: String
    let lines: [OCRLine]
    let width: Double
    let height: Double
    let language: String
}

func fail(_ message: String) -> Never {
    FileHandle.standardError.write(Data((message + "\n").utf8))
    exit(1)
}

guard CommandLine.arguments.count == 2 else {
    fail("Uso: ocr-macos <imagen>")
}

let imageURL = URL(fileURLWithPath: CommandLine.arguments[1])
guard
    let source = CGImageSourceCreateWithURL(imageURL as CFURL, nil),
    let image = CGImageSourceCreateImageAtIndex(source, 0, nil)
else {
    fail("macOS no pudo leer la imagen para OCR")
}

let request = VNRecognizeTextRequest()
request.recognitionLevel = .accurate
request.usesLanguageCorrection = true

let preferredLanguages = [
    "es-ES", "en-US", "pt-PT", "de-DE", "fr-FR", "zh-Hans", "ms-MY",
]
do {
    let supported = try VNRecognizeTextRequest.supportedRecognitionLanguages(
        for: .accurate,
        revision: request.revision
    )
    let selected = preferredLanguages.filter { supported.contains($0) }
    if !selected.isEmpty {
        request.recognitionLanguages = selected
    }
} catch {
    // Vision utilizará los idiomas disponibles del sistema.
}

if #available(macOS 13.0, *) {
    request.automaticallyDetectsLanguage = true
}

do {
    try VNImageRequestHandler(cgImage: image, orientation: .up).perform([request])
} catch {
    fail("Vision no pudo realizar el OCR: \(error.localizedDescription)")
}

let pixelWidth = Double(image.width)
let pixelHeight = Double(image.height)
let observations = (request.results ?? []).sorted { left, right in
    let verticalDistance = abs(left.boundingBox.midY - right.boundingBox.midY)
    if verticalDistance > 0.015 {
        return left.boundingBox.maxY > right.boundingBox.maxY
    }
    return left.boundingBox.minX < right.boundingBox.minX
}

let lines: [OCRLine] = observations.compactMap { observation in
    guard let candidate = observation.topCandidates(1).first else { return nil }
    let text = candidate.string.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !text.isEmpty else { return nil }
    let box = observation.boundingBox
    let word = OCRWord(
        text: text,
        x: box.minX * pixelWidth,
        y: (1.0 - box.maxY) * pixelHeight,
        width: box.width * pixelWidth,
        height: box.height * pixelHeight
    )
    return OCRLine(text: text, words: [word])
}

let result = OCRResult(
    text: lines.map(\.text).joined(separator: "\n"),
    lines: lines,
    width: pixelWidth,
    height: pixelHeight,
    language: request.recognitionLanguages.first ?? Locale.current.identifier
)

do {
    let encoder = JSONEncoder()
    encoder.outputFormatting = [.withoutEscapingSlashes]
    FileHandle.standardOutput.write(try encoder.encode(result))
    FileHandle.standardOutput.write(Data("\n".utf8))
} catch {
    fail("No se pudo generar la respuesta OCR: \(error.localizedDescription)")
}
