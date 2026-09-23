# 15. `Map` and `Set`, and when they beat a plain object

Run the tests for this exercise with:

```
npm run test -- 015
```

## The lesson

Two built-in collections. A `Set` holds values with no duplicates. A `Map`
holds key-value pairs, like an object, with fewer surprises.

### `Set`

```js
const seen = new Set();

seen.add('a');
seen.add('b');
seen.add('a');

console.log(seen.size);      // 2
console.log(seen.has('a'));  // true
console.log(seen.has('z'));  // false
```

Adding a value that is already there does nothing. `size` is the count - not
`length`, which is arrays only.

Build one from an array to remove duplicates, and spread it back out:

```js
const numbers = [1, 2, 2, 3, 1];
const unique = [...new Set(numbers)];

console.log(unique); // [ 1, 2, 3 ]
```

That is the shortest way to deduplicate a list in JavaScript, and the order of
first appearance is kept.

`delete` removes a value, and `for...of` walks through one:

```js
for (const value of seen) {
  console.log(value);
}
// a
// b
```

The real reason to use a `Set` is `has`. Asking an array whether it contains
something with `includes` means looking through it from the start, so checking
every item of a list against a long array gets slow quickly. `Set.has` goes
straight to the answer.

### `Map`

```js
const counts = new Map();

counts.set('ada', 1);
counts.set('grace', 2);

console.log(counts.get('ada'));    // 1
console.log(counts.get('nobody')); // undefined
console.log(counts.has('ada'));    // true
console.log(counts.size);          // 2

counts.delete('ada');
console.log(counts.size);          // 1
```

Four methods carry most of the work: `set`, `get`, `has`, `delete`. There is no
bracket or dot syntax; `counts['ada']` does not do what you want.

`for...of` over a `Map` hands you `[key, value]` pairs, the same shape as
`Object.entries`:

```js
const counts = new Map([['ada', 1], ['grace', 2]]);

for (const [name, count] of counts) {
  console.log(`${name}: ${count}`);
}
// ada: 1
// grace: 2
```

That constructor takes an array of pairs, which makes converting between the
two easy:

```js
console.log(Object.fromEntries(counts)); // { ada: 1, grace: 2 }
console.log(new Map(Object.entries({ a: 1 }))); // Map(1) { 'a' => 1 }
```

### Counting things

The standard shape, which you will write many times:

```js
const words = ['a', 'b', 'a'];
const counts = new Map();

for (const word of words) {
  counts.set(word, (counts.get(word) ?? 0) + 1);
}

console.log(counts.get('a')); // 2
console.log(counts.get('b')); // 1
```

The `?? 0` covers the first time a word is seen, when `get` returns `undefined`
and `undefined + 1` would be `NaN`.

### Why not always use an object?

For fixed, known keys an object is fine and more convenient to write. A `Map`
is better when:

- **The keys are data**, not names you typed. User input, words from a file,
  ids from a list.
- **The keys are not strings.** Object keys are always converted to strings, so
  `obj[1]` and `obj['1']` are the same property. A `Map` keeps `1` and `'1'`
  apart, and can use objects, booleans or anything else as keys.
- **You add and remove often.** `Map` is built for it and carries `size`.
- **You need a guaranteed order.** A `Map` keeps insertion order for every key,
  including numeric-looking ones.

There is one more difference that matters in practice:

```js
const obj = {};
console.log(obj.toString);     // [Function: toString]
console.log('toString' in obj); // true

const map = new Map();
console.log(map.has('toString')); // false
```

Every plain object inherits a handful of built-in properties, so a key like
`toString` or `constructor` appears to exist when it was never added. A `Map`
starts genuinely empty. With keys that come from outside your program, that is
a real source of bugs.

<details>
<summary>Common mistakes</summary>

**Using brackets on a `Map`.**

```js
const map = new Map();
map['a'] = 1;
console.log(map.get('a')); // undefined
console.log(map.size);     // 0
```

No error. The value was stuck on the object as an ordinary property and the
`Map` stayed empty. Use `set` and `get`.

**Asking a `Set` for its `length`.**

```js
console.log(new Set([1, 2]).length); // undefined
console.log(new Set([1, 2]).size);   // 2
```

`length` is for arrays and strings. `Set` and `Map` use `size`.

**Counting without a fallback for the first time.**

```js
const counts = new Map();
counts.set('a', counts.get('a') + 1);
console.log(counts.get('a')); // NaN
```

`get` returned `undefined`, and `undefined + 1` is `NaN`. Use
`(counts.get('a') ?? 0) + 1`.

</details>

## Check yourself

1. What is `new Set([1, 2, 2, 3]).size`?

<details><summary>Answer</summary>

`3`. Duplicates are dropped as the set is built. The tempting wrong answer is
`4`, counting the input rather than what the set kept - and it would be
`undefined` if you asked for `.length` instead.

</details>

2. How do you turn a `Set` back into an array?

<details><summary>Answer</summary>

Spread it: `[...mySet]`. The tempting wrong answer is that a `Set` already is
an array - it is not, so array methods like `map` and `filter` are unavailable
until you convert it.

</details>

3. What does `map['key'] = 1` do to a `Map`?

<details><summary>Answer</summary>

It adds an ordinary property to the object and leaves the `Map` empty, so
`get('key')` returns `undefined` and `size` stays `0`. The tempting wrong
answer is that it stores the value - there is no error to tell you otherwise,
which is what makes it worth knowing.

</details>

4. What does `counts.get('missing')` return for a key that was never set?

<details><summary>Answer</summary>

`undefined`. The tempting wrong answer is `0` or an error. It matters when
counting: adding 1 to `undefined` gives `NaN`, which is why the pattern uses a
`?? 0` fallback.

</details>

5. Why can a plain object appear to contain a key like `toString`?

<details><summary>Answer</summary>

Because every plain object inherits built-in properties, so `'toString' in obj`
is `true` on an empty object. The tempting wrong answer is that it cannot
happen - it can, and with keys taken from user input a `Map` avoids it
entirely.

</details>

6. Which collection would you choose to answer "have I seen this value
   before?" for a long list?

<details><summary>Answer</summary>

A `Set`, using `has`. The tempting wrong answer is an array with `includes`,
which searches from the start every time and gets slow as the list grows. The
`Set` answers immediately however large it is.

</details>

7. What shape does `for...of` hand you when looping over a `Map`?

<details><summary>Answer</summary>

A two-item array, `[key, value]`, the same as `Object.entries`. The tempting
wrong answer is the value on its own, which is what looping over a `Set` gives
you. Destructure it with `for (const [key, value] of map)`.

</details>

## Your task

Open `js/015-map-and-set/exercise.js` and write three functions.

1. **`unique(items)`** returns a new array with duplicates removed, keeping the
   order of first appearance.

   ```js
   unique([1, 2, 2, 3, 1]) // [1, 2, 3]
   unique([])              // []
   ```

2. **`countWords(words)`** returns a `Map` from each word to how many times it
   appears.

   ```js
   const counts = countWords(['a', 'b', 'a']);
   counts.get('a') // 2
   counts.get('b') // 1
   counts.size     // 2
   ```

3. **`firstRepeated(items)`** returns the first item that appears more than
   once, or `undefined` when every item is different. "First" means the
   earliest *second* appearance.

   ```js
   firstRepeated(['a', 'b', 'a', 'b']) // 'a'
   firstRepeated(['a', 'b', 'c'])      // undefined
   ```

When the tests pass, record it with `npm run learn -- check`.
