# 1. Variables, `let` / `const`, and the basic types

Run the tests for this exercise with:

```
npm run test -- 001
```

## The lesson

A **variable** is a name for a value. You make one with the keyword `let` or
the keyword `const`, then a name, then `=`, then the value.

```js
let score = 10;
const playerName = 'Ada';

console.log(score);      // 10
console.log(playerName); // Ada
```

`=` here does not mean "is equal to". It means "put this value into this name".

### `let` versus `const`

`let` makes a name you can point at a different value later. `const` makes a
name you cannot.

```js
let score = 10;
score = 11;
console.log(score); // 11
```

```js
const playerName = 'Ada';
playerName = 'Grace';
// error: TypeError: Assignment to constant variable.
```

Reach for `const` by default, and switch to `let` at the moment you find you
need to reassign. Code that says `const` tells a reader "this name never points
anywhere else", which is one less thing to track.

There is an older keyword, `var`. You will see it in old tutorials. It has
scoping rules that surprise people, and `let` and `const` exist to replace it,
so this course does not use it.

### Declaring without a value

You can make a name now and decide the value later. A variable with no value
holds `undefined`.

```js
let answer;
console.log(answer); // undefined
```

`undefined` is JavaScript's way of saying "nothing has been put here yet".

### The basic types

Every value has a type. These are the ones you need now:

| Type | Example values | What it is |
| --- | --- | --- |
| `string` | `'Ada'`, `"hello"`, `''` | text |
| `number` | `10`, `-3`, `0.5` | any number, whole or not |
| `boolean` | `true`, `false` | a yes-or-no value |
| `undefined` | `undefined` | no value has been set |
| `object` | `{ name: 'Ada' }`, `[1, 2]`, `null` | a collection of values |

Ask for a value's type with `typeof`. It hands back the type name as a string.

```js
console.log(typeof 'Ada');   // string
console.log(typeof 10);      // number
console.log(typeof true);    // boolean
console.log(typeof undefined); // undefined
```

One oddity worth knowing on day one:

```js
console.log(typeof null); // object
```

`null` means "deliberately empty", and it is not an object. `typeof null`
returning `'object'` is a bug from 1995 that was never fixed, because fixing it
would break existing websites. You do not need to do anything about it. You
need to not be confused when you see it.

### Sticking strings together

Two strings join with `+`.

```js
const name = 'Ada';
console.log('hello ' + name); // hello Ada
```

Watch the space inside `'hello '`. Without it you get `helloAda`. `+` adds
exactly what you gave it and nothing else.

`+` between a string and a number turns the number into text first.

```js
console.log('score: ' + 10); // score: 10
```

<details>
<summary>Common mistakes</summary>

**Assigning to a `const`.**

```js
const total = 1;
total = 2;
// TypeError: Assignment to constant variable.
```

`TypeError` is the kind of error. The message names what you did wrong:
assignment, to a constant variable. The fix is to declare it with `let` if the
value really does need to change.

**Using a name before the line that declares it.**

```js
console.log(count);
let count = 3;
// ReferenceError: Cannot access 'count' before initialization
```

A `ReferenceError` means a name was used that JavaScript cannot resolve here.
"before initialization" means the name exists further down the file, but the
line that gives it a value has not run yet. Move the declaration above the use.

**Leaving out `let` or `const` entirely.**

```js
total = 5;
// ReferenceError: total is not defined
```

Some languages let you create a variable by assigning to it. JavaScript files
in this course are modules, and modules refuse it. Every new name needs `let`
or `const` in front of it the first time.

</details>

## Check yourself

Answer these from the lesson above before you start the task.

1. What does `console.log(typeof 'true')` print?

<details><summary>Answer</summary>

`string`. The quote marks make it text. The tempting wrong answer is `boolean`,
because the word inside reads like the boolean `true` — but `typeof` looks at
what the value *is*, and `'true'` is five characters of text. Without quotes,
`typeof true` would be `boolean`.

</details>

2. Which line causes an error?

```js
const city = 'Paris';
let visits = 2;
visits = 3;
city = 'Rome';
```

<details><summary>Answer</summary>

`city = 'Rome'` throws `TypeError: Assignment to constant variable.` because
`city` was declared with `const`. `visits = 3` is fine: `visits` was declared
with `let`. A common wrong answer is "both reassignments", which misreads
`const` as "this value can never be used again" rather than "this name can
never point somewhere else".

</details>

3. What is printed?

```js
let result;
console.log(result);
```

<details><summary>Answer</summary>

`undefined`. Declaring a name without a value leaves `undefined` in it. The
tempting wrong answer is `null`, which is a different thing: `null` is a value
*you* put somewhere to mean "deliberately empty". Nothing sets `null` for you.

</details>

4. What does `typeof null` return?

<details><summary>Answer</summary>

The string `'object'`. The answer that feels right is `'null'`, and it would be
the sensible result, but this is a bug kept for compatibility with code written
in the 1990s. Knowing it stops you losing an hour to it later.

</details>

5. What does `console.log('total: ' + 5)` print?

<details><summary>Answer</summary>

`total: 5`. When one side of `+` is a string, the other side is turned into
text and the two are stuck together. The tempting wrong answer is an error
about adding text to a number: JavaScript does not refuse this, it converts.

</details>

6. Which declaration would you write for a value that is set once and never
   changes?

<details><summary>Answer</summary>

`const`. Use it by default, and only switch to `let` when you actually need to
reassign the name. The tempting wrong answer is `let` everywhere on the grounds
that it always works — it does, but it throws away the signal to a reader that
this name is fixed, and it lets a typo silently reassign something important.

</details>

## Your task

Open `js/001-variables-and-types/exercise.js` and write three functions.

1. **`typeOf(value)`** returns the name of the value's type, as a string.

   ```js
   typeOf('Ada') // 'string'
   typeOf(10)    // 'number'
   ```

2. **`describeVariable(name, value)`** returns a one-line description in the
   form `name: type`.

   ```js
   describeVariable('count', 3)      // 'count: number'
   describeVariable('user', 'Ada')   // 'user: string'
   ```

3. **`initialValue()`** takes nothing and returns the value that a variable
   holds when it is declared without one. Declare a variable inside the
   function, give it no value, and return it.

   ```js
   initialValue() // undefined
   ```

When the tests pass, record it with `npm run learn -- check`.
