#!/bin/bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
temporary_dir="$(mktemp -d "${TMPDIR:-/tmp}/pdf-ignova-macos.XXXXXX")"
trap 'rm -rf "$temporary_dir"' EXIT

for helper in ocr-macos convert-tiff-macos; do
  xcrun --sdk macosx swiftc -O \
    -target x86_64-apple-macos12.0 \
    "$script_dir/$helper.swift" \
    -o "$temporary_dir/$helper-x86_64"
  xcrun --sdk macosx swiftc -O \
    -target arm64-apple-macos12.0 \
    "$script_dir/$helper.swift" \
    -o "$temporary_dir/$helper-arm64"
  xcrun lipo -create \
    "$temporary_dir/$helper-x86_64" \
    "$temporary_dir/$helper-arm64" \
    -output "$script_dir/$helper"
  chmod 0755 "$script_dir/$helper"
done

echo "Auxiliares universales de macOS compilados correctamente."
