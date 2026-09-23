export function moveZeroes(nums) {
  // Where the next non-zero number belongs.
  let write = 0;

  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) {
      nums[write] = nums[read];
      // Only advances when something was written, so it falls behind by the
      // number of zeroes seen.
      write += 1;
    }
  }

  // Everything from the write position on is a leftover.
  for (let i = write; i < nums.length; i++) {
    nums[i] = 0;
  }
}
