# Code signing policy

Free code signing provided by SignPath.io, certificate by SignPath Foundation.

## Repository

`https://github.com/jirivas/pdf-ignova-pro`

## Team roles

- **Committer / author:** `jirivas`
- **Reviewer:** `jirivas`
- **Approver:** `jirivas`

All maintainers with repository or SignPath access must use multi-factor authentication.

## Release signing

Official PDF Ignova Pro Windows releases must:

1. originate from this public repository;
2. be built by GitHub Actions using GitHub-hosted runners;
3. use build configuration and scripts stored in this repository;
4. install dependencies from the committed lock file;
5. run the repository test suite before packaging;
6. be uploaded as a GitHub Actions artifact before submission to SignPath;
7. require manual approval for release signing when required by SignPath Foundation;
8. use consistent product name and version metadata;
9. be verified after signing before publication.

Locally compiled or manually modified executables must not be published as SignPath-signed official releases.

## Privacy policy

See [`PRIVACY.md`](PRIVACY.md).

PDF Ignova Pro is intended to process PDF documents locally. This program will not transfer information to other networked systems unless specifically requested by the user or the person installing or operating it.

## Support reminder

The official build may display a voluntary support reminder after the first 30 days and thereafter at most once every 30 days. The program remains fully functional without a support license, and the support mechanism does not restrict rights granted by the GNU GPL.

## Scope

This signing policy applies only to official PDF Ignova Pro artifacts produced from this repository. Third-party Open Source components may be included only when their licenses permit redistribution and their provenance is documented.
