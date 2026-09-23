# LeetCode 1929: Concatenation of Array

Run the tests for this problem with:

```
npm run test -- lc-1929
```

Problem on LeetCode: <https://leetcode.com/problems/concatenation-of-array/>

## The lesson

Given an array `nums` of length `n`, return an array of length `2n` that is
`nums` followed by `nums` again.

```
input:  [1, 2, 1]
output: [1, 2, 1, 1, 2, 1]
```

### Three ways, all correct

**With spread**, from lesson 13:

```js
const doubled = [...nums, ...nums];
```

The three dots unpack the array's contents into the new array, twice. This is
the shortest correct answer and the one to reach for in real code.

**With `concat`**, which returns a new array made of the one you called it on
plus whatever you pass:

```js
const doubled = nums.concat(nums);
```

**With a loop**, which is what the other two do underneath:

```js
const result = [];
for (const n of nums) {
  result.push(n);
}
for (const n of nums) {
  result.push(n);
}
```

Or one loop that runs twice as long, using the remainder operator to wrap
around:

```js
for (let i = 0; i < nums.length * 2; i++) {
  result.push(nums[i % nums.length]);
}
```

With a length of 3, `i % 3` produces 0, 1, 2, 0, 1, 2. That `%` trick for
wrapping an index back to the start is worth keeping - it comes up whenever
something repeats.

Write the loop version for this exercise. The point is to see what spread is
doing, not to avoid it.

### What must not happen

```js
nums.push(...nums); // changes the caller's array
return nums;
```

This produces the right numbers and modifies the array you were given. The
tests check the input is unchanged, for the reason lesson 9 gave: a function
that answers a question should not rearrange its caller's data on the way.

### Why this problem is here

It is the simplest possible "build a new array from an old one" exercise. The
useful habit it builds is reading the input and writing to a separate result,
rather than editing in place - which is the default you want unless a problem
specifically asks otherwise.

<details>
<summary>Common mistakes</summary>

**Returning the input after changing it.**

```js
nums.push(...nums);
return nums;
```

The caller's array is now twice as long. Build a new array instead.

**Pushing the array rather than its items.**

```js
result.push(nums);
// [ [ 1, 2, 1 ] ] - one item, which is an array
```

`push` adds whatever you give it as a single item. To add the contents, push
each one, or spread.

**Looping to `nums.length` and expecting a double-length answer.**

```js
for (let i = 0; i < nums.length; i++) {
```

That is one copy. For two, the loop has to run twice as many times, or there
have to be two loops.

</details>

## Check yourself

1. What is the output for `[1, 2, 1]`?

<details><summary>Answer</summary>

`[1, 2, 1, 1, 2, 1]`. The whole array repeats once. The tempting wrong answer
is `[1, 1, 2, 2, 1, 1]`, where each item is doubled in place - a different
problem.

</details>

2. How long is the output?

<details><summary>Answer</summary>

Twice the input length. An input of 3 gives 6. The tempting wrong answer is "3,
with each item doubled in value", which is what `map((n) => n * 2)` does.

</details>

3. What does `result.push(nums)` add?

<details><summary>Answer</summary>

One item, which is the whole array, giving something like `[[1, 2, 1]]`. The
tempting wrong answer is that it adds the contents - that needs
`push(...nums)` or a loop.

</details>

4. What does `i % nums.length` produce as `i` counts from 0 to 5 with a length
   of 3?

<details><summary>Answer</summary>

`0, 1, 2, 0, 1, 2`. The remainder wraps the index back to the start. The
tempting wrong answer is `0, 1, 2, 3, 4, 5`, forgetting that `%` is applied
before the index is used.

</details>

5. Why do the tests check that `nums` is unchanged?

<details><summary>Answer</summary>

Because a function asked for a new array should not modify the caller's. The
tempting shortcut, `nums.push(...nums)`, returns the right values and leaves
the caller with a corrupted array.

</details>

6. What is the output for an empty array?

<details><summary>Answer</summary>

An empty array: twice nothing is nothing. The tempting wrong answer is an array
containing one empty array, which is what pushing the array itself would give.

</details>

## Your task

Open `leetcode/1929-concatenation-of-array/exercise.js` and write
`getConcatenation(nums)`.

It returns a new array containing every item of `nums`, followed by every item
of `nums` again. Write it with a loop rather than spread or `concat`, so you
see what those do.

```js
getConcatenation([1, 2, 1]) // [1, 2, 1, 1, 2, 1]
getConcatenation([1, 3])    // [1, 3, 1, 3]
getConcatenation([])        // []
```

The array you are given must not be changed.

When the tests pass, record it with `npm run learn -- check`.
