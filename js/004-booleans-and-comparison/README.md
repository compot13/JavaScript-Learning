# 4. Booleans, comparison, `===` vs `==`, truthy and falsy

Run the tests for this exercise with:

```
npm run test -- 004
```

## The lesson

A **boolean** is a value with two possibilities: `true` or `false`. You rarely
type them out. Usually you produce one by asking a question about other values.

### Comparison

```js
console.log(3 === 3);   // true
console.log(3 === 4);   // false
console.log(3 !== 4);   // true
console.log(3 < 4);     // true
console.log(4 <= 4);    // true
console.log(5 > 10);    // false
```

`===` asks "are these the same value?". `!==` asks "are these different?". Both
give you back a boolean, which you can store like any other value:

```js
const isMatch = 3 === 3;
console.log(isMatch);        // true
console.log(typeof isMatch); // boolean
```

One `=` assigns, two `==` compares loosely, three `===` compares strictly. You
want three.

### `===` versus `==`

`==` compares after converting the two sides to the same type. `===` compares
without converting, so values of different types are never equal.

```js
console.log(1 === '1'); // false
console.log(1 == '1');  // true

console.log(0 === false); // false
console.log(0 == false);  // true

console.log(null == undefined);  // true
console.log(null === undefined); // false
```

The `==` results are not random - there are rules - but they are rules nobody
remembers correctly under pressure, and they hide bugs. Use `===` and `!==`
everywhere. When you genuinely want a string and a number to match, convert one
side yourself: `Number(input) === 1`.

### Combining questions

```js
console.log(true && true);   // true
console.log(true && false);  // false
console.log(false || true);  // true
console.log(false || false); // false
console.log(!true);          // false
```

- `&&` is "and": true only when both sides are true.
- `||` is "or": true when at least one side is true.
- `!` is "not": it flips a boolean.

```js
const age = 20;
const hasTicket = true;

console.log(age >= 18 && hasTicket); // true
console.log(age < 13 || age > 65);   // false
```

Comparison happens before `&&` and `||`, so `age >= 18 && hasTicket` reads the
way it looks. Parentheses make longer conditions clearer, and cost nothing.

### Truthy and falsy

JavaScript will take any value where a boolean is expected. Every value is
either **truthy** or **falsy**. There are exactly eight falsy values, and it is
worth learning the list because everything not on it is truthy:

```
false     0     -0     0n     ''     null     undefined     NaN
```

That is it. Every other value is truthy, including these, which trip people up:

```js
console.log(Boolean('false')); // true   a non-empty string
console.log(Boolean('0'));     // true   a non-empty string
console.log(Boolean([]));      // true   an empty list is still a list
console.log(Boolean({}));      // true
console.log(Boolean(' '));     // true   a space is a character
```

`Boolean(value)` converts a value to its true-or-false form, which is a useful
way to check your understanding of the list above.

The practical use of truthiness is checking whether you were given anything at
all:

```js
const name = '';
console.log(!name); // true, the string is empty
```

Be careful when `0` is a legitimate value. `!count` is `true` when `count` is
`0`, which is often a real count rather than a missing one. When zero matters,
compare properly: `count === undefined`.

<details>
<summary>Common mistakes</summary>

**Writing `=` where you meant `===`.**

```js
const age = 20;
age = 18;
// TypeError: Assignment to constant variable.
```

That error at least tells you something is wrong. With `let` there is no error
at all: the comparison you thought you wrote silently changes the variable
instead, and the result is the assigned value. Count the equals signs whenever
a condition behaves strangely.

**Comparing a string from input against a number.**

```js
const typed = '5';
console.log(typed === 5); // false
```

Text from a form, a file or a command line is a string, even when it looks like
a number. Convert first: `Number(typed) === 5` is `true`.

**Chaining comparisons the way mathematics does.**

```js
const age = 50;
console.log(1 < age < 10); // true
```

This looks wrong and it is. `1 < age` gives `true`, then `true < 10` converts
`true` into `1`, and `1 < 10` is `true`. Write both halves out with `&&`:
`1 < age && age < 10`, which correctly gives `false`.

</details>

## Check yourself

1. What is `1 === '1'`?

<details><summary>Answer</summary>

`false`. `===` compares type as well as value, and a number is not a string.
The tempting wrong answer is `true`, which is what `==` gives because it
converts the string to a number first. This difference is exactly why this
course uses `===`.

</details>

2. What is `Boolean('false')`?

<details><summary>Answer</summary>

`true`. Only an *empty* string is falsy; `'false'` is five characters of text.
The tempting wrong answer is `false`, from reading the contents of the string
rather than asking whether the string is empty. This bites when a value arrives
from a form or a file as text.

</details>

3. Which of these is truthy: `0`, `''`, `[]`, `undefined`?

<details><summary>Answer</summary>

`[]`, an empty array. The falsy list has eight entries and no container types
on it, so every array and every object is truthy no matter what is inside. The
tempting wrong answer is "none of them", treating empty-looking values as
falsy. To ask whether an array is empty, check its `length`.

</details>

4. What does `age >= 18 && hasTicket` give when `age` is 15 and `hasTicket` is
   `true`?

<details><summary>Answer</summary>

`false`. `&&` needs both sides to be true, and `15 >= 18` is false. The
tempting wrong answer is `true`, from reading `&&` as "or" - which is `||`, a
separate operator.

</details>

5. What is `!''`?

<details><summary>Answer</summary>

`true`. The empty string is falsy, and `!` flips it. The tempting wrong answer
is an error or an empty string: `!` always produces a boolean, whatever you
give it.

</details>

6. What does `0 == false` evaluate to, and what does `0 === false` evaluate to?

<details><summary>Answer</summary>

`true` and `false`. With `==`, `false` converts to `0` and the two match. With
`===`, a number and a boolean are different types, so the answer is `false`.
The tempting mistake is to assume the two operators agree and differ only in
strictness of style - they can return opposite answers for the same inputs.

</details>

7. Why is `1 < age < 10` a bad way to check a range?

<details><summary>Answer</summary>

Because it runs left to right: `1 < age` produces a boolean, and comparing that
boolean against `10` converts it to `1` or `0`. The result is `true` for almost
any number. The tempting wrong answer is that it works like the same expression
in mathematics. Write `1 < age && age < 10`.

</details>

## Your task

Open `js/004-booleans-and-comparison/exercise.js` and write three functions.
None of them needs `if` - each one is a question whose answer is already a
boolean.

1. **`isAdult(age)`** returns `true` when the age is 18 or more.

   ```js
   isAdult(18) // true
   isAdult(17) // false
   ```

2. **`isBlank(text)`** returns `true` when the text is empty or contains only
   spaces.

   ```js
   isBlank('')      // true
   isBlank('   ')   // true
   isBlank(' hi ')  // false
   ```

3. **`canRentCar(age, hasLicence)`** returns `true` only when the person is 21
   or older **and** holds a licence.

   ```js
   canRentCar(25, true)  // true
   canRentCar(25, false) // false
   canRentCar(19, true)  // false
   ```

When the tests pass, record it with `npm run learn -- check`.
