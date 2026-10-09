#define MyAppName "PDF Ignova Pro"
#define MyAppVersion "1.9.9"
#define MyAppPublisher "IGNOVA Ingeniería"
#define MyAppExeName "PDF Ignova Pro.exe"

[Setup]
AppId={{A8B8EDBB-3BE4-4D1A-940A-34D47162EBD4}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL=https://ignova-tech.jirivasnegreira.chatgpt.site/
AppSupportURL=https://github.com/jirivas/pdf-ignova-pro/issues
AppUpdatesURL=https://github.com/jirivas/pdf-ignova-pro/releases
DefaultDirName={localappdata}\Programs\{#MyAppName}
DefaultGroupName={#MyAppName}
DisableProgramGroupPage=yes
PrivilegesRequired=lowest
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
OutputDir=..\release-installer
OutputBaseFilename=PDF-Ignova-Pro-1.9.9-Setup-Windows-x64-unsigned
SetupIconFile=..\app\icon.ico
Uninstallable=yes
UninstallDisplayName={#MyAppName} {#MyAppVersion}
UninstallDisplayIcon={app}\{#MyAppExeName}
Compression=lzma2/max
SolidCompression=yes
WizardStyle=modern
ChangesAssociations=yes
CloseApplications=yes
RestartApplications=no
VersionInfoCompany={#MyAppPublisher}
VersionInfoDescription=Instalador de {#MyAppName}
VersionInfoProductName={#MyAppName}
VersionInfoProductVersion=1.9.9.0
VersionInfoVersion=1.9.9.0

[Languages]
Name: "spanish"; MessagesFile: "compiler:Languages\Spanish.isl"
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "Crear un acceso directo en el escritorio"; GroupDescription: "Accesos directos:"

[Files]
Source: "..\release\PDF Ignova Pro-win32-x64\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{group}\Desinstalar {#MyAppName}"; Filename: "{uninstallexe}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Registry]
Root: HKCU; Subkey: "Software\Classes\.pdf\OpenWithProgids"; ValueType: none; ValueName: "PDFIgnovaPro.Document"; Flags: uninsdeletevalue
Root: HKCU; Subkey: "Software\Classes\PDFIgnovaPro.Document"; ValueType: string; ValueName: ""; ValueData: "Documento PDF"; Flags: uninsdeletekey
Root: HKCU; Subkey: "Software\Classes\PDFIgnovaPro.Document\DefaultIcon"; ValueType: string; ValueName: ""; ValueData: "{app}\{#MyAppExeName},0"
Root: HKCU; Subkey: "Software\Classes\PDFIgnovaPro.Document\shell\open\command"; ValueType: string; ValueName: ""; ValueData: """{app}\{#MyAppExeName}"" ""%1"""

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "Abrir {#MyAppName}"; Flags: nowait postinstall skipifsilent

[UninstallRun]
Filename: "taskkill"; Parameters: "/IM ""{#MyAppExeName}"" /F"; Flags: runhidden skipifdoesntexist; RunOnceId: "StopPDFIgnovaPro"

[UninstallDelete]
Type: filesandordirs; Name: "{app}"
