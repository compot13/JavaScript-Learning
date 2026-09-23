# LeetCode 1480: Running Sum of 1d Array

Run the tests for this problem with:

```
npm run test -- lc-1480
```

Problem on LeetCode: <https://leetcode.com/problems/running-sum-of-1d-array/>

## The lesson

The problem: given an array of numbers, return an array where each position
holds the total of every number up to and including that position.

```
input:  [1, 2, 3, 4]
output: [1, 3, 6, 10]
```

Position 0 is `1`. Position 1 is `1 + 2`. Position 2 is `1 + 2 + 3`. Position 3
is `1 + 2 + 3 + 4`.

This is the first problem in the track because it needs one loop and one
variable, and because the shape it teaches - carry a value across a loop, push
a result as you go - is in half the problems that follow.

### The naive reading

You could, for each position, add up everything before it:

```js
// For position 3, add positions 0, 1, 2 and 3. Then do the same for every
// other position, starting again from the beginning each time.
```

That works and it repeats itself. By the time you reach position 3 you have
already worked out the total up to position 2, twice. Throwing that away and
recalculating is the thing to notice.

### Carrying the total

Keep the running total in a variable outside the loop. At each position, add
the current number to it, and record what it has become:

```
numbers: [1, 2, 3, 4]

start        total = 0    result = []
see 1        total = 1    result = [1]
see 2        total = 3    result = [1, 3]
see 3        total = 6    result = [1, 3, 6]
see 4        total = 10   result = [1, 3, 6, 10]
```

One pass, one addition per item. Each answer is built from the previous answer
rather than from scratch.

### The pieces you need

From lesson 6, a variable declared above a loop and changed inside it:

```js
let total = 0;
for (const n of numbers) {
  total += n;
}
```

From lesson 9, building an array as you go:

```js
const result = [];
result.push(total);
```

Put those two together and you have the answer. The order matters: add first,
then push, because position 0 already includes the first number.

### Why not `map`?

`map` gives you each item, and you would still need somewhere to keep the
running total, which means a variable outside the callback. That works, but it
makes the callback depend on when it runs rather than only on its input, and
that is a habit worth not building. A plain loop says what is happening here.

<details>
<summary>Common mistakes</summary>

**Declaring the total inside the loop.**

```js
for (const n of numbers) {
  let total = 0;
  total += n;
  result.push(total);
}
// returns the input unchanged
```

The total is reset on every pass, so each answer is the number by itself. The
result looks plausible for `[1, 1, 1]`, which is why it survives a quick check.

**Pushing before adding.**

```js
result.push(total);
total += n;
// [0, 1, 3, 6] - one position out
```

The first answer must already include the first number.

**Returning the total instead of the array.**

The question asks for an array of the same length, not the final sum.

</details>

## Check yourself

1. What is the running sum of `[3, 1, 2]`?

<details><summary>Answer</summary>

`[3, 4, 6]`. Each position adds the next number to the total so far. The
tempting wrong answer is `[3, 1, 2]` unchanged, which is what you get when the
total is declared inside the loop and reset every pass.

</details>

2. How long is the output compared with the input?

<details><summary>Answer</summary>

Exactly the same length. Every position gets an answer. The tempting wrong
answer is "one number", which is the plain sum - this problem asks for the
total *at each step*.

</details>

3. What is the first number of the output, always?

<details><summary>Answer</summary>

The first number of the input, because there is nothing before it to add. The
tempting wrong answer is `0`, which is what you get by pushing the total before
adding the current number.

</details>

4. Where must the running total be declared?

<details><summary>Answer</summary>

Above the loop, so it survives every pass. The tempting wrong answer is inside,
next to where it is used - that resets it each time, and it also stops existing
when the loop ends.

</details>

5. What should the function return for an empty array?

<details><summary>Answer</summary>

An empty array. The loop body never runs, so the result stays as it started -
no special case needed, as long as you return the array you built rather than
the total.

</details>

6. What does this problem's approach avoid doing?

<details><summary>Answer</summary>

Adding up the same numbers again for every position. Carrying the total means
each answer is built from the one before it, in one pass. The tempting answer
is "nothing, both work" - both give the right result, and one does far more
work as the array grows.

</details>

## Your task

Open `leetcode/1480-running-sum-of-1d-array/exercise.js` and write
`runningSum(nums)`.

It returns a new array where the value at each position is the total of every
number from position 0 up to and including that position.

```js
runningSum([1, 2, 3, 4])   // [1, 3, 6, 10]
runningSum([1, 1, 1, 1])   // [1, 2, 3, 4]
runningSum([3, 1, 2, 10])  // [3, 4, 6, 16]
runningSum([])             // []
```

The array you are given must not be changed.

When the tests pass, record it with `npm run learn -- check`.
