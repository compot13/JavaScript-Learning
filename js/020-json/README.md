# 20. JSON: `parse`, `stringify`, and why it exists

Run the tests for this exercise with:

```
npm run test -- 020
```

## The lesson

A JavaScript object lives in your program's memory. It cannot be sent over a
network or written to a file as it is, because both of those carry text.

**JSON** - JavaScript Object Notation - is a way of writing data as text, so it
can travel. It looks like JavaScript because it was taken from JavaScript, but
it is a text format, and nearly every language can read it.

### `JSON.stringify`: value to text

```js
const user = { name: 'Ada', age: 36, tags: ['maths'] };
const text = JSON.stringify(user);

console.log(text);        // {"name":"Ada","age":36,"tags":["maths"]}
console.log(typeof text); // string
```

The result is one long string. For something readable, pass a number of spaces
to indent by:

```js
console.log(JSON.stringify(user, null, 2));
// {
//   "name": "Ada",
//   "age": 36,
//   "tags": [
//     "maths"
//   ]
// }
```

The `null` in the middle is a filter argument you rarely need; the `2` is the
indentation.

### `JSON.parse`: text to value

```js
const text = '{"name":"Ada","age":36}';
const user = JSON.parse(text);

console.log(user.name);  // Ada
console.log(user.age);   // 36
console.log(typeof user); // object
```

Round trip: `stringify` on the way out, `parse` on the way in.

### The rules of the format

JSON is stricter than JavaScript:

- Keys must be in **double quotes**. `{name: "Ada"}` is not valid JSON.
- Strings use double quotes. Single quotes are not allowed.
- No trailing comma after the last item.
- No comments.
- Numbers, strings, booleans, `null`, arrays and objects only.

These are all invalid, and each one is a common mistake:

```js
JSON.parse("{name: 'Ada'}");   // keys and strings need double quotes
JSON.parse('{"a": 1,}');       // trailing comma
JSON.parse("");                // empty string is not valid JSON
```

### Things that do not survive the trip

Values with no JSON equivalent are dropped or changed:

```js
const value = {
  when: new Date('2026-01-01'),
  run: () => 'hi',
  missing: undefined,
  nothing: null,
  broken: NaN,
};

console.log(JSON.stringify(value));
// {"when":"2026-01-01T00:00:00.000Z","nothing":null,"broken":null}
```

- Functions and `undefined` properties are **removed entirely**.
- A `Date` becomes a string, and stays a string after parsing.
- `NaN` and `Infinity` become `null`.
- `Map` and `Set` become `{}`.

So `JSON.parse(JSON.stringify(x))` does not always give you back `x`. It gives
you the parts of `x` that JSON can describe.

### Parsing can throw

Bad text throws a `SyntaxError`, which is where lesson 19 pays off:

```js
try {
  const data = JSON.parse('not json');
} catch (error) {
  console.log(error.name);    // SyntaxError
  console.log(error.message); // Unexpected token 'o', "not json" is not valid JSON
}
```

Any text you did not produce yourself - a file, a network response, something a
person typed - can be malformed, so parsing it belongs inside a `try`.

### Copying with a round trip

```js
const original = { name: 'Ada', address: { city: 'London' } };
const copy = JSON.parse(JSON.stringify(original));

copy.address.city = 'Paris';
console.log(original.address.city); // London
```

Unlike spread, this copies every level, because the whole thing was flattened
into text and rebuilt. It is limited to values JSON can express, so dates come
back as strings and functions vanish. Node also has `structuredClone(value)`,
which handles dates, maps and sets properly, and is the better choice when you
have it.

<details>
<summary>Common mistakes</summary>

**Parsing something that is already an object.**

```js
JSON.parse({ name: 'Ada' });
// SyntaxError: "[object Object]" is not valid JSON
```

`parse` takes text. The object was converted to the string `'[object Object]'`
first, which explains the odd message.

**Single quotes or unquoted keys in the JSON.**

```js
JSON.parse("{'name': 'Ada'}");
// SyntaxError: Expected property name or '}' in JSON at position 1
```

JSON needs double quotes on keys and strings. Position 1 is the character it
choked on.

**Expecting a `Date` to survive.**

```js
const back = JSON.parse(JSON.stringify({ when: new Date() }));
console.log(typeof back.when); // string
```

It comes back as text. Convert it yourself with `new Date(back.when)`.

</details>

## Check yourself

1. What type does `JSON.stringify({ a: 1 })` return?

<details><summary>Answer</summary>

A string. That is the point: text can be written to a file or sent over a
network. The tempting wrong answer is an object, which is what you started
with.

</details>

2. Is `{name: "Ada"}` valid JSON?

<details><summary>Answer</summary>

No. JSON requires double quotes around keys, so it must be `{"name": "Ada"}`.
The tempting wrong answer is yes, because it is valid JavaScript - JSON is a
stricter subset, and this is the most common reason hand-written JSON fails to
parse.

</details>

3. What happens to a function stored on an object when you stringify it?

<details><summary>Answer</summary>

The property is removed entirely - it does not become `null` or an empty
object. The tempting wrong answer is that the source code is kept; JSON has no
way to describe a function.

</details>

4. What does `JSON.parse('not json')` do?

<details><summary>Answer</summary>

It throws a `SyntaxError`. The tempting wrong answer is that it returns `null`
or `undefined` - `parse` never signals failure by returning a value, so any
parse of untrusted text belongs in a `try`.

</details>

5. After `const copy = JSON.parse(JSON.stringify(original))`, does changing
   `copy.address.city` affect `original`?

<details><summary>Answer</summary>

No. The round trip rebuilt every level from text, so nothing is shared. The
tempting wrong answer is yes, which is true of a spread copy - that one shares
nested objects.

</details>

6. What does a `Date` become after a stringify and parse round trip?

<details><summary>Answer</summary>

A string, in the form `2026-01-01T00:00:00.000Z`. The tempting wrong answer is
a `Date`, and the bug shows up later when you call a date method on it and get
`TypeError: ... is not a function`.

</details>

7. Why does `JSON.parse({ a: 1 })` complain about `[object Object]`?

<details><summary>Answer</summary>

Because `parse` expects text, so the object was converted to a string first,
and `'[object Object]'` is what that conversion produces. The tempting wrong
answer is that it is a bug in `parse`; seeing `[object Object]` in an error
almost always means an object went somewhere text was expected.

</details>

## Your task

Open `js/020-json/exercise.js` and write three functions.

1. **`toJson(value)`** returns the value as JSON text, indented by 2 spaces.

   ```js
   toJson({ a: 1 })
   // '{\n  "a": 1\n}'
   ```

2. **`parseOrNull(text)`** returns the parsed value, or `null` when the text is
   not valid JSON. It must not throw.

   ```js
   parseOrNull('{"a":1}')  // { a: 1 }
   parseOrNull('nope')     // null
   ```

3. **`deepCopy(value)`** returns a copy of a plain object or array, where
   changing a nested part of the copy leaves the original alone. Use the JSON
   round trip.

   ```js
   const original = { address: { city: 'London' } };
   const copy = deepCopy(original);
   copy.address.city = 'Paris';
   original.address.city // 'London'
   ```

When the tests pass, record it with `npm run learn -- check`.
