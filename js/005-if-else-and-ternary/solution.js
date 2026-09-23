export function grade(score) {
  // Strictest test first: 95 passes every one of these, and the top one wins.
  if (score >= 90) return 'A';
  if (score >= 70) return 'B';
  if (score >= 50) return 'C';
  return 'F';
}

export function ticketPrice(age) {
  // These ranges run the other way, so they are ordered from the low end up.
  if (age < 5) return 0;
  if (age < 18) return 8;
  if (age < 65) return 12;
  return 9;
}

export function pluralise(count, word) {
  // The ternary chooses between two values, and a template literal joins them.
  return `${count} ${word}${count === 1 ? '' : 's'}`;
}
