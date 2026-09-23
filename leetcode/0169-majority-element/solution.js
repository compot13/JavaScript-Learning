export function majorityElement(nums) {
  const counts = new Map();
  // The best value so far, and how many times it was seen.
  let best = nums[0];
  let bestCount = 0;

  for (const n of nums) {
    const count = (counts.get(n) ?? 0) + 1;
    counts.set(n, count);

    if (count > bestCount) {
      bestCount = count;
      best = n;
    }
  }

  return best;
}
