# 12. Objects: properties, nesting, optional chaining

Run the tests for this exercise with:

```
npm run test -- 012
```

## The lesson

An array is a list, numbered from 0. An **object** is a collection with names
instead of numbers.

```js
const book = {
  title: 'Ariadne',
  author: 'Jennifer Saint',
  pages: 400,
  read: false,
};

console.log(book.title); // Ariadne
console.log(book.pages); // 400
```

Each `name: value` pair is a **property**. The name is called the **key**. Keys
are text; values can be anything, including other objects and arrays.

Use an object when the pieces have different meanings, and an array when they
are the same kind of thing in order.

### Reading properties

Two ways:

```js
console.log(book.title);      // Ariadne   dot notation
console.log(book['title']);   // Ariadne   bracket notation
```

Dot notation is the normal one. Brackets are for when the key is in a variable,
or is not a valid name:

```js
const field = 'author';
console.log(book[field]);  // Jennifer Saint
console.log(book.field);   // undefined
```

`book.field` looks for a property literally called `field`, which does not
exist. This is the difference between the two forms, and it is worth stopping
on: brackets evaluate what is inside them, dots do not.

A missing property is `undefined`, not an error:

```js
console.log(book.publisher); // undefined
```

### Changing and adding

```js
const book = { title: 'Ariadne', read: false };

book.read = true;         // change
book.rating = 5;          // add
delete book.title;        // remove

console.log(book); // { read: true, rating: 5 }
```

Objects declared with `const` can have their properties changed, exactly as
with arrays. `const` fixes the name, not the contents.

### Nesting

Values can be objects or arrays, as deep as you like:

```js
const user = {
  name: 'Ada',
  address: {
    city: 'London',
    postcode: 'N1',
  },
  tags: ['maths', 'computing'],
};

console.log(user.address.city); // London
console.log(user.tags[0]);      // maths
console.log(user.tags.length);  // 2
```

Read the path left to right: `user.address.city` means "the `city` of the
`address` of `user`".

### Where nesting goes wrong

```js
const user = { name: 'Ada' };
console.log(user.address.city);
// TypeError: Cannot read properties of undefined (reading 'city')
```

Read the message carefully, because it names the exact problem. `user.address`
is `undefined`, and you then asked `undefined` for its `city`. The property
that failed is `city`, so the thing that was missing is the one before it,
`address`.

### Optional chaining

`?.` stops the moment it meets `undefined` or `null`, and gives you `undefined`
instead of throwing:

```js
const user = { name: 'Ada' };

console.log(user.address?.city); // undefined
console.log(user.address.city);  // TypeError
```

Chain it as far as you need:

```js
console.log(user.address?.postcode?.length); // undefined
```

Pair it with `??`, the **nullish coalescing** operator, which supplies a
fallback when the left side is `null` or `undefined`:

```js
const city = user.address?.city ?? 'Unknown';
console.log(city); // Unknown
```

`??` differs from `||` in one important way: `||` also replaces falsy values
like `0` and `''`, while `??` only replaces `null` and `undefined`.

```js
const count = 0;
console.log(count || 10); // 10   probably not what you meant
console.log(count ?? 10); // 0    the real value survives
```

Use `?.` where a value is genuinely sometimes absent. Using it everywhere hides
bugs you would rather see.

### Methods

A property whose value is a function is called a **method**. Inside it, `this`
refers to the object it was called on:

```js
const counter = {
  count: 0,
  increment() {
    this.count += 1;
    return this.count;
  },
};

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
```

`this` has more corners to it, and lesson 21 covers them.

### Checking what is there

```js
const book = { title: 'Ariadne', rating: 0 };

console.log('title' in book);               // true
console.log('publisher' in book);           // false
console.log(book.rating !== undefined);     // true
```

Use `in` rather than truthiness when a property might legitimately hold `0`,
`''` or `false`.

<details>
<summary>Common mistakes</summary>

**Reading through a missing object.**

```js
const user = { name: 'Ada' };
console.log(user.address.city);
// TypeError: Cannot read properties of undefined (reading 'city')
```

The named property in the message, `city`, is the one you asked for. The one
that was missing is the step before it. Use `user.address?.city`.

**Using a dot when the key is in a variable.**

```js
const key = 'title';
console.log(book.key);   // undefined
console.log(book[key]);  // Ariadne
```

Dots take the literal name written after them. Brackets evaluate what is
inside.

**Using `||` for a fallback when `0` is a real value.**

```js
const settings = { volume: 0 };
console.log(settings.volume || 5); // 5
```

`0` is falsy, so the fallback fired and silently overrode a real setting. `??`
gives `0` here, which is what the data said.

</details>

## Check yourself

1. What does `book['title']` give for `const book = { title: 'Ariadne' };`?

<details><summary>Answer</summary>

`'Ariadne'`. Bracket notation with a string key reads the same property that
`book.title` does. The tempting wrong answer is `undefined`, from expecting
brackets to work only with numbers as they do on arrays - object keys are text.

</details>

2. What is printed?

```js
const book = { title: 'Ariadne' };
const key = 'title';
console.log(book.key);
```

<details><summary>Answer</summary>

`undefined`. After a dot, the name is taken literally, so this looks for a
property called `key`. The tempting wrong answer is `'Ariadne'`, from expecting
the variable to be read. That needs `book[key]`.

</details>

3. What happens with `user.address.city` when `user` is `{ name: 'Ada' }`?

<details><summary>Answer</summary>

`TypeError: Cannot read properties of undefined (reading 'city')`. `user.address`
is `undefined`, and `undefined` has no properties. The tempting wrong answer is
`undefined` - one missing level gives you `undefined`, two gives you a crash.

</details>

4. What does `user.address?.city` give for that same user?

<details><summary>Answer</summary>

`undefined`, with no error. `?.` stops the chain as soon as the left side is
`null` or `undefined`. The tempting wrong answer is `null`; optional chaining
always produces `undefined` when it stops.

</details>

5. What is `0 ?? 10`, and what is `0 || 10`?

<details><summary>Answer</summary>

`0` and `10`. `??` only steps in for `null` and `undefined`, so a real zero
survives. `||` steps in for every falsy value. The tempting mistake is treating
them as the same operator with different spellings; they disagree on `0`, `''`
and `false`, which are exactly the values that cause quiet bugs.

</details>

6. Does `const` stop you writing `book.rating = 5`?

<details><summary>Answer</summary>

No. `const` stops the name being pointed at a different object; the object's
own properties stay editable. The tempting wrong answer is yes - it is the same
rule you met with arrays in lesson 9.

</details>

7. Why would you check `'rating' in book` rather than `if (book.rating)`?

<details><summary>Answer</summary>

Because a rating of `0` is falsy, so the truthiness check treats a real value
as missing. `in` asks whether the property exists at all. The tempting wrong
answer is that they are equivalent - they differ for `0`, `''`, `false` and
`null`.

</details>

## Your task

Open `js/012-objects/exercise.js` and write three functions.

1. **`makeBook(title, author)`** returns an object with `title`, `author`, and
   a `read` property set to `false`.

   ```js
   makeBook('Ariadne', 'Jennifer Saint')
   // { title: 'Ariadne', author: 'Jennifer Saint', read: false }
   ```

2. **`bookLabel(book)`** returns `'Title by Author'`.

   ```js
   bookLabel({ title: 'Ariadne', author: 'Jennifer Saint' })
   // 'Ariadne by Jennifer Saint'
   ```

3. **`cityOf(user)`** returns the user's city from `user.address.city`. When
   there is no address, or the address has no city, return `'Unknown'`. It must
   not throw.

   ```js
   cityOf({ address: { city: 'London' } })  // 'London'
   cityOf({ name: 'Ada' })                  // 'Unknown'
   cityOf({ address: {} })                  // 'Unknown'
   ```

When the tests pass, record it with `npm run learn -- check`.
