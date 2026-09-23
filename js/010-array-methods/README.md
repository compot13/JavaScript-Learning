# 10. Array methods: `map`, `filter`, `find`, `some`, `every`

Run the tests for this exercise with:

```
npm run test -- 010
```

## The lesson

You can do everything in this lesson with the loops from lesson 6. These
methods exist because the loop version has four lines of bookkeeping around one
line of actual work, and the bookkeeping is where the bugs live.

Each of these methods takes a function as an argument. A function you hand to
another function is called a **callback**: the method calls it back, once per
item.

### `map`: change every item

```js
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2);

console.log(doubled); // [ 2, 4, 6 ]
console.log(numbers); // [ 1, 2, 3 ]  untouched
```

`map` calls your function once for each item and collects the returned values
into a new array. The new array always has the same length as the original.

The loop version says the same thing in five lines:

```js
const doubled = [];
for (const n of numbers) {
  doubled.push(n * 2);
}
```

Your callback must `return` something. A concise arrow does that for you; a
braced one needs the word:

```js
const bad = numbers.map((n) => { n * 2; });
console.log(bad); // [ undefined, undefined, undefined ]
```

An array full of `undefined` is the signature of a missing `return`.

### `filter`: keep some items

```js
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter((n) => n % 2 === 0);

console.log(evens); // [ 2, 4 ]
```

Your callback answers a yes-or-no question about each item. Items whose answer
is truthy are kept; the rest are dropped. The result can be shorter than the
original, and can be empty.

`filter` returns the items themselves, not `true` and `false`:

```js
const wrong = numbers.filter((n) => n * 2);
console.log(wrong); // [ 1, 2, 3, 4, 5 ]
```

Every doubled number except zero is truthy, so nothing was filtered out. The
callback has to be a test.

### `find`: get the first match

```js
const words = ['hi', 'hello', 'hey'];

console.log(words.find((word) => word.length > 2));  // hello
console.log(words.find((word) => word.length > 50)); // undefined
```

`find` returns the first item the callback approves of, or `undefined` when
nothing matches. `filter` gives you an array of everything; `find` gives you
one item.

`findIndex` is the same question about position, returning `-1` when nothing
matches.

### `some` and `every`: one boolean out

```js
const scores = [10, 4, 8];

console.log(scores.some((n) => n < 5));  // true
console.log(scores.every((n) => n < 5)); // false
console.log(scores.every((n) => n > 0)); // true
```

`some` is "is at least one of these true?". `every` is "are all of them true?".
Both return a boolean and stop early once the answer is settled.

Their answers for an empty array surprise people:

```js
console.log([].some((n) => n > 0));  // false
console.log([].every((n) => n > 0)); // true
```

`some` found nothing that passed, so `false`. `every` found nothing that
failed, so `true`. That is the rule, and it is worth remembering before it
costs you an afternoon.

### The second argument: the index

Every one of these callbacks can take the index as a second parameter:

```js
const letters = ['a', 'b', 'c'];
console.log(letters.map((letter, index) => `${index}: ${letter}`));
// [ '0: a', '1: b', '2: c' ]
```

Leave it out when you do not need it.

### Chaining

Each method returns something you can call another method on:

```js
const numbers = [1, 2, 3, 4, 5, 6];
const result = numbers
  .filter((n) => n % 2 === 0)
  .map((n) => n * 10);

console.log(result); // [ 20, 40, 60 ]
```

Filter first, then map, so the second step does less work and reads in the
order it happens.

<details>
<summary>Common mistakes</summary>

**A callback with braces and no `return`.**

```js
const doubled = [1, 2].map((n) => { n * 2; });
console.log(doubled); // [ undefined, undefined ]
```

Braces make a block. Either drop them or add `return`.

**Forgetting that `map` and `filter` return new arrays.**

```js
const numbers = [1, 2, 3];
numbers.map((n) => n * 2);
console.log(numbers); // [ 1, 2, 3 ]
```

Nothing was assigned, so the new array was discarded. These methods never
change the array you call them on.

**Calling the function instead of passing it.**

```js
const words = ['a', 'bb'];
console.log(words.filter(isLong('a')));
// TypeError: words.filter is not a function ... or worse, silent nonsense
```

`filter` wants a function it can call once per item. Passing `isLong('a')`
hands it that call's *result* instead. Pass the function itself: `filter(isLong)`.

</details>

## Check yourself

1. What does `[1, 2, 3].map((n) => n + 1)` return?

<details><summary>Answer</summary>

`[2, 3, 4]`. `map` builds a new array from what the callback returns for each
item. The tempting wrong answer is that it changes the original array - it
never does, which is why the result has to be stored.

</details>

2. What does `[1, 2, 3, 4].filter((n) => n > 2)` return?

<details><summary>Answer</summary>

`[3, 4]`. `filter` keeps the items whose test is truthy. The tempting wrong
answer is `[false, false, true, true]`: that would be `map` with the same
callback. `filter` returns items, not answers.

</details>

3. What does `['a', 'bb'].find((w) => w.length > 5)` return?

<details><summary>Answer</summary>

`undefined`. Nothing matched, and `find` has no item to hand back. The tempting
wrong answer is an empty array, which is what `filter` returns when nothing
matches. Mixing them up leads to calling `.length` on `undefined`.

</details>

4. What is `[].every((n) => n > 100)`?

<details><summary>Answer</summary>

`true`. There is no item that fails the test, so the claim "all of them pass"
holds. The tempting wrong answer is `false`, from reading it as "did anything
pass?" - that question is `some`, which returns `false` here.

</details>

5. What does this print, and why?

```js
console.log([1, 2].map((n) => { n * 2; }));
```

<details><summary>Answer</summary>

`[ undefined, undefined ]`. The braced callback computes and discards, so each
call returns `undefined`. The tempting wrong answer is `[2, 4]`. An array of
`undefined` is nearly always a missing `return` in a callback.

</details>

6. Which method would you use to check whether any item in a list is negative?

<details><summary>Answer</summary>

`some`, which returns a boolean as soon as one item passes. The tempting wrong
answer is `filter`, which works but builds a whole array you then have to check
the length of - more code, more to get wrong, and it never stops early.

</details>

7. In `numbers.filter(...).map(...)`, what is `map` called on?

<details><summary>Answer</summary>

The array that `filter` returned, not the original. Each method hands back a
value, and the next call in the chain acts on that value. The tempting wrong
answer is that both run on `numbers`, which would give a different result
whenever the filter removes anything.

</details>

## Your task

Open `js/010-array-methods/exercise.js` and write three functions. Use the
methods from this lesson rather than writing loops.

1. **`doubleAll(numbers)`** returns a new array with every number doubled.

   ```js
   doubleAll([1, 2, 3]) // [2, 4, 6]
   doubleAll([])        // []
   ```

2. **`longWords(words, minLength)`** returns the words that are at least
   `minLength` characters long.

   ```js
   longWords(['hi', 'hello', 'hey'], 3) // ['hello', 'hey']
   ```

3. **`hasNegative(numbers)`** returns `true` when at least one number is below
   zero.

   ```js
   hasNegative([1, -2, 3]) // true
   hasNegative([1, 2, 3])  // false
   hasNegative([])         // false
   ```

When the tests pass, record it with `npm run learn -- check`.
