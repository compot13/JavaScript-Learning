export function runningSum(nums) {
  const result = [];
  // The total lives outside the loop, so it carries from one pass to the next.
  let total = 0;

  for (const n of nums) {
    // Add first, then record: position 0 already includes the first number.
    total += n;
    result.push(total);
  }

  return result;
}
