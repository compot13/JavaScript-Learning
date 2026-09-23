export function toJson(value) {
  // The second argument is a filter that is not needed here; the third is the
  // indentation.
  return JSON.stringify(value, null, 2);
}

export function parseOrNull(text) {
  try {
    return JSON.parse(text);
  } catch {
    // parse signals bad input by throwing, so this is the only failure path.
    return null;
  }
}

export function deepCopy(value) {
  // Flattening to text and rebuilding shares nothing with the original.
  return JSON.parse(JSON.stringify(value));
}
