# LeetCode 704: Binary Search

Run the tests for this problem with:

```
npm run test -- lc-704
```

Problem on LeetCode: <https://leetcode.com/problems/binary-search/>

## The lesson

Given a **sorted** array of distinct numbers and a target, return the index of
the target, or `-1` when it is not there.

```
nums = [-1, 0, 3, 5, 9, 12], target = 9   -> 4
nums = [-1, 0, 3, 5, 9, 12], target = 2   -> -1
```

Looking at every item in turn would work. The point of this problem is the
approach that uses the fact that the array is sorted.

### Halving the search

Think of looking up a word in a paper dictionary. You do not start at page one.
You open it in the middle, see whether your word is before or after, and throw
half the book away. Then you do it again.

```
[-1, 0, 3, 5, 9, 12]   looking for 9

low = 0, high = 5, middle = 2 -> nums[2] is 3, too small
   so the answer is somewhere after index 2
low = 3, high = 5, middle = 4 -> nums[4] is 9, found it
   return 4
```

Six items took two checks. A thousand items take ten. A million take twenty.
Each step halves what is left.

### The three variables

- `low`: the first index still worth looking at, starting at 0.
- `high`: the last index still worth looking at, starting at `length - 1`.
- `middle`: halfway between them, recalculated every pass.

```js
const middle = Math.floor((low + high) / 2);
```

`Math.floor` is needed because the average of two indexes is often not a whole
number, and there is no half position.

Each pass does one of three things:

- `nums[middle] === target`: return `middle`.
- `nums[middle] < target`: the target is to the right, so `low = middle + 1`.
- `nums[middle] > target`: the target is to the left, so `high = middle - 1`.

The `+ 1` and `- 1` matter. The middle has been checked and is not the answer,
so leaving it in the range means a loop that never ends.

### When to stop

```js
while (low <= high) {
```

`low` and `high` close in on each other. When `low` passes `high`, there is
nothing left to search, and the target is not in the array. Return `-1` after
the loop.

`<=` rather than `<`: when `low` and `high` are equal there is still one item
left to check, and forgetting that is the classic bug here - it makes the
function miss targets that are present.

### Requirements

Binary search only works on **sorted** data. On an unsorted array it will
confidently return `-1` for values that are there, because "the target is to
the right" is only true when the array is in order.

<details>
<summary>Common mistakes</summary>

**Using `<` instead of `<=`.**

```js
while (low < high) {
```

The last remaining item is never checked, so single-item ranges are missed.
Test with `[5]` and target 5.

**Forgetting to move past the middle.**

```js
low = middle; // instead of middle + 1
```

When `low` and `high` are next to each other, `middle` keeps coming out the
same and the loop never ends.

**Forgetting `Math.floor`.**

```js
const middle = (low + high) / 2; // 2.5
nums[2.5]; // undefined
```

There is no position 2.5, so the comparison is against `undefined` and the
search goes wrong without an error.

</details>

## Check yourself

1. How many checks does binary search need for 1000 sorted items, roughly?

<details><summary>Answer</summary>

About 10, because each check halves what is left and 2 to the power 10 is 1024.
The tempting wrong answer is 500, the average for looking at every item in
turn.

</details>

2. How is the middle index calculated?

<details><summary>Answer</summary>

`Math.floor((low + high) / 2)`. The rounding matters because array positions
are whole numbers. The tempting wrong answer leaves out the rounding and reads
a fractional index, which gives `undefined` with no error.

</details>

3. What happens when `nums[middle]` is smaller than the target?

<details><summary>Answer</summary>

The target must be to the right, so `low` becomes `middle + 1`. The tempting
wrong answer is `low = middle`, which can leave the range the same size forever
and loop without end.

</details>

4. Why is the loop condition `low <= high` rather than `low < high`?

<details><summary>Answer</summary>

Because when they are equal there is still one item left to check. The tempting
wrong answer is that they are equivalent - with `<`, searching `[5]` for 5
returns `-1`.

</details>

5. What do you return when the loop finishes?

<details><summary>Answer</summary>

`-1`. Reaching the end means the range is empty and the target is not in the
array. The tempting wrong answer is `undefined` or `null`; the problem asks for
`-1`, which matches `indexOf`.

</details>

6. Does binary search work on an unsorted array?

<details><summary>Answer</summary>

No. Discarding half the array relies on the order, so on unsorted data it
returns wrong answers rather than complaining. The tempting wrong answer is
that it is slower but still correct.

</details>

## Your task

Open `leetcode/0704-binary-search/exercise.js` and write `search(nums, target)`.

`nums` is sorted ascending and holds distinct numbers. Return the index of
`target`, or `-1`. Halve the range each step rather than checking every item.

```js
search([-1, 0, 3, 5, 9, 12], 9) // 4
search([-1, 0, 3, 5, 9, 12], 2) // -1
search([5], 5)                  // 0
search([], 1)                   // -1
```

When the tests pass, record it with `npm run learn -- check`.
