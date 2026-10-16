# PDF Ignova Pro

PDF Ignova Pro is an Open Source Windows and macOS desktop application for professional PDF workflows through a simple, productivity-focused interface.

## Current public release

**1.9.10** is the current public Open Source test release. GitHub Actions produces separate Windows x64 and universal macOS builds from the same source.

The 1.9.10 source passes the project smoke tests and functional OCR tests on Windows and macOS. It uses a voluntary support reminder **at most once every 30 days**, after the first 30 days of use. No feature is disabled if the user does not activate a support license.

## Main functions

- Opening and viewing PDF documents
- Page organization and manipulation
- Creation of a new blank A4 PDF for building documents from pasted or added pages
- Text and annotation tools with fixed-position multiline text, persistent font and text colour
- Continuous selection of native PDF text, with copy from the context menu, Edit menu or Ctrl+C/Command+C
- Detection of visible and embedded web/email links, with a choice to open the destination or edit its text
- Horizontal all-pages overview at minimum zoom, followed by fit-page, fit-width and progressive zoom levels up to 500%
- Editable page number for direct navigation
- Dual-document organizer for moving or copying pages by drag and drop
- Reliable native Save As dialog with safe file replacement
- Unified colour-selectable cover tool and contrast-preserving highlights
- Search across all document pages with previous/next navigation
- Region OCR for recognising only a selected part of a page
- Interface languages: Spanish, English, Portuguese, German, French, Simplified Chinese and Malay
- Printing and PDF export with A4, A3, A2 and A1 paper sizes
- Watermarks
- PDF conversion workflows
- Local OCR through Windows OCR or macOS Vision
- OCR and conversion helpers correctly unpacked from Electron ASAR builds
- Windows installer with Start menu/desktop shortcuts and standard uninstallation
- Universal macOS DMG for Apple Silicon and Intel

## Download

Use the official website downloads: [Windows installer](https://ignova-tech.jirivasnegreira.chatgpt.site/download) or [universal macOS installer](https://ignova-tech.jirivasnegreira.chatgpt.site/download/mac). A Windows portable ZIP remains available from the release page as a secondary option.

## License

The project's own code is distributed under **GNU GPL-3.0-or-later**. Third-party components keep their respective licenses.

The source-code license does not grant permission to present modified or third-party builds as official IGNOVA releases. See `TRADEMARK.md`.

## Source code

The complete, browsable application source is in [`source/`](source/), including the Electron application, interface, OCR and conversion helpers, tests, Windows installer definition and macOS files.

The official Windows and macOS workflows build directly from this visible directory. [`PDF_Ignova_Pro_1.9.10_Codigo_Fuente_GPLv3.zip`](PDF_Ignova_Pro_1.9.10_Codigo_Fuente_GPLv3.zip) is retained only as a convenient downloadable snapshot of the same 1.9.10 source.

To run the cross-platform source checks locally:

```sh
cd source
npm ci
npm test
```

## Builds

Official binaries are produced from this public repository by GitHub Actions. The Windows workflow performs real OCR with Windows PowerShell 5.1, builds the x64 installer and verifies installation and uninstallation. After it succeeds, the macOS workflow compiles universal Swift helpers, performs real OCR with Vision, packages Apple Silicon and Intel slices in one application, verifies the bundle and creates the DMG.

The Windows test build is **not digitally signed**. The macOS build is ad-hoc signed for bundle integrity but is not Apple-notarized, so both systems may display a first-run warning. An application to the free SignPath Foundation program was reviewed but was not approved at this early stage because the project does not yet have enough independent public adoption/visibility. We intend to reapply after the project has accumulated verifiable community usage and participation.

## Support license

PDF Ignova Pro remains fully functional without payment. The official distribution may offer an optional, permanent support license that suppresses the monthly support reminder and helps fund continued development and official distribution. This support license does not replace or restrict the rights granted by the GPL.

## Code signing policy

See [`CODE_SIGNING_POLICY.md`](CODE_SIGNING_POLICY.md).

## Privacy and security

See `PRIVACY.md` and `SECURITY.md`.
