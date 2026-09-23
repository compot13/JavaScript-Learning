# LeetCode 169: Majority Element

Run the tests for this problem with:

```
npm run test -- lc-169
```

Problem on LeetCode: <https://leetcode.com/problems/majority-element/>

## The lesson

Return the value that appears more than `n / 2` times in an array of `n`
numbers. You are told such a value always exists.

```
[3, 2, 3]             -> 3
[2, 2, 1, 1, 1, 2, 2] -> 2
```

More than half means there can only be one such value, and it is the most
common one by a clear margin.

### Count, then take the largest

Two steps, both from lesson 15 and lesson 14:

```js
const counts = new Map();
for (const n of nums) {
  counts.set(n, (counts.get(n) ?? 0) + 1);
}
```

Then find the entry with the highest count:

```js
let best = nums[0];
for (const [value, count] of counts) {
  if (count > counts.get(best)) {
    best = value;
  }
}
return best;
```

Looping over a `Map` hands you `[key, value]` pairs, which destructure into the
value and its count.

One pass to count, one pass over the distinct values to pick the winner.

### Tracking the best as you count

You can merge the two passes: after updating a count, check whether it has
overtaken the best so far.

```js
let best = nums[0];
let bestCount = 0;

for (const n of nums) {
  const count = (counts.get(n) ?? 0) + 1;
  counts.set(n, count);
  if (count > bestCount) {
    bestCount = count;
    best = n;
  }
}
```

One pass, one extra variable. Either version is fine here; the second is the
"keep the best so far" habit from Best Time to Buy and Sell Stock showing up
again.

### Two shortcuts worth knowing

**Sorting.** If more than half the values are the same, the middle of the
sorted array must be one of them - a block taking up over half the space always
covers the centre. So `[...nums].sort((a, b) => a - b)[Math.floor(n / 2)]` is
the answer, in one line. It costs more than counting, and it is a neat piece of
reasoning.

**Boyer-Moore voting.** Keep a candidate and a tally. Same value, tally up;
different value, tally down; tally at zero, adopt the current value as the new
candidate. The survivor is the majority element, using one pass and two
variables. Look it up once you have solved the problem the straightforward way.

### The guarantee matters

"A majority element always exists" is what makes the simple answers correct.
Without it, the most common value might not be a majority, and both the sorting
trick and the voting algorithm would need a verification pass. Read the
guarantees a problem gives you - they often decide how much work you have to
do.

<details>
<summary>Common mistakes</summary>

**Returning the count instead of the value.**

The question asks which value, not how many times it appears.

**Comparing `count > counts.get(best)` with `best` unset.**

Start `best` at the first number, or track the best count in its own variable.
Comparing against `undefined` is always `false`, so nothing is ever chosen.

**Looping over a `Map` expecting values.**

`for (const x of map)` gives `[key, value]` pairs, not values. Destructure with
`for (const [value, count] of map)`.

</details>

## Check yourself

1. What is the majority element of `[2, 2, 1, 1, 1, 2, 2]`?

<details><summary>Answer</summary>

`2`, appearing four times out of seven. The tempting wrong answer is `1`, which
appears three times - a plurality in a short stretch is not the majority
overall.

</details>

2. How many majority elements can an array have?

<details><summary>Answer</summary>

At most one, because two values each taking more than half would need more than
the whole array. The tempting wrong answer is "several if they tie" - a tie
means neither has more than half.

</details>

3. What shape does `for (const x of someMap)` give you?

<details><summary>Answer</summary>

A two-item array, `[key, value]`. The tempting wrong answer is the value alone,
which is what looping over a `Set` gives. Destructure with square brackets.

</details>

4. Why does the middle of the sorted array work?

<details><summary>Answer</summary>

Because a value filling more than half the array occupies a contiguous block
after sorting, and a block longer than half the array must cover the centre
position. The tempting wrong answer is that it only works for odd lengths - it
holds either way, given the guarantee.

</details>

5. What does the problem guarantee, and why does it matter?

<details><summary>Answer</summary>

That a majority element always exists, which is what makes the simple
approaches correct without a verification pass. The tempting wrong answer is
that it is background detail - without it the sorting shortcut can return a
value that is merely common.

</details>

6. What do you return: the value or its count?

<details><summary>Answer</summary>

The value. The tempting wrong answer is the count, which is the variable you
were watching while looking for it.

</details>

## Your task

Open `leetcode/0169-majority-element/exercise.js` and write
`majorityElement(nums)`.

It returns the value appearing more than half the time. The array always has
one. Count with a `Map`; do not sort.

```js
majorityElement([3, 2, 3])             // 3
majorityElement([2, 2, 1, 1, 1, 2, 2]) // 2
majorityElement([1])                   // 1
```

When the tests pass, record it with `npm run learn -- check`.
