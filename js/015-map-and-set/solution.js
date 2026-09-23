export function unique(items) {
  // A Set drops duplicates as it is built, and spreading turns it back into
  // an array in order of first appearance.
  return [...new Set(items)];
}

export function countWords(words) {
  const counts = new Map();
  for (const word of words) {
    // ?? 0 covers the first time a word is seen, when get returns undefined.
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return counts;
}

export function firstRepeated(items) {
  const seen = new Set();
  for (const item of items) {
    // Checking before adding means the answer is the second appearance.
    if (seen.has(item)) {
      return item;
    }
    seen.add(item);
  }
  return undefined;
}
