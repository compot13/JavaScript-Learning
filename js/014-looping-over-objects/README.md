# 14. Looping over objects: `Object.keys` / `values` / `entries`

Run the tests for this exercise with:

```
npm run test -- 014
```

## The lesson

`for...of` walks through an array. Point it at an object and it fails:

```js
const scores = { ada: 10, grace: 8 };

for (const item of scores) {
  console.log(item);
}
// TypeError: scores is not iterable
```

"Not iterable" means the value does not know how to hand out its items one at a
time. Objects do not, because they have no order the way a list does.

The fix is to turn the object into an array first. Three functions do that.

### `Object.keys`

```js
const scores = { ada: 10, grace: 8 };

console.log(Object.keys(scores)); // [ 'ada', 'grace' ]

for (const name of Object.keys(scores)) {
  console.log(`${name}: ${scores[name]}`);
}
// ada: 10
// grace: 8
```

The keys come back as strings, in an array. Bracket notation reads the value
for a key held in a variable, which is exactly the situation from lesson 12.

### `Object.values`

```js
console.log(Object.values(scores)); // [ 10, 8 ]

const total = Object.values(scores).reduce((sum, n) => sum + n, 0);
console.log(total); // 18
```

Use this when the keys do not matter - totals, averages, counts.

### `Object.entries`

```js
console.log(Object.entries(scores));
// [ [ 'ada', 10 ], [ 'grace', 8 ] ]
```

Each entry is a two-item array: the key, then the value. Destructuring makes
that readable:

```js
for (const [name, score] of Object.entries(scores)) {
  console.log(`${name} scored ${score}`);
}
// ada scored 10
// grace scored 8
```

The `[name, score]` pattern unpacks each pair as the loop hands it over. In a
callback, the pattern goes in the parameter list:

```js
const lines = Object.entries(scores).map(([name, score]) => `${name}=${score}`);
console.log(lines); // [ 'ada=10', 'grace=8' ]
```

Note the extra brackets in `([name, score])`: the outer pair belongs to the
arrow function, the inner pair is the destructuring pattern.

### Which one to reach for

- Only the names: `Object.keys`.
- Only the values: `Object.values`.
- Both: `Object.entries`.

All three return real arrays, so every method from lessons 10 and 11 works on
them.

### Building an object back up

`Object.fromEntries` is the reverse of `Object.entries`:

```js
const pairs = [['a', 1], ['b', 2]];
console.log(Object.fromEntries(pairs)); // { a: 1, b: 2 }
```

Pairing the two is how you transform an object:

```js
const doubled = Object.fromEntries(
  Object.entries(scores).map(([name, score]) => [name, score * 2]),
);
console.log(doubled); // { ada: 20, grace: 16 }
```

Take it apart into pairs, change the pairs, put it back together.

### Order

Keys come out in the order they were added, with one exception: keys that look
like whole numbers come first, in numeric order.

```js
console.log(Object.keys({ b: 1, a: 2 }));       // [ 'b', 'a' ]
console.log(Object.keys({ 2: 'x', 1: 'y' }));   // [ '1', '2' ]
```

When order matters to your program, use an array, or sort the keys yourself.

### Counting how many properties

```js
console.log(Object.keys(scores).length); // 2
```

Objects have no `length` property of their own. `scores.length` is `undefined`.

<details>
<summary>Common mistakes</summary>

**Using `for...of` straight on an object.**

```js
for (const x of { a: 1 }) {
}
// TypeError: {(intermediate value)} is not iterable
```

Wrap it: `for (const key of Object.keys(obj))`.

**Reading a value with a dot inside the loop.**

```js
for (const key of Object.keys(scores)) {
  console.log(scores.key); // undefined, every time
}
```

`key` holds the name. Reading it needs brackets: `scores[key]`.

**Expecting `.length` on an object.**

```js
console.log({ a: 1, b: 2 }.length); // undefined
```

Count the keys instead: `Object.keys(obj).length`.

</details>

## Check yourself

1. What does `Object.keys({ a: 1, b: 2 })` return?

<details><summary>Answer</summary>

`['a', 'b']`, an array of strings. The tempting wrong answer is
`[1, 2]` - those are the values, from `Object.values`. Keys are always strings,
even when they look like numbers.

</details>

2. What shape is each item from `Object.entries({ a: 1 })`?

<details><summary>Answer</summary>

A two-item array, `['a', 1]`: key first, value second. The tempting wrong
answer is an object like `{ key: 'a', value: 1 }`, which is what some other
languages hand you. Knowing it is an array is what lets you destructure it with
square brackets.

</details>

3. What does this print?

```js
const scores = { ada: 10 };
for (const key of Object.keys(scores)) {
  console.log(scores.key);
}
```

<details><summary>Answer</summary>

`undefined`. `scores.key` looks for a property literally named `key`. The
tempting wrong answer is `10`, which needs `scores[key]`. This is the lesson 12
dot-versus-bracket rule showing up where it bites hardest.

</details>

4. How do you count the properties on an object?

<details><summary>Answer</summary>

`Object.keys(obj).length`. The tempting wrong answer is `obj.length`, which is
`undefined` because objects have no length of their own - and `undefined` in
arithmetic gives you `NaN` further down the line.

</details>

5. What does `Object.values({ a: 2, b: 3 }).reduce((s, n) => s + n, 0)` give?

<details><summary>Answer</summary>

`5`. `Object.values` produces `[2, 3]`, and `reduce` adds them. The tempting
wrong answer is `'ab'` or `NaN`, from expecting `Object.values` to hand back
keys - the names of the two functions are the reliable guide.

</details>

6. In `entries.map(([key, value]) => ...)`, what do the inner square brackets
   do?

<details><summary>Answer</summary>

They destructure each pair into two named variables. The outer parentheses
belong to the arrow function, the inner brackets unpack the array it receives.
The tempting wrong answer is that they make an array - they take one apart.

</details>

7. Can you rely on object keys coming out in the order you wrote them?

<details><summary>Answer</summary>

Mostly, but not for keys that look like whole numbers: those come first in
numeric order. The tempting wrong answer is an unqualified yes. When order is
part of the meaning, use an array.

</details>

## Your task

Open `js/014-looping-over-objects/exercise.js` and write three functions.

1. **`countProperties(obj)`** returns how many properties the object has.

   ```js
   countProperties({ a: 1, b: 2 }) // 2
   countProperties({})             // 0
   ```

2. **`totalValues(obj)`** adds up all the values, which are always numbers.

   ```js
   totalValues({ ada: 10, grace: 8 }) // 18
   totalValues({})                    // 0
   ```

3. **`describeAll(obj)`** returns an array of `'key: value'` strings, in the
   object's own key order.

   ```js
   describeAll({ ada: 10, grace: 8 }) // ['ada: 10', 'grace: 8']
   describeAll({})                    // []
   ```

When the tests pass, record it with `npm run learn -- check`.
