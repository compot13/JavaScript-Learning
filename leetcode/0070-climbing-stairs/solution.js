export function climbStairs(n) {
  // One way to climb one step, two ways to climb two.
  if (n <= 2) {
    return n;
  }

  let twoBelow = 1;
  let oneBelow = 2;

  for (let step = 3; step <= n; step++) {
    // Every route ends with a single step from below, or a double from two below.
    [twoBelow, oneBelow] = [oneBelow, oneBelow + twoBelow];
  }

  return oneBelow;
}
