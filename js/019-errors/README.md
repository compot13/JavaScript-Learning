# 19. Errors: `throw`, `try` / `catch`, and reading a stack trace

Run the tests for this exercise with:

```
npm run test -- 019
```

## The lesson

When something goes wrong, JavaScript **throws** an error. A thrown error stops
the current function immediately and keeps stopping the functions that called
it, until something catches it or the program ends.

```js
const user = undefined;
console.log(user.name);
// TypeError: Cannot read properties of undefined (reading 'name')
```

### Reading the message

A crash report has three useful parts.

```
TypeError: Cannot read properties of undefined (reading 'name')
    at label (/home/you/app.js:4:20)
    at main (/home/you/app.js:9:3)
    at /home/you/app.js:12:1
```

1. **The type.** `TypeError` means a value was not the kind of thing you used
   it as. `ReferenceError` means a name does not exist. `SyntaxError` means the
   file could not be read as JavaScript at all, so nothing ran.
2. **The message.** Here, something was `undefined` and you asked it for
   `name`.
3. **The stack trace**, the indented `at` lines. Read them top down: the first
   line is where it broke, `at label (app.js:4:20)` meaning line 4, column 20
   of `app.js`. Each line below is the call that led there. Most of the time
   the first line is all you need.

If the first lines name files inside `node_modules` or `node:internal`, scroll
down to the first line naming a file of yours. That is where your part of the
problem starts.

### Throwing your own

```js
function withdraw(balance, amount) {
  if (amount > balance) {
    throw new Error('insufficient funds');
  }
  return balance - amount;
}

withdraw(50, 100);
// Error: insufficient funds
```

`new Error('message')` builds an error object; `throw` sends it up. Do this
when a function cannot do the job it was asked to do. Returning `undefined` or
`-1` for an impossible request puts the burden on every caller to remember to
check.

Use a specific type when one fits. They are all ordinary errors with better
names:

```js
throw new TypeError('age must be a number');
throw new RangeError('age must be 0 or more');
```

### Catching

```js
try {
  const data = JSON.parse('not json');
  console.log(data);
} catch (error) {
  console.log('could not read that:', error.message);
}
// could not read that: Unexpected token 'o', "not json" is not valid JSON
```

The `try` block runs. If anything inside throws, the rest of the block is
skipped and the `catch` block runs with the error object. Every error has
`name` and `message`; `error.stack` holds the trace.

Catch only what you can do something about. A `catch` that swallows everything
silently turns a loud bug into a mystery:

```js
try {
  save(data);
} catch (error) {
  // nothing here: the failure disappears
}
```

If you cannot handle it, let it through, or catch it, add information, and
throw again:

```js
try {
  save(data);
} catch (error) {
  throw new Error(`saving user ${id} failed: ${error.message}`);
}
```

### `finally`

`finally` runs whether or not there was an error, and even after a `return`:

```js
function read() {
  try {
    return 'value';
  } finally {
    console.log('cleaning up');
  }
}

console.log(read());
// cleaning up
// value
```

Use it for cleanup that has to happen either way, such as closing a file.

### Catching only what you meant to

`catch` receives everything, so check before you assume:

```js
try {
  doWork();
} catch (error) {
  if (error instanceof RangeError) {
    console.log('out of range');
  } else {
    throw error; // not mine to handle
  }
}
```

`instanceof` asks whether an object was built from a particular class.

### When not to use `try`

```js
try {
  const value = user.address.city;
} catch (error) {
  // ...
}
```

Optional chaining (`user.address?.city`) says this better. `try` / `catch` is
for genuinely exceptional situations, not for ordinary missing values.

<details>
<summary>Common mistakes</summary>

**Throwing a string.**

```js
throw 'something broke';
```

It works, but the thing you catch has no `message`, no `name` and no stack
trace, so `error.message` is `undefined` at the other end. Throw
`new Error('something broke')`.

**Swallowing the error.**

```js
try {
  risky();
} catch (error) {}
```

The program carries on with wrong data and no clue why. At minimum, log it.

**Expecting `catch` to resume where it stopped.**

```js
try {
  console.log('a');
  broken();
  console.log('b');
} catch (error) {
  console.log('caught');
}
// a
// caught
```

`b` never prints. Everything after the throwing line in the `try` block is
skipped.

</details>

## Check yourself

1. What does `TypeError: Cannot read properties of undefined (reading 'city')`
   tell you is missing?

<details><summary>Answer</summary>

The thing *before* `city` in the path - whatever should have been an object was
`undefined`. The tempting wrong answer is that `city` is missing; a missing
`city` on an object that exists gives you `undefined` with no error at all.

</details>

2. What is the difference between `ReferenceError` and `TypeError`?

<details><summary>Answer</summary>

`ReferenceError` means the name does not exist anywhere. `TypeError` means the
name exists but the value is not the kind of thing you used it as. The tempting
answer is that both mean a typo - only the first usually does, and the second
usually means a value arrived as `undefined`.

</details>

3. What does this print?

```js
try {
  console.log('a');
  undefined.x;
  console.log('b');
} catch (error) {
  console.log('c');
}
```

<details><summary>Answer</summary>

`a` then `c`. The throw abandons the rest of the `try` block, so `b` is never
reached. The tempting wrong answer includes `b`, from expecting `catch` to
resume where the error happened.

</details>

4. What is wrong with `throw 'oops'`?

<details><summary>Answer</summary>

You can throw any value, but a string carries no `name`, `message` or stack, so
whoever catches it gets `undefined` when they read `error.message`. The
tempting wrong answer is that it is a syntax error - it runs, and only hurts at
the other end.

</details>

5. When does a `finally` block run?

<details><summary>Answer</summary>

Always: after the `try` block finishes, after a `catch` runs, and even when the
`try` block returns. The tempting wrong answer is "only when there was an
error", which describes `catch`.

</details>

6. Why is an empty `catch` block a problem?

<details><summary>Answer</summary>

Because the program carries on as though nothing happened, usually with missing
or wrong data, and the cause has been erased. The tempting wrong answer is that
it makes code robust - it makes failures silent, which is the opposite.

</details>

7. Should you use `try` / `catch` to read `user.address.city` safely?

<details><summary>Answer</summary>

No. Optional chaining, `user.address?.city`, states the intent and costs
nothing. The tempting wrong answer is yes, since it does prevent the crash -
but wrapping ordinary missing values in `try` hides the real errors that land
in the same block.

</details>

## Your task

Open `js/019-errors/exercise.js` and write three functions.

1. **`divide(a, b)`** returns `a / b`, but throws an `Error` whose message is
   exactly `'cannot divide by zero'` when `b` is `0`.

   ```js
   divide(10, 2) // 5
   divide(10, 0) // throws Error('cannot divide by zero')
   ```

2. **`checkAge(age)`** returns the age when it is valid, and otherwise throws:

   - a `TypeError` with the message `'age must be a number'` when `age` is not
     a number,
   - a `RangeError` with the message `'age must be 0 or more'` when it is
     negative.

   ```js
   checkAge(30)     // 30
   checkAge('30')   // throws TypeError
   checkAge(-1)     // throws RangeError
   ```

3. **`attempt(fn, fallback)`** calls `fn` with no arguments and returns its
   result. If `fn` throws anything at all, return `fallback` instead.

   ```js
   attempt(() => 1 + 1, 0)            // 2
   attempt(() => { throw new Error('x'); }, 0) // 0
   ```

When the tests pass, record it with `npm run learn -- check`.
