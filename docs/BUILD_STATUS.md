# Build status — PDF Ignova Pro 1.9.4

## Current state

- Public source package committed to `main`.
- Source package version: 1.9.4.
- License: GPL-3.0-or-later.
- Support reminder: no reminder during the first 30 days; afterwards at most once every 30 days.
- Local smoke/syntax tests pass with Node.js 22.
- GitHub Actions workflow is configured to extract the committed source package, run `npm ci`, execute the test suite, package the Windows x64 application and upload the unsigned artifact.

## Before SignPath submission

1. Confirm the GitHub Actions Windows build completes successfully.
2. Publish a public 1.9.4 release in the same form intended for signing.
3. Finish the transitive third-party license/notice audit.
4. Enable MFA for all privileged GitHub/SignPath accounts.
5. Submit the SignPath Foundation application.
6. After approval, add the SignPath signing-request action and manual release approval.

## Signing principle

Only artifacts produced by the public GitHub Actions workflow are eligible to become official SignPath-signed PDF Ignova Pro releases. Locally built or manually modified executables are not to be submitted as official signed releases.
