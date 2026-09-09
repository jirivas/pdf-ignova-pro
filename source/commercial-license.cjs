const { app, clipboard, dialog } = require("electron");
const childProcess = require("node:child_process");
const crypto = require("node:crypto");
const fsp = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { normalizeMachineCode, validateLicenseObject } = require("./license-core.cjs");
const { getMessages, normalizeLanguage } = require("./native-i18n.cjs");

const LICENSE_FILE_NAME = "PDF_Ignova_Pro.ignova-license";
const LEGACY_LICENSE_FILE_NAME = "PDF_Estudio_Pro.ignova-license";
const SUPPORT_STATE_FILE_NAME = "support-reminder.json";
const FREE_DAYS = 30;
const REMINDER_INTERVAL_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

function executeText(command, args) {
  try {
    return childProcess.execFileSync(command, args, {
      encoding: "utf8",
      windowsHide: true,
      timeout: 6000,
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

function windowsMachineGuid() {
  const regExecutable = process.env.SystemRoot
    ? path.join(process.env.SystemRoot, "System32", "reg.exe")
    : "reg.exe";
  const registryOutput = executeText(regExecutable, [
    "query",
    "HKLM\\SOFTWARE\\Microsoft\\Cryptography",
    "/v",
    "MachineGuid",
  ]);
  const registryMatch = registryOutput.match(/MachineGuid\s+REG_SZ\s+([^\r\n]+)/i);
  if (registryMatch?.[1]) return registryMatch[1].trim();

  const powershellExecutable = process.env.SystemRoot
    ? path.join(
        process.env.SystemRoot,
        "System32",
        "WindowsPowerShell",
        "v1.0",
        "powershell.exe",
      )
    : "powershell.exe";
  const powershellOutput = executeText(powershellExecutable, [
    "-NoProfile",
    "-NonInteractive",
    "-Command",
    "(Get-ItemProperty -LiteralPath 'HKLM:\\SOFTWARE\\Microsoft\\Cryptography' -Name MachineGuid).MachineGuid",
  ]);
  if (powershellOutput) return powershellOutput.split(/\r?\n/)[0].trim();

  const wmicExecutable = process.env.SystemRoot
    ? path.join(process.env.SystemRoot, "System32", "wbem", "WMIC.exe")
    : "wmic.exe";
  const wmicOutput = executeText(wmicExecutable, ["csproduct", "get", "UUID", "/value"]);
  const wmicMatch = wmicOutput.match(/UUID=([^\r\n]+)/i);
  if (wmicMatch?.[1]) return wmicMatch[1].trim();

  return `fallback:${os.hostname()}:${os.arch()}:${process.env.SystemDrive || ""}`;
}

function macMachineGuid() {
  const output = executeText("/usr/sbin/ioreg", [
    "-rd1",
    "-c",
    "IOPlatformExpertDevice",
  ]);
  const match = output.match(/"IOPlatformUUID"\s*=\s*"([^"]+)"/i);
  if (match?.[1]) return match[1].trim();
  return `fallback:${os.hostname()}:${os.arch()}:${os.homedir()}`;
}

function platformMachineGuid() {
  if (process.platform === "darwin") return macMachineGuid();
  if (process.platform === "win32") return windowsMachineGuid();
  return `fallback:${process.platform}:${os.hostname()}:${os.arch()}`;
}

function machineCode() {
  const digest = crypto
    .createHash("sha256")
    .update(`IGNOVA-PDF-ESTUDIO-PRO-V1|${platformMachineGuid().toUpperCase()}`, "utf8")
    .digest("hex")
    .toUpperCase()
    .slice(0, 20);
  return normalizeMachineCode(digest);
}

function storedLicensePath() {
  return path.join(app.getPath("userData"), LICENSE_FILE_NAME);
}

function legacyStoredLicensePath() {
  return path.join(app.getPath("userData"), LEGACY_LICENSE_FILE_NAME);
}

function supportStatePath() {
  return path.join(app.getPath("userData"), SUPPORT_STATE_FILE_NAME);
}

async function readAndValidateLicense(filePath, expectedMachineCode) {
  try {
    const stat = await fsp.stat(filePath);
    if (!stat.isFile() || stat.size < 200 || stat.size > 65536) {
      return {
        ok: false,
        reason: "El archivo seleccionado no tiene un tamaño de licencia válido.",
      };
    }
    const text = await fsp.readFile(filePath, "utf8");
    return validateLicenseObject(JSON.parse(text), expectedMachineCode);
  } catch (error) {
    if (error?.code === "ENOENT") {
      return { ok: false, reason: "No hay una licencia de apoyo activada." };
    }
    if (error instanceof SyntaxError) {
      return { ok: false, reason: "El archivo seleccionado no contiene una licencia válida." };
    }
    return { ok: false, reason: "No se pudo leer el archivo de licencia." };
  }
}

async function readInstalledLicense(expectedMachineCode) {
  let current = await readAndValidateLicense(storedLicensePath(), expectedMachineCode);
  if (current.ok) return current;

  const legacy = await readAndValidateLicense(
    legacyStoredLicensePath(),
    expectedMachineCode,
  );
  if (!legacy.ok) return current;
  await fsp.mkdir(app.getPath("userData"), { recursive: true });
  await fsp.copyFile(legacyStoredLicensePath(), storedLicensePath()).catch(() => {});
  return legacy;
}

async function installLicense(sourcePath, expectedMachineCode) {
  const validation = await readAndValidateLicense(sourcePath, expectedMachineCode);
  if (!validation.ok) return validation;
  await fsp.mkdir(app.getPath("userData"), { recursive: true });
  await fsp.copyFile(sourcePath, storedLicensePath());
  const savedValidation = await readAndValidateLicense(
    storedLicensePath(),
    expectedMachineCode,
  );
  if (!savedValidation.ok) {
    await fsp.rm(storedLicensePath(), { force: true }).catch(() => {});
    return {
      ok: false,
      reason: "La licencia era válida, pero no se pudo guardar correctamente.",
    };
  }
  return savedValidation;
}

function safeDate(value) {
  const parsed = Date.parse(value || "");
  return Number.isFinite(parsed) ? parsed : null;
}

async function writeSupportState(value) {
  await fsp.mkdir(app.getPath("userData"), { recursive: true });
  await fsp.writeFile(supportStatePath(), JSON.stringify(value, null, 2), "utf8");
}

async function readSupportState() {
  const now = Date.now();
  let stored = {};
  try {
    stored = JSON.parse(await fsp.readFile(supportStatePath(), "utf8"));
  } catch {
    stored = {};
  }

  let firstRun = safeDate(stored.firstRunAt);
  if (firstRun === null || firstRun > now + DAY_MS) firstRun = now;
  const lastReminder = safeDate(stored.lastReminderAt);
  const normalized = {
    firstRunAt: new Date(firstRun).toISOString(),
    lastReminderAt: lastReminder === null ? null : new Date(lastReminder).toISOString(),
  };
  await writeSupportState(normalized);
  return normalized;
}

async function initializeSupportLicense() {
  const expectedMachineCode = machineCode();
  const current = await readInstalledLicense(expectedMachineCode);
  if (current.ok) {
    return {
      licensed: true,
      license: current.license,
      machineCode: expectedMachineCode,
      reminderDue: false,
      daysUsed: 0,
    };
  }

  const state = await readSupportState();
  const now = Date.now();
  const firstRun = safeDate(state.firstRunAt) ?? now;
  const lastReminder = safeDate(state.lastReminderAt);
  const daysUsed = Math.max(0, Math.floor((now - firstRun) / DAY_MS));
  const reminderDue =
    daysUsed >= FREE_DAYS &&
    (lastReminder === null || now - lastReminder >= REMINDER_INTERVAL_DAYS * DAY_MS);
  return {
    licensed: false,
    license: null,
    machineCode: expectedMachineCode,
    reminderDue,
    daysUsed,
    state,
  };
}

async function showMessage(parentWindow, options) {
  return parentWindow
    ? dialog.showMessageBox(parentWindow, options)
    : dialog.showMessageBox(options);
}

async function selectSupportLicense(parentWindow, status, requestedLanguage = "es") {
  const language = normalizeLanguage(requestedLanguage);
  const text = getMessages(language).license;
  const selected = parentWindow
    ? await dialog.showOpenDialog(parentWindow, {
        title: text.selectTitle,
        properties: ["openFile"],
        filters: [
          { name: text.ignovaLicense, extensions: ["ignova-license"] },
          { name: text.jsonFiles, extensions: ["json"] },
        ],
      })
    : await dialog.showOpenDialog({
        title: text.selectTitle,
        properties: ["openFile"],
        filters: [
          { name: text.ignovaLicense, extensions: ["ignova-license"] },
          { name: text.jsonFiles, extensions: ["json"] },
        ],
      });
  if (selected.canceled || !selected.filePaths.length) return status;

  const current = await installLicense(selected.filePaths[0], status.machineCode);
  if (!current.ok) {
    await showMessage(parentWindow, {
      type: "error",
      title: text.invalidTitle,
      message: text.activationFailed,
      detail: language === "es" ? current.reason : text.validationDetail,
      buttons: [text.continue],
      noLink: true,
    });
    return status;
  }

  await showMessage(parentWindow, {
    type: "info",
    title: text.activatedTitle,
    message: text.thanks(current.license.customer),
    detail: text.permanent(current.license.id),
    buttons: [text.continue],
    noLink: true,
  });
  return {
    ...status,
    licensed: true,
    license: current.license,
    reminderDue: false,
  };
}

async function maybeShowSupportReminder(parentWindow, status, requestedLanguage = "es") {
  if (!status || status.licensed || !status.reminderDue) return status;
  const language = normalizeLanguage(requestedLanguage);
  const text = getMessages(language).license;

  const reminderState = {
    ...(status.state || {}),
    lastReminderAt: new Date().toISOString(),
  };
  await writeSupportState(reminderState);

  const response = await showMessage(parentWindow, {
    type: "info",
    title: text.supportTitle,
    message: text.remainsComplete,
    detail: [
      text.daysSince(status.daysUsed),
      text.purchase,
      text.terms,
      "",
      `${text.machineCode}: ${status.machineCode}`,
    ].join("\n"),
    buttons: [text.continue, text.selectLicense, text.copyCode],
    defaultId: 0,
    cancelId: 0,
    noLink: true,
  });

  const updatedStatus = { ...status, reminderDue: false, state: reminderState };
  if (response.response === 1) {
    return selectSupportLicense(parentWindow, updatedStatus, language);
  }
  if (response.response === 2) {
    clipboard.writeText(status.machineCode);
    await showMessage(parentWindow, {
      type: "info",
      title: text.codeCopiedTitle,
      message: text.codeCopied,
      detail: text.sendCode,
      buttons: [text.continue],
      noLink: true,
    });
  }
  return updatedStatus;
}

module.exports = {
  FREE_DAYS,
  REMINDER_INTERVAL_DAYS,
  initializeSupportLicense,
  machineCode,
  maybeShowSupportReminder,
};
