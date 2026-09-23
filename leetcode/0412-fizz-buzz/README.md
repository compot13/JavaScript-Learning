# LeetCode 412: Fizz Buzz

Run the tests for this problem with:

```
npm run test -- lc-412
```

Problem on LeetCode: <https://leetcode.com/problems/fizz-buzz/>

## The lesson

Given a number `n`, return an array of strings for the numbers 1 to `n`, where:

- a number divisible by both 3 and 5 becomes `'FizzBuzz'`
- a number divisible by 3 becomes `'Fizz'`
- a number divisible by 5 becomes `'Buzz'`
- anything else becomes the number itself, as a string

```
n = 5  ->  ['1', '2', 'Fizz', '4', 'Buzz']
```

This is the most famous interview warm-up there is. It is here for one specific
reason: the order of your conditions decides whether it works.

### Divisible by

"Divisible by 3" means dividing by 3 leaves no remainder:

```js
console.log(9 % 3);  // 0   divisible
console.log(10 % 3); // 1   not divisible
```

So the test is `n % 3 === 0`.

### The ordering trap

The obvious first attempt:

```js
if (i % 3 === 0) {
  result.push('Fizz');
} else if (i % 5 === 0) {
  result.push('Buzz');
} else if (i % 3 === 0 && i % 5 === 0) {
  result.push('FizzBuzz');   // never runs
}
```

15 is divisible by 3, so the first branch catches it and pushes `'Fizz'`. The
chain stops at the first true test, exactly as lesson 5 said, and the
`'FizzBuzz'` branch is unreachable.

The fix is to test the most specific case first:

```js
if (i % 3 === 0 && i % 5 === 0) {
  result.push('FizzBuzz');
} else if (i % 3 === 0) {
  result.push('Fizz');
} else if (i % 5 === 0) {
  result.push('Buzz');
} else {
  result.push(String(i));
}
```

Anything divisible by both 3 and 5 is divisible by 15, so `i % 15 === 0` says
the same thing more briefly. Either is fine.

### Numbers as strings

Every item of the output is a string, including the plain numbers. `'1'`, not
`1`. Three ways to convert:

```js
console.log(String(7));    // '7'
console.log((7).toString()); // '7'
console.log(`${7}`);       // '7'
```

The tests use `deepEqual`, which compares types as well as values, so `1` where
`'1'` was expected is a failure. That is deliberate: the problem asks for
strings.

### Building the answer

Same shape as the last two problems: a counting loop from 1 to `n` inclusive,
an empty array above it, one `push` per pass.

Note that this loop starts at 1 and uses `<=`, unlike the array loops that
start at 0 and use `<`. The bound follows the problem, not a habit.

<details>
<summary>Common mistakes</summary>

**Checking 3 before checking both.**

```js
if (i % 3 === 0) ... else if (i % 3 === 0 && i % 5 === 0) ...
```

15 comes out as `'Fizz'`. The most specific condition has to be first.

**Pushing numbers instead of strings.**

```js
result.push(i); // 1, not '1'
```

`deepEqual` compares types, so this fails on the first non-Fizz number.

**Starting the loop at 0.**

```js
for (let i = 0; i <= n; i++)
```

Zero is divisible by 3 and by 5, so the output starts with an unwanted
`'FizzBuzz'` and is one item too long. The problem counts from 1.

</details>

## Check yourself

1. What is the output for `n = 3`?

<details><summary>Answer</summary>

`['1', '2', 'Fizz']`. Three items, all strings. The tempting wrong answer is
`[1, 2, 'Fizz']` with real numbers - the problem asks for strings throughout.

</details>

2. Why does this never produce `'FizzBuzz'`?

```js
if (i % 3 === 0) return 'Fizz';
if (i % 5 === 0) return 'Buzz';
if (i % 15 === 0) return 'FizzBuzz';
```

<details><summary>Answer</summary>

Because every multiple of 15 is also a multiple of 3, so the first test catches
it and returns. The tempting wrong answer is that the last line is wrong - it
is correct and unreachable, which is exactly the trap.

</details>

3. What does `15 % 3 === 0 && 15 % 5 === 0` evaluate to?

<details><summary>Answer</summary>

`true`: both remainders are zero. It is the same test as `15 % 15 === 0`. The
tempting wrong answer is `false`, from reading `&&` as "one or the other".

</details>

4. What should the loop's bounds be?

<details><summary>Answer</summary>

From 1 up to and including `n`, so `i = 1` with `i <= n`. The tempting wrong
answer is the array habit of starting at 0 with `<` - zero is divisible by
everything and would add a wrong first entry.

</details>

5. How do you turn the number 4 into the string `'4'`?

<details><summary>Answer</summary>

`String(4)`, `(4).toString()` or a template literal. The tempting wrong answer
is that `push(4)` is close enough - `deepEqual` compares types, and so does
LeetCode.

</details>

6. How many items does the output have for `n = 15`?

<details><summary>Answer</summary>

15, one per number from 1 to 15. The tempting wrong answer is fewer, from
expecting Fizz and Buzz entries to be skipped or merged - every number produces
exactly one entry.

</details>

## Your task

Open `leetcode/0412-fizz-buzz/exercise.js` and write `fizzBuzz(n)`.

It returns an array of `n` strings for the numbers 1 to `n`, following the
rules above.

```js
fizzBuzz(3)  // ['1', '2', 'Fizz']
fizzBuzz(5)  // ['1', '2', 'Fizz', '4', 'Buzz']
fizzBuzz(15) // ends with 'FizzBuzz'
fizzBuzz(0)  // []
```

When the tests pass, record it with `npm run learn -- check`.
