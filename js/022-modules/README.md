# 22. Modules: `import` and `export`

Run the tests for this exercise with:

```
npm run test -- 022
```

## The lesson

A **module** is a file. Everything you declare in it is private to that file
until you `export` it, and another file gets at it with `import`.

Every file in this course is already a module, which is why each `exercise.js`
starts its functions with `export`.

### Named exports

Put `export` in front of a declaration:

```js
// geometry.js
export const PI = 3.14159;

export function circleArea(radius) {
  return PI * radius * radius;
}
```

Import them by name, in braces:

```js
// app.js
import { PI, circleArea } from './geometry.js';

console.log(PI);              // 3.14159
console.log(circleArea(2));   // 12.56636
```

The names in the braces have to match the exported names exactly. A name that
does not match is an error when the file loads, before any of your code runs:

```js
import { circleArae } from './geometry.js';
// SyntaxError: The requested module './geometry.js' does not provide an export named 'circleArae'
```

That is a useful property: a typo in an import fails loudly and immediately,
rather than showing up as `undefined` somewhere later.

You can also export a list at the bottom of the file, which some people prefer
because it gives one place to look:

```js
function circleArea(radius) { /* ... */ }
function squareArea(side) { /* ... */ }

export { circleArea, squareArea };
```

### Renaming on the way in

```js
import { circleArea as areaOfCircle } from './geometry.js';
console.log(areaOfCircle(2)); // 12.56636
```

Useful when two modules export the same name.

### Default exports

A module may have one **default** export, imported without braces and named
whatever you like:

```js
// geometry.js
export default function describe(name, area) {
  return `${name} with an area of ${area}`;
}
```

```js
import describe from './geometry.js';
import anyNameYouLike from './geometry.js'; // the same function
```

The braces are the whole difference: `import { x }` asks for the export named
`x`, `import x` asks for the default and calls it `x` locally. Mixing them up
gives `undefined` or an error about a missing export.

Both kinds can come in one statement, default first:

```js
import describe, { PI, circleArea } from './geometry.js';
```

### Re-exporting

A module can pass something straight through:

```js
export { PI } from './geometry.js';
```

Anyone importing this file can now get `PI` from it, without it being written
here. This is how a folder gets one file that gathers up its parts.

### The file path matters

```js
import { PI } from './geometry.js';  // a file next to this one
import { PI } from '../shared/geometry.js'; // up one folder
import test from 'node:test';        // a built-in Node module
```

A path for one of your own files starts with `./` or `../` and includes the
`.js` extension. Leaving the extension off works in some setups and not in
plain Node, so this course always writes it.

A bare name like `node:test` or `lodash` means a built-in module or an
installed package, not a file of yours.

### Imports are hoisted and run once

Every `import` is processed before any of the file's own code runs, whatever
order you wrote them in. A module is loaded once, however many files import it,
and they all share the same copy - so a variable a module exports and changes
is shared state.

<details>
<summary>Common mistakes</summary>

**Braces around a default import.**

```js
import { describe } from './geometry.js';
// SyntaxError: ... does not provide an export named 'describe'
```

The default export is not a named one. Drop the braces.

**Leaving off the file extension.**

```js
import { PI } from './geometry';
// Error [ERR_MODULE_NOT_FOUND]: Cannot find module ... Did you mean to import "./geometry.js"?
```

Node tells you the fix in the message.

**Forgetting `export`.**

```js
// helper.js
function shout(text) { return text.toUpperCase(); }
```

```js
import { shout } from './helper.js';
// SyntaxError: ... does not provide an export named 'shout'
```

Declaring something in a module does not make it visible outside it.

</details>

## Check yourself

1. How do you import a named export called `circleArea`?

<details><summary>Answer</summary>

`import { circleArea } from './geometry.js';` - braces, exact name, path with
extension. The tempting wrong answer leaves off the braces, which asks for the
default export instead and gives you the wrong value or an error.

</details>

2. How many default exports can a module have?

<details><summary>Answer</summary>

One, or none. It is the module's single main thing. The tempting wrong answer
is "as many as you like" - that is named exports, which have no limit.

</details>

3. What happens when you misspell a named import?

<details><summary>Answer</summary>

A `SyntaxError` naming the export that does not exist, raised when the module
loads, before any code runs. The tempting wrong answer is that the value is
`undefined` - imports are checked up front, which is why the failure is
immediate and specific.

</details>

4. What is the difference between `import x from './a.js'` and
   `import { x } from './a.js'`?

<details><summary>Answer</summary>

The first takes the default export and calls it `x` locally; the second takes
the export actually named `x`. The tempting answer is that the braces are
optional punctuation - they change which export you get.

</details>

5. Why does this course write `./geometry.js` rather than `./geometry`?

<details><summary>Answer</summary>

Because plain Node modules require the file extension, and leaving it off gives
`ERR_MODULE_NOT_FOUND`. The tempting wrong answer is that it is a style choice -
bundlers let you drop it, which is where the habit comes from.

</details>

6. Is a function declared in a module visible to other files by default?

<details><summary>Answer</summary>

No. Everything in a module is private until exported. The tempting wrong answer
is yes, which is how old script tags on a web page behaved - every file shared
one global namespace, and modules exist to end that.

</details>

7. What does `export { PI } from './geometry.js';` do?

<details><summary>Answer</summary>

It re-exports `PI` from this module without importing it for local use, so
other files can get `PI` from here. The tempting wrong answer is that it
imports `PI` for use in this file as well - for that you need a separate
`import` statement.

</details>

## Your task

The folder contains a file called `geometry.js`, already written. Read it, then
open `js/022-modules/exercise.js`.

1. **`totalCircleArea(radii)`** takes an array of radii and returns the total
   area of all those circles. Use `circleArea` from `geometry.js` rather than
   writing the formula again.

   ```js
   totalCircleArea([1, 2]) // 15.70795
   ```

2. **`describeSquare(side)`** returns a description using the **default**
   export of `geometry.js` and its `squareArea` function.

   ```js
   describeSquare(3) // 'square with an area of 9'
   ```

3. **`PI`** must be available from `exercise.js` as a named export, with the
   value from `geometry.js`. Re-export it rather than typing the number.

   ```js
   import { PI } from './exercise.js';
   PI // 3.14159
   ```

When the tests pass, record it with `npm run learn -- check`.
