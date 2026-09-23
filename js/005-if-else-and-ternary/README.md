# 5. `if` / `else` and the ternary

Run the tests for this exercise with:

```
npm run test -- 005
```

## The lesson

An `if` statement runs a block of code only when a condition is true.

```js
const age = 20;

if (age >= 18) {
  console.log('adult');
}
// adult
```

The condition goes in parentheses. The code to run goes in curly braces. If the
condition is falsy, the whole block is skipped and nothing is printed.

### `else`

```js
const age = 12;

if (age >= 18) {
  console.log('adult');
} else {
  console.log('child');
}
// child
```

Exactly one of the two blocks runs. Never both, never neither.

### `else if`

For more than two outcomes, chain the tests:

```js
const score = 75;

if (score >= 90) {
  console.log('A');
} else if (score >= 70) {
  console.log('B');
} else if (score >= 50) {
  console.log('C');
} else {
  console.log('F');
}
// B
```

The tests are checked from the top, and the **first** true one wins. Everything
below it is skipped, even if it is also true. `75 >= 70` and `75 >= 50` are both
true; only the first match runs.

That makes the order of your conditions part of the logic. Written the other way
round, every passing score would come out as `C`:

```js
// Wrong on purpose: the loosest test is first, so it catches everything.
if (score >= 50) {
  console.log('C');
} else if (score >= 90) {
  console.log('A');
}
```

Order from the most specific test to the loosest.

### `if` inside a function

Inside a function, `return` ends the function immediately. That means you often
do not need `else` at all:

```js
function label(age) {
  if (age >= 18) {
    return 'adult';
  }
  return 'child';
}

console.log(label(20)); // adult
console.log(label(12)); // child
```

If the first `return` runs, the last line never happens. This shape is called
an **early return**, and it keeps the nesting flat.

### Any value can be a condition

The condition does not have to be a comparison. Any value is tested for
truthiness, using the falsy list from lesson 4.

```js
const name = '';

if (name) {
  console.log(`hello ${name}`);
} else {
  console.log('no name given');
}
// no name given
```

### The ternary

Sometimes you need to *choose a value* rather than *run a block*. The
conditional operator, usually called the ternary, does that in one expression:

```js
const age = 20;
const label = age >= 18 ? 'adult' : 'child';
console.log(label); // adult
```

Read it as a question: condition `?` value when true `:` value when false.

It is an expression, so it fits where a value fits, including inside a template
literal:

```js
const count = 1;
console.log(`${count} item${count === 1 ? '' : 's'}`);
// 1 item
```

Use a ternary when both branches produce a value for the same purpose. Use
`if` when the branches *do* different things. Nesting one ternary inside
another is where they stop being readable, so at that point switch to `if`.

<details>
<summary>Common mistakes</summary>

**Putting a semicolon after the condition.**

```js
const age = 12;
if (age >= 18); {
  console.log('adult');
}
// adult
```

No error, and the wrong answer. The `;` ends the `if` statement with an empty
body, so the braces below became an ordinary block that always runs. There is
no semicolon after `if (...)`.

**Assigning instead of comparing.**

```js
let status = 'guest';
if (status = 'admin') {
  console.log('welcome');
}
// welcome
```

`status = 'admin'` assigns, and the value of that assignment is the non-empty
string `'admin'`, which is truthy. The condition is true whatever `status` was,
and the variable has been changed as a side effect. Use `===`.

**Ordering conditions from loosest to strictest.**

```js
function grade(score) {
  if (score >= 50) return 'C';
  if (score >= 90) return 'A';
  return 'F';
}
console.log(grade(95)); // C
```

A score of 95 passes the first test, returns, and never reaches the second.
Check the narrowest range first.

</details>

## Check yourself

1. What does this print?

```js
const score = 95;
if (score >= 50) {
  console.log('pass');
} else if (score >= 90) {
  console.log('excellent');
}
```

<details><summary>Answer</summary>

`pass`. The first true condition wins and the rest of the chain is skipped. The
tempting wrong answer is `excellent`, which assumes JavaScript keeps checking
for a better match. It stops at the first one that is true, so the strictest
condition has to come first.

</details>

2. What does `age >= 18 ? 'adult' : 'child'` produce when `age` is 18?

<details><summary>Answer</summary>

`'adult'`. `>=` includes the value itself. The tempting wrong answer is
`'child'`, from reading `>=` as "greater than". Boundary values are where most
condition bugs live, so check them deliberately.

</details>

3. What is printed?

```js
const items = '';
if (items) {
  console.log('some');
} else {
  console.log('none');
}
```

<details><summary>Answer</summary>

`none`. An empty string is one of the eight falsy values, so the `else` branch
runs. The tempting wrong answer is `some`, from expecting a condition to need a
comparison in it. Any value works as a condition, and its truthiness decides.

</details>

4. How many blocks of an `if` / `else if` / `else` chain can run?

<details><summary>Answer</summary>

Exactly one. The chain stops at the first true test, and `else` catches
everything that reached it. The tempting wrong answer is "every branch whose
condition is true", which is what you would get from writing separate `if`
statements with no `else` between them.

</details>

5. In this function, when does the last line run?

```js
function label(age) {
  if (age >= 18) {
    return 'adult';
  }
  return 'child';
}
```

<details><summary>Answer</summary>

Only when `age >= 18` is false. `return` ends the function on the spot, so
reaching the last line means the `if` did not fire. The tempting wrong answer
is "always, because there is no `else`" - `return` makes the `else` unnecessary.

</details>

6. What is wrong with `if (status = 'admin')`?

<details><summary>Answer</summary>

It has one `=`, so it assigns `'admin'` to `status` and then tests the assigned
value, which is truthy. The condition is always true and the variable is
changed. The tempting wrong answer is that it is a syntax error; it runs
perfectly and does the wrong thing, which is worse. Use `===`.

</details>

7. When is a ternary a better choice than an `if` statement?

<details><summary>Answer</summary>

When you are choosing between two *values* for one purpose, such as picking a
label to store or to drop into a template literal. The tempting wrong answer is
"whenever you want shorter code": a ternary whose branches perform actions, or
one nested inside another, is harder to read than the `if` it replaced.

</details>

## Your task

Open `js/005-if-else-and-ternary/exercise.js` and write three functions.

1. **`grade(score)`** turns a score from 0 to 100 into a letter.

   - 90 or more: `'A'`
   - 70 to 89: `'B'`
   - 50 to 69: `'C'`
   - below 50: `'F'`

   ```js
   grade(95) // 'A'
   grade(70) // 'B'
   grade(49) // 'F'
   ```

2. **`ticketPrice(age)`** returns a price in whole pounds.

   - under 5: `0`
   - 5 to 17: `8`
   - 18 to 64: `12`
   - 65 or over: `9`

   ```js
   ticketPrice(3)  // 0
   ticketPrice(30) // 12
   ticketPrice(70) // 9
   ```

3. **`pluralise(count, word)`** returns the count and the word, adding an `s`
   to the word only when the count is not 1. Use a ternary for this one.

   ```js
   pluralise(1, 'file')  // '1 file'
   pluralise(3, 'file')  // '3 files'
   pluralise(0, 'file')  // '0 files'
   ```

   `pluralise(2, 'box')` gives `'2 boxs'`, which is not English. The exercise
   adds an `s` and nothing more, because real pluralisation needs a dictionary.
   Producing the rule you were given is the point here.

When the tests pass, record it with `npm run learn -- check`.
