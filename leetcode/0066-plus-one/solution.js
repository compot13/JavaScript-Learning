export function plusOne(digits) {
  // Work on a copy, so the caller's array is left alone.
  const result = [...digits];

  // Start at the ones column and move left.
  for (let i = result.length - 1; i >= 0; i--) {
    if (result[i] < 9) {
      // No overflow, so nothing further left can change.
      result[i] += 1;
      return result;
    }
    result[i] = 0;
  }

  // Every digit was a 9, so the number needs one more digit at the front.
  return [1, ...result];
}
