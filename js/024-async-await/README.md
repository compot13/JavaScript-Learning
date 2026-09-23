# 24. `async` / `await`, and calling a real API with `fetch`

Run the tests for this exercise with:

```
npm run test -- 024
```

## The lesson

`async` and `await` are a different way of writing promise code. Nothing new
happens underneath - the same promises, read top to bottom.

```js
// With then
function load() {
  return delay(10).then(() => 'ready');
}

// With async and await
async function load() {
  await delay(10);
  return 'ready';
}
```

Two rules cover most of it:

1. `await` pauses inside the function until a promise settles, then gives you
   its value.
2. `await` is only allowed inside a function marked `async`.

### `async` functions always return a promise

```js
async function answer() {
  return 42;
}

console.log(answer());              // Promise { 42 }
answer().then((v) => console.log(v)); // 42
```

Even a plain value comes back wrapped. That is the deal: `async` on the outside,
promises for the caller; `await` on the inside, plain values for you.

### What `await` gives you

```js
async function main() {
  const value = await Promise.resolve(5);
  console.log(value); // 5
}
```

Without `await`, `value` would be the promise itself. `[object Promise]` in
your output, or `undefined` from a property you expected, usually means a
missing `await`.

### Errors

`await` throws when the promise rejects, so ordinary `try` / `catch` from
lesson 19 works:

```js
async function safeLoad() {
  try {
    return await loadData();
  } catch (error) {
    console.log('failed:', error.message);
    return null;
  }
}
```

An `async` function that throws returns a rejected promise. That is how the
error reaches the caller.

### One at a time, or all together

```js
// Sequential: about 200ms
const a = await delay(100);
const b = await delay(100);

// Together: about 100ms
const [a, b] = await Promise.all([delay(100), delay(100)]);
```

Await one thing at a time only when the second genuinely needs the first.
Otherwise start them together with `Promise.all`. This is the most common
performance mistake in asynchronous JavaScript.

### `fetch`

`fetch` asks for something over the network and returns a promise. It is built
into Node 18 and later, and into every browser.

```js
const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
const data = await response.json();
console.log(data);
// { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
```

That is a real, free API for testing, and that is its real output. Put those
three lines in `playground.js` and run `node playground.js` to see it yourself -
Node allows `await` at the top level of a module file.

There are **two** promises here, which is the part people miss:

1. `fetch(...)` settles once the response headers arrive. You now have a
   `Response` object, not the data.
2. `response.json()` settles once the body has been read and parsed.

```js
const data = await fetch(url).json();
// TypeError: fetch(...).json is not a function
```

The first `await` is missing, so `.json()` was called on a promise.

### `fetch` does not throw on a 404

```js
const response = await fetch('https://jsonplaceholder.typicode.com/todos/99999');
console.log(response.ok);     // false
console.log(response.status); // 404
```

A reply saying "not found" is still a reply. `fetch` only rejects when the
request could not be made at all - no network, bad host name. Check `ok`
yourself:

```js
async function loadTodo(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!response.ok) {
    throw new Error(`request failed with status ${response.status}`);
  }
  return response.json();
}
```

This trips up nearly everyone once, because the failure is silent: you get a
`Response` that is not what you asked for, and the bug shows up further along
as `undefined`.

### Testing code that fetches

A test that calls a real server is slow and fails when the network does. The
usual fix is to let the caller supply the fetching function, with the real one
as a default:

```js
async function loadTodo(id, fetchFn = fetch) {
  const response = await fetchFn(url);
  // ...
}
```

Production code calls `loadTodo(1)`. A test calls `loadTodo(1, fakeFetch)` and
supplies whatever response it wants to try. Your exercise takes this shape, and
its tests pass in a fake.

<details>
<summary>Common mistakes</summary>

**Missing `await` on `fetch`.**

```js
const data = await fetch(url).json();
// TypeError: fetch(...).json is not a function
```

`fetch(url)` is a promise; `.json()` belongs to the response inside it.

**Treating a 404 as a thrown error.**

```js
try {
  const response = await fetch(missingUrl);
  const data = await response.json();
} catch (error) {
  // does not run for a 404
}
```

Check `response.ok` before reading the body.

**Awaiting in a loop when the requests are independent.**

```js
for (const id of ids) {
  results.push(await loadTodo(id)); // one after another
}
```

Each request waits for the one before it. Use
`await Promise.all(ids.map(loadTodo))` when they do not depend on each other.

</details>

## Check yourself

1. What does an `async` function return?

<details><summary>Answer</summary>

A promise, always - even when the body returns a plain number. The tempting
wrong answer is "whatever you returned", which is true inside the function and
not at the call site, where you need `await` or `then`.

</details>

2. Where is `await` allowed?

<details><summary>Answer</summary>

Inside a function marked `async`, and at the top level of a module file. The
tempting wrong answer is "anywhere" - inside a plain function it is a
`SyntaxError`, which is the usual sign you forgot the `async` keyword.

</details>

3. Why does `await fetch(url).json()` fail?

<details><summary>Answer</summary>

Because `fetch(url)` is a promise and `.json()` is a method of the response
inside it. You need `(await fetch(url)).json()`, or two statements. The
tempting wrong answer is that `json` is spelled wrong - the message,
`fetch(...).json is not a function`, is telling you what the value really is.

</details>

4. Does `fetch` reject when the server replies 404?

<details><summary>Answer</summary>

No. A 404 is a successful round trip, so the promise fulfils with a response
whose `ok` is `false`. The tempting wrong answer is yes, and code written on
that assumption carries on with data it never received.

</details>

5. How do you catch an error from an awaited promise?

<details><summary>Answer</summary>

With an ordinary `try` / `catch` around the `await`, because a rejected promise
makes `await` throw. The tempting wrong answer is that you need `.catch()` -
which does work, and mixing both styles in one function is where the confusion
starts.

</details>

6. What is the difference between these two?

```js
const a = await slow();
const b = await slow();
// versus
const [a, b] = await Promise.all([slow(), slow()]);
```

<details><summary>Answer</summary>

The first waits for one before starting the other, taking twice as long. The
second starts both immediately. The tempting wrong answer is that they are the
same because both end up with the same values - the difference is time, and it
is the most common performance bug in async code.

</details>

7. Why would a function take `fetchFn` as a parameter instead of calling
   `fetch` directly?

<details><summary>Answer</summary>

So tests can pass in a fake and run without a network, while normal callers use
the default. The tempting wrong answer is that it is pointless indirection -
without it, the only way to test the failure paths is to find a server that
fails on demand.

</details>

## Your task

Open `js/024-async-await/exercise.js` and write three functions. Each one takes
a `fetchFn` parameter that defaults to the real `fetch`, so the tests can pass
in a fake.

A fake response in the tests looks like this:

```js
{ ok: true, status: 200, json: async () => ({ title: 'hello' }) }
```

1. **`loadTitle(url, fetchFn)`** fetches the URL, reads the JSON body, and
   returns the `title` property. When `response.ok` is `false`, throw an
   `Error` whose message is exactly `'request failed with status 404'` for a
   404, using the real status.

   ```js
   await loadTitle('https://example.com/1', fakeFetch) // 'hello'
   ```

2. **`loadAllTitles(urls, fetchFn)`** returns an array of titles for an array
   of URLs, fetched **together** rather than one after another.

   ```js
   await loadAllTitles(['/1', '/2'], fakeFetch) // ['hello', 'hello']
   ```

3. **`loadTitleOr(url, fallback, fetchFn)`** returns the title, or `fallback`
   when anything goes wrong - a rejected fetch, a bad status, or a body that
   will not parse.

   ```js
   await loadTitleOr('/broken', 'none', failingFetch) // 'none'
   ```

When the tests pass, record it with `npm run learn -- check`.
