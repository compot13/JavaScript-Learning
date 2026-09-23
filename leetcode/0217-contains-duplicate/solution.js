export function containsDuplicate(nums) {
  const seen = new Set();

  for (const n of nums) {
    // Check before adding, or every value looks like a repeat of itself.
    if (seen.has(n)) {
      return true;
    }
    seen.add(n);
  }

  return false;
}
