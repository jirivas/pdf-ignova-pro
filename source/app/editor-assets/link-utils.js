(function exposePdfIgnovaLinkUtilities(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.PDF_IGNOVA_LINKS = api;
})(typeof globalThis !== "undefined" ? globalThis : this, () => {
  "use strict";

  const EMAIL_PART =
    "[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+";
  const EMAIL_EXACT = new RegExp(`^${EMAIL_PART}$`, "i");
  const EMAIL_IN_TEXT = new RegExp(`\\b${EMAIL_PART}\\b`, "i");
  const WEB_IN_TEXT = /\b(?:https?:\/\/|www\.)[^\s<>"“”‘’]+/i;
  const BARE_DOMAIN_IN_TEXT =
    /\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}(?::\d{2,5})?(?:[/?#][^\s<>"“”‘’]*)?/i;
  const BARE_DOMAIN_EXACT = new RegExp(`^${BARE_DOMAIN_IN_TEXT.source}$`, "i");
  const COMMON_FILE_EXTENSION =
    /\.(?:7z|bmp|csv|docx?|dwg|dxf|gif|jpe?g|ods|odt|odp|pdf|png|pptx?|rar|rtf|tiff?|txt|webp|xlsx?|zip)$/i;

  function trimDetectedLink(value) {
    let target = String(value || "")
      .trim()
      .replace(/^[<({\["'“‘]+/u, "")
      .replace(/["'”’.,;:!?]+$/u, "");
    for (const [opening, closing] of [["(", ")"], ["[", "]"], ["{", "}"], ["<", ">"]]) {
      while (
        target.endsWith(closing) &&
        target.split(closing).length > target.split(opening).length
      ) {
        target = target.slice(0, -1);
      }
    }
    return target;
  }

  function hasUnsafeControlCharacters(value) {
    if (/[\u0000-\u001f\u007f]/u.test(value)) return true;
    try {
      return /[\u0000-\u001f\u007f]/u.test(decodeURIComponent(value));
    } catch {
      return true;
    }
  }

  function isLikelyFilename(value) {
    const withoutQuery = value.split(/[?#]/, 1)[0];
    return !withoutQuery.includes("/") && COMMON_FILE_EXTENSION.test(withoutQuery);
  }

  function normalizeLinkTarget(value) {
    let target = trimDetectedLink(value);
    if (!target || target.length > 4096 || hasUnsafeControlCharacters(target)) {
      return null;
    }

    if (/^mailto:/i.test(target)) {
      const recipient = target.slice(target.indexOf(":") + 1).split("?", 1)[0];
      if (!recipient || !recipient.includes("@")) return null;
      return `mailto:${target.slice(target.indexOf(":") + 1)}`;
    }

    if (EMAIL_EXACT.test(target)) return `mailto:${target}`;

    if (/^www\./i.test(target)) {
      target = `https://${target}`;
    } else if (!/^[a-z][a-z0-9+.-]*:/i.test(target)) {
      if (!BARE_DOMAIN_EXACT.test(target) || isLikelyFilename(target)) return null;
      target = `https://${target}`;
    }

    try {
      const parsed = new URL(target);
      if (!["http:", "https:"].includes(parsed.protocol) || !parsed.hostname) {
        return null;
      }
      return parsed.href;
    } catch {
      return null;
    }
  }

  function detectTextLink(text) {
    const source = String(text || "");
    const emailMatch = source.match(EMAIL_IN_TEXT);
    if (emailMatch) {
      const target = normalizeLinkTarget(emailMatch[0]);
      if (target) return { kind: "email", label: emailMatch[0], target };
    }

    const webMatch = source.match(WEB_IN_TEXT) || source.match(BARE_DOMAIN_IN_TEXT);
    if (!webMatch) return null;
    const label = trimDetectedLink(webMatch[0]);
    const target = normalizeLinkTarget(label);
    return target ? { kind: "web", label, target } : null;
  }

  return Object.freeze({ detectTextLink, normalizeLinkTarget, trimDetectedLink });
});
