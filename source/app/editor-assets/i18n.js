(() => {
  "use strict";

  const data = window.PDF_IGNOVA_I18N_DATA;
  if (!data) {
    console.error("No se pudieron cargar las traducciones de PDF Ignova Pro");
    return;
  }

  const STORAGE_KEY = "pdf-ignova-pro.ui-language.v1";
  const TRANSLATED_ATTRIBUTES = ["title", "aria-label", "placeholder", "alt"];
  const textRecords = new WeakMap();
  const attributeRecords = new WeakMap();
  let picker = null;
  let scheduled = false;

  const pickerLabels = Object.freeze({
    es: "Idioma de la interfaz",
    en: "Interface language",
    pt: "Idioma da interface",
    de: "Sprache der Benutzeroberfläche",
    fr: "Langue de l’interface",
    zh: "界面语言",
    ms: "Bahasa antara muka",
  });

  function storedLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return data.normalizeLanguage(saved);
    } catch {
      // Local storage can be unavailable in hardened browser profiles.
    }
    return data.normalizeLanguage(navigator.language || "es");
  }

  let currentLanguage = storedLanguage();

  function excluded(element) {
    return !element || !!element.closest(
      ".ignova-language-picker,[data-i18n-ignore],.pagestage,.thumbcanvas," +
      ".pdf-text-layer,.marklayer,.text-editor,.filetab:not(.empty),script,style",
    );
  }

  function splitWhitespace(value) {
    const match = String(value).match(/^(\s*)([\s\S]*?)(\s*)$/);
    return match || [String(value), "", String(value), ""];
  }

  function translatedValue(source) {
    const [, leading, content, trailing] = splitWhitespace(source);
    if (!content || !data.canTranslate(content)) return source;
    return `${leading}${data.translate(content, currentLanguage)}${trailing}`;
  }

  function translateTextNode(node) {
    if (!node?.parentElement || excluded(node.parentElement)) return;
    const current = node.nodeValue || "";
    let record = textRecords.get(node);

    if (record && current !== record.last) {
      record = null;
      textRecords.delete(node);
    }

    const source = record?.source ?? current;
    const target = translatedValue(source);
    if (target === current) return;

    const nextRecord = { source, last: target };
    textRecords.set(node, nextRecord);
    node.nodeValue = target;
  }

  function attributeRecord(element, attribute) {
    let records = attributeRecords.get(element);
    if (!records) {
      records = new Map();
      attributeRecords.set(element, records);
    }
    return records;
  }

  function translateAttribute(element, attribute) {
    if (excluded(element) || !element.hasAttribute(attribute)) return;
    const current = element.getAttribute(attribute) || "";
    const records = attributeRecord(element);
    let record = records.get(attribute);

    if (record && current !== record.last) {
      record = null;
      records.delete(attribute);
    }

    const source = record?.source ?? current;
    const target = translatedValue(source);
    if (target === current) return;

    records.set(attribute, { source, last: target });
    element.setAttribute(attribute, target);
  }

  function translateElement(element) {
    if (!(element instanceof Element) || excluded(element)) return;
    for (const attribute of TRANSLATED_ATTRIBUTES) {
      translateAttribute(element, attribute);
    }
  }

  function translateTree(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      translateTextNode(root);
      return;
    }
    if (!(root instanceof Element) && root !== document) return;
    if (root instanceof Element) translateElement(root);

    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
    );
    let node = walker.nextNode();
    while (node) {
      if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
      else translateElement(node);
      node = walker.nextNode();
    }
  }

  function notifyDesktop() {
    try {
      const response = window.pdfEstudio?.setUiLanguage?.(currentLanguage);
      response?.catch?.(() => {});
    } catch {
      // Browser-only previews do not expose the desktop bridge.
    }
  }

  function updatePicker() {
    if (!picker) return;
    const language = data.languages[currentLanguage];
    const button = picker.querySelector(".ignova-language-current");
    const label = pickerLabels[currentLanguage];
    if (button.getAttribute("aria-label") !== label) button.setAttribute("aria-label", label);
    if (button.title !== label) button.title = label;
    const flag = button.querySelector(".ignova-language-flag");
    const code = button.querySelector(".ignova-language-code");
    if (flag.getAttribute("src") !== language.icon) flag.setAttribute("src", language.icon);
    if (flag.getAttribute("alt") !== language.name) flag.setAttribute("alt", language.name);
    if (code.textContent !== language.short) code.textContent = language.short;
    picker.querySelectorAll("[data-language]").forEach((option) => {
      const selected = option.dataset.language === currentLanguage;
      option.classList.toggle("selected", selected);
      const checked = selected ? "true" : "false";
      if (option.getAttribute("aria-checked") !== checked) {
        option.setAttribute("aria-checked", checked);
      }
    });
  }

  function closePicker() {
    if (!picker) return;
    picker.classList.remove("open");
    picker.querySelector(".ignova-language-current")?.setAttribute("aria-expanded", "false");
  }

  function setLanguage(requestedLanguage) {
    const nextLanguage = data.normalizeLanguage(requestedLanguage);
    currentLanguage = nextLanguage;
    document.documentElement.lang = data.languages[nextLanguage].html;
    try {
      localStorage.setItem(STORAGE_KEY, nextLanguage);
    } catch {
      // The selection remains active for the current session.
    }
    updatePicker();
    translateTree(document.body);
    notifyDesktop();
    window.dispatchEvent(new CustomEvent("pdf-ignova-language-changed", {
      detail: { language: nextLanguage },
    }));
    return nextLanguage;
  }

  function createPicker() {
    const element = document.createElement("div");
    element.className = "ignova-language-picker";
    element.setAttribute("data-i18n-ignore", "true");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "ignova-language-current";
    button.setAttribute("aria-haspopup", "menu");
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = [
      '<img class="ignova-language-flag" alt="">',
      '<span class="ignova-language-code"></span>',
      '<span class="ignova-language-chevron" aria-hidden="true">▾</span>',
    ].join("");

    const menu = document.createElement("div");
    menu.className = "ignova-language-menu";
    menu.setAttribute("role", "menu");
    for (const language of Object.values(data.languages)) {
      const option = document.createElement("button");
      option.type = "button";
      option.dataset.language = language.code;
      option.setAttribute("role", "menuitemradio");
      option.innerHTML = [
        `<img class="ignova-language-option-flag" src="${language.icon}" alt="">`,
        `<span>${language.name}</span>`,
        '<span class="ignova-language-check" aria-hidden="true">✓</span>',
      ].join("");
      option.addEventListener("click", () => {
        setLanguage(language.code);
        closePicker();
      });
      menu.append(option);
    }

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const opening = !element.classList.contains("open");
      closePicker();
      if (opening) {
        element.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });

    element.append(button, menu);
    return element;
  }

  function attachPicker() {
    const titlebar = document.querySelector(".titlebar");
    if (!titlebar) return;
    if (!picker) picker = createPicker();
    if (picker.parentElement !== titlebar) {
      const localProcessing = titlebar.querySelector(":scope > small");
      titlebar.insertBefore(picker, localProcessing || titlebar.lastChild);
    }
    updatePicker();
  }

  function updateInterface() {
    scheduled = false;
    attachPicker();
    translateTree(document.body);
  }

  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateInterface);
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "characterData") translateTextNode(mutation.target);
      else if (mutation.type === "attributes") {
        translateAttribute(mutation.target, mutation.attributeName);
      } else {
        mutation.addedNodes.forEach((node) => translateTree(node));
      }
    }
    scheduleUpdate();
  });

  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: TRANSLATED_ATTRIBUTES,
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".ignova-language-picker")) closePicker();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePicker();
  });
  addEventListener("resize", closePicker);

  const nativeAlert = window.alert.bind(window);
  const nativeConfirm = window.confirm.bind(window);
  const nativePrompt = window.prompt.bind(window);
  window.alert = (message) => nativeAlert(data.translate(String(message), currentLanguage));
  window.confirm = (message) => nativeConfirm(data.translate(String(message), currentLanguage));
  window.prompt = (message, defaultValue = "") => nativePrompt(
    data.translate(String(message), currentLanguage),
    data.translate(String(defaultValue), currentLanguage),
  );

  window.pdfIgnovaI18n = Object.freeze({
    getLanguage: () => currentLanguage,
    setLanguage,
    t: (source) => data.translate(source, currentLanguage),
    languages: data.languages,
  });

  document.documentElement.lang = data.languages[currentLanguage].html;
  notifyDesktop();
  scheduleUpdate();
})();
