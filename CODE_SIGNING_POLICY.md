# Code signing policy

PDF Ignova Pro uses a controlled release process intended to ensure that official Windows binaries are built from the public source repository.

Free code signing provided by [SignPath.io](https://signpath.io/), certificate by [SignPath Foundation](https://signpath.org/).

## Repository

Repository URL:

`https://github.com/jirivas/pdf-ignova-pro`

## Roles

Until additional maintainers are added:

- **Committer / author:** Project maintainer
- **Reviewer:** Project maintainer
- **Approver:** Project maintainer

When more contributors obtain write access, list them explicitly here and require review of changes from non-committers.

All maintainers with repository or SignPath access must use multi-factor authentication.

## Release signing

Official release binaries must:

1. be built by GitHub Actions using GitHub-hosted runners;
2. originate from the public repository;
3. use the release workflow committed to the repository;
4. be manually approved for signing where required by SignPath Foundation;
5. carry consistent product/version metadata;
6. be verified after signing before publication.

No locally compiled or manually modified executable may be published as a SignPath-signed official release.

## Privacy statement

This program will not transfer information to other networked systems unless specifically requested by the user or required by a clearly documented user-initiated feature.

Any network-enabled function added later must be documented in `PRIVACY.md` before release.

## Scope

The signing policy applies only to official PDF Ignova Pro artifacts built from this repository.

Third-party upstream Open Source binaries may be included only when their licenses permit redistribution and their provenance is documented.
