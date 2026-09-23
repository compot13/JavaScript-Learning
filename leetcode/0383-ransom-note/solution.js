export function canConstruct(ransomNote, magazine) {
  // Count the supply first.
  const available = new Map();
  for (const letter of magazine) {
    available.set(letter, (available.get(letter) ?? 0) + 1);
  }

  // Then spend it on the demand.
  for (const letter of ransomNote) {
    const left = available.get(letter) ?? 0;
    if (left === 0) {
      return false;
    }
    available.set(letter, left - 1);
  }

  // Letters left over in the magazine are allowed.
  return true;
}
