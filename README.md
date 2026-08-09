# PDF Ignova Pro

PDF Ignova Pro is an Open Source Windows desktop application for professional PDF workflows through a simple, productivity-focused interface.

## Current development release

**1.9.2** is the SignPath-ready reconstruction branch derived from the complete GPL source package embedded in the 1.9.1 installer.

The 1.9.2 source passes the project smoke tests and changes the voluntary support reminder to **at most once every 30 days**, after the first 30 days of use. No feature is disabled if the user does not activate a support license.

## Main functions

- Opening and viewing PDF documents
- Page organization and manipulation
- Text and annotation tools
- Search across all document pages with previous/next navigation
- Printing
- Watermarks
- PDF conversion workflows
- OCR-related workflows where supported by the included Open Source components

## License

The project's own code is distributed under **GNU GPL-3.0-or-later**. Third-party components keep their respective licenses.

The source-code license does not grant permission to present modified or third-party builds as official IGNOVA releases. See `TRADEMARK.md`.

## Builds

Official Windows binaries are intended to be produced from this public repository by GitHub Actions on GitHub-hosted Windows runners. The build installs dependencies from `package-lock.json`, executes the test suite and packages the x64 Electron application.

The SignPath integration will be enabled after the public source tree and first GitHub Actions artifact have been verified.

## Code signing

See `CODE_SIGNING_POLICY.md` and `docs/SIGNPATH_APPLICATION.md`.

## Privacy and security

See `PRIVACY.md` and `SECURITY.md`.
