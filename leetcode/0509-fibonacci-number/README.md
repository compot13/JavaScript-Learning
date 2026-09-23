# LeetCode 509: Fibonacci Number

Run the tests for this problem with:

```
npm run test -- lc-509
```

Problem on LeetCode: <https://leetcode.com/problems/fibonacci-number/>

## The lesson

The Fibonacci sequence starts with 0 and 1, and every number after that is the
sum of the two before it:

```
0, 1, 1, 2, 3, 5, 8, 13, 21, ...
```

Given `n`, return the `n`th number, counting from 0:

```
fib(0) = 0
fib(1) = 1
fib(2) = 1     0 + 1
fib(3) = 2     1 + 1
fib(4) = 3     1 + 2
```

### Two numbers are enough

You do not need the sequence, only the last two entries. Keep them in two
variables and step forward:

```
n = 6

previous = 0, current = 1
step 2: next = 0 + 1 = 1   ->  previous = 1, current = 1
step 3: next = 1 + 1 = 2   ->  previous = 1, current = 2
step 4: next = 1 + 2 = 3   ->  previous = 2, current = 3
step 5: next = 2 + 3 = 5   ->  previous = 3, current = 5
step 6: next = 3 + 5 = 8   ->  previous = 5, current = 8

answer: 8
```

The loop runs from 2 up to `n`, because 0 and 1 are the starting values rather
than things to calculate.

### The order of the three updates

```js
const next = previous + current;
previous = current;
current = next;
```

The temporary variable is needed for the same reason as in the swap in Reverse
String. Writing `previous = current` first would destroy the value that the sum
needs.

Destructuring does it without a temporary:

```js
[previous, current] = [current, previous + current];
```

The right-hand side is built from the current values before either name is
reassigned.

### The small inputs

`fib(0)` is `0` and `fib(1)` is `1`. With `current` starting at 1 and the loop
starting at 2, an input of 0 never enters the loop - so returning `current`
would give 1, which is wrong. Either return early for 0, or start the answer
from the right place. Test both values first; they are the whole difficulty
here.

### A note on recursion

The definition invites a function that calls itself:

```js
function fib(n) {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
}
```

That is elegant, and it recalculates the same values an enormous number of
times: `fib(40)` makes over 300 million calls and takes seconds. The loop
version makes 40 additions. Write the loop.

<details>
<summary>Common mistakes</summary>

**Getting `fib(0)` wrong.**

Returning `current` without handling 0 gives 1. The first number of the
sequence is 0.

**Updating in the wrong order.**

```js
previous = current;
current = previous + current; // previous has already changed
```

You get powers of two instead of Fibonacci numbers. Use a temporary or
destructure.

**Starting the loop at 0 or 1.**

The first two numbers are given, not calculated. Starting the loop too early
shifts every answer along by one.

</details>

## Check yourself

1. What are `fib(0)` and `fib(1)`?

<details><summary>Answer</summary>

`0` and `1`. They are the definition's starting values. The tempting wrong
answer is that both are 1, which is a different convention used in some books
and shifts every later answer.

</details>

2. What is `fib(6)`?

<details><summary>Answer</summary>

`8`. The sequence from index 0 is 0, 1, 1, 2, 3, 5, 8. The tempting wrong
answer is 13, from counting the sequence starting at 1 instead of 0.

</details>

3. How many previous numbers do you need to keep?

<details><summary>Answer</summary>

Two. Each new number is the sum of the last two, and anything older is never
used again. The tempting wrong answer is "all of them in an array", which works
and stores numbers you will never read.

</details>

4. Why does this fail?

```js
previous = current;
current = previous + current;
```

<details><summary>Answer</summary>

`previous` was overwritten on the first line, so the second line adds `current`
to itself and doubles it. The tempting wrong answer is that the lines are in
the right order but need parentheses - the order is the problem, and a
temporary variable or destructuring fixes it.

</details>

5. Where should the loop start?

<details><summary>Answer</summary>

At 2, because indexes 0 and 1 are the given starting values. The tempting wrong
answer is 0, which runs two extra passes and shifts every answer.

</details>

6. Why avoid the recursive version?

<details><summary>Answer</summary>

Because it recomputes the same values over and over - `fib(40)` costs hundreds
of millions of calls. The tempting wrong answer is that it is fine because it
matches the definition; matching the definition and being efficient are
separate questions.

</details>

## Your task

Open `leetcode/0509-fibonacci-number/exercise.js` and write `fib(n)`.

It returns the `n`th Fibonacci number, counting from 0. Use a loop, not
recursion.

```js
fib(0)  // 0
fib(1)  // 1
fib(2)  // 1
fib(6)  // 8
fib(30) // 832040
```

When the tests pass, record it with `npm run learn -- check`.
