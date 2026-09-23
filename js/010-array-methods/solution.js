export function doubleAll(numbers) {
  // map returns a new array of whatever the callback returns for each item.
  return numbers.map((n) => n * 2);
}

export function longWords(words, minLength) {
  // The callback is a test, so filter keeps the words it answers true for.
  return words.filter((word) => word.length >= minLength);
}

export function hasNegative(numbers) {
  // some stops as soon as one item passes, and returns a boolean either way.
  return numbers.some((n) => n < 0);
}
