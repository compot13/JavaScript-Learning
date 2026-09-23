export function fizzBuzz(n) {
  const result = [];

  // Counts from 1 to n inclusive, because the problem does.
  for (let i = 1; i <= n; i++) {
    // The most specific test comes first, or it can never be reached.
    if (i % 3 === 0 && i % 5 === 0) {
      result.push('FizzBuzz');
    } else if (i % 3 === 0) {
      result.push('Fizz');
    } else if (i % 5 === 0) {
      result.push('Buzz');
    } else {
      // Every entry is a string, including the plain numbers.
      result.push(String(i));
    }
  }

  return result;
}
