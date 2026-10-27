# Build status — PDF Ignova Pro 1.9.17

## Current state

- Public source package committed to `main`.
- Source package version: 1.9.17.
- License: GPL-3.0-or-later.
- Support reminder: no reminder during the first 30 days; afterwards at most once every 30 days.
- Local smoke/syntax tests pass with Node.js 22.
- GitHub Actions workflows extract the committed source package, run `npm ci`, execute the test suite, package Windows x64 and universal macOS applications, and upload the release artifacts.

## Before SignPath submission

1. Confirm the GitHub Actions Windows and macOS builds complete successfully.
2. Publish a public 1.9.17 release in the same form intended for signing.
3. Finish the transitive third-party license/notice audit.
4. Enable MFA for all privileged GitHub/SignPath accounts.
5. Submit the SignPath Foundation application.
6. After approval, add the SignPath signing-request action and manual release approval.

## Signing principle

Only artifacts produced by the public GitHub Actions workflow are eligible to become official SignPath-signed PDF Ignova Pro releases. Locally built or manually modified executables are not to be submitted as official signed releases.
