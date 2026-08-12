# PDF Ignova Pro

PDF Ignova Pro is an Open Source Windows desktop application for professional PDF workflows through a simple, productivity-focused interface.

## Current public release

**1.9.2** is the current public Open Source test release and is available from GitHub Releases as a Windows x64 build produced by GitHub Actions.

The 1.9.2 source passes the project smoke tests and uses a voluntary support reminder **at most once every 30 days**, after the first 30 days of use. No feature is disabled if the user does not activate a support license.

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

Official Windows binaries are produced from this public repository by GitHub Actions on GitHub-hosted Windows runners. The build installs dependencies from `package-lock.json`, executes the test suite and packages the x64 Electron application.

The current public test build is **not digitally signed**. An application to the free SignPath Foundation program was reviewed but was not approved at this early stage because the project does not yet have enough independent public adoption/visibility. We intend to reapply after the project has accumulated verifiable community usage and participation.

## Support license

PDF Ignova Pro remains fully functional without payment. The official distribution may offer an optional, permanent support license that suppresses the monthly support reminder and helps fund continued development and official distribution. This support license does not replace or restrict the rights granted by the GPL.

## Code signing policy

See [`CODE_SIGNING_POLICY.md`](CODE_SIGNING_POLICY.md).

## Privacy and security

See `PRIVACY.md` and `SECURITY.md`.
