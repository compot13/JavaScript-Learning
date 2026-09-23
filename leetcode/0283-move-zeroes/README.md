# LeetCode 283: Move Zeroes

Run the tests for this problem with:

```
npm run test -- lc-283
```

Problem on LeetCode: <https://leetcode.com/problems/move-zeroes/>

## The lesson

Move every zero in an array to the end, keeping the other numbers in their
original order. Do it **in place**, and return nothing.

```
input:  [0, 1, 0, 3, 12]
after:  [1, 3, 12, 0, 0]
```

The non-zero numbers keep their order: 1, then 3, then 12.

### The two-index idea

The pattern here is a **read index** and a **write index** moving through the
same array at different speeds.

- The read index visits every position in turn.
- The write index marks where the next non-zero number belongs.

Whenever the read index finds a non-zero number, copy it to the write position
and move the write index on by one. When it finds a zero, do nothing and let
the read index move on alone. The write index falls behind by exactly the
number of zeroes seen so far.

```
[0, 1, 0, 3, 12]     write = 0

read 0: zero, skip                 write stays 0
read 1: non-zero -> position 0     [1, 1, 0, 3, 12]  write = 1
read 0: zero, skip                 write stays 1
read 3: non-zero -> position 1     [1, 3, 0, 3, 12]  write = 2
read 12: non-zero -> position 2    [1, 3, 12, 3, 12] write = 3
```

The first three positions now hold the answer. Positions 3 and 4 still hold
leftovers from the copying.

### Filling the rest

After the first pass, every position from the write index to the end must be
zero:

```js
for (let i = write; i < nums.length; i++) {
  nums[i] = 0;
}
```

```
[1, 3, 12, 0, 0]
```

Two passes, each visiting each position at most once.

### Why not remove and append?

```js
// For each zero: splice it out, push a zero on the end.
```

`splice` has to shift every later item along, so an array that is mostly zeroes
does a great deal of shifting. The two-index version copies each item at most
once.

### Why not filter and concat?

```js
const kept = nums.filter((n) => n !== 0);
```

That builds a new array, and this problem asks you to change the one you were
given. You could then copy the values back in, which works - but the two-index
version is the one worth learning, because the read-and-write-index pattern
solves a whole family of "remove some items in place" problems.

<details>
<summary>Common mistakes</summary>

**Swapping instead of copying, and losing the order.**

Swapping each non-zero with the item at the write position can reorder the
numbers when there are several zeroes together. Copy forwards, then fill the
tail with zeroes.

**Moving the write index on every pass.**

```js
nums[write] = nums[read];
write += 1;   // outside the if
```

The write index now keeps pace with the read index and the array is unchanged.
It only advances when something was written.

**Forgetting to fill the tail.**

```js
[1, 3, 12, 3, 12]
```

The first pass leaves leftovers behind the write index. They have to be
overwritten with zeroes.

</details>

## Check yourself

1. What is the result for `[0, 1, 0, 3, 12]`?

<details><summary>Answer</summary>

`[1, 3, 12, 0, 0]`. Non-zero numbers keep their order and the zeroes collect at
the end. The tempting wrong answer is `[12, 3, 1, 0, 0]`, which is what
swapping from both ends gives you - the order matters here.

</details>

2. What does the write index mark?

<details><summary>Answer</summary>

The position the next non-zero number should be copied to. The tempting wrong
answer is "the position being read" - if both indexes moved together nothing
would move.

</details>

3. When does the write index advance?

<details><summary>Answer</summary>

Only after a non-zero number has been written. The tempting wrong answer is
"every pass", which makes the two indexes identical and leaves the array as it
was.

</details>

4. What is left in the array after the first pass over `[0, 1, 0, 3, 12]`?

<details><summary>Answer</summary>

`[1, 3, 12, 3, 12]` - the answer in the first three positions and leftovers
after. The tempting wrong answer is that the first pass is the whole job; the
tail still has to be filled with zeroes.

</details>

5. How many zeroes go at the end?

<details><summary>Answer</summary>

As many as there were in the input, which is exactly the number of positions
from the write index to the end. The tempting wrong answer is that you have to
count them separately - the write index has already counted them for you.

</details>

6. What does the function return?

<details><summary>Answer</summary>

Nothing. The array is changed in place, as in Reverse String. The tempting
wrong answer is a new array, which the tests will not see.

</details>

## Your task

Open `leetcode/0283-move-zeroes/exercise.js` and write `moveZeroes(nums)`.

It moves every zero to the end of the array, in place, keeping the order of the
other numbers. It returns nothing.

```js
const nums = [0, 1, 0, 3, 12];
moveZeroes(nums);
nums // [1, 3, 12, 0, 0]
```

When the tests pass, record it with `npm run learn -- check`.
