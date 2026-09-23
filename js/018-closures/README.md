# 18. Closures

Run the tests for this exercise with:

```
npm run test -- 018
```

## The lesson

A **closure** is a function that keeps access to the variables around it, even
after the code that created them has finished.

That sentence means nothing until you see it happen:

```js
function makeGreeter(greeting) {
  return (name) => `${greeting}, ${name}!`;
}

const hello = makeGreeter('Hello');
const hi = makeGreeter('Hi');

console.log(hello('Ada'));  // Hello, Ada!
console.log(hi('Grace'));   // Hi, Grace!
```

`makeGreeter('Hello')` ran and finished. Its parameter `greeting` should be
gone. But the arrow function it returned still uses `greeting`, so JavaScript
keeps that variable alive for as long as the returned function exists.

`hello` and `hi` each hold their own `greeting`. Two calls, two separate boxes.

### Where the variable lives

From lesson 8: an inner function can see the variables of the function that
contains it. A closure is that rule applied after the outer function has
returned.

```js
function makeCounter() {
  let count = 0;

  return () => {
    count += 1;
    return count;
  };
}

const next = makeCounter();
console.log(next()); // 1
console.log(next()); // 2
console.log(next()); // 3

const other = makeCounter();
console.log(other()); // 1
```

`count` is not reset between calls to `next`, because it belongs to the one run
of `makeCounter` that produced `next`. And `other` has a fresh `count` of its
own, because it came from a separate run.

Compare that with a variable declared outside everything, as in lesson 8: that
one is shared by every caller. A closure gives each caller a private copy.

### Private state

Nothing outside can read or change `count`:

```js
const next = makeCounter();
console.log(next.count); // undefined
```

The only way in is through the function you were given. This is how JavaScript
made private data for years before classes had private fields, and you still
see it everywhere.

You can return several functions sharing one variable:

```js
function makeAccount(balance) {
  return {
    deposit: (amount) => {
      balance += amount;
      return balance;
    },
    getBalance: () => balance,
  };
}

const account = makeAccount(100);
console.log(account.deposit(50)); // 150
console.log(account.getBalance()); // 150
```

Both functions close over the same `balance`.

### A closure captures the variable, not the value

```js
let message = 'first';
const show = () => message;

message = 'second';
console.log(show()); // second
```

The function reads `message` when it runs, not when it was created. This is
usually what you want, and is worth knowing when a closure returns a value that
seems out of date - or too new.

### Where you have already used one

Every callback that mentions a variable from outside itself is a closure:

```js
function above(numbers, limit) {
  return numbers.filter((n) => n > limit);
}
```

The arrow function uses `limit`, which belongs to `above`. You have been
writing closures since lesson 10 without needing the word.

<details>
<summary>Common mistakes</summary>

**Calling the factory once and expecting separate state.**

```js
const next = makeCounter();
console.log(next()); // 1
console.log(next()); // 2
```

One call to `makeCounter` gives one counter. Two independent counters need two
calls.

**Returning the result instead of the function.**

```js
function makeGreeter(greeting) {
  return `${greeting}, someone!`;
}
const hello = makeGreeter('Hello');
console.log(hello('Ada'));
// TypeError: hello is not a function
```

The factory has to return a function. `hello is not a function` means it
returned a value instead.

**Expecting the captured variable to be read-only.**

```js
function makeCounter() {
  let count = 0;
  return () => count;
}
```

This returns the same number forever, because nothing changes `count`. A
counter needs the increment inside the returned function.

</details>

## Check yourself

1. What does the second call print?

```js
function makeCounter() {
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
}
const next = makeCounter();
next();
console.log(next());
```

<details><summary>Answer</summary>

`2`. `count` belongs to the one run of `makeCounter` that created `next`, and
survives between calls. The tempting wrong answer is `1`, from expecting
`let count = 0` to run again on each call - it runs once, when the factory is
called.

</details>

2. What do `makeCounter()` and a second `makeCounter()` share?

<details><summary>Answer</summary>

Nothing. Each call creates a new `count`, so the two counters are independent.
The tempting wrong answer is that they share one counter, which is what you get
from declaring the variable at the top of the file instead.

</details>

3. Can code outside read the `count` inside a closure?

<details><summary>Answer</summary>

No. There is no path to it except the functions that were returned;
`next.count` is `undefined`. The tempting wrong answer is yes, by reading a
property of the function - the variable is not a property of anything.

</details>

4. What does `makeGreeter('Hello')` return?

<details><summary>Answer</summary>

A function, which you then call with a name. The tempting wrong answer is a
string. Calling the result of a factory that returned a string gives you
`TypeError: hello is not a function`, and that message is the clue.

</details>

5. What does this print?

```js
let name = 'Ada';
const show = () => name;
name = 'Grace';
console.log(show());
```

<details><summary>Answer</summary>

`Grace`. A closure captures the variable, not a snapshot of its value, and
reads it when the function runs. The tempting wrong answer is `Ada`, from
assuming the value was copied when the arrow function was written.

</details>

6. Is the arrow function in `numbers.filter((n) => n > limit)` a closure?

<details><summary>Answer</summary>

Yes. It uses `limit` from the surrounding function, which is what a closure is.
The tempting wrong answer is no, on the grounds that nothing was returned -
returning is the way you *notice* closures, not what makes one.

</details>

7. Why does returning two functions from one factory let them work together?

<details><summary>Answer</summary>

Because both were created in the same run of the factory, so they close over
the same variables - one can change what the other reads. The tempting wrong
answer is that each gets its own copy, which is true across separate calls to
the factory, not within one.

</details>

## Your task

Open `js/018-closures/exercise.js` and write three functions. Each one returns
a function.

1. **`makeMultiplier(factor)`** returns a function that multiplies its argument
   by `factor`.

   ```js
   const triple = makeMultiplier(3);
   triple(5) // 15
   ```

2. **`makeCounter()`** returns a function that returns 1 the first time it is
   called, 2 the second, and so on. Two counters made by two calls must not
   affect each other.

   ```js
   const next = makeCounter();
   next() // 1
   next() // 2
   ```

3. **`once(fn)`** returns a function that calls `fn` the first time it is used
   and returns its result. Every call after that returns that same first result
   without calling `fn` again. Arguments are passed through on the first call.

   ```js
   const start = once((n) => n * 2);
   start(5) // 10
   start(9) // 10   fn was not called again
   ```

When the tests pass, record it with `npm run learn -- check`.
