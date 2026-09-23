# 6. Loops: `for`, `while`, `for...of`

Run the tests for this exercise with:

```
npm run test -- 006
```

## The lesson

A loop repeats a block of code. Three forms cover nearly everything, and they
differ only in how they decide when to stop.

### `for`

Use it when you know how many times to repeat.

```js
for (let i = 0; i < 3; i++) {
  console.log(i);
}
// 0
// 1
// 2
```

The parentheses hold three parts separated by semicolons:

1. `let i = 0` runs once, before the loop starts. `i` is a counter.
2. `i < 3` is checked before every pass. While it is true, the block runs.
3. `i++` runs after every pass. `i++` means "add one to `i`".

So the block runs with `i` as 0, then 1, then 2. When `i` reaches 3 the
condition is false and the loop ends. The counter starts at 0 and the condition
uses `<` rather than `<=`, which is the convention that matches string and
array positions starting at 0.

You can count differently when you need to:

```js
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
// 1
// 2
// 3
```

### `for...of`

Use it when you want each item of a collection and do not care about positions.
A string is a collection of characters:

```js
for (const letter of 'cat') {
  console.log(letter);
}
// c
// a
// t
```

`const letter` is fine here even though the value changes each pass: each pass
creates a new `letter`, and nothing reassigns it inside the block.

This form has no counter to get wrong, so prefer it whenever the position does
not matter.

### `while`

Use it when you cannot say in advance how many passes there will be, only what
has to stay true.

```js
let countdown = 3;

while (countdown > 0) {
  console.log(countdown);
  countdown = countdown - 1;
}
// 3
// 2
// 1
```

Something inside the block has to move the condition towards false. Forget
that, and the loop never ends:

```js
let n = 3;
while (n > 0) {
  console.log(n); // runs forever
}
```

Nothing changes `n`, so the condition stays true. If you run this, the program
prints until you stop it with Ctrl+C. That is the fix when a command never
returns: Ctrl+C, then look for the variable you failed to change.

### Building up a result

Most loops exist to accumulate something. Declare the accumulator *before* the
loop, change it inside, and read it after:

```js
let total = 0;

for (let i = 1; i <= 4; i++) {
  total = total + i;
}

console.log(total); // 10
```

`total += i` is shorthand for `total = total + i`, and `+=` works on strings
too:

```js
let shouted = '';
for (const letter of 'hi') {
  shouted += letter.toUpperCase();
}
console.log(shouted); // HI
```

Declaring `total` inside the loop is the classic version of this bug: it would
be reset to 0 on every pass, and the answer would be the last value instead of
the sum.

### `break` and `continue`

`break` leaves the loop immediately. `continue` skips to the next pass.

```js
for (const letter of 'cattle') {
  if (letter === 't') {
    break;
  }
  console.log(letter);
}
// c
// a
```

```js
for (let i = 0; i < 5; i++) {
  if (i % 2 === 1) {
    continue;
  }
  console.log(i);
}
// 0
// 2
// 4
```

<details>
<summary>Common mistakes</summary>

**Going one past the end.**

```js
const word = 'cat';
for (let i = 0; i <= word.length; i++) {
  console.log(word[i]);
}
// c
// a
// t
// undefined
```

`word.length` is 3, but the last valid position is 2. With `<=`, the loop runs
a fourth time and reads a position that does not exist. Use `i < word.length`.

**Declaring the accumulator inside the loop.**

```js
for (let i = 1; i <= 3; i++) {
  let total = 0;
  total += i;
}
// total does not exist out here, and was reset on every pass anyway
```

A variable declared inside the braces exists only inside them. Move the
declaration above the loop.

**A `while` condition that never changes.**

```js
let remaining = 5;
while (remaining > 0) {
  console.log('working');
}
```

This prints forever. Every `while` loop needs a line in its body that moves the
condition towards false - here, something that lowers `remaining`.

</details>

## Check yourself

1. How many times does this block run?

```js
for (let i = 0; i < 4; i++) {
  console.log('hi');
}
```

<details><summary>Answer</summary>

Four times, with `i` as 0, 1, 2 and 3. The tempting wrong answer is three,
from counting from 1 out of habit. Counting from 0 with `<` gives you exactly
as many passes as the number in the condition.

</details>

2. What does this print?

```js
for (const letter of 'ab') {
  console.log(letter);
}
```

<details><summary>Answer</summary>

`a` then `b`, on separate lines. `for...of` hands you each character itself.
The tempting wrong answer is `0` then `1`: those are the positions, which is
what a different loop form would give you.

</details>

3. What is `total` after this runs?

```js
let total = 0;
for (let i = 1; i <= 3; i++) {
  total += i;
}
```

<details><summary>Answer</summary>

`6`, from 1 + 2 + 3. The tempting wrong answer is `3`, which is what you get if
you read `+=` as `=`. `+=` adds to what is already there; `=` would throw the
running total away on every pass.

</details>

4. Why does this loop never stop?

```js
let n = 5;
while (n > 0) {
  console.log(n);
}
```

<details><summary>Answer</summary>

Nothing inside the block changes `n`, so `n > 0` stays true forever. The
tempting wrong answer is that `while` decreases the variable on its own - it
does not. Unlike `for`, a `while` loop has nowhere to put the step, so the body
has to do it.

</details>

5. What does `break` do?

<details><summary>Answer</summary>

It ends the loop immediately and carries on with the code after it. The
tempting wrong answer is "skips this pass", which is `continue`. Mixing the two
up gives you a loop that stops on the first item it should have ignored.

</details>

6. What is wrong with `for (let i = 0; i <= word.length; i++)`?

<details><summary>Answer</summary>

It runs one pass too many. Positions go from 0 to `length - 1`, so the last
pass reads a position that does not exist and gets `undefined`. The tempting
wrong answer is that it is correct because the string has `length` characters -
it does, but they are numbered starting from 0.

</details>

7. Where should you declare a variable that collects a result across a loop?

<details><summary>Answer</summary>

Above the loop. Declared inside the braces, it is created fresh on every pass
and does not exist after the loop ends. The tempting wrong answer is "inside,
next to where it is used", which reads well and loses your result.

</details>

## Your task

Open `js/006-loops/exercise.js` and write three functions. Write the loops
yourself - none of these needs a method you have not met.

1. **`sumTo(n)`** adds up every whole number from 1 to `n` and returns the
   total. When `n` is 0, the total is 0.

   ```js
   sumTo(4) // 10
   sumTo(1) // 1
   sumTo(0) // 0
   ```

2. **`countVowels(text)`** returns how many of the characters `a`, `e`, `i`,
   `o` and `u` appear, in either case.

   ```js
   countVowels('banana')  // 3
   countVowels('rhythm')  // 0
   countVowels('AEIOU')   // 5
   ```

   A string method from lesson 2 can tell you whether one string contains
   another, which saves you writing five comparisons.

3. **`reverse(text)`** returns the text backwards. Build it with a loop, one
   character at a time.

   ```js
   reverse('abc') // 'cba'
   reverse('')    // ''
   ```

When the tests pass, record it with `npm run learn -- check`.
