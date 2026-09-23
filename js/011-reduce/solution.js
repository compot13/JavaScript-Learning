export function sumOf(numbers) {
  // 0 is the neutral starting value for addition, and the answer for [].
  return numbers.reduce((total, n) => total + n, 0);
}

export function productOf(numbers) {
  // 1 is the neutral starting value for multiplication. Starting at 0 would
  // make every answer 0.
  return numbers.reduce((total, n) => total * n, 1);
}

export function longestWord(words) {
  // The accumulator is the best word so far. Using > rather than >= keeps the
  // earlier word when two are the same length.
  return words.reduce((best, word) => (word.length > best.length ? word : best), '');
}
