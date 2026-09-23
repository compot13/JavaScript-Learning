# 8. Arrow functions and scope

Run the tests for this exercise with:

```
npm run test -- 008
```

## The lesson

### A function can be stored in a variable

Functions are values. You can put one in a `const`, exactly like a number:

```js
const double = function (n) {
  return n * 2;
};

console.log(double(5)); // 10
```

### Arrow functions

The arrow form writes the same thing more briefly:

```js
const double = (n) => {
  return n * 2;
};

console.log(double(5)); // 10
```

The parameters go in parentheses, then `=>`, then the body in braces.

When the body is a single `return`, you can drop the braces and the word
`return`. The value of the expression is returned automatically. This is called
a **concise body**:

```js
const double = (n) => n * 2;
const add = (a, b) => a + b;
const shout = (text) => text.toUpperCase();

console.log(double(5));      // 10
console.log(add(2, 3));      // 5
console.log(shout('hi'));    // HI
```

With no parameters, the parentheses stay, empty:

```js
const answer = () => 42;
console.log(answer()); // 42
```

Braces mean "here comes a block of statements", so as soon as you add braces
you are back to needing `return`:

```js
const double = (n) => { n * 2; };
console.log(double(5)); // undefined
```

Arrow functions are the form you will see most often in modern JavaScript,
especially as arguments to other functions, which is where lesson 10 goes next.

### Declared functions come into existence early

A `function` declaration can be called from a line above it. A function stored
in a `const` cannot:

```js
console.log(early(2)); // 4

function early(n) {
  return n * 2;
}
```

```js
console.log(late(2));
// ReferenceError: Cannot access 'late' before initialization

const late = (n) => n * 2;
```

This is called **hoisting**: declarations are registered before the file runs,
but a `const` is not usable until its line has run. Define things above where
you use them and the difference stops mattering.

### Scope

**Scope** is the part of a program where a name is visible.

A variable declared with `let` or `const` inside curly braces exists only
inside those braces:

```js
{
  const secret = 'hidden';
  console.log(secret); // hidden
}

console.log(secret);
// ReferenceError: secret is not defined
```

That applies to every kind of block: the body of an `if`, the body of a loop,
the body of a function.

```js
function total() {
  const subtotal = 10;
  return subtotal;
}

console.log(total());    // 10
console.log(subtotal);
// ReferenceError: subtotal is not defined
```

Inner code can see outwards, but outer code cannot see in:

```js
const rate = 0.2;

function tax(amount) {
  return amount * rate; // rate comes from outside, and that is fine
}

console.log(tax(100)); // 20
```

### A variable outside a function survives between calls

Because the variable lives outside, it is not recreated on each call:

```js
let clicks = 0;

function click() {
  clicks += 1;
  return clicks;
}

console.log(click()); // 1
console.log(click()); // 2
console.log(click()); // 3
```

Move `let clicks = 0` inside the function and every call returns `1`, because
the variable is created fresh each time.

### Shadowing

An inner variable with the same name as an outer one hides it for the length of
the block:

```js
const name = 'outer';

function show() {
  const name = 'inner';
  return name;
}

console.log(show()); // inner
console.log(name);   // outer
```

Nothing was overwritten. There are two separate variables, and the inner one
was closer.

<details>
<summary>Common mistakes</summary>

**Adding braces to a concise arrow and forgetting `return`.**

```js
const double = (n) => { n * 2; };
console.log(double(5)); // undefined
```

With braces the body is a block, and a block needs `return`. Either write
`(n) => n * 2` or `(n) => { return n * 2; }`.

**Using a `const` function before its line.**

```js
console.log(area(2));
const area = (r) => r * r;
// ReferenceError: Cannot access 'area' before initialization
```

The name exists but has no value yet. Move the call below the definition.

**Reading a loop variable after the loop.**

```js
for (let i = 0; i < 3; i++) {
  // ...
}
console.log(i);
// ReferenceError: i is not defined
```

`i` belongs to the loop. If you need the value afterwards, declare a variable
outside the loop and set it inside.

</details>

## Check yourself

1. What does `const triple = (n) => n * 3;` return when called with `4`?

<details><summary>Answer</summary>

`12`. A concise arrow body returns its expression without the word `return`.
The tempting wrong answer is `undefined`, which is what you get once you wrap
the body in braces and leave `return` out.

</details>

2. What does this print?

```js
const half = (n) => { n / 2; };
console.log(half(10));
```

<details><summary>Answer</summary>

`undefined`. The braces make the body a block, and the block never returns
anything. The tempting wrong answer is `5`. This is the most common arrow
function bug, and it produces no error at all.

</details>

3. What happens here?

```js
function show() {
  const message = 'hi';
}
show();
console.log(message);
```

<details><summary>Answer</summary>

`ReferenceError: message is not defined`. The variable exists only inside the
function that declared it, and it is gone once the call finishes. The tempting
wrong answer is `hi`, from expecting the value to escape after the function has
run.

</details>

4. What does the third call print?

```js
let count = 0;
const bump = () => {
  count += 1;
  return count;
};
bump();
bump();
console.log(bump());
```

<details><summary>Answer</summary>

`3`. `count` lives outside the function, so each call adds to the same
variable. The tempting wrong answer is `1`, which is what you would get if the
declaration were inside the function and recreated on every call.

</details>

5. What does `show()` return?

```js
const colour = 'red';
function show() {
  const colour = 'blue';
  return colour;
}
```

<details><summary>Answer</summary>

`'blue'`. The inner declaration makes a separate variable that hides the outer
one inside this function. The tempting wrong answer is that the outer variable
was overwritten and is now `'blue'` everywhere - it still holds `'red'`.

</details>

6. Why does calling a `const` arrow function above its definition fail?

<details><summary>Answer</summary>

Because a `const` holds no value until its own line has run, so the name exists
but cannot be read yet. The tempting wrong answer is "the name does not exist
yet" - the error says `Cannot access 'x' before initialization` rather than
`x is not defined`, and the difference tells you which of the two problems you
have.

</details>

7. Can a function read a variable declared outside it?

<details><summary>Answer</summary>

Yes. Inner code can see outwards; outer code cannot see inwards. The tempting
wrong answer is that a function only sees its parameters, which would make
shared configuration values impossible to use.

</details>

## Your task

Open `js/008-arrow-functions-and-scope/exercise.js`. All three are written as
arrow functions assigned to a `const`, and the stubs already have that shape.

1. **`double`** takes a number and returns twice it. Write it with a concise
   body: no braces, no `return`.

   ```js
   double(5) // 10
   ```

2. **`initialsOf`** takes a two-word name and returns the uppercase initials
   with no separator. Also a concise body.

   ```js
   initialsOf('ada lovelace') // 'AL'
   ```

3. **`nextId`** takes nothing and returns 1 the first time it is called, 2 the
   second time, 3 the third, and so on. The counter has to live outside the
   function so it survives between calls. Declare it at the top of the file.

   ```js
   nextId() // 1
   nextId() // 2
   ```

When the tests pass, record it with `npm run learn -- check`.
