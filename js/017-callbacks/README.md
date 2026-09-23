# 17. Functions that take functions

Run the tests for this exercise with:

```
npm run test -- 017
```

## The lesson

You have been passing functions to other functions since lesson 10. This lesson
is about writing the other side.

A **higher-order function** is a function that takes a function as an argument,
returns one, or both. The function you hand over is the **callback**.

### Functions are values

A function can be stored, passed and returned, exactly like a number or a
string:

```js
function double(n) {
  return n * 2;
}

const alias = double;      // no parentheses: the function itself
console.log(alias(4));     // 8
console.log(typeof alias); // function
```

The distinction that matters:

```js
console.log(double);   // [Function: double]   the function
console.log(double(4)); // 8                   the result of calling it
```

`double` passes the recipe. `double(4)` cooks the meal and passes the plate.

### Taking a function as a parameter

A parameter holding a function is an ordinary parameter. Call it with
parentheses:

```js
function applyTwice(fn, value) {
  return fn(fn(value));
}

console.log(applyTwice(double, 3));            // 12
console.log(applyTwice((n) => n + 1, 0));      // 2
console.log(applyTwice((text) => text + '!', 'hi')); // hi!!
```

`applyTwice` knows nothing about doubling. It knows how to call something
twice, and the caller decides what. That is the whole idea: the shape of the
work stays in one place, the specific work is handed in.

### Writing your own `map`

```js
function transformAll(items, fn) {
  const result = [];
  for (const item of items) {
    result.push(fn(item));
  }
  return result;
}

console.log(transformAll([1, 2, 3], double)); // [ 2, 4, 6 ]
```

That is what `Array.prototype.map` does. Writing it once makes the built-in
version stop being magic.

### Callbacks that answer a question

A callback that returns `true` or `false` is called a **predicate**:

```js
function countWhere(items, predicate) {
  let count = 0;
  for (const item of items) {
    if (predicate(item)) {
      count += 1;
    }
  }
  return count;
}

console.log(countWhere([1, 2, 3, 4], (n) => n % 2 === 0)); // 2
```

`filter`, `find`, `some` and `every` all take predicates.

### Passing versus calling

This is the mistake to watch for:

```js
const numbers = [1, 4, 9];

console.log(numbers.map(Math.sqrt));   // [ 1, 2, 3 ]
console.log(numbers.map(Math.sqrt())); // TypeError: undefined is not a function
```

The first passes the function. The second calls `Math.sqrt` with no arguments,
gets `NaN` back, and hands `map` a number where a function was expected.

The same mistake with your own functions:

```js
setTimeoutLike(sayHello);   // run this later
setTimeoutLike(sayHello()); // run it now and pass the result
```

If you need to pass arguments, wrap the call in a function:

```js
const greet = (name) => `hello ${name}`;
console.log(['Ada'].map((name) => greet(name))); // [ 'hello Ada' ]
console.log(['Ada'].map(greet));                 // [ 'hello Ada' ]
```

Both work here. The wrapper matters when the arguments are not the ones the
caller supplies:

```js
console.log(['1', '2', '3'].map(Number));      // [ 1, 2, 3 ]
console.log(['1', '2', '3'].map(parseInt));    // [ 1, NaN, NaN ]
```

`map` passes the index as a second argument, and `parseInt` reads a second
argument as the number base. `Number` takes one argument and is unaffected.
When a callback behaves oddly, check how many arguments it is really receiving.

### Returning a function

A function can hand one back:

```js
function makeGreeter(greeting) {
  return (name) => `${greeting}, ${name}!`;
}

const hello = makeGreeter('Hello');
console.log(hello('Ada')); // Hello, Ada!
```

`makeGreeter('Hello')` returns a new function, which is then called separately.
Lesson 18 is about how that returned function remembers `greeting`.

<details>
<summary>Common mistakes</summary>

**Calling the callback where you meant to pass it.**

```js
console.log([1, 4].map(Math.sqrt()));
// TypeError: undefined is not a function
```

`Math.sqrt()` runs immediately. Drop the parentheses to pass the function
itself.

**Forgetting to call the parameter inside your function.**

```js
function applyTwice(fn, value) {
  return fn;
}
console.log(applyTwice(double, 3)); // [Function: double]
```

`fn` is the function; `fn(value)` is its result. Seeing `[Function: ...]` in
your output means a missing pair of parentheses.

**Passing a callback that takes more arguments than you think.**

```js
console.log(['1', '2', '3'].map(parseInt)); // [ 1, NaN, NaN ]
```

`map` supplies the index as well, and `parseInt` uses it as a number base.
Wrap it: `map((text) => parseInt(text, 10))`.

</details>

## Check yourself

1. What is the difference between `double` and `double(4)`?

<details><summary>Answer</summary>

`double` is the function value itself, which you can pass around. `double(4)`
calls it and is the returned value, `8`. The tempting mistake is adding
parentheses out of habit when passing a callback, which hands over the result
instead of the function.

</details>

2. What does `applyTwice((n) => n + 1, 0)` return?

```js
function applyTwice(fn, value) {
  return fn(fn(value));
}
```

<details><summary>Answer</summary>

`2`. The inner call gives `1`, and the outer call adds one again. The tempting
wrong answer is `1`, from counting only the outer call - read the nesting from
the inside out.

</details>

3. What does `[1, 4].map(Math.sqrt())` do?

<details><summary>Answer</summary>

It throws `TypeError: undefined is not a function`, because `Math.sqrt()` ran
first and returned `NaN`, which `map` cannot call. The tempting wrong answer is
`[1, 2]` - that needs `map(Math.sqrt)` with no parentheses.

</details>

4. What is a predicate?

<details><summary>Answer</summary>

A callback that returns true or false for each item, used by `filter`, `find`,
`some` and `every`. The tempting wrong answer is that it is any callback -
`map`'s callback returns a new value rather than answering a question, and
passing a predicate to `map` gives you an array of booleans.

</details>

5. Why does `['1', '2', '3'].map(parseInt)` produce `[1, NaN, NaN]`?

<details><summary>Answer</summary>

Because `map` passes the index as a second argument and `parseInt` treats it as
the number base, so base 1 and base 2 are used for the second and third items.
The tempting wrong answer is that `parseInt` is broken - it is receiving
arguments you did not intend to send.

</details>

6. What does this return?

```js
function makeGreeter(greeting) {
  return (name) => `${greeting}, ${name}!`;
}
makeGreeter('Hi');
```

<details><summary>Answer</summary>

A function, not a string. Nothing has been greeted yet; you have to call the
result. The tempting wrong answer is `'Hi, undefined!'`, which is what you get
from calling it with no argument.

</details>

7. Why write `countWhere(items, predicate)` instead of a loop each time?

<details><summary>Answer</summary>

Because the loop, the counter and the off-by-one risks are written once, and
each caller supplies only the test that differs. The tempting wrong answer is
"to make the code shorter" - the win is that the repeated, error-prone part
exists in exactly one place.

</details>

## Your task

Open `js/017-callbacks/exercise.js` and write three functions. Do not use
`map`, `filter` or `reduce` here - write the loops, so the built-in versions
stop being magic.

1. **`applyTwice(fn, value)`** calls `fn` on `value`, then calls `fn` on the
   result.

   ```js
   applyTwice((n) => n * 2, 3)        // 12
   applyTwice((s) => s + '!', 'hi')   // 'hi!!'
   ```

2. **`transformAll(items, fn)`** returns a new array with `fn` applied to every
   item. This is `map`, written by you.

   ```js
   transformAll([1, 2, 3], (n) => n * 10) // [10, 20, 30]
   ```

3. **`countWhere(items, predicate)`** returns how many items the predicate
   answers truthily for.

   ```js
   countWhere([1, 2, 3, 4], (n) => n % 2 === 0) // 2
   countWhere([], (n) => true)                  // 0
   ```

When the tests pass, record it with `npm run learn -- check`.
