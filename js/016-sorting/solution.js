export function sortedNumbers(numbers) {
  // Spread first, so sort rearranges the copy rather than the caller's array.
  return [...numbers].sort((a, b) => a - b);
}

export function sortedByLength(words) {
  // Subtracting the lengths gives the negative, zero or positive that sort
  // wants. Equal lengths give zero, and a stable sort leaves those alone.
  return [...words].sort((a, b) => a.length - b.length);
}

export function sortedByAge(people) {
  return [...people].sort((a, b) => a.age - b.age);
}
