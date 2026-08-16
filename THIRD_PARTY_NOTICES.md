# Third-party components

PDF Ignova Pro 1.9.4 uses Open Source components declared in the committed `package.json` / `package-lock.json` source package. Each component retains its own license.

## Direct application dependencies

| Component | Version | Purpose | License audit status |
|---|---:|---|---|
| Electron | 43.2.0 | Desktop runtime | Open Source; verify packaged notices before release |
| @electron/packager | 20.0.3 | Windows packaging | Open Source; build-time only |
| pdf-lib | 1.17.1 | PDF manipulation | Open Source; verify license text in release notices |
| pdfjs-dist | 5.4.296 | PDF rendering/parsing | Open Source; verify Mozilla/PDF.js notices |
| @signpdf/signpdf | 3.3.0 | PDF digital-signature workflow | Open Source; verify package license |
| @signpdf/signer-p12 | 3.3.0 | P12 signing support | Open Source; verify package license |
| @signpdf/placeholder-pdf-lib | 3.3.0 | PDF signing placeholder | Open Source; verify package license |
| xlsx | 0.18.5 | Spreadsheet conversion/workflows | Open Source package; verify exact license obligations before release |
| docx | 9.5.1 | DOCX generation/workflows | Open Source; verify package license |
| React | 19.2.6 | UI dependency in source/build set | Open Source |
| React DOM | 19.2.6 | UI dependency in source/build set | Open Source |
| esbuild | 0.27.3 | Build tooling | Open Source; build-time |
| lucide-react | 0.468.0 | Icons | Open Source; verify attribution requirements |
| buffer | 6.0.3 | JavaScript compatibility | Open Source |

## Windows / external tools

PowerShell helper scripts may invoke software already installed on the user's Windows system for user-requested conversions. These system/external tools are not presented as proprietary PDF Ignova Pro components and must be documented accurately before the first signed release.

## Release audit requirement

Before submitting the final SignPath Foundation application, verify the exact license metadata and redistribution obligations of every transitive component included in the packaged Electron application, and ensure required license/notice files are shipped with the official build.
