# PDF IGNOVA PRO — Microsoft Store

This workflow creates an unsigned MSIX for the product already reserved in Partner Center. Microsoft re-signs MSIX packages after certification; this is not a SignPath-signed release and not a locally installable signed installer.

## Identity

The values in `store-identity.json` were transcribed from the owner's Partner Center product identity. The script independently verifies the publisher hash against the package family name. The Store publisher display name is `IGNOVA`.

## Build

On Windows with Node.js 22 and the Windows 10/11 SDK:

```powershell
cd source
npm ci
npm test
npm run package:windows
cd ..
./packaging/msix/build-msix.ps1
```

The GitHub Actions workflow **Build Microsoft Store MSIX** performs the same build on a hosted Windows runner. It uploads the `.msix`, SHA-256 checksum, generated manifest and `build-info.json`. It does not submit or publish the application.

## Upload in Partner Center

1. Open the existing **PDF IGNOVA PRO** application and select **Iniciar envio**.
2. In **Paquetes**, upload `PDF-IGNOVA-PRO-1.9.8.0-x64-Store.msix` from the workflow artifact. Do not upload the artifact ZIP or the EXE installer.
3. Complete pricing, availability, age rating, privacy policy, descriptions and actual application screenshots.
4. Explain `runFullTrust`: this is a desktop Electron PDF editor that accesses user-selected local files, prints through Windows and launches its bundled OCR/conversion helper scripts. It does not require administrator rights to operate.
5. Check the validation results and perform a Windows 10/11 installation and functional test before requesting certification. SDK packaging validation does not prove runtime compatibility or Store acceptance.

Functional checks still needed: launch from Start, open/save a PDF including a path with spaces, PDF file association, text editing, OCR, printing, optional Office conversion on a PC with Office, persistence of settings, and removal through Windows Settings. The build report records these as pending.

The Store package uses version `1.9.8.0`, x64, Windows Desktop 10.0.19041 or later. Future package contents must use a new package version; the fourth version component remains zero for Store submission. Runtime data is written through Electron's user-data and temporary directories, outside the read-only package directory.

References:

- https://learn.microsoft.com/en-us/windows/msix/desktop/desktop-to-uwp-manual-conversion
- https://learn.microsoft.com/en-us/windows/apps/publish/publish-your-app/msix/app-package-requirements
- https://learn.microsoft.com/en-us/windows/msix/package/create-app-package-with-makeappx-tool
