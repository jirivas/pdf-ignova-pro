# PDF Ignova Pro

PDF Ignova Pro is a Windows desktop application for working with PDF documents through a simple, productivity-focused interface.

## Project status

The project is being prepared for public Open Source distribution and reproducible Windows builds.

Current release candidate: **1.9.1**

> Important: the source code that produces the Windows release must be placed in this repository before requesting SignPath Foundation signing. The existing prebuilt installer is not sufficient for origin verification.

## Main functions

PDF Ignova Pro is intended to provide common professional PDF workflows, including:

- Opening and viewing PDF documents
- Page organization and manipulation
- Text and annotation tools
- Search across document pages
- Printing
- Watermarks
- PDF conversion workflows
- OCR-related workflows where supported by the included Open Source components

The exact list must match the public 1.9.1 source before the SignPath application is submitted.

## License

This project is intended to be released under **GNU GPL-3.0-only**.

See `LICENSE` and `THIRD_PARTY_NOTICES.md`.

Commercial sale of official builds is compatible with GPL, but the Open Source edition itself may not be placed under a separate proprietary/commercial dual license if the project is to use the free SignPath Foundation program.

## Brand

The source code license does not grant rights to use the **IGNOVA**, **PDF Ignova Pro**, logos, or related branding to imply that modified or third-party builds are official.

See `TRADEMARK.md`.

## Code signing policy

See [Code signing policy](CODE_SIGNING_POLICY.md).

## Privacy

See [Privacy policy](PRIVACY.md).

## Security

See [Security policy](SECURITY.md).

## Builds

Official Windows binaries must be produced by the repository's GitHub Actions workflow from the corresponding public source revision.

The build pipeline is intentionally left in a safe placeholder state until the actual 1.9.1 source tree and build commands are added.

## Official releases

Official releases will be published from the project repository after:

1. the source tree is complete;
2. third-party licenses are audited;
3. a GitHub-hosted Windows build reproduces the application;
4. SignPath Foundation onboarding is approved;
5. the release artifact is signed and verified.
