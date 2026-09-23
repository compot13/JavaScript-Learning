export function isAnagram(s, t) {
  // Different lengths cannot be anagrams, and this check makes the rest exact.
  if (s.length !== t.length) {
    return false;
  }

  const counts = new Map();
  for (const letter of s) {
    counts.set(letter, (counts.get(letter) ?? 0) + 1);
  }

  for (const letter of t) {
    const remaining = counts.get(letter) ?? 0;
    // Zero remaining means t uses this letter more often than s has it.
    if (remaining === 0) {
      return false;
    }
    counts.set(letter, remaining - 1);
  }

  return true;
}
