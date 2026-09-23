export function getConcatenation(nums) {
  const result = [];

  // Twice as many passes as there are items.
  for (let i = 0; i < nums.length * 2; i++) {
    // The remainder wraps the index back to 0 when it reaches the end.
    result.push(nums[i % nums.length]);
  }

  return result;
}
