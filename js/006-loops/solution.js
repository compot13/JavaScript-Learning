export function sumTo(n) {
  // The accumulator lives outside the loop, so it survives every pass.
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

export function countVowels(text) {
  const vowels = 'aeiou';
  let count = 0;
  for (const letter of text.toLowerCase()) {
    // Lowercasing the text once means one check covers both cases.
    if (vowels.includes(letter)) {
      count += 1;
    }
  }
  return count;
}

export function reverse(text) {
  let reversed = '';
  for (const letter of text) {
    // Each new letter goes in front of everything collected so far.
    reversed = letter + reversed;
  }
  return reversed;
}
