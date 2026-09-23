# Values and references

This explains a behaviour that looks like a bug the first few times you meet
it:

```js
const a = [1, 2, 3];
const b = a;

b.push(4);

console.log(a); // [ 1, 2, 3, 4 ]
```

`a` was never touched, and `a` changed. Here is why.

## Two kinds of value

JavaScript has two groups of types, and they are copied differently.

**Primitives** - numbers, strings, booleans, `undefined`, `null` - are copied
by **value**. The new variable gets its own copy.

```js
let x = 1;
let y = x;

y = 2;

console.log(x); // 1
console.log(y); // 2
```

Two separate boxes, each with a number in it.

**Objects** - which includes arrays, functions, `Map` and `Set` - are copied by
**reference**. The variable does not hold the object; it holds the address of
the object. Copying the variable copies the address.

```js
const a = [1, 2, 3];
const b = a;
```

One array, two names pointing at it. Change it through either name and both
names see the change, because there is only one array.

## `===` follows the same rule

```js
console.log(1 === 1);           // true
console.log('hi' === 'hi');     // true
console.log([1] === [1]);       // false
console.log({} === {});         // false

const a = [1];
const b = a;
console.log(a === b);           // true
```

For primitives, `===` compares the contents. For objects, it compares the
addresses: is this the *same* object? Two arrays with identical contents are
still two arrays.

That is why tests use `assert.deepEqual` for arrays and objects. It walks
through the contents instead of asking whether they are the same object.

## What this means for functions

A function receives copies of its arguments. For a primitive, that is a copy of
the value, so the caller is safe:

```js
function bump(n) {
  n += 1;
  return n;
}

let count = 1;
bump(count);
console.log(count); // 1
```

For an object, it is a copy of the address, so the function can reach the
caller's object:

```js
function addItem(list) {
  list.push('new');
}

const items = ['old'];
addItem(items);
console.log(items); // [ 'old', 'new' ]
```

Nothing was returned, and the caller's array changed. This is what people mean
when they say a function has a **side effect**.

Reassigning the parameter, on the other hand, does nothing to the caller:

```js
function replace(list) {
  list = ['different']; // points the local name somewhere else
}

const items = ['old'];
replace(items);
console.log(items); // [ 'old' ]
```

The name inside the function was pointed at a new array. The caller's variable
still points at the original.

## Making a real copy

```js
const original = [1, 2, 3];

const copy1 = [...original];        // spread
const copy2 = original.slice();     // slice with no arguments
const copy3 = { ...someObject };    // spread, for objects
```

These are **shallow** copies: the top level is new, anything nested is still
shared.

```js
const user = { name: 'Ada', address: { city: 'London' } };
const copy = { ...user };

copy.name = 'Grace';
copy.address.city = 'Paris';

console.log(user.name);         // Ada     top level was copied
console.log(user.address.city); // Paris   nested object is shared
```

For a copy all the way down, use `structuredClone(value)` in Node, or the JSON
round trip from lesson 20 when the data is plain.

## Why `const` does not stop any of this

```js
const items = ['a'];
items.push('b'); // fine
items = ['c'];   // TypeError: Assignment to constant variable.
```

`const` protects the *binding* - what the name points at. It says nothing about
the object at the other end. To freeze the contents, use `Object.freeze`.

## The rule in one line

Assigning a primitive copies the value. Assigning an object copies the address.
Everything above follows from that.
