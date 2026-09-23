# 7. Functions: parameters, defaults, `return`

Run the tests for this exercise with:

```
npm run test -- 007
```

## The lesson

A function is a named piece of code you can run whenever you want, with
different inputs each time.

```js
function double(n) {
  return n * 2;
}

console.log(double(5)); // 10
console.log(double(7)); // 14
```

- `function` starts the declaration.
- `double` is the name.
- `n` is a **parameter**: a variable that only exists inside the function.
- `return` sends a value back to whoever called it.

`double(5)` is a **call**. The `5` is an **argument**: the actual value handed
in for this call. Parameter is the name in the definition; argument is the value
at the call site.

### `return` sends the value back

A call is an expression that becomes whatever the function returned. Without
`return`, a function hands back `undefined`:

```js
function shout(text) {
  text.toUpperCase();
}

console.log(shout('hi')); // undefined
```

The uppercase string was built and dropped, because nothing returned it. Adding
`return` fixes it:

```js
function shout(text) {
  return text.toUpperCase();
}

console.log(shout('hi')); // HI
```

This is one of the most common beginner bugs, and it produces `undefined`
rather than an error, so it can travel a long way before it shows up.

`return` also ends the function on the spot. Lines after it never run:

```js
function check(age) {
  if (age < 0) {
    return 'impossible';
  }
  return 'fine';
}

console.log(check(-1)); // impossible
console.log(check(30)); // fine
```

An `if` with a `return` at the top of a function is called a **guard clause**:
it deals with the awkward case and leaves the rest of the function to handle
the normal one.

### Several parameters

Parameters are matched by position, not by name:

```js
function describe(name, age) {
  return `${name} is ${age}`;
}

console.log(describe('Ada', 36)); // Ada is 36
console.log(describe(36, 'Ada')); // 36 is Ada
```

The second call is not an error. JavaScript hands the first argument to the
first parameter whatever it is. Getting the order wrong gives you nonsense
output rather than a complaint.

### Missing arguments and defaults

A parameter with no argument is `undefined`:

```js
function greet(name) {
  return `hello ${name}`;
}

console.log(greet()); // hello undefined
```

A **default value** covers that case:

```js
function greet(name = 'friend') {
  return `hello ${name}`;
}

console.log(greet());        // hello friend
console.log(greet('Ada'));   // hello Ada
console.log(greet(undefined)); // hello friend
```

The default is used when the argument is missing **or** `undefined`. It is not
used for other falsy values:

```js
function repeat(text, times = 3) {
  return text.repeat(times);
}

console.log(repeat('ab'));    // ababab
console.log(repeat('ab', 0)); // (an empty string)
```

`0` is a real argument, so the default stays out of the way. That is what you
want: a caller who passes `0` means `0`.

Parameters with defaults go last, so callers can leave them off.

### Functions calling functions

A function body can call any function that is in scope, including ones you
wrote:

```js
function double(n) {
  return n * 2;
}

function quadruple(n) {
  return double(double(n));
}

console.log(quadruple(3)); // 12
```

<details>
<summary>Common mistakes</summary>

**Forgetting `return`.**

```js
function add(a, b) {
  a + b;
}
console.log(add(2, 3)); // undefined
```

The sum was calculated and thrown away. Every function that is supposed to
produce a value needs `return` in front of that value.

**Calling a function without parentheses.**

```js
function total() {
  return 42;
}
console.log(total);   // [Function: total]
console.log(total()); // 42
```

Without `()` you are talking about the function itself rather than running it.
`[Function: total]` in your output means a missing pair of parentheses.

**Expecting a default to cover an empty string.**

```js
function greet(name = 'friend') {
  return `hello ${name}`;
}
console.log(greet('')); // hello
```

`''` is a real argument, so the default is not used. Defaults fire for missing
and for `undefined`, and for nothing else.

</details>

## Check yourself

1. What does this print?

```js
function add(a, b) {
  a + b;
}
console.log(add(1, 2));
```

<details><summary>Answer</summary>

`undefined`. The sum is calculated and discarded because there is no `return`.
The tempting wrong answer is `3`: the last line of a function is not returned
automatically in JavaScript, unlike in Ruby or Rust.

</details>

2. What is the difference between a parameter and an argument?

<details><summary>Answer</summary>

A parameter is the name in the function definition; an argument is the value
passed in when it is called. In `function double(n)` called as `double(5)`, `n`
is the parameter and `5` is the argument. The tempting answer is that they are
two words for the same thing - they describe the two ends of the same
connection, and error messages use them precisely.

</details>

3. What does `greet()` return?

```js
function greet(name = 'friend') {
  return `hello ${name}`;
}
```

<details><summary>Answer</summary>

`'hello friend'`. With no argument, the parameter takes its default. The
tempting wrong answer is `'hello undefined'`, which is what you get without the
default - and is worth recognising, because it tells you a caller left out an
argument.

</details>

4. What does `greet('')` return, with the same function?

<details><summary>Answer</summary>

`'hello '`, with an empty name. The default only applies when the argument is
missing or `undefined`, and an empty string is neither. The tempting wrong
answer is `'hello friend'`, from assuming defaults fill in for anything falsy.

</details>

5. What is printed?

```js
function price() {
  return 10;
}
console.log(price);
```

<details><summary>Answer</summary>

`[Function: price]`. Without parentheses you are referring to the function
rather than calling it. The tempting wrong answer is `10`. Seeing
`[Function: ...]` in output almost always means a missing `()`.

</details>

6. Which lines run when `check(-1)` is called?

```js
function check(age) {
  if (age < 0) {
    return 'impossible';
  }
  return 'fine';
}
```

<details><summary>Answer</summary>

The `if` condition and the first `return`. The function ends there, so the last
line never runs. The tempting wrong answer is that both `return` lines run and
the last one wins - `return` leaves the function immediately.

</details>

7. Why do parameters with defaults go last?

<details><summary>Answer</summary>

Because arguments are matched by position. If the default came first, a caller
who wanted to supply the second argument would still have to pass something for
the first. The tempting wrong answer is that the order does not matter - it is
allowed, but it makes the default impossible to skip.

</details>

## Your task

Open `js/007-functions/exercise.js` and write three functions.

1. **`applyDiscount(price, percentOff)`** returns the price after taking the
   percentage off. When `percentOff` is not supplied, take 10 percent off.

   ```js
   applyDiscount(100)     // 90
   applyDiscount(50, 50)  // 25
   applyDiscount(80, 0)   // 80
   ```

2. **`wrapInTag(text, tag)`** wraps text in an HTML tag. When no tag is given,
   use `p`.

   ```js
   wrapInTag('hi')            // '<p>hi</p>'
   wrapInTag('hi', 'strong')  // '<strong>hi</strong>'
   ```

3. **`safeDivide(a, b)`** returns `a` divided by `b`, except that dividing by
   zero returns the string `'cannot divide by zero'` instead of `Infinity`.

   ```js
   safeDivide(10, 2) // 5
   safeDivide(10, 0) // 'cannot divide by zero'
   ```

   Handle the awkward case first, with a guard clause.

When the tests pass, record it with `npm run learn -- check`.
