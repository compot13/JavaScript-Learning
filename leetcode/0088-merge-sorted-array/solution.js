export function merge(nums1, m, nums2, n) {
  // The last real number of each array, and the last position overall.
  let i = m - 1;
  let j = n - 1;
  let write = m + n - 1;

  // Runs until nums2 is exhausted: anything left in nums1 is already in place.
  while (j >= 0) {
    // The i >= 0 guard stops this reading past the front of nums1.
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[write] = nums1[i];
      i -= 1;
    } else {
      nums1[write] = nums2[j];
      j -= 1;
    }
    write -= 1;
  }
}
