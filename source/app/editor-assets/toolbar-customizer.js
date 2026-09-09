(() => {
  "use strict";

  const STORAGE_KEY = "pdf-estudio-pro.toolbar.v19";
  const DEFAULT_ORDER = [
    "pages",
    "select",
    "hand",
    "zoom-out",
    "zoom-in",
    "zoom-fit",
    "text",
    "draw",
    "highlight",
    "redact",
    "whiteout",
    "image",
    "paste",
    "rotate-left",
    "rotate-right",
    "duplicate",
    "delete",
    "properties",
  ];

  const LABELS = {
    pages: "Panel de páginas",
    hand: "Mano",
    select: "Seleccionar",
    "zoom-out": "Zoom −",
    "zoom-in": "Zoom +",
    "zoom-fit": "Zoom extensión",
    text: "Texto",
    draw: "Mano alzada",
    highlight: "Resaltar",
    redact: "Tapado negro",
    whiteout: "Tapado blanco",
    image: "Imagen",
    paste: "Pegar imagen",
    "rotate-left": "Girar a la izquierda",
    "rotate-right": "Girar a la derecha",
    duplicate: "Duplicar página",
    delete: "Eliminar página",
    properties: "Propiedades",
  };

  let config = loadConfig();
  let toolbar = null;
  let panel = null;
  let customizeButton = null;
  let contextMenu = null;
  let draggedId = null;
  let applying = false;
  let scheduled = false;

  function loadConfig() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      const savedOrder = Array.isArray(saved.order) ? saved.order : [];
      const order = [
        ...savedOrder.filter((id) => DEFAULT_ORDER.includes(id)),
        ...DEFAULT_ORDER.filter((id) => !savedOrder.includes(id)),
      ];
      return {
        order,
        hidden: Array.isArray(saved.hidden)
          ? saved.hidden.filter((id) => DEFAULT_ORDER.includes(id))
          : [],
      };
    } catch {
      return { order: [...DEFAULT_ORDER], hidden: [] };
    }
  }

  function saveConfig() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }

  function normalizedText(button) {
    return (button.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function translated(value) {
    return window.pdfIgnovaI18n?.t?.(value) || value;
  }

  function equalsTranslation(current, ...sources) {
    return sources.some((source) =>
      [source, translated(source)].some(
        (value) => String(value).replace(/\s+/g, " ").trim().toLowerCase() === current,
      ),
    );
  }

  function includesTranslation(current, ...sources) {
    return sources.some((source) =>
      [source, translated(source)].some((value) =>
        current.includes(String(value).replace(/\s+/g, " ").trim().toLowerCase()),
      ),
    );
  }

  function identifyButton(button, index) {
    if (button.dataset.toolbarId) return button.dataset.toolbarId;
    const title = (button.title || "").toLowerCase();
    const text = normalizedText(button);
    let id = "";

    if (button.classList.contains("danger")) id = "delete";
    else if (includesTranslation(title, "Girar página a la izquierda")) id = "rotate-left";
    else if (includesTranslation(title, "Girar página a la derecha")) id = "rotate-right";
    else if (equalsTranslation(text, "Mano")) id = "hand";
    else if (equalsTranslation(text, "Seleccionar")) id = "select";
    else if (includesTranslation(text, "Zoom −") || includesTranslation(title, "Zoom −")) id = "zoom-out";
    else if (includesTranslation(text, "Zoom +") || includesTranslation(title, "Zoom +")) id = "zoom-in";
    else if (equalsTranslation(text, "Extensión") || includesTranslation(title, "Extensión")) id = "zoom-fit";
    else if (equalsTranslation(text, "Texto")) id = "text";
    else if (equalsTranslation(text, "Mano alzada")) id = "draw";
    else if (equalsTranslation(text, "Resaltar")) id = "highlight";
    else if (equalsTranslation(text, "Tapado negro")) id = "redact";
    else if (equalsTranslation(text, "Tapado blanco")) id = "whiteout";
    else if (equalsTranslation(text, "Imagen")) id = "image";
    else if (equalsTranslation(text, "Pegar")) id = "paste";
    else if (equalsTranslation(text, "Propiedades")) id = "properties";
    else if (!text && index === 0) id = "pages";
    else if (!text) id = "duplicate";

    if (!id || !DEFAULT_ORDER.includes(id)) return "";
    button.dataset.toolbarId = id;
    button.dataset.toolbarLabel = LABELS[id];
    if (!button.title) button.title = LABELS[id];
    return id;
  }

  function toolButtons() {
    if (!toolbar) return [];
    return [...toolbar.children]
      .filter((node) => node.tagName === "BUTTON" && node !== customizeButton)
      .map((button, index) => ({ button, id: identifyButton(button, index) }))
      .filter((item) => item.id);
  }

  function installButtonEvents(button, id) {
    if (button.dataset.toolbarCustomReady === "1") return;
    button.dataset.toolbarCustomReady = "1";
    button.draggable = true;

    button.addEventListener("dragstart", (event) => {
      draggedId = id;
      button.classList.add("toolbar-dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", id);
      closeMenus();
    });

    button.addEventListener("dragend", () => {
      draggedId = null;
      button.classList.remove("toolbar-dragging");
      document
        .querySelectorAll(".toolbar-drop-before,.toolbar-drop-after")
        .forEach((node) =>
          node.classList.remove("toolbar-drop-before", "toolbar-drop-after"),
        );
      saveConfig();
    });

    button.addEventListener("dragover", (event) => {
      if (!draggedId || draggedId === id) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      const before =
        event.clientX < button.getBoundingClientRect().left + button.offsetWidth / 2;
      button.classList.toggle("toolbar-drop-before", before);
      button.classList.toggle("toolbar-drop-after", !before);
    });

    button.addEventListener("dragleave", () => {
      button.classList.remove("toolbar-drop-before", "toolbar-drop-after");
    });

    button.addEventListener("drop", (event) => {
      if (!draggedId || draggedId === id) return;
      event.preventDefault();
      const before =
        event.clientX < button.getBoundingClientRect().left + button.offsetWidth / 2;
      moveTool(draggedId, id, before);
      draggedId = null;
    });

    button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      event.stopPropagation();
      showContextMenu(event.clientX, event.clientY, id);
    });
  }

  function moveTool(sourceId, targetId, before) {
    const order = config.order.filter((id) => id !== sourceId);
    let targetIndex = order.indexOf(targetId);
    if (targetIndex < 0) targetIndex = order.length;
    if (!before) targetIndex += 1;
    order.splice(targetIndex, 0, sourceId);
    config.order = order;
    saveConfig();
    applyToolbar();
    renderPanel();
  }

  function shiftTool(id, direction) {
    const visible = config.order.filter((item) => !config.hidden.includes(item));
    const current = visible.indexOf(id);
    const next = current + direction;
    if (current < 0 || next < 0 || next >= visible.length) return;
    moveTool(id, visible[next], direction < 0);
  }

  function setVisible(id, visible) {
    config.hidden = visible
      ? config.hidden.filter((item) => item !== id)
      : [...new Set([...config.hidden, id])];
    saveConfig();
    applyToolbar();
    renderPanel();
  }

  function applyToolbar() {
    if (!toolbar || applying) return;
    applying = true;
    toolbar.classList.add("toolbar-customizable");

    const items = toolButtons();
    const byId = new Map(items.map((item) => [item.id, item.button]));
    items.forEach(({ button, id }) => {
      button.classList.toggle("toolbar-tool-hidden", config.hidden.includes(id));
      button.setAttribute("aria-hidden", config.hidden.includes(id) ? "true" : "false");
      installButtonEvents(button, id);
    });

    const spacer = [...toolbar.children].find(
      (node) => node.tagName === "SPAN" && node.classList.contains("spacer"),
    );
    const desiredOrder = config.order.filter((id) => byId.has(id));
    const currentOrder = items.map((item) => item.id);
    if (desiredOrder.some((id, index) => currentOrder[index] !== id)) {
      desiredOrder.forEach((id) => {
        toolbar.insertBefore(byId.get(id), spacer || customizeButton);
      });
    }

    const drawControls = toolbar.querySelector(":scope > .draw-controls");
    const drawButton = byId.get("draw");
    if (drawControls && drawButton) {
      drawControls.classList.toggle(
        "toolbar-tool-hidden",
        config.hidden.includes("draw"),
      );
      if (drawButton.nextElementSibling !== drawControls) {
        drawButton.after(drawControls);
      }
    }

    const markControls = toolbar.querySelector(":scope > .mark-controls");
    if (markControls) {
      const ownerButton = byId.get(markControls.dataset.toolbarOwner || "");
      if (ownerButton && ownerButton.nextElementSibling !== markControls) {
        ownerButton.after(markControls);
      }
    }

    if (customizeButton.parentElement !== toolbar) toolbar.append(customizeButton);
    applying = false;
  }

  function createCustomizeButton() {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "toolbar-customize-button";
    button.title = "Personalizar barra de herramientas";
    button.setAttribute("aria-label", "Personalizar barra de herramientas");
    button.innerHTML =
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.86 2.86-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21H9.55v-.09A1.7 1.7 0 0 0 8.5 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.86-2.86.06-.06A1.7 1.7 0 0 0 4.1 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H2.3V9.55h.09A1.7 1.7 0 0 0 4.1 8.5a1.7 1.7 0 0 0-.34-1.88l-.06-.06L6.56 3.7l.06.06A1.7 1.7 0 0 0 8.5 4.1a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V2.3h4.05v.09A1.7 1.7 0 0 0 15 4.1a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.86 2.86-.06.06A1.7 1.7 0 0 0 19.4 8.5c.2.4.6.76 1 .96.34.18.72.27 1.1.27h.2v4.05h-.09A1.7 1.7 0 0 0 19.4 15Z"/></svg>';
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (!panel) return;
      const opening = panel.hidden;
      closeMenus();
      if (opening) {
        renderPanel();
        positionPanel(button, panel);
        panel.hidden = false;
      }
    });
    return button;
  }

  function createPanel() {
    const element = document.createElement("section");
    element.className = "toolbar-customize-panel";
    element.hidden = true;
    element.setAttribute("aria-label", "Personalizar barra de herramientas");
    document.body.append(element);
    return element;
  }

  function renderPanel() {
    if (!panel) return;
    panel.replaceChildren();

    const header = document.createElement("header");
    header.innerHTML =
      "<strong>Personalizar barra</strong><small>Arrastra los iconos en la barra para moverlos</small>";
    panel.append(header);

    const list = document.createElement("div");
    list.className = "toolbar-customize-list";
    config.order.forEach((id) => {
      const row = document.createElement("div");
      row.className = "toolbar-customize-row";

      const check = document.createElement("input");
      check.type = "checkbox";
      check.checked = !config.hidden.includes(id);
      check.title = check.checked ? "Quitar de la barra" : "Añadir a la barra";
      check.addEventListener("change", () => setVisible(id, check.checked));

      const label = document.createElement("span");
      label.textContent = LABELS[id];

      const up = document.createElement("button");
      up.type = "button";
      up.textContent = "↑";
      up.title = "Mover a la izquierda";
      up.disabled = config.hidden.includes(id);
      up.addEventListener("click", () => shiftTool(id, -1));

      const down = document.createElement("button");
      down.type = "button";
      down.textContent = "↓";
      down.title = "Mover a la derecha";
      down.disabled = config.hidden.includes(id);
      down.addEventListener("click", () => shiftTool(id, 1));

      row.append(check, label, up, down);
      list.append(row);
    });
    panel.append(list);

    const footer = document.createElement("footer");
    const reset = document.createElement("button");
    reset.type = "button";
    reset.textContent = "Restaurar barra original";
    reset.addEventListener("click", () => {
      config = { order: [...DEFAULT_ORDER], hidden: [] };
      saveConfig();
      applyToolbar();
      renderPanel();
    });
    footer.append(reset);
    panel.append(footer);
  }

  function showContextMenu(x, y, id) {
    closeMenus();
    if (!contextMenu) {
      contextMenu = document.createElement("div");
      contextMenu.className = "toolbar-tool-menu";
      document.body.append(contextMenu);
    }
    contextMenu.replaceChildren();

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = `Quitar «${LABELS[id]}» de la barra`;
    remove.addEventListener("click", () => {
      setVisible(id, false);
      closeMenus();
    });
    contextMenu.append(remove);
    contextMenu.hidden = false;
    contextMenu.style.left = `${Math.min(x, innerWidth - 280)}px`;
    contextMenu.style.top = `${Math.min(y, innerHeight - 55)}px`;
  }

  function positionPanel(anchor, element) {
    const rect = anchor.getBoundingClientRect();
    element.style.top = `${Math.min(rect.bottom + 7, innerHeight - 530)}px`;
    element.style.left = `${Math.max(10, Math.min(rect.right - 330, innerWidth - 340))}px`;
  }

  function closeMenus() {
    if (panel) panel.hidden = true;
    if (contextMenu) contextMenu.hidden = true;
  }

  function attach() {
    const current = document.querySelector(".document > .toolbar");
    if (!current) return;
    if (!customizeButton) customizeButton = createCustomizeButton();
    if (!panel) panel = createPanel();
    if (toolbar !== current) {
      toolbar = current;
      toolbar.append(customizeButton);
    }
    applyToolbar();
  }

  function scheduleAttach() {
    if (scheduled || applying) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      attach();
    });
  }

  document.addEventListener("click", (event) => {
    if (
      !event.target.closest(".toolbar-customize-panel") &&
      !event.target.closest(".toolbar-customize-button") &&
      !event.target.closest(".toolbar-tool-menu")
    ) {
      closeMenus();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenus();
  });
  addEventListener("resize", closeMenus);

  new MutationObserver(scheduleAttach).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  scheduleAttach();
})();
