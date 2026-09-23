# LeetCode 70: Climbing Stairs

Run the tests for this problem with:

```
npm run test -- lc-70
```

Problem on LeetCode: <https://leetcode.com/problems/climbing-stairs/>

## The lesson

You are climbing a staircase of `n` steps. Each move takes you up either 1 step
or 2. How many different ways are there to reach the top?

```
n = 2 -> 2      1+1, 2
n = 3 -> 3      1+1+1, 1+2, 2+1
n = 4 -> 5      1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2
```

Order counts: `1+2` and `2+1` are different routes.

### Counting by hand first

Write the answers out for the small cases before looking for a rule:

```
n = 1 -> 1
n = 2 -> 2
n = 3 -> 3
n = 4 -> 5
n = 5 -> 8
```

1, 2, 3, 5, 8. That is the Fibonacci sequence, shifted along. Once you notice
that, the code is the last problem's code.

### Why it is Fibonacci

Think about the **last** move that got you to step `n`. There are only two
possibilities:

- it was a single step, so you were standing on step `n - 1`
- it was a double step, so you were standing on step `n - 2`

Every route to the top ends with one or the other, and no route is counted
twice, because a route cannot end with both. So:

```
ways(n) = ways(n - 1) + ways(n - 2)
```

The number of ways to reach a step is the sum of the ways to reach the two
steps below it. That is the Fibonacci rule, arrived at by reasoning rather than
by spotting a pattern.

The starting values are `ways(1) = 1` and `ways(2) = 2`.

### The code

Two variables again, stepping up from the bottom:

```js
let twoBelow = 1;  // ways to reach step 1
let oneBelow = 2;  // ways to reach step 2

for (let step = 3; step <= n; step++) {
  const current = oneBelow + twoBelow;
  twoBelow = oneBelow;
  oneBelow = current;
}
```

For `n` of 1 or 2 the answer is `n` itself, and the loop never runs.

### Why not try every route?

You could write a function that calls itself for `n - 1` and `n - 2` and adds
the results. That is the same recursion as the last problem, with the same
problem: it recalculates the same values astronomically often. `n = 45`, the
largest LeetCode input, would take minutes. The loop takes 45 additions.

This is the entire content of "dynamic programming" at this level: work upwards
from the small answers, keeping only what you still need, instead of working
downwards and recomputing.

<details>
<summary>Common mistakes</summary>

**Using Fibonacci's starting values unchanged.**

`fib(4)` is 3 and `climbStairs(4)` is 5. The sequence is the same, shifted by
one, because this problem starts from 1 and 2 rather than 0 and 1.

**Returning 1 for `n = 2`.**

There really are two routes: two single steps, or one double. Check the small
cases by listing them.

**Recursion without remembering results.**

Correct and unusably slow for `n` above about 40.

</details>

## Check yourself

1. How many ways are there to climb 3 steps?

<details><summary>Answer</summary>

`3`: 1+1+1, 1+2 and 2+1. The tempting wrong answer is 2, from treating 1+2 and
2+1 as the same route - the order of the moves is part of the route.

</details>

2. Why does `ways(n) = ways(n - 1) + ways(n - 2)`?

<details><summary>Answer</summary>

Because the last move was either a single step, from `n - 1`, or a double, from
`n - 2`, and those two sets of routes have nothing in common. The tempting
wrong answer is to stop at "it is Fibonacci" - noticing the pattern is not the
same as knowing why it holds.

</details>

3. What are the starting values?

<details><summary>Answer</summary>

`ways(1) = 1` and `ways(2) = 2`. The tempting wrong answer is 0 and 1, copied
from Fibonacci, which gives an answer one place along the sequence.

</details>

4. What is the answer for 5 steps?

<details><summary>Answer</summary>

`8`, from 5 + 3. The tempting wrong answer is 5, which is `fib(5)` - the two
sequences are offset.

</details>

5. How many values do you need to keep as you count upwards?

<details><summary>Answer</summary>

Two: the counts for the previous step and the one before it. The tempting wrong
answer is all of them in an array, which works and stores numbers nothing reads
again.

</details>

6. Why is the recursive version too slow?

<details><summary>Answer</summary>

Because it recalculates the same sub-answers again and again, growing
exponentially with `n`. The tempting wrong answer is that it is fine for small
inputs - LeetCode allows `n` up to 45, which is already far too slow.

</details>

## Your task

Open `leetcode/0070-climbing-stairs/exercise.js` and write `climbStairs(n)`.

It returns how many distinct ways there are to climb `n` steps taking 1 or 2 at
a time. Use a loop.

```js
climbStairs(1)  // 1
climbStairs(2)  // 2
climbStairs(3)  // 3
climbStairs(5)  // 8
climbStairs(45) // 1836311903
```

When the tests pass, record it with `npm run learn -- check`.
