// Built once, outside the function, because it never changes.
const VALUES = new Map([
  ['I', 1],
  ['V', 5],
  ['X', 10],
  ['L', 50],
  ['C', 100],
  ['D', 500],
  ['M', 1000],
]);

export function romanToInt(s) {
  let total = 0;

  for (let i = 0; i < s.length; i++) {
    const current = VALUES.get(s[i]);
    // Past the end counts as 0, which is never larger, so the last symbol is
    // always added.
    const next = VALUES.get(s[i + 1]) ?? 0;

    if (current < next) {
      total -= current;
    } else {
      total += current;
    }
  }

  return total;
}
