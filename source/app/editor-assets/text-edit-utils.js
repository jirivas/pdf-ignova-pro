(function exposeIgnovaTextEdit(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.PDF_IGNOVA_TEXT_EDIT = api;
})(typeof globalThis !== "undefined" ? globalThis : this, () => {
  "use strict";

  const clamp = (value, minimum, maximum) =>
    Math.max(minimum, Math.min(maximum, value));

  function orderTextItems(items) {
    return [...(items || [])].sort((left, right) => {
      const tolerance = Math.max(
        2,
        Math.min(left.height || 10, right.height || 10) * 0.55,
      );
      const verticalDifference = (left.top || 0) - (right.top || 0);
      if (Math.abs(verticalDifference) <= tolerance) {
        return (left.left || 0) - (right.left || 0);
      }
      return verticalDifference;
    });
  }

  function joinSelectedItems(items) {
    const ordered = orderTextItems(items);
    let result = "";
    ordered.forEach((item, index) => {
      const text = String(item?.text || "").replace(/\r/g, "");
      if (!text) return;
      if (!result) {
        result = text;
        return;
      }
      const previous = ordered[index - 1];
      const previousText = String(previous?.text || "");
      const previousCenter = (previous?.top || 0) + (previous?.height || 0) / 2;
      const currentCenter = (item?.top || 0) + (item?.height || 0) / 2;
      const lineTolerance = Math.max(
        2,
        Math.max(previous?.height || 10, item?.height || 10) * 0.62,
      );
      const sameLine = Math.abs(currentCenter - previousCenter) <= lineTolerance;
      if (sameLine && !previous?.hasEOL) {
        const previousRight = (previous?.left || 0) + (previous?.width || 0);
        const gap = (item?.left || 0) - previousRight;
        const needsSpace =
          !/\s$/.test(result) &&
          !/^\s/.test(text) &&
          gap > -Math.max(1, (previous?.height || 10) * 0.12);
        result += `${needsSpace ? " " : ""}${text}`;
        return;
      }
      const verticalGap = (item?.top || 0) - (previous?.top || 0);
      const paragraphGap =
        Math.max(previous?.height || 10, item?.height || 10) * 1.65;
      result = result.replace(/[ \t]+$/g, "");
      result += `${verticalGap > paragraphGap ? "\n\n" : "\n"}${text}`;
    });
    return result
      .replace(/\u00ad/g, "")
      .replace(/\u00a0/g, " ")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function createTextRange(items, anchorKey, focusKey) {
    const ordered = orderTextItems(items);
    const anchorIndex = ordered.findIndex((item) => item.key === anchorKey);
    const focusIndex = ordered.findIndex((item) => item.key === focusKey);
    if (anchorIndex < 0 || focusIndex < 0) {
      return { keys: [], text: "", start: -1, end: -1 };
    }
    const start = Math.min(anchorIndex, focusIndex);
    const end = Math.max(anchorIndex, focusIndex);
    const selected = ordered.slice(start, end + 1);
    return {
      keys: selected.map((item) => item.key),
      text: joinSelectedItems(selected),
      start,
      end,
    };
  }

  function rgbToHex(color) {
    const values = (color || [0, 0, 0]).map((value) =>
      clamp(Math.round(Number(value) || 0), 0, 255),
    );
    return `#${values.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
  }

  function colorDistance(first, second) {
    return Math.hypot(
      first[0] - second[0],
      first[1] - second[1],
      first[2] - second[2],
    );
  }

  function estimateAppearance(data, width, height) {
    if (!data?.length || width < 1 || height < 1) {
      return {
        textColor: "#111111",
        backgroundColor: "#ffffff",
        backgroundVariance: 0,
        uniformBackground: true,
        foreground: [17, 17, 17],
        background: [255, 255, 255],
      };
    }
    const buckets = new Map();
    const borderBuckets = new Map();
    const add = (map, red, green, blue) => {
      const key = `${red >> 4},${green >> 4},${blue >> 4}`;
      const entry = map.get(key) || { count: 0, sum: [0, 0, 0] };
      entry.count += 1;
      entry.sum[0] += red;
      entry.sum[1] += green;
      entry.sum[2] += blue;
      map.set(key, entry);
    };
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const offset = (y * width + x) * 4;
        if ((data[offset + 3] ?? 255) < 32) continue;
        const red = data[offset];
        const green = data[offset + 1];
        const blue = data[offset + 2];
        add(buckets, red, green, blue);
        if (x < 2 || y < 2 || x >= width - 2 || y >= height - 2) {
          add(borderBuckets, red, green, blue);
        }
      }
    }
    const average = (entry) =>
      entry
        ? entry.sum.map((value) => value / Math.max(1, entry.count))
        : [255, 255, 255];
    const mostFrequent = (map) =>
      [...map.values()].sort((left, right) => right.count - left.count)[0];
    const background = average(
      mostFrequent(borderBuckets) || mostFrequent(buckets),
    );
    let foregroundEntry = null;
    let foregroundScore = -1;
    for (const entry of buckets.values()) {
      const color = average(entry);
      const contrast = colorDistance(color, background);
      if (contrast < 24) continue;
      const score = Math.sqrt(entry.count) * contrast;
      if (score > foregroundScore) {
        foregroundEntry = entry;
        foregroundScore = score;
      }
    }
    const foreground = foregroundEntry
      ? average(foregroundEntry)
      : background.reduce((sum, value) => sum + value, 0) / 3 > 128
        ? [17, 17, 17]
        : [245, 245, 245];
    let varianceTotal = 0;
    let varianceCount = 0;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        if (!(x < 2 || y < 2 || x >= width - 2 || y >= height - 2)) continue;
        const offset = (y * width + x) * 4;
        varianceTotal += colorDistance(
          [data[offset], data[offset + 1], data[offset + 2]],
          background,
        ) ** 2;
        varianceCount += 1;
      }
    }
    const backgroundVariance = Math.sqrt(
      varianceTotal / Math.max(1, varianceCount),
    );
    return {
      textColor: rgbToHex(foreground),
      backgroundColor: rgbToHex(background),
      backgroundVariance,
      uniformBackground: backgroundVariance < 24,
      foreground,
      background,
    };
  }

  function captureTextAppearance(canvas, rect) {
    const context = canvas?.getContext?.("2d", { willReadFrequently: true });
    if (!context || !rect || !canvas.width || !canvas.height) return null;
    const displayWidth = Number(rect.pageWidth) || canvas.clientWidth || canvas.width;
    const displayHeight = Number(rect.pageHeight) || canvas.clientHeight || canvas.height;
    const scaleX = canvas.width / Math.max(1, displayWidth);
    const scaleY = canvas.height / Math.max(1, displayHeight);
    const left = clamp(Math.floor((rect.left || 0) * scaleX), 0, canvas.width - 1);
    const top = clamp(Math.floor((rect.top || 0) * scaleY), 0, canvas.height - 1);
    const width = clamp(
      Math.ceil((rect.width || 1) * scaleX),
      1,
      canvas.width - left,
    );
    const height = clamp(
      Math.ceil((rect.height || 1) * scaleY),
      1,
      canvas.height - top,
    );
    try {
      const image = context.getImageData(left, top, width, height);
      const appearance = estimateAppearance(image.data, width, height);
      if (appearance.uniformBackground || typeof document === "undefined") {
        return { ...appearance, backgroundPatchData: null };
      }
      const cleaned = new ImageData(
        new Uint8ClampedArray(image.data),
        width,
        height,
      );
      const foregroundContrast = colorDistance(
        appearance.foreground,
        appearance.background,
      );
      for (let y = 0; y < height; y += 1) {
        const leftOffset = (y * width) * 4;
        const rightOffset = (y * width + width - 1) * 4;
        const leftColor = [
          image.data[leftOffset],
          image.data[leftOffset + 1],
          image.data[leftOffset + 2],
        ];
        const rightColor = [
          image.data[rightOffset],
          image.data[rightOffset + 1],
          image.data[rightOffset + 2],
        ];
        for (let x = 0; x < width; x += 1) {
          const offset = (y * width + x) * 4;
          const color = [
            image.data[offset],
            image.data[offset + 1],
            image.data[offset + 2],
          ];
          const foregroundDistance = colorDistance(color, appearance.foreground);
          const backgroundDistance = colorDistance(color, appearance.background);
          const isTextPixel =
            foregroundContrast > 28 &&
            foregroundDistance < Math.max(58, backgroundDistance * 0.88);
          if (!isTextPixel) continue;
          const ratio = width <= 1 ? 0 : x / (width - 1);
          for (let channel = 0; channel < 3; channel += 1) {
            cleaned.data[offset + channel] = Math.round(
              leftColor[channel] * (1 - ratio) + rightColor[channel] * ratio,
            );
          }
          cleaned.data[offset + 3] = 255;
        }
      }
      const patch = document.createElement("canvas");
      patch.width = width;
      patch.height = height;
      patch.getContext("2d")?.putImageData(cleaned, 0, 0);
      return {
        ...appearance,
        backgroundPatchData: patch.toDataURL("image/png"),
      };
    } catch {
      return null;
    }
  }

  function dataUrlToBytes(value) {
    const source = String(value || "");
    const comma = source.indexOf(",");
    if (comma < 0) return new Uint8Array();
    const payload = source.slice(comma + 1);
    if (typeof Buffer !== "undefined") {
      return new Uint8Array(Buffer.from(payload, "base64"));
    }
    const binary = atob(payload);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return bytes;
  }

  return Object.freeze({
    orderTextItems,
    joinSelectedItems,
    createTextRange,
    rgbToHex,
    estimateAppearance,
    captureTextAppearance,
    dataUrlToBytes,
  });
});
