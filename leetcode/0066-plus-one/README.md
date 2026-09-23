# LeetCode 66: Plus One

Run the tests for this problem with:

```
npm run test -- lc-66
```

Problem on LeetCode: <https://leetcode.com/problems/plus-one/>

## The lesson

A number is given to you as an array of its digits, most significant first. Add
one to it and return the new array of digits.

```
[1, 2, 3] -> [1, 2, 4]
[4, 3, 9] -> [4, 4, 0]
[9, 9]    -> [1, 0, 0]
```

### Why not turn it into a number?

```js
const value = Number(digits.join('')) + 1;
```

That works for the examples and breaks on long inputs. JavaScript numbers lose
precision above about 9 quadrillion:

```js
console.log(9007199254740993); // 9007199254740992
```

LeetCode's inputs go up to 100 digits, so the conversion silently returns the
wrong answer. The problem gives you digits because digits are the point.

### Addition the way you were taught

Start at the right-hand end. Add one to the last digit:

- If it becomes 10, write 0 and carry one to the next column left.
- Otherwise write the new digit and stop - nothing to the left changes.

```
[4, 3, 9]
        ^  9 + 1 = 10, so write 0 and carry
[4, 3, 0]
     ^     3 + 1 = 4, no carry, stop
[4, 4, 0]
```

Because you are only ever adding one, there is nothing to carry once a digit
does not overflow. The moment you write a digit below 10, you are finished and
can return immediately.

### Walking backwards

A counting loop that goes down instead of up:

```js
for (let i = digits.length - 1; i >= 0; i--) {
  // ...
}
```

Start at the last index, continue while the index is 0 or more, and subtract
one each pass.

### The case everyone misses

What if every digit is a 9?

```
[9, 9]
    ^  10: write 0, carry
[9, 0]
 ^     10: write 0, carry
[0, 0]  and the loop is over with a carry still owed
```

Reaching the end of the loop means every digit overflowed, so the answer needs
one more digit on the front: `[1, 0, 0]`. That is the only situation in which
the array grows, and the new leading digit is always `1`.

Handle it after the loop: if the loop never returned, return `[1, ...digits]`.

### Changing versus copying

LeetCode lets you modify the input. The tests here ask for a new array, because
a function that answers a question should leave its input alone. Take a copy
first with spread, work on the copy, and return it.

<details>
<summary>Common mistakes</summary>

**Converting to a number.**

```js
return String(Number(digits.join('')) + 1).split('').map(Number);
```

Fine for three digits, wrong above 16 or so, with no error to warn you.

**Forgetting the all-nines case.**

```js
[9, 9] -> [0, 0]
```

The loop finishes with a carry that has nowhere to go. The answer needs an
extra digit at the front.

**Carrying on after a digit that did not overflow.**

```js
[1, 2, 3] -> [2, 3, 4]
```

Adding one to every digit instead of stopping. Once a digit does not overflow,
the work is done.

</details>

## Check yourself

1. What is the result for `[4, 3, 9]`?

<details><summary>Answer</summary>

`[4, 4, 0]`. The 9 becomes 0 and carries one into the 3. The tempting wrong
answer is `[4, 3, 10]`, from writing the sum into a single position - each
position holds one digit.

</details>

2. Which end do you start at?

<details><summary>Answer</summary>

The right-hand end, the last index, because that is the ones column. The
tempting wrong answer is the left, which is where the array starts but the
wrong place to add one.

</details>

3. When can you stop early?

<details><summary>Answer</summary>

As soon as a digit becomes something below 10, since nothing further left
changes. The tempting wrong answer is "never, you have to finish the loop" -
you can, but every remaining pass would do nothing.

</details>

4. What is the answer for `[9, 9]`?

<details><summary>Answer</summary>

`[1, 0, 0]`, one longer than the input. The tempting wrong answer is `[0, 0]`,
which is what you get by finishing the loop and returning without handling the
leftover carry.

</details>

5. Why not `Number(digits.join('')) + 1`?

<details><summary>Answer</summary>

Because JavaScript numbers lose precision beyond about 16 digits, and the
inputs can be 100 digits long. The tempting wrong answer is that it is fine
because it passes the examples - it fails silently on large inputs, which is
worse than failing loudly.

</details>

6. When does the output array have more digits than the input?

<details><summary>Answer</summary>

Only when every digit was a 9, and then exactly one more, a leading `1`. The
tempting wrong answer is "whenever there is a carry" - a carry in the middle is
absorbed by the digit to its left.

</details>

## Your task

Open `leetcode/0066-plus-one/exercise.js` and write `plusOne(digits)`.

It returns a new array of digits representing the number plus one. Work with
the digits; do not convert the whole thing to a number. The array you are given
must not be changed.

```js
plusOne([1, 2, 3]) // [1, 2, 4]
plusOne([4, 3, 9]) // [4, 4, 0]
plusOne([9])       // [1, 0]
plusOne([9, 9])    // [1, 0, 0]
```

When the tests pass, record it with `npm run learn -- check`.
