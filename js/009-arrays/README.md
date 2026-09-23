# 9. Arrays: indexing, `push`/`pop`, `slice` vs `splice`

Run the tests for this exercise with:

```
npm run test -- 009
```

## The lesson

An **array** is an ordered list of values. You write one in square brackets.

```js
const colours = ['red', 'green', 'blue'];
const scores = [10, 8, 9];
const mixed = ['red', 3, true];
```

Arrays can hold anything, including other arrays. The values keep the order you
put them in.

### Reading by position

Positions are called **indexes** and they start at 0.

```js
const colours = ['red', 'green', 'blue'];

console.log(colours[0]);      // red
console.log(colours[2]);      // blue
console.log(colours[3]);      // undefined
console.log(colours.length);  // 3
```

`length` is the count of items, so the last index is always `length - 1`:

```js
console.log(colours[colours.length - 1]); // blue
```

Reading past the end gives `undefined` rather than an error, which is the same
behaviour you saw with strings.

`at(-1)` is a newer way to ask for the last item:

```js
console.log(colours.at(-1)); // blue
```

### Walking through an array

`for...of` works on arrays the way it worked on strings:

```js
for (const colour of colours) {
  console.log(colour);
}
// red
// green
// blue
```

Use a counting `for` loop when you need the index itself:

```js
for (let i = 0; i < colours.length; i++) {
  console.log(`${i}: ${colours[i]}`);
}
// 0: red
// 1: green
// 2: blue
```

### Adding and removing at the end

```js
const stack = ['a', 'b'];

stack.push('c');
console.log(stack); // [ 'a', 'b', 'c' ]

const removed = stack.pop();
console.log(removed); // c
console.log(stack);   // [ 'a', 'b' ]
```

`push` adds to the end and returns the new length. `pop` removes the last item
and returns it. `unshift` and `shift` do the same at the front, and both have
to renumber everything after them, so they are slower on long lists.

Both of these **mutate** the array: they change the array itself rather than
returning a new one. Notice that `stack` was declared with `const` and this
still works. `const` stops the name pointing at a different array; it does not
freeze the contents.

### Searching

```js
const colours = ['red', 'green', 'blue'];

console.log(colours.includes('green')); // true
console.log(colours.indexOf('green'));  // 1
console.log(colours.indexOf('pink'));   // -1
```

`indexOf` returns `-1` when the value is not there, because `0` is a real
position and could not double as "missing".

### `slice` versus `splice`

These two names look alike and behave completely differently. This is the part
of the lesson to read twice.

**`slice(start, end)` copies.** It returns a new array and leaves the original
alone. It takes from `start` and stops before `end`, exactly like the string
version.

```js
const letters = ['a', 'b', 'c', 'd'];
const middle = letters.slice(1, 3);

console.log(middle);  // [ 'b', 'c' ]
console.log(letters); // [ 'a', 'b', 'c', 'd' ]  unchanged
```

`slice()` with no arguments copies the whole array, which is the usual way to
make a copy before changing something.

**`splice(start, count)` cuts.** It removes items from the original array and
returns the removed ones.

```js
const letters = ['a', 'b', 'c', 'd'];
const taken = letters.splice(1, 2);

console.log(taken);   // [ 'b', 'c' ]
console.log(letters); // [ 'a', 'd' ]  changed
```

One letter apart, one copies and one destroys. When you want a piece of a list
and want the list intact afterwards, you want `slice`.

### Copying with spread

The `...` spread syntax unpacks an array into a new one:

```js
const original = [1, 2, 3];
const copy = [...original];
const extended = [...original, 4];

console.log(copy);     // [ 1, 2, 3 ]
console.log(extended); // [ 1, 2, 3, 4 ]
console.log(original); // [ 1, 2, 3 ]  untouched
```

This is the usual way to "add an item without changing the original".

### Joining and splitting

```js
console.log(['a', 'b', 'c'].join('-')); // a-b-c
console.log('a-b-c'.split('-'));        // [ 'a', 'b', 'c' ]
console.log('hello'.split(''));         // [ 'h', 'e', 'l', 'l', 'o' ]
```

`join` turns an array into a string. `split` turns a string into an array.

### Comparing arrays

```js
console.log([1, 2] === [1, 2]); // false
```

Two separate arrays are never `===` to each other, even with identical
contents, because `===` asks whether they are the *same array*. The tests in
this course use `assert.deepEqual`, which compares contents.

<details>
<summary>Common mistakes</summary>

**Reaching one index past the end.**

```js
const items = ['a', 'b'];
console.log(items[items.length]); // undefined
```

`length` is 2 and the last index is 1. Subtract one, or use `at(-1)`.

**Expecting `push` to return the new array.**

```js
const items = ['a'];
const result = items.push('b');
console.log(result); // 2
```

`push` returns the new length, not the array. The array itself was changed in
place, so carry on using `items`.

**Using `splice` when you meant `slice`.**

```js
const items = ['a', 'b', 'c'];
const firstTwo = items.splice(0, 2);
console.log(firstTwo); // [ 'a', 'b' ]
console.log(items);    // [ 'c' ]
```

You got the two items you wanted and destroyed the original list getting them.
`items.slice(0, 2)` gives the same answer and leaves `items` alone.

</details>

## Check yourself

1. What does `['a', 'b', 'c'].length` give, and what is the last valid index?

<details><summary>Answer</summary>

`3`, and the last index is `2`. Length counts from one, indexes count from
zero. The tempting wrong answer is that the last index is 3, which reads
`undefined` and is the single most common array bug.

</details>

2. What does `colours.indexOf('pink')` return when `'pink'` is not in the
   array?

<details><summary>Answer</summary>

`-1`. It cannot use `0` for "not found" because `0` is a real position. The
tempting wrong answer is `undefined`; the difference matters, because `-1` is a
number and behaves like one in comparisons.

</details>

3. After this code, what is in `letters`?

```js
const letters = ['a', 'b', 'c', 'd'];
letters.slice(1, 3);
```

<details><summary>Answer</summary>

`['a', 'b', 'c', 'd']`, unchanged. `slice` returns a copy and touches nothing;
here the copy was discarded. The tempting wrong answer is `['a', 'd']`, which
is what `splice(1, 2)` would have done to it.

</details>

4. What does `letters.splice(1, 2)` return, and what happens to `letters`?

<details><summary>Answer</summary>

It returns the removed items, `['b', 'c']`, and `letters` is left as
`['a', 'd']`. The tempting wrong answer is that it returns the remaining items:
it hands back what it took out, not what is left.

</details>

5. Why does `const items = ['a']; items.push('b');` work, when `const` means
   the name cannot be reassigned?

<details><summary>Answer</summary>

Because `push` changes the contents of the array, and the name still points at
the same array. `const` fixes what the name refers to, not what is inside it.
The tempting wrong answer is that `const` makes the array read-only - for that
you would need `Object.freeze`.

</details>

6. What is `[1, 2] === [1, 2]`?

<details><summary>Answer</summary>

`false`. `===` asks whether both sides are the same array, and these are two
different arrays that happen to match. The tempting wrong answer is `true`,
from comparing what you can see. To compare contents, compare item by item, or
use `assert.deepEqual` in a test.

</details>

7. Which of `slice` and `splice` leaves the original array untouched?

<details><summary>Answer</summary>

`slice`. It returns a new array and changes nothing. `splice` removes items
from the array you called it on. The tempting mistake is assuming the longer
name is the gentler one; the extra letter marks the destructive one.

</details>

## Your task

Open `js/009-arrays/exercise.js` and write three functions.

1. **`lastItem(items)`** returns the last item of an array, or `undefined` when
   the array is empty.

   ```js
   lastItem(['a', 'b'])  // 'b'
   lastItem([])          // undefined
   ```

2. **`withoutFirst(items)`** returns a **new** array with the first item
   removed. The array passed in must be unchanged afterwards - the tests check
   that.

   ```js
   withoutFirst(['a', 'b', 'c'])  // ['b', 'c']
   withoutFirst([])               // []
   ```

3. **`countOf(items, value)`** returns how many times a value appears in the
   array. Write the loop yourself.

   ```js
   countOf(['a', 'b', 'a'], 'a')  // 2
   countOf([1, 2, 3], 9)          // 0
   ```

When the tests pass, record it with `npm run learn -- check`.
