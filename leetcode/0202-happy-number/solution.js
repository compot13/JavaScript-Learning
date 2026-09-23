/** The sum of the squares of a number's digits. */
function squareDigits(n) {
  let total = 0;
  let remaining = n;

  while (remaining > 0) {
    const digit = remaining % 10;
    total += digit * digit;
    // Math.floor drops the digit just used.
    remaining = Math.floor(remaining / 10);
  }

  return total;
}

export function isHappy(n) {
  const seen = new Set();
  let current = n;

  // Ends either at 1, or at a value that has come round again.
  while (current !== 1 && !seen.has(current)) {
    seen.add(current);
    current = squareDigits(current);
  }

  return current === 1;
}
