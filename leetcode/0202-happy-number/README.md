# LeetCode 202: Happy Number

Run the tests for this problem with:

```
npm run test -- lc-202
```

Problem on LeetCode: <https://leetcode.com/problems/happy-number/>

## The lesson

Take a number, replace it with the sum of the squares of its digits, and repeat.
A number is **happy** if this eventually reaches 1. If it never does, it goes
round in a loop forever, and the answer is `false`.

```
19 -> 1 + 81 = 82
82 -> 64 + 4 = 68
68 -> 36 + 64 = 100
100 -> 1 + 0 + 0 = 1     happy
```

```
2 -> 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4 -> ...
```

`4` has come round again, so this repeats forever. `2` is not happy.

### Two parts

**Part one: the sum of the squares of the digits.**

Use the remainder and division you met in lesson 3:

```js
function squareDigits(n) {
  let total = 0;
  while (n > 0) {
    const digit = n % 10;        // the last digit
    total += digit * digit;
    n = Math.floor(n / 10);      // drop the last digit
  }
  return total;
}
```

`n % 10` gives the last digit; `Math.floor(n / 10)` removes it. For 82: digit 2,
`n` becomes 8; digit 8, `n` becomes 0; loop ends with 4 + 64 = 68.

You could also do `String(n).split('')` and square each character's numeric
value. Both are fine; the arithmetic version is worth writing once because
"peel off the last digit" is a standard move.

**Part two: noticing the loop.**

The process either reaches 1 or repeats a value it has already produced. So
keep a `Set` of everything seen:

```js
const seen = new Set();

while (n !== 1 && !seen.has(n)) {
  seen.add(n);
  n = squareDigits(n);
}

return n === 1;
```

The loop ends in one of two ways. Either `n` became 1, or `n` is a value that
has come round again. The final comparison tells you which.

This is the same idea as Contains Duplicate, applied to a sequence you generate
rather than an array you were given.

### Why it always ends

For any starting number, the sequence cannot grow without limit: a three-digit
number can produce at most 3 × 81 = 243, so from then on the values stay small.
With finitely many possible values and infinitely many steps, a repeat is
unavoidable. The `Set` will always fire if 1 does not come first.

### A smaller trick

You can detect the loop with two "runners" - one stepping once per round, one
stepping twice - and see whether they ever land on the same value. That uses no
extra memory and is the same technique used to detect a loop in a linked list.
The `Set` version is clearer, and clearer is the right default.

<details>
<summary>Common mistakes</summary>

**No loop detection at all.**

```js
while (n !== 1) { n = squareDigits(n); }
```

For an unhappy number this never returns. The test runner appears to hang.

**Checking the wrong thing at the end.**

The function returns whether the process reached 1, not whether the set was
used. Compare `n` against 1 after the loop.

**Adding to the set after computing the next value.**

Add the value you are about to transform, before transforming it, or the first
value is never recorded.

</details>

## Check yourself

1. What is the sequence starting from 19?

<details><summary>Answer</summary>

19, 82, 68, 100, 1 - so 19 is happy. The tempting wrong answer is that it
diverges; each step sums the squares of the digits, which keeps the values
small.

</details>

2. What does `82 % 10` give, and what does `Math.floor(82 / 10)` give?

<details><summary>Answer</summary>

`2` and `8`: the last digit, and the number with that digit removed. The
tempting wrong answer for the second is `8.2`, forgetting the rounding, which
then produces meaningless digits on the next pass.

</details>

3. How do you know when a number is not happy?

<details><summary>Answer</summary>

When a value appears that you have already produced, meaning the sequence has
started repeating. The tempting wrong answer is "after enough steps" - a fixed
step limit is a guess, and the repeat is a proof.

</details>

4. What happens without loop detection?

<details><summary>Answer</summary>

The function never returns for an unhappy number, and the program hangs. The
tempting wrong answer is that it eventually errors - it does not; it spins.

</details>

5. What is the final check?

<details><summary>Answer</summary>

Whether the current value is 1. The loop can end for two reasons, and this
comparison distinguishes them. The tempting wrong answer is returning `true`
whenever the loop ends.

</details>

6. Why must the sequence always either reach 1 or repeat?

<details><summary>Answer</summary>

Because the values cannot grow indefinitely - a three-digit number maps to at
most 243 - so only finitely many values are possible, and an endless sequence
must revisit one. The tempting wrong answer is that some numbers might run away
to infinity.

</details>

## Your task

Open `leetcode/0202-happy-number/exercise.js` and write `isHappy(n)`.

It returns `true` when repeatedly replacing `n` with the sum of the squares of
its digits reaches 1, and `false` when it starts repeating instead.

```js
isHappy(19) // true
isHappy(2)  // false
isHappy(1)  // true
isHappy(7)  // true
```

When the tests pass, record it with `npm run learn -- check`.
