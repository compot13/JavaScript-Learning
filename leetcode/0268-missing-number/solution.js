export function missingNumber(nums) {
  const n = nums.length;
  // What 0 + 1 + ... + n comes to, without looping.
  const expected = (n * (n + 1)) / 2;
  const actual = nums.reduce((total, value) => total + value, 0);
  // The gap between them is the one number that is not there.
  return expected - actual;
}
