# 13. Destructuring, spread and rest

Run the tests for this exercise with:

```
npm run test -- 013
```

## The lesson

Three pieces of syntax that show up on nearly every page of modern JavaScript.
Two of them share the same three dots and do opposite jobs.

### Destructuring an object

Pulling properties out one at a time gets repetitive:

```js
const user = { name: 'Ada', age: 36, city: 'London' };

const name = user.name;
const age = user.age;
```

**Destructuring** does it in one line. The braces on the left are a pattern,
not an object:

```js
const { name, age } = user;

console.log(name); // Ada
console.log(age);  // 36
```

The names inside the braces have to match the property names. A name that does
not match gets `undefined`, and you can supply a default for that case:

```js
const { city, country = 'UK' } = user;

console.log(city);    // London
console.log(country); // UK
```

You can rename on the way out with a colon:

```js
const { name: authorName } = user;
console.log(authorName); // Ada
```

### Destructuring in parameters

This is where it earns its keep. Instead of writing `user.` four times:

```js
function label({ name, age }) {
  return `${name} is ${age}`;
}

console.log(label(user)); // Ada is 36
```

The function still takes one object. The pattern in the parameter list unpacks
it on arrival, and the function body reads the names directly.

### Destructuring an array

Same idea, by position rather than by name:

```js
const [first, second] = ['a', 'b', 'c'];

console.log(first);  // a
console.log(second); // b
```

Skip a position by leaving a gap:

```js
const [, , third] = ['a', 'b', 'c'];
console.log(third); // c
```

Swapping two variables is a one-liner:

```js
let x = 1;
let y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1
```

### Spread: unpack into a new thing

`...` in front of an array or object spreads its contents out. On the way *in*
to a new array or object, it copies:

```js
const numbers = [1, 2, 3];
const more = [...numbers, 4];

console.log(more);    // [ 1, 2, 3, 4 ]
console.log(numbers); // [ 1, 2, 3 ]  untouched
```

```js
const defaults = { colour: 'red', size: 'M' };
const chosen = { ...defaults, size: 'L' };

console.log(chosen); // { colour: 'red', size: 'L' }
```

Later keys win. That single rule is how almost all "settings with defaults"
code works: spread the defaults first, then the values that should override
them.

Order matters, and getting it backwards silently does nothing useful:

```js
const wrong = { size: 'L', ...defaults };
console.log(wrong); // { size: 'M', colour: 'red' }
```

Spread also works for function arguments:

```js
const scores = [3, 9, 1];
console.log(Math.max(...scores)); // 9
console.log(Math.max(scores));    // NaN
```

`Math.max` wants separate arguments, not an array.

### Rest: collect the leftovers

The same three dots on the *left* of an `=`, or in a parameter list, collect
what is left into an array. The syntax is identical; the direction is opposite.

```js
const [first, ...others] = ['a', 'b', 'c'];

console.log(first);  // a
console.log(others); // [ 'b', 'c' ]
```

```js
function sumAll(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sumAll(1, 2, 3)); // 6
console.log(sumAll());        // 0
```

Inside the function, `numbers` is an ordinary array, whatever it was called
with. A rest parameter has to be last, since it takes everything remaining.

Rest works on objects too, which is the usual way to make a copy without one
property:

```js
const { age: _removed, ...withoutAge } = user;
console.log(withoutAge); // { name: 'Ada', city: 'London' }
```

### Copies are one level deep

```js
const original = { name: 'Ada', address: { city: 'London' } };
const copy = { ...original };

copy.name = 'Grace';
copy.address.city = 'Paris';

console.log(original.name);         // Ada     the copy has its own
console.log(original.address.city); // Paris   shared with the copy
```

Spread copies the top level. Nested objects are shared between the two, so
changing one changes both. The background article on values and references goes
into why.

<details>
<summary>Common mistakes</summary>

**Destructuring a name that is not a property.**

```js
const user = { name: 'Ada' };
const { username } = user;
console.log(username); // undefined
```

No error. The names have to match the keys exactly, including their case.

**Spreading the overrides before the defaults.**

```js
const defaults = { size: 'M' };
const chosen = { size: 'L', ...defaults };
console.log(chosen); // { size: 'M' }
```

Later keys win, so the defaults overwrote the choice. Put the defaults first.

**Passing an array where separate arguments are wanted.**

```js
console.log(Math.max([3, 9, 1])); // NaN
console.log(Math.max(...[3, 9, 1])); // 9
```

`Math.max` cannot convert an array to a number, so it produces `NaN`. Spread it.

</details>

## Check yourself

1. What is `name` after `const { name } = { title: 'Ariadne' };`?

<details><summary>Answer</summary>

`undefined`. There is no `name` property to take, and a missing one produces
`undefined` rather than an error. The tempting wrong answer is `'Ariadne'`,
from expecting it to take the first property whatever it is called - it matches
by name only.

</details>

2. What does `const [, second] = ['a', 'b'];` put in `second`?

<details><summary>Answer</summary>

`'b'`. The leading comma skips position 0. The tempting wrong answer is `'a'`,
from missing the gap - which is why this form is worth using sparingly.

</details>

3. What is `{ ...defaults, size: 'L' }` when `defaults` is `{ size: 'M' }`?

<details><summary>Answer</summary>

`{ size: 'L' }`. Later keys overwrite earlier ones. The tempting wrong answer
is `{ size: 'M' }`, which is what you get when the spread comes last - the
order is the whole mechanism.

</details>

4. In `function f(...args)`, what is `args` when called as `f(1, 2)`?

<details><summary>Answer</summary>

The array `[1, 2]`. A rest parameter collects the remaining arguments into an
ordinary array. The tempting wrong answer is `1`, treating `...args` as a name
for the first argument.

</details>

5. What does `Math.max([3, 9, 1])` return?

<details><summary>Answer</summary>

`NaN`. `Math.max` expects separate numbers; handed one array, it tries to
convert it to a number and fails. The tempting wrong answer is `9` - correct
only with `Math.max(...[3, 9, 1])`.

</details>

6. After `const copy = { ...original };`, does changing `copy.address.city`
   affect `original`?

<details><summary>Answer</summary>

Yes. Spread copies the top level only, so both objects point at the same nested
`address`. The tempting wrong answer is no, which is true for top-level
properties like `copy.name` and false for anything nested.

</details>

7. What is the difference between `...` on the left of `=` and on the right?

<details><summary>Answer</summary>

On the left it is rest: it collects leftovers into an array or object. On the
right it is spread: it unpacks contents into a new array, object or argument
list. The tempting answer is that they are two names for one feature - they are
opposites that share a spelling, and the side of the `=` tells you which one
you are reading.

</details>

## Your task

Open `js/013-destructuring-spread-rest/exercise.js` and write three functions.

1. **`fullName(person)`** takes an object with `first` and `last` and returns
   them joined by a space. Destructure in the parameter list rather than
   reading `person.first` in the body.

   ```js
   fullName({ first: 'Ada', last: 'Lovelace' }) // 'Ada Lovelace'
   ```

2. **`withDefaults(settings)`** returns a new object combining the defaults
   `{ colour: 'red', size: 'M' }` with the settings given. Anything in
   `settings` wins. The object passed in must not be changed.

   ```js
   withDefaults({ size: 'L' })  // { colour: 'red', size: 'L' }
   withDefaults({})             // { colour: 'red', size: 'M' }
   ```

3. **`sumAll(...numbers)`** takes any number of arguments and returns their
   total. With no arguments the total is 0.

   ```js
   sumAll(1, 2, 3) // 6
   sumAll()        // 0
   ```

When the tests pass, record it with `npm run learn -- check`.
