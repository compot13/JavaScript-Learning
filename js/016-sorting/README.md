# 16. Sorting and comparator functions

Run the tests for this exercise with:

```
npm run test -- 016
```

## The lesson

`sort` has two behaviours that catch everyone once: it changes the array you
call it on, and by default it sorts as text.

### The default sort is alphabetical

```js
const numbers = [10, 9, 1, 20];
numbers.sort();
console.log(numbers); // [ 1, 10, 20, 9 ]
```

That is not a bug. With no instructions, `sort` converts each item to a string
and compares those. As text, `'9'` comes after `'20'`, because it compares
character by character and `'9'` is later than `'2'`.

For text this is what you want:

```js
const names = ['Grace', 'Ada', 'Alan'];
names.sort();
console.log(names); // [ 'Ada', 'Alan', 'Grace' ]
```

For numbers, you have to say how to compare.

### The comparator

`sort` accepts a function that is handed two items and answers which comes
first, by returning a number:

- **negative** - `a` comes before `b`
- **zero** - leave their order as it is
- **positive** - `b` comes before `a`

For numbers, subtraction produces exactly that:

```js
const numbers = [10, 9, 1, 20];

numbers.sort((a, b) => a - b);
console.log(numbers); // [ 1, 9, 10, 20 ]

numbers.sort((a, b) => b - a);
console.log(numbers); // [ 20, 10, 9, 1 ]
```

`a - b` is ascending, `b - a` is descending. If you remember nothing else from
this lesson, remember those two.

The comparator returns a *number*, not a boolean:

```js
numbers.sort((a, b) => a > b);
```

`true` and `false` are not negative, zero and positive, so the result is
unreliable. Watch for this one: it looks right and works on small arrays often
enough to fool you.

### `sort` changes the original

```js
const original = [3, 1, 2];
const sorted = original.sort((a, b) => a - b);

console.log(sorted);   // [ 1, 2, 3 ]
console.log(original); // [ 1, 2, 3 ]  also sorted
console.log(sorted === original); // true
```

There is one array here, not two. `sort` rearranged it and handed the same
array back. When the caller's array must survive, copy it first:

```js
const sorted = [...original].sort((a, b) => a - b);
```

Node 20 and later also have `toSorted`, which returns a new array and leaves
the original alone:

```js
const sorted = original.toSorted((a, b) => a - b);
```

Both are fine. This course uses the spread form, because you will meet it
everywhere and it works in older environments too.

### Sorting objects

Compare the property you care about:

```js
const people = [
  { name: 'Ada', age: 36 },
  { name: 'Alan', age: 41 },
  { name: 'Grace', age: 29 },
];

const byAge = [...people].sort((a, b) => a.age - b.age);
console.log(byAge.map((person) => person.name)); // [ 'Grace', 'Ada', 'Alan' ]
```

For text properties, subtraction is meaningless. Use `localeCompare`, which
returns a negative number, zero or a positive number for you:

```js
const byName = [...people].sort((a, b) => a.name.localeCompare(b.name));
console.log(byName.map((person) => person.name)); // [ 'Ada', 'Alan', 'Grace' ]
```

### Ties keep their order

Sorting is **stable**: items the comparator calls equal stay in the order they
were already in.

```js
const words = ['bb', 'aa', 'c'];
console.log([...words].sort((a, b) => a.length - b.length));
// [ 'c', 'bb', 'aa' ]
```

`'bb'` and `'aa'` are both length 2, so `'bb'` stays ahead of `'aa'` because it
was there first. You can rely on this.

<details>
<summary>Common mistakes</summary>

**Sorting numbers without a comparator.**

```js
console.log([10, 9, 1].sort()); // [ 1, 10, 9 ]
```

The default compares text. Pass `(a, b) => a - b`.

**Returning a boolean from the comparator.**

```js
console.log([3, 1, 2].sort((a, b) => a > b));
```

`sort` needs a negative, zero or positive number. A boolean gives you an
arbitrary order that sometimes looks correct.

**Forgetting that `sort` rearranges in place.**

```js
function highest(scores) {
  return scores.sort((a, b) => b - a)[0];
}

const scores = [3, 9, 1];
highest(scores);
console.log(scores); // [ 9, 3, 1 ]
```

The caller's array was reordered as a side effect of asking a question. Copy
before sorting inside a function.

</details>

## Check yourself

1. What does `[10, 9, 1].sort()` return?

<details><summary>Answer</summary>

`[1, 10, 9]`. With no comparator the items are compared as text, and `'10'`
comes before `'9'`. The tempting wrong answer is `[1, 9, 10]`, which needs
`(a, b) => a - b`.

</details>

2. What does a comparator return to put `a` first?

<details><summary>Answer</summary>

A negative number. Zero means leave them as they are, positive puts `b` first.
The tempting wrong answer is `true`: booleans are not numbers, and `sort`
gives unpredictable results when it gets one.

</details>

3. Which way does `(a, b) => b - a` sort?

<details><summary>Answer</summary>

Descending, largest first. When `b` is bigger the result is positive, which
pushes `b` ahead. The tempting wrong answer is ascending, from reading the
letters rather than the subtraction - write out `b - a` with `a = 1, b = 5` and
the sign tells you.

</details>

4. After `const sorted = original.sort(...)`, what is `original`?

<details><summary>Answer</summary>

Sorted as well, because `sort` rearranges the array itself and returns that
same array. `sorted === original` is `true`. The tempting wrong answer is that
`original` is untouched, which is true for `map`, `filter` and `slice` but not
for `sort`.

</details>

5. How do you sort without changing the original array?

<details><summary>Answer</summary>

Copy first - `[...items].sort(...)` - or use `toSorted`. The tempting wrong
answer is that assigning the result to a new name is enough; both names end up
pointing at the same rearranged array.

</details>

6. How do you sort objects by a text property?

<details><summary>Answer</summary>

Compare the two strings with `localeCompare`:
`(a, b) => a.name.localeCompare(b.name)`. The tempting wrong answer is
`a.name - b.name`, which gives `NaN` for every pair, and `NaN` is neither
negative nor positive, so nothing moves.

</details>

7. Two items compare as equal. What happens to their order?

<details><summary>Answer</summary>

They keep the order they already had, because sorting in JavaScript is stable.
The tempting wrong answer is that it is undefined - it was in old engines, and
has been guaranteed since 2019.

</details>

## Your task

Open `js/016-sorting/exercise.js` and write three functions. None of them may
change the array it is given - every one has a test that checks.

1. **`sortedNumbers(numbers)`** returns a new array sorted smallest first.

   ```js
   sortedNumbers([10, 9, 1]) // [1, 9, 10]
   ```

2. **`sortedByLength(words)`** returns a new array sorted shortest first. Words
   of the same length keep the order they came in.

   ```js
   sortedByLength(['ccc', 'a', 'bb']) // ['a', 'bb', 'ccc']
   ```

3. **`sortedByAge(people)`** takes an array of objects with `name` and `age`,
   and returns a new array sorted youngest first.

   ```js
   sortedByAge([{ name: 'Ada', age: 36 }, { name: 'Grace', age: 29 }])
   // [{ name: 'Grace', age: 29 }, { name: 'Ada', age: 36 }]
   ```

When the tests pass, record it with `npm run learn -- check`.
