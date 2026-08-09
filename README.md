# PDF Ignova Pro

PDF Ignova Pro is an Open Source Windows desktop application for professional PDF workflows through a simple, productivity-focused interface.

## Current public release

**1.9.2** is the current public Open Source release and is available from GitHub Releases as a Windows x64 build produced by GitHub Actions.

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

The current unsigned public build establishes the release format that will be submitted through SignPath once the project is approved by SignPath Foundation.

## Code signing policy

See [`CODE_SIGNING_POLICY.md`](CODE_SIGNING_POLICY.md).

Free code signing provided by [SignPath.io](https://signpath.io/), certificate by [SignPath Foundation](https://signpath.org/).

## Privacy and security

See `PRIVACY.md` and `SECURITY.md`.
