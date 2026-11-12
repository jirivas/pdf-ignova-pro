(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.PDF_IGNOVA_PAGE_SELECTION = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function rangeIds(pageIds, startIndex, endIndex) {
    if (!Array.isArray(pageIds) || !pageIds.length) return [];
    const start = Math.max(0, Math.min(pageIds.length - 1, Number(startIndex) || 0));
    const end = Math.max(0, Math.min(pageIds.length - 1, Number(endIndex) || 0));
    return pageIds.slice(Math.min(start, end), Math.max(start, end) + 1);
  }

  function clickSelection(currentIds, pageIds, pageIndex, options = {}) {
    const current = new Set(currentIds || []);
    const pageId = pageIds?.[pageIndex];
    if (!pageId) return current;
    if (options.shift && Number.isInteger(options.anchorIndex)) {
      const interval = rangeIds(pageIds, options.anchorIndex, pageIndex);
      return options.additive
        ? new Set([...current, ...interval])
        : new Set(interval);
    }
    if (options.additive) {
      current.has(pageId) ? current.delete(pageId) : current.add(pageId);
      return current;
    }
    return new Set([pageId]);
  }

  function dragSelection(baseIds, pageIds, startIndex, endIndex, additive = false) {
    const interval = rangeIds(pageIds, startIndex, endIndex);
    return additive
      ? new Set([...(baseIds || []), ...interval])
      : new Set(interval);
  }

  return { rangeIds, clickSelection, dragSelection };
});
