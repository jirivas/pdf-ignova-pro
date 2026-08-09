# SignPath Foundation application draft

Use this text after the public repository contains the complete buildable source and at least one public release.

## Project

**Project name:** PDF Ignova Pro

**Project handle / slug:** `pdf-ignova-pro`

**Repository:** `https://github.com/jirivas/pdf-ignova-pro`

**Homepage / download page:** `<PUBLIC_PROJECT_OR_IGNOVA_URL>`

**License:** GNU GPL v3.0 only (`GPL-3.0-only`)

**Platform:** Windows x64

## Project description

PDF Ignova Pro is an Open Source Windows desktop application for day-to-day PDF document work. It is designed to provide a simple interface for viewing, organizing, editing and processing PDF files, including page operations, annotations, search, printing, watermarks and document-conversion workflows.

The project is maintained as a public Open Source repository. Official Windows binaries are built from the repository using GitHub Actions on GitHub-hosted runners.

## Why code signing is requested

We would like to use SignPath Foundation code signing so that users can verify the provenance and integrity of official Windows releases.

Our objective is to ensure that published PDF Ignova Pro installers are verifiably built from the corresponding public source revision and have not been modified after the official build.

## Build and release process

- Source repository: public GitHub repository.
- Build system: GitHub Actions.
- Build agents: GitHub-hosted Windows runners.
- Release source: tagged source revisions.
- Signing requests: submitted only by the official release workflow.
- Approval: manual approval by the designated project approver when required.
- Published artifacts: signed Windows application and installer.
- Verification: signed artifacts are checked before GitHub Release publication.

## Maintainers and roles

- Committer / author: `jirivas`
- Reviewer: `jirivas`
- Signing approver: `jirivas`

All maintainers with privileged access use multi-factor authentication.

## Privacy

PDF Ignova Pro is intended to process PDF documents locally.

The project privacy policy is published in `PRIVACY.md`. The software does not transfer information to networked systems unless a user explicitly requests a documented network-enabled function.

## Third-party components

All shipped third-party components must be Open Source and listed with their licenses and provenance in `THIRD_PARTY_NOTICES.md` before submission.

No proprietary project component may be included in the free SignPath Foundation signing scope.

## Existing release

Current release candidate: **1.9.1**.

Before submitting this application, publish a GitHub release produced by the public build pipeline. Do not use the current locally built 1.9.1 installer as evidence of reproducible origin.

## Code signing policy

The repository publishes a dedicated `CODE_SIGNING_POLICY.md` page containing the required SignPath attribution, project roles and privacy statement.
