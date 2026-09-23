# LeetCode 217: Contains Duplicate

Run the tests for this problem with:

```
npm run test -- lc-217
```

Problem on LeetCode: <https://leetcode.com/problems/contains-duplicate/>

## The lesson

Return `true` when any value appears in the array more than once, and `false`
when every value is different.

```
[1, 2, 3, 1] -> true
[1, 2, 3, 4] -> false
[]           -> false
```

### The slow way

For each number, look through the rest of the array for a match. Two nested
loops. Correct, and the work grows with the square of the length: 100,000
numbers means about five billion comparisons.

`nums.includes(x)` inside a loop is the same thing wearing a disguise -
`includes` searches the whole array, so the second loop is still there, hidden.

### Remember what you have seen

Walk through once, keeping a `Set` of values already met. For each number, ask
whether it is already in the set. If it is, you have found a duplicate. If not,
add it and carry on.

```
[1, 2, 3, 1]

1: not seen -> add      seen = {1}
2: not seen -> add      seen = {1, 2}
3: not seen -> add      seen = {1, 2, 3}
1: seen already         -> true
```

One pass, and each `has` answers immediately however large the set is. That is
what `Set` is for, from lesson 15.

### The short version

A `Set` refuses duplicates when it is built, so its size tells you directly:

```js
return new Set(nums).size !== nums.length;
```

If any value was repeated, the set has fewer members than the array has items.
One line, and worth understanding both ways round.

The one thing the one-liner gives up is stopping early: it always reads the
whole array, while the loop can return as soon as it finds a repeat. On
`[1, 1, ...a million more]` the loop stops on the second item.

### Trading memory for speed

The `Set` version is faster and uses more memory - in the worst case it holds
every value. That trade is the most common one in this kind of problem, and
"use a Set or a Map to avoid searching again" is the single most useful pattern
in easy LeetCode problems. The next four problems are all variations of it.

<details>
<summary>Common mistakes</summary>

**Using `includes` inside a loop.**

```js
for (const n of nums) {
  if (nums.includes(n)) return true; // always true
}
```

Two problems: every number is in the array, so this always returns `true`; and
even fixed, `includes` searches the array each pass, which is the slow approach.

**Asking a `Set` for its `length`.**

`Set` has `size`, not `length`. `length` is `undefined`, and comparing
`undefined` against a number is always `false`.

**Adding before checking.**

```js
seen.add(n);
if (seen.has(n)) return true; // true on the first item
```

Check first, then add.

</details>

## Check yourself

1. What is the answer for `[1, 2, 3, 1]`?

<details><summary>Answer</summary>

`true`: the 1 appears twice. The tempting wrong answer is the duplicate value
itself - this problem asks for a boolean.

</details>

2. What is the answer for an empty array?

<details><summary>Answer</summary>

`false`. With no values there is nothing repeated. The tempting wrong answer is
that it is undefined or an error - an empty array is a perfectly good input
with a clear answer.

</details>

3. What does `new Set([1, 2, 2]).size` give?

<details><summary>Answer</summary>

`2`. The duplicate is dropped as the set is built. The tempting wrong answer is
`3`, counting the input; and asking for `.length` instead gives `undefined`.

</details>

4. Why is `new Set(nums).size !== nums.length` a complete answer?

<details><summary>Answer</summary>

Because the set keeps one copy of each distinct value, so a smaller size means
something was repeated. The tempting wrong answer is that it only detects one
duplicate - any number of repeats makes the sizes differ.

</details>

5. In the loop version, do you check or add first?

<details><summary>Answer</summary>

Check first. Adding first means the value is always found, and the function
returns `true` on the first item. The tempting wrong answer is that the order
does not matter because both happen in the same pass.

</details>

6. Which version can stop early, and when does that matter?

<details><summary>Answer</summary>

The loop version, which returns as soon as it meets a repeat - useful when the
duplicate is near the front of a long array. The tempting wrong answer is that
the one-liner is always better because it is shorter.

</details>

## Your task

Open `leetcode/0217-contains-duplicate/exercise.js` and write
`containsDuplicate(nums)`.

It returns `true` when any value appears more than once. Use a `Set`; do not
use nested loops or `includes`.

```js
containsDuplicate([1, 2, 3, 1])          // true
containsDuplicate([1, 2, 3, 4])          // false
containsDuplicate([1, 1, 1, 3, 3, 4, 3]) // true
containsDuplicate([])                    // false
```

When the tests pass, record it with `npm run learn -- check`.
