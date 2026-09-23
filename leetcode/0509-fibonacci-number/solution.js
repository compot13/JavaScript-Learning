export function fib(n) {
  // The first two numbers are given rather than calculated.
  if (n < 2) {
    return n;
  }

  let previous = 0;
  let current = 1;

  // Starts at 2 because 0 and 1 are already covered above.
  for (let i = 2; i <= n; i++) {
    // The right-hand side is built before either name is reassigned, so no
    // temporary variable is needed.
    [previous, current] = [current, previous + current];
  }

  return current;
}
