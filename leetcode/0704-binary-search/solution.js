export function search(nums, target) {
  let low = 0;
  let high = nums.length - 1;

  // <= because when the two meet there is still one item to check.
  while (low <= high) {
    // Math.floor: there is no half position in an array.
    const middle = Math.floor((low + high) / 2);

    if (nums[middle] === target) {
      return middle;
    }

    if (nums[middle] < target) {
      // The middle has been checked, so start after it.
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }

  return -1;
}
