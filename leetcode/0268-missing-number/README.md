# LeetCode 268: Missing Number

Run the tests for this problem with:

```
npm run test -- lc-268
```

Problem on LeetCode: <https://leetcode.com/problems/missing-number/>

## The lesson

You are given an array holding `n` distinct numbers taken from the range `0` to
`n`. One number from that range is missing. Return it.

```
[3, 0, 1]       -> 2      (range is 0 to 3, and 2 is absent)
[0, 1]          -> 2      (range is 0 to 2)
[9,6,4,2,3,5,7,0,1] -> 8  (range is 0 to 9)
```

The array has `n` items, and the range `0` to `n` has `n + 1` numbers, so
exactly one is missing.

### The search approach

For each number from 0 to `n`, ask whether the array contains it:

```js
for (let i = 0; i <= nums.length; i++) {
  if (!nums.includes(i)) return i;
}
```

Correct, and `includes` searches the whole array each time, so the work grows
with the square of the length. Fine for ten numbers, slow for a hundred
thousand.

### The sum approach

Add up what the numbers *should* be, add up what they *are*, and subtract.

The numbers 0 to `n` add up to a total you can calculate directly. For 0 to 3:
0 + 1 + 2 + 3 = 6. And there is a formula that gives that without a loop:

```
n * (n + 1) / 2
```

For `n = 3`: `3 * 4 / 2` = 6. This is worth knowing; it is the oldest trick in
arithmetic, and it turns a loop into one multiplication.

Now add up the array you were actually given. For `[3, 0, 1]` that is 4. The
difference, `6 - 4`, is `2`, which is the missing number.

```
expected total (0 to 3):  6
actual total:             4
missing:                  2
```

One pass to add the array up, and no searching.

### In code

`n` is the array's length. `reduce` from lesson 11 adds the array up:

```js
const n = nums.length;
const expected = (n * (n + 1)) / 2;
const actual = nums.reduce((total, x) => total + x, 0);
return expected - actual;
```

Four lines, and no special case for a missing `0` or a missing `n` - both fall
out of the arithmetic.

### Checking the edges

- `[0]`: `n` is 1, expected is 1, actual is 0, answer 1. The range is 0 to 1
  and 1 is missing. Correct.
- `[1]`: expected 1, actual 1, answer 0. Correct.

Those two are worth doing on paper, because they are where an off-by-one in the
formula shows up.

<details>
<summary>Common mistakes</summary>

**Using the array length wrongly in the formula.**

The range is 0 to `n` where `n` is the array's *length*, not the largest value
in it and not the length minus one. Test with `[0]` to check.

**Sorting and looking for a gap.**

Works, and does more than it needs to: sorting costs more than one pass, and
the missing number could be at either end, which needs extra cases.

**Assuming the array is sorted.**

The examples are not. Any solution that reads `nums[i]` expecting it to equal
`i` fails on `[9, 6, 4, 2, 3, 5, 7, 0, 1]`.

</details>

## Check yourself

1. For `[3, 0, 1]`, what range should be present?

<details><summary>Answer</summary>

0 to 3, because the array has 3 items and the range runs to `n` where `n` is
the length. The tempting wrong answer is 0 to 2, using the last index instead
of the length - that misses the case where `n` itself is the absent number.

</details>

2. What do the numbers 0 to 4 add up to?

<details><summary>Answer</summary>

10. By the formula, `4 * 5 / 2` = 10. The tempting wrong answer is 15, which is
1 to 5 - the range here starts at zero, and zero adds nothing.

</details>

3. Why is the difference between the two totals the missing number?

<details><summary>Answer</summary>

Because the actual total is the expected total minus exactly the one number
that is absent. The tempting wrong answer is that it only works when the
numbers are sorted - addition does not care about order, which is the point.

</details>

4. What is the answer for `[0]`?

<details><summary>Answer</summary>

`1`. The length is 1, so the range is 0 to 1, and 1 is absent. The tempting
wrong answer is `0`, from reading the array as complete.

</details>

5. Why is checking `includes` for each number slower?

<details><summary>Answer</summary>

Because each `includes` walks the whole array, so the total work grows with the
square of the length. The tempting wrong answer is that it is equally fast
because it is one loop in your code - the second loop is hidden inside
`includes`.

</details>

6. Can you assume the input is sorted?

<details><summary>Answer</summary>

No. The examples are deliberately jumbled. The tempting wrong answer is yes,
because the first example looks nearly sorted; an approach that compares
`nums[i]` against `i` breaks immediately on the third example.

</details>

## Your task

Open `leetcode/0268-missing-number/exercise.js` and write `missingNumber(nums)`.

The array holds distinct numbers from the range 0 to `n`, where `n` is the
array's length, with exactly one missing. Return the missing one. Do not sort
the array, and do not search for each candidate.

```js
missingNumber([3, 0, 1])               // 2
missingNumber([0, 1])                  // 2
missingNumber([9,6,4,2,3,5,7,0,1])     // 8
missingNumber([0])                     // 1
```

When the tests pass, record it with `npm run learn -- check`.
