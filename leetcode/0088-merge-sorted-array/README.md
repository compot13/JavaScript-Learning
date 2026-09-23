# LeetCode 88: Merge Sorted Array

Run the tests for this problem with:

```
npm run test -- lc-88
```

Problem on LeetCode: <https://leetcode.com/problems/merge-sorted-array/>

## The lesson

Two sorted arrays, `nums1` and `nums2`. Merge `nums2` into `nums1` so that
`nums1` ends up sorted. Do it in place.

`nums1` is already the right length: it holds `m` real numbers followed by `n`
zeroes, which are there as space for `nums2`'s `n` numbers.

```
nums1 = [1, 2, 3, 0, 0, 0], m = 3
nums2 = [2, 5, 6],          n = 3
after: nums1 = [1, 2, 2, 3, 5, 6]
```

The zeroes are padding, not data. `m` tells you how many of `nums1`'s entries
are real.

### Why filling from the front does not work

Suppose you compare the first numbers and write the smaller one to position 0.
Position 0 currently holds a real number you have not used yet. Writing over it
loses it.

You could copy `nums1` first, but this problem is here to teach the trick that
avoids that.

### Fill from the back

The largest number of the merged result belongs at the very end of `nums1` -
which is padding, so there is nothing to lose by writing there. And every
position you write to is one you have already read past.

Three indexes, all moving backwards:

- `i` at the last real number of `nums1`, which is `m - 1`
- `j` at the last number of `nums2`, which is `n - 1`
- `write` at the last position of `nums1`, which is `m + n - 1`

Compare the two candidates, write the larger to `write`, and step that index
back along with whichever one you took from.

```
nums1 = [1, 2, 3, _, _, _]   i = 2 (3)
nums2 = [2, 5, 6]            j = 2 (6)   write = 5

6 > 3  -> write 6 at 5   [1,2,3,_,_,6]   j = 1, write = 4
5 > 3  -> write 5 at 4   [1,2,3,_,5,6]   j = 0, write = 3
3 > 2  -> write 3 at 3   [1,2,3,3,5,6]   i = 1, write = 2
2 >= 2 -> write 2 at 2   [1,2,2,3,5,6]   j = -1, write = 1
nums2 is finished, and nums1's own numbers are already in place
```

### When one side runs out

If `nums2` runs out first, you are finished: everything left in `nums1` is
already in the right place, because it never moved.

If `nums1`'s real numbers run out first, the rest of `nums2` still has to be
copied in. So the loop condition to write is "while `j` is still 0 or more":

```js
while (j >= 0) {
  if (i >= 0 && nums1[i] > nums2[j]) {
    nums1[write] = nums1[i];
    i -= 1;
  } else {
    nums1[write] = nums2[j];
    j -= 1;
  }
  write -= 1;
}
```

The `i >= 0 &&` guard is what stops it reading past the front of `nums1` once
that side is exhausted. Check `nums1 = [0], m = 0, nums2 = [1], n = 1` against
your code: it is the case that catches a missing guard.

### Why this is worth knowing

"Write backwards so you never overwrite unread data" is the general lesson.
Whenever you need to move things around inside one array and space is tight,
ask which end is safe to write to first.

<details>
<summary>Common mistakes</summary>

**Merging from the front.**

Writing to position 0 destroys a number you still need. The whole point of
starting at the back is that the far end is padding.

**Using `nums1.length` instead of `m`.**

`nums1.length` is `m + n`, counting the padding zeroes as data. `m` says how
many are real.

**Forgetting the guard when `nums1` runs out.**

```js
if (nums1[i] > nums2[j])
```

With `i` at `-1`, `nums1[-1]` is `undefined` and every comparison against it is
`false`, which happens to work here - but the habit fails elsewhere. Check `i`
first.

**Returning a new array.**

The tests read `nums1` after the call. Returning something is ignored.

</details>

## Check yourself

1. What are the zeroes at the end of `nums1` for?

<details><summary>Answer</summary>

Space for the numbers coming from `nums2`. They are padding, not data. The
tempting wrong answer is that they are values to be sorted, which would put
zeroes in the middle of the result.

</details>

2. Which end do you start writing at, and why?

<details><summary>Answer</summary>

The back, because the last positions are padding and can be overwritten
safely, and because every position you write to is one you have already read.
The tempting wrong answer is the front, which destroys unread values.

</details>

3. Where do the three indexes start?

<details><summary>Answer</summary>

`m - 1` in `nums1`, `n - 1` in `nums2`, and `m + n - 1` for the write position.
The tempting wrong answer uses `nums1.length - 1` for the first, which points
at padding rather than at the last real number.

</details>

4. What happens when `nums2` runs out before `nums1`?

<details><summary>Answer</summary>

Nothing more is needed: the remaining numbers of `nums1` are already in their
final positions. The tempting wrong answer is that they must be copied along -
they never moved, so they are where they belong.

</details>

5. What happens when `nums1`'s real numbers run out first?

<details><summary>Answer</summary>

The rest of `nums2` still has to be written in, which is why the loop runs
until `nums2` is exhausted rather than stopping when `nums1` is. The tempting
wrong answer is to stop at the first exhausted array, which drops numbers.

</details>

6. What does the function return?

<details><summary>Answer</summary>

Nothing. `nums1` is changed in place and the caller reads it. The tempting
wrong answer is a merged array, which the tests never look at.

</details>

## Your task

Open `leetcode/0088-merge-sorted-array/exercise.js` and write
`merge(nums1, m, nums2, n)`.

It merges `nums2` into `nums1` in place, leaving `nums1` sorted. It returns
nothing. Fill from the back; do not build a new array and do not call `sort`.

```js
const nums1 = [1, 2, 3, 0, 0, 0];
merge(nums1, 3, [2, 5, 6], 3);
nums1 // [1, 2, 2, 3, 5, 6]
```

When the tests pass, record it with `npm run learn -- check`.
