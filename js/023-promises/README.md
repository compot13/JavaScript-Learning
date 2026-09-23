# 23. Promises

Run the tests for this exercise with:

```
npm run test -- 023
```

## The lesson

Some results are not ready straight away: a file being read, a reply from a
server, a timer. A **promise** is an object standing in for a value that will
exist later.

A promise is in one of three states: **pending** (still waiting), **fulfilled**
(the value arrived), or **rejected** (it went wrong). Once it settles, it never
changes again.

### Getting the value out

`then` registers a function to run when the value arrives:

```js
const promise = Promise.resolve(5);

promise.then((value) => {
  console.log(value); // 5
});
```

`Promise.resolve(5)` makes a promise that is already fulfilled with `5`, which
is handy for experiments.

The value cannot be taken out any other way:

```js
const value = Promise.resolve(5);
console.log(value);     // Promise { 5 }
console.log(value + 1); // [object Promise]1
```

Seeing `Promise { ... }` or `[object Promise]` where you expected data means a
missing `then` - or, from the next lesson, a missing `await`.

### Order of events

```js
console.log('first');
Promise.resolve('second').then((value) => console.log(value));
console.log('third');
// first
// third
// second
```

The `then` callback waits until the current work finishes, even when the
promise already has its value. Anything that depends on the value has to be
inside the callback.

### Making one

`new Promise` takes a function with two parameters: call `resolve(value)` when
it works, `reject(error)` when it does not.

```js
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

delay(100).then(() => console.log('100ms later'));
```

`setTimeout(fn, ms)` runs `fn` after a delay - it is the standard way to make
something take time on purpose.

Carrying a value through:

```js
function delayedValue(value, ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}
```

Note the difference: `setTimeout(resolve, ms)` hands `resolve` over to be
called later with nothing, while `setTimeout(() => resolve(value), ms)` calls
it yourself with the value.

Rejecting:

```js
function checkAge(age) {
  return new Promise((resolve, reject) => {
    if (age < 0) {
      reject(new Error('age must be 0 or more'));
    } else {
      resolve(age);
    }
  });
}
```

Reject with an `Error`, for the same reasons as lesson 19.

### Chaining

`then` returns a new promise holding whatever its callback returned, so calls
chain:

```js
Promise.resolve(2)
  .then((n) => n * 2)
  .then((n) => n + 1)
  .then((n) => console.log(n)); // 5
```

If a callback returns a promise, the chain waits for it before carrying on -
which is what keeps a chain flat instead of nesting callbacks inside callbacks.

```js
delay(50)
  .then(() => delay(50))
  .then(() => console.log('100ms in total'));
```

Forgetting to return inside a `then` breaks the chain:

```js
Promise.resolve(2)
  .then((n) => { n * 2; })   // returns undefined
  .then((n) => console.log(n)); // undefined
```

### Handling failure

`catch` runs when anything earlier in the chain rejects or throws:

```js
Promise.reject(new Error('no'))
  .then((value) => console.log('never runs'))
  .catch((error) => console.log('caught:', error.message));
// caught: no
```

One `catch` at the end of a chain covers every step before it. A promise that
rejects with nothing to catch it crashes the program with
`UnhandledPromiseRejection`.

`finally` runs either way, and receives nothing:

```js
loadData()
  .then((data) => console.log(data))
  .catch((error) => console.log(error.message))
  .finally(() => console.log('done either way'));
```

### Waiting for several

`Promise.all` takes an array of promises and gives you one promise of an array
of results, in the same order:

```js
Promise.all([Promise.resolve(1), Promise.resolve(2)])
  .then((values) => console.log(values)); // [ 1, 2 ]
```

They run at the same time, so waiting for three 100ms requests together takes
about 100ms rather than 300. If any one rejects, the whole thing rejects
immediately. `Promise.allSettled` waits for all of them and reports each
outcome instead.

<details>
<summary>Common mistakes</summary>

**Using the promise instead of the value.**

```js
const data = loadData();
console.log(data.name); // undefined
```

`loadData()` returns a promise, and promises have no `name`. Read it inside
`.then((data) => ...)`.

**Forgetting to return inside `then`.**

```js
Promise.resolve(2)
  .then((n) => { n * 2; })
  .then((n) => console.log(n)); // undefined
```

The braced callback returns nothing, so the next `then` receives `undefined`.

**Forgetting to return the promise from your own function.**

```js
function delay(ms) {
  new Promise((resolve) => setTimeout(resolve, ms));
}
delay(100).then(() => {});
// TypeError: Cannot read properties of undefined (reading 'then')
```

The promise was built and dropped. The caller got `undefined`.

</details>

## Check yourself

1. What does `console.log(Promise.resolve(5))` print?

<details><summary>Answer</summary>

`Promise { 5 }`, not `5`. The value has to be taken out with `then`. The
tempting wrong answer is `5` - seeing `Promise { ... }` in output is the signal
that a `then` is missing.

</details>

2. What order does this print in?

```js
console.log('a');
Promise.resolve('b').then((v) => console.log(v));
console.log('c');
```

<details><summary>Answer</summary>

`a`, `c`, `b`. A `then` callback always waits until the current run of code
finishes, even when the promise is already settled. The tempting wrong answer
is `a`, `b`, `c`, from expecting an already-resolved promise to run its
callback on the spot.

</details>

3. What are the three states of a promise?

<details><summary>Answer</summary>

Pending, fulfilled and rejected, and once it settles it stays that way. The
tempting wrong answer includes something like "cancelled" - a promise cannot be
cancelled once started, which is why `AbortController` exists separately.

</details>

4. What does `then` return?

<details><summary>Answer</summary>

A new promise holding whatever its callback returned. That is what makes
chaining work. The tempting wrong answer is that it returns the value, which
would make `.then(...).then(...)` impossible.

</details>

5. Why does this print `undefined`?

```js
Promise.resolve(2)
  .then((n) => { n * 2; })
  .then((n) => console.log(n));
```

<details><summary>Answer</summary>

The first callback has braces and no `return`, so the promise it produces holds
`undefined`. The tempting wrong answer is `4`. It is the lesson 8 arrow
function rule, showing up one link along a chain.

</details>

6. Where does one `catch` at the end of a chain apply?

<details><summary>Answer</summary>

To every step before it: any rejection or thrown error earlier in the chain
lands there. The tempting wrong answer is that it only covers the last `then` -
which would mean writing a `catch` after every step.

</details>

7. What does `Promise.all` do when one of its promises rejects?

<details><summary>Answer</summary>

The whole thing rejects immediately with that error, and the other results are
lost. The tempting wrong answer is that it returns the ones that worked - for
that you want `Promise.allSettled`.

</details>

## Your task

Open `js/023-promises/exercise.js` and write three functions. Use `then`, not
`async` and `await`, which are the next lesson.

1. **`delay(ms)`** returns a promise that fulfils after `ms` milliseconds. Its
   value does not matter.

   ```js
   delay(50).then(() => console.log('done'));
   ```

2. **`doubleLater(n, ms)`** returns a promise that fulfils with `n * 2` after
   `ms` milliseconds.

   ```js
   doubleLater(5, 10).then((value) => console.log(value)); // 10
   ```

3. **`sumOfPromises(promises)`** takes an array of promises of numbers and
   returns a promise of their total. An empty array gives a promise of 0.

   ```js
   sumOfPromises([Promise.resolve(1), Promise.resolve(2)])
     .then((total) => console.log(total)); // 3
   ```

When the tests pass, record it with `npm run learn -- check`.
