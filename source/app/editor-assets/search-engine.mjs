const clamp = (value, minimum, maximum) =>
  Math.max(minimum, Math.min(maximum, value));

const applyTransform = (left, right) => [
  left[0] * right[0] + left[2] * right[1],
  left[1] * right[0] + left[3] * right[1],
  left[0] * right[2] + left[2] * right[3],
  left[1] * right[2] + left[3] * right[3],
  left[0] * right[4] + left[2] * right[5] + left[4],
  left[1] * right[4] + left[3] * right[5] + left[5],
];

const normalize = (value) => String(value || "").toLocaleLowerCase("es");

function makeSnippet(text, start, end) {
  const contextStart = Math.max(0, start - 48);
  const contextEnd = Math.min(text.length, end + 48);
  const content = text
    .slice(contextStart, contextEnd)
    .replace(/\s+/g, " ")
    .trim();
  return `${contextStart ? "…" : ""}${content}${contextEnd < text.length ? "…" : ""}`;
}

/**
 * Builds navigable matches and normalized highlight rectangles from PDF.js text
 * content. A match can contain several rectangles when its text spans several
 * PDF text items.
 */
export function buildPageSearchMatches({
  textContent,
  viewport,
  query,
  pageId,
  pageNumber,
}) {
  const needle = normalize(query).trim();
  if (!needle || !textContent?.items?.length || !viewport?.width || !viewport?.height) {
    return [];
  }

  let searchableText = "";
  let displayText = "";
  const segments = [];

  for (const item of textContent.items) {
    if (!("str" in item) || !item.str) continue;

    const separator = searchableText ? " " : "";
    searchableText += separator;
    displayText += separator;

    const itemText = String(item.str);
    const normalizedItemText = normalize(itemText);
    const start = searchableText.length;
    searchableText += normalizedItemText;
    displayText += itemText;

    const matrix = applyTransform(viewport.transform, item.transform);
    const height = Math.max(2, Math.hypot(matrix[2], matrix[3]));
    const width = Math.max(
      2,
      (Number(item.width) || Math.max(itemText.length, 1) * 4) *
        (Number(viewport.scale) || 1),
    );

    segments.push({
      start,
      end: start + normalizedItemText.length,
      length: Math.max(normalizedItemText.length, 1),
      direction: item.dir === "rtl" ? "rtl" : "ltr",
      x: matrix[4] / viewport.width,
      y: (matrix[5] - height) / viewport.height,
      w: width / viewport.width,
      h: height / viewport.height,
      angle: Math.atan2(matrix[1], matrix[0]),
    });
  }

  const matches = [];
  let offset = 0;
  while ((offset = searchableText.indexOf(needle, offset)) !== -1) {
    const end = offset + needle.length;
    const rects = [];

    for (const segment of segments) {
      if (segment.end <= offset || segment.start >= end) continue;

      const localStart = clamp(offset - segment.start, 0, segment.length);
      const localEnd = clamp(end - segment.start, 0, segment.length);
      if (localEnd <= localStart) continue;

      const startRatio = localStart / segment.length;
      const endRatio = localEnd / segment.length;
      const x =
        segment.direction === "rtl"
          ? segment.x + segment.w * (1 - endRatio)
          : segment.x + segment.w * startRatio;

      rects.push({
        x: clamp(x, 0, 1),
        y: clamp(segment.y, 0, 1),
        w: clamp(segment.w * (endRatio - startRatio), 0.002, 1),
        h: clamp(segment.h, 0.004, 1),
        angle: segment.angle,
      });
    }

    if (rects.length) {
      matches.push({
        pageId,
        pageNumber,
        text: displayText.slice(offset, end) || query,
        snippet: makeSnippet(displayText, offset, end),
        rects,
      });
    }

    offset += Math.max(needle.length, 1);
  }

  return matches;
}
