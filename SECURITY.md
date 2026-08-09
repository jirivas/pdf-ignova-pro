# Security policy

## Supported releases

Security fixes are applied to the latest official release.

## Reporting a vulnerability

Do not publish credentials, private keys, API tokens, personal documents, or exploit details in a public issue.

Until a dedicated security mailbox is created, use GitHub private vulnerability reporting if enabled for the repository.

## Release integrity

- GitHub multi-factor authentication is required for maintainers.
- Release builds must run on GitHub-hosted runners.
- Signing credentials/tokens must be stored as GitHub Actions secrets.
- SignPath signing must be requested only from the official release workflow.
- A signed release must be verified before publication.
