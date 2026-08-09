# SignPath Foundation application draft

Submit this text after the complete 1.9.2 buildable source tree is present in the public repository and a GitHub Actions build has completed successfully.

## Project

**Project name:** PDF Ignova Pro

**Project handle / slug:** `pdf-ignova-pro`

**Repository:** `https://github.com/jirivas/pdf-ignova-pro`

**License:** GNU GPL version 3 or later (`GPL-3.0-or-later`)

**Platform:** Windows x64

## Project description

PDF Ignova Pro is an Open Source Windows desktop application for viewing, organizing, editing and processing PDF documents. Its workflows include page operations, annotations, full-document search with result navigation, printing, watermarks and document conversion.

The project is maintained in a public GitHub repository. Official Windows artifacts are produced from the public source by GitHub Actions using GitHub-hosted Windows runners.

## Why code signing is requested

We request SignPath Foundation code signing so that Windows users can verify the provenance and integrity of official PDF Ignova Pro releases.

Our objective is to ensure that signed artifacts originate from the corresponding public source revision and are not manually modified after the trusted build.

## Build and release process

- Source repository: public GitHub repository.
- Build system: GitHub Actions.
- Build agents: GitHub-hosted Windows runners.
- Release source: tagged source revisions.
- Dependency installation: `npm ci` using the committed lock file.
- Validation: project smoke tests run before packaging.
- Packaging: Windows x64 Electron application.
- Signing requests: submitted only by the official release workflow after SignPath onboarding.
- Approval: manual approval by the designated project approver when required.
- Verification: signed artifacts are verified before publication.

## Maintainers and roles

- Committer / author: `jirivas`
- Reviewer: `jirivas`
- Signing approver: `jirivas`

Privileged accounts must use multi-factor authentication.

## Privacy

PDF Ignova Pro is designed primarily for local processing of PDF documents. Network-enabled behavior must be documented in `PRIVACY.md` before a release is submitted for signing.

## Support model

The application remains fully functional without payment. After the first 30 days it may show a voluntary support reminder at most once every 30 days. Activating a support license removes that reminder but does not restrict or replace the rights granted by the GPL.

## Third-party components

Third-party components retain their respective Open Source licenses and must be documented before submission. No proprietary project component is intended to be included in the SignPath Foundation signing scope.

## Current release candidate

The source reconstruction prepared for the trusted-build process is **1.9.2**. It supersedes the locally built 1.9.1 installer for purposes of the SignPath application.

## Code signing policy

The repository publishes `CODE_SIGNING_POLICY.md` containing the project signing policy, attribution and release controls.
