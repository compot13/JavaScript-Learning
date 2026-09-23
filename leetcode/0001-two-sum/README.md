# LeetCode 1: Two Sum

Run the tests for this problem with:

```
npm run test -- lc-1
```

Problem on LeetCode: <https://leetcode.com/problems/two-sum/>

## The lesson

Given an array of numbers and a target, return the indexes of the two numbers
that add up to the target. There is exactly one answer, and you may not use the
same element twice.

```
nums = [2, 7, 11, 15], target = 9  -> [0, 1]     because 2 + 7 = 9
nums = [3, 2, 4],      target = 6  -> [1, 2]     because 2 + 4 = 6
nums = [3, 3],         target = 6  -> [0, 1]
```

The answer is **indexes**, not the numbers themselves.

### Every pair

The direct approach: for each number, try every number after it.

```js
for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    if (nums[i] + nums[j] === target) return [i, j];
  }
}
```

Correct. The inner loop starts at `i + 1` so no pair is tried twice and nothing
is paired with itself. The work grows with the square of the length.

### Turning the question around

For each number, you do not need to search for its partner. You know exactly
what the partner must be:

```
partner = target - current
```

For `target = 9` and `current = 2`, the partner has to be `7`. So the question
becomes "have I already seen a 7?", and that is a lookup, not a search.

Keep a `Map` from each number you have passed to the index where you saw it:

```
nums = [2, 7, 11, 15], target = 9

i=0, n=2:  partner 7, not seen   -> remember 2 is at 0
i=1, n=7:  partner 2, seen at 0  -> return [0, 1]
```

One pass, and each lookup answers immediately.

### The code

```js
const seen = new Map();

for (let i = 0; i < nums.length; i++) {
  const partner = target - nums[i];
  if (seen.has(partner)) {
    return [seen.get(partner), i];
  }
  seen.set(nums[i], i);
}
```

Two details worth pausing on:

**Check before storing.** With `nums = [3, 3]` and `target = 6`, the partner of
the first `3` is `3`. If you store before checking, the first `3` finds itself
and returns `[0, 0]`, using one element twice. Checking first means the map only
ever holds earlier positions.

**The order of the returned pair.** `seen.get(partner)` is the earlier index,
`i` is the current one, so `[seen.get(partner), i]` comes out in ascending
order.

### Why this problem is famous

It is the introduction to "store what you have seen so the thing you need is
one lookup away". Contains Duplicate, Valid Anagram and Ransom Note are all the
same idea. Once you recognise it, a large part of easy LeetCode becomes
routine.

<details>
<summary>Common mistakes</summary>

**Returning the numbers instead of the indexes.**

`[2, 7]` instead of `[0, 1]`. Read the question twice.

**Storing before checking.**

```js
seen.set(nums[i], i);
if (seen.has(target - nums[i])) ...
```

An element can now pair with itself, which `[3, 3]` and a target of 6 exposes
immediately.

**Using the number as the map's value.**

The map has to give you back an index, so store the index as the value and the
number as the key.

</details>

## Check yourself

1. What does the function return - the numbers or their positions?

<details><summary>Answer</summary>

Their positions, as an array of two indexes. The tempting wrong answer is the
numbers, which is what the examples show in their explanations rather than in
their output.

</details>

2. For `target = 9` and a current number of `2`, what is the partner?

<details><summary>Answer</summary>

`7`, from `9 - 2`. The tempting wrong answer is that you cannot know until you
search - the arithmetic gives it to you exactly, which is what turns a search
into a lookup.

</details>

3. What goes in the map - number to index, or index to number?

<details><summary>Answer</summary>

Number to index. You look things up by number and need the index back. The
tempting wrong answer is the reverse, which gives you nothing to look up by.

</details>

4. Why check the map before adding the current number?

<details><summary>Answer</summary>

So a number cannot pair with itself. With `[3, 3]` and target 6, adding first
makes the first `3` its own partner and returns `[0, 0]`. The tempting wrong
answer is that the order does not matter because both happen in the same pass.

</details>

5. What is the answer for `[3, 3]` with target 6?

<details><summary>Answer</summary>

`[0, 1]`. The two 3s are different elements, which is allowed; reusing one
element is not. The tempting wrong answer is `[0, 0]`, which is exactly what
storing before checking produces.

</details>

6. How many passes over the array does the map version need?

<details><summary>Answer</summary>

One. Each number checks for its partner among the numbers already passed. The
tempting wrong answer is two - one to build the map and one to search - which
also works but reintroduces the self-pairing problem.

</details>

## Your task

Open `leetcode/0001-two-sum/exercise.js` and write `twoSum(nums, target)`.

It returns the two indexes whose numbers add up to `target`, smaller index
first. There is exactly one answer. Use a `Map`; do not use nested loops.

```js
twoSum([2, 7, 11, 15], 9) // [0, 1]
twoSum([3, 2, 4], 6)      // [1, 2]
twoSum([3, 3], 6)         // [0, 1]
```

When the tests pass, record it with `npm run learn -- check`.
