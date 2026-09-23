export function twoSum(nums, target) {
  // Each number seen so far, and the index it was seen at.
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const partner = target - nums[i];

    // Checked before storing, so a number can never pair with itself.
    if (seen.has(partner)) {
      return [seen.get(partner), i];
    }

    seen.set(nums[i], i);
  }

  // The problem promises an answer, so this is never reached.
  return [];
}
