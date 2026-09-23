# 11. `reduce`, on its own

Run the tests for this exercise with:

```
npm run test -- 011
```

## The lesson

`reduce` turns a whole array into one value. That value can be a number, a
string, or anything else. It gets its own lesson because it is the array method
beginners find hardest, and the reason is almost always that nobody showed them
the loop it replaces.

Here is the loop:

```js
const numbers = [1, 2, 3, 4];

let total = 0;
for (const n of numbers) {
  total = total + n;
}

console.log(total); // 10
```

Three things are going on: a starting value (`0`), a rule for combining the
running total with the next item (`total + n`), and a final answer.

`reduce` takes exactly those pieces:

```js
const total = numbers.reduce((runningTotal, n) => runningTotal + n, 0);
console.log(total); // 10
```

- The first argument is a callback taking two parameters: the running total so
  far, and the current item.
- The second argument, `0`, is the starting value.
- Whatever the callback returns becomes the running total for the next item.

The running total is usually called the **accumulator**.

### Tracing it

```js
[1, 2, 3, 4].reduce((acc, n) => acc + n, 0);
```

| Pass | `acc` | `n` | returns |
| --- | --- | --- | --- |
| 1 | 0 | 1 | 1 |
| 2 | 1 | 2 | 3 |
| 3 | 3 | 3 | 6 |
| 4 | 6 | 4 | 10 |

The last returned value, `10`, is the result. Write this table out by hand the
first few times you use `reduce`; it removes most of the mystery.

### The starting value matters

For a sum the starting value is `0`. For a product it must be `1`, because
anything multiplied by zero is zero:

```js
console.log([2, 3, 4].reduce((acc, n) => acc * n, 1)); // 24
console.log([2, 3, 4].reduce((acc, n) => acc * n, 0)); // 0
```

For building a string, start with `''`:

```js
console.log(['a', 'b', 'c'].reduce((acc, letter) => acc + letter, ''));
// abc
```

The starting value also decides what an empty array returns, with no special
case needed:

```js
console.log([].reduce((acc, n) => acc + n, 0)); // 0
```

Leave the starting value out and the first item is used instead - which means
an empty array throws:

```js
console.log([].reduce((acc, n) => acc + n));
// TypeError: Reduce of empty array with no initial value
```

Always pass the starting value. It removes a crash and makes the intent
obvious.

### The accumulator does not have to be a number

Keeping the longest word seen so far works the same way:

```js
const words = ['hi', 'hello', 'hey'];
const longest = words.reduce((best, word) => (word.length > best.length ? word : best), '');

console.log(longest); // hello
```

The accumulator is a string here, and the callback returns whichever of the two
should carry forward. Starting from `''` means an empty array returns `''`.

### When not to use it

If a `map` or a `filter` says it more clearly, use those. `reduce` earns its
place when you are collapsing many values into one. A `reduce` whose callback
pushes into an array and returns it is a `map` in disguise, and harder to read.

<details>
<summary>Common mistakes</summary>

**Forgetting to return the accumulator.**

```js
console.log([1, 2, 3].reduce((acc, n) => { acc + n; }, 0));
// undefined
```

The braced callback returns nothing, so the accumulator becomes `undefined` on
the first pass and stays there. Drop the braces, or add `return`.

**Leaving out the starting value.**

```js
console.log([].reduce((acc, n) => acc + n));
// TypeError: Reduce of empty array with no initial value
```

With no starting value and no items, there is nothing to return. Pass `0`.

**Getting the two parameters the wrong way round.**

```js
console.log([1, 2, 3].reduce((n, acc) => acc + n, 0)); // 6
console.log(['a', 'b'].reduce((letter, acc) => acc + letter, '')); // ba
```

The accumulator is always first. With `+` on numbers the mistake hides, because
addition does not care about order. With strings it shows up immediately.

</details>

## Check yourself

1. What does `[1, 2, 3].reduce((acc, n) => acc + n, 0)` return?

<details><summary>Answer</summary>

`6`. The accumulator starts at 0 and each pass adds the next item. The tempting
wrong answer is `[1, 3, 6]`, the running totals along the way - `reduce` hands
back only the final value.

</details>

2. What should the starting value be when multiplying an array of numbers?

<details><summary>Answer</summary>

`1`. Starting at `0` makes every product `0`, because the first multiplication
wipes the value out. The tempting wrong answer is `0`, copied from the sum
example. The starting value has to be neutral for the operation you are doing.

</details>

3. What does `[].reduce((acc, n) => acc + n, 0)` return?

<details><summary>Answer</summary>

`0`, the starting value. The callback never runs, so nothing changes it. The
tempting wrong answer is an error - that happens only when you leave the
starting value out.

</details>

4. What does this return?

```js
[1, 2, 3].reduce((acc, n) => { acc + n; }, 0);
```

<details><summary>Answer</summary>

`undefined`. The callback has braces and no `return`, so the accumulator is set
to `undefined` on the first pass. The tempting wrong answer is `6`: the sum is
computed correctly and then thrown away.

</details>

5. In `reduce((acc, item) => ..., start)`, which parameter is the running
   answer?

<details><summary>Answer</summary>

The first one, `acc`. The current item is second. The tempting wrong answer is
"whichever you name first" - naming does not change the order they arrive in,
and swapping them silently reverses a string built with `reduce`.

</details>

6. Why does the lesson say to always pass a starting value?

<details><summary>Answer</summary>

Because it decides the result for an empty array and removes the
`TypeError` you would get without it, while also stating what type the answer
is. The tempting wrong answer is that it is optional detail; without it, code
that works all through development crashes the first time a list comes back
empty.

</details>

7. When is `map` a better choice than `reduce`?

<details><summary>Answer</summary>

When you want one output item per input item. `reduce` is for collapsing many
values into one. The tempting wrong answer is that `reduce` is always available
so it is always fine - it is, and a `reduce` that rebuilds an array is harder
to read than the `map` it replaced.

</details>

## Your task

Open `js/011-reduce/exercise.js` and write three functions. Use `reduce` for
all three, and pass a starting value every time.

1. **`sumOf(numbers)`** adds up the numbers.

   ```js
   sumOf([1, 2, 3]) // 6
   sumOf([])        // 0
   ```

2. **`productOf(numbers)`** multiplies the numbers together.

   ```js
   productOf([2, 3, 4]) // 24
   productOf([])        // 1
   ```

3. **`longestWord(words)`** returns the longest word. When two are the same
   length, keep the first one. An empty array gives an empty string.

   ```js
   longestWord(['hi', 'hello', 'hey'])  // 'hello'
   longestWord(['aa', 'bb'])            // 'aa'
   longestWord([])                      // ''
   ```

When the tests pass, record it with `npm run learn -- check`.
