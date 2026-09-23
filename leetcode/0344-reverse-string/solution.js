export function reverseString(s) {
  let left = 0;
  let right = s.length - 1;

  // Stop when the two meet: every pair has been swapped by then.
  while (left < right) {
    // The right-hand side is built from the current values before either
    // position is written to, so no temporary variable is needed.
    [s[left], s[right]] = [s[right], s[left]];
    left += 1;
    right -= 1;
  }
}
