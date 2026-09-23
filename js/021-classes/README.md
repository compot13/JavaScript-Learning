# 21. Classes, methods, and `this`

Run the tests for this exercise with:

```
npm run test -- 021
```

## The lesson

A **class** is a template for making objects that all have the same shape and
the same methods.

Without one, building several similar objects means repeating yourself:

```js
const a = { width: 2, height: 3, area: () => 6 };
const b = { width: 4, height: 5, area: () => 20 };
```

With one, the shape is written once:

```js
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

const small = new Rectangle(2, 3);
const large = new Rectangle(4, 5);

console.log(small.area()); // 6
console.log(large.area()); // 20
```

### The parts

- `class Rectangle { ... }` declares the class. Class names start with a
  capital letter by convention.
- `constructor` runs once when you write `new Rectangle(2, 3)`. Its job is to
  put the starting values on the new object.
- `this` inside the class means "the object being worked on right now".
- `area()` is a **method**: a function that belongs to every rectangle. Note
  there is no `function` keyword and no comma between methods.

`new` does three things: makes an empty object, runs the constructor with
`this` set to that object, and hands the object back.

Forgetting `new` is a real error, not a quiet one:

```js
const broken = Rectangle(2, 3);
// TypeError: Class constructor Rectangle cannot be invoked without 'new'
```

### `this` is decided by the call

`this` is whatever is to the left of the dot at the moment of the call:

```js
console.log(small.area()); // this is small
console.log(large.area()); // this is large
```

Take the method away from its object and that link breaks:

```js
const getArea = small.area;
console.log(getArea());
// TypeError: Cannot read properties of undefined (reading 'width')
```

There is no dot, so `this` is `undefined`, and `this.width` fails. This bites
whenever a method is passed as a callback:

```js
[1].forEach(small.area);      // same problem
[1].forEach(() => small.area()); // fine: the call keeps its dot
```

An arrow function written as a class field avoids it, because an arrow takes
`this` from where it was written:

```js
class Counter {
  count = 0;
  increment = () => {
    this.count += 1;
    return this.count;
  };
}
```

Use a normal method by default, and reach for the arrow field when the method
has to be passed around on its own.

### Fields

A property can be declared directly in the class body, which documents what
every instance has:

```js
class Counter {
  count = 0;

  increment() {
    this.count += 1;
    return this.count;
  }
}
```

A `#` in front makes a field private - unreachable from outside:

```js
class Account {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
    return this.#balance;
  }
}

const account = new Account();
console.log(account.deposit(50)); // 50
console.log(account.#balance);
// SyntaxError: Private field '#balance' must be declared in an enclosing class
```

This is the modern version of the closure trick from lesson 18.

### Static methods

A `static` method belongs to the class, not to an instance. It is the usual
place for alternative ways of building one:

```js
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  static square(size) {
    return new Rectangle(size, size);
  }
}

const box = Rectangle.square(4);
console.log(box.width); // 4
```

You call it on the class itself: `Rectangle.square(4)`, never
`box.square(4)`.

### Methods that return a new object

A method can build and return another instance rather than changing this one:

```js
class Rectangle {
  // ...
  scale(factor) {
    return new Rectangle(this.width * factor, this.height * factor);
  }
}

const small = new Rectangle(2, 3);
const big = small.scale(2);

console.log(big.width);   // 4
console.log(small.width); // 2  unchanged
```

<details>
<summary>Common mistakes</summary>

**Leaving out `new`.**

```js
const r = Rectangle(2, 3);
// TypeError: Class constructor Rectangle cannot be invoked without 'new'
```

The message says exactly what is missing.

**Leaving out `this` inside a method.**

```js
area() {
  return width * height;
}
// ReferenceError: width is not defined
```

`width` is a property of the object, not a variable in scope. Properties need
`this.`.

**Passing a method as a callback.**

```js
const getArea = small.area;
getArea();
// TypeError: Cannot read properties of undefined (reading 'width')
```

The dot is what sets `this`. Wrap the call - `() => small.area()` - or use an
arrow field.

</details>

## Check yourself

1. What does `new Rectangle(2, 3)` do that `Rectangle(2, 3)` does not?

<details><summary>Answer</summary>

`new` creates the object, runs the constructor with `this` pointing at it, and
returns it. Without `new` a class constructor throws a `TypeError`. The
tempting wrong answer is that `new` is optional style - for classes it is
required, and the error says so.

</details>

2. What is `this` inside `small.area()`?

<details><summary>Answer</summary>

`small`, the object to the left of the dot. The tempting wrong answer is "the
class" - `this` is one particular instance, which is why two rectangles give
different areas from the same method.

</details>

3. Why does this fail?

```js
const getArea = small.area;
getArea();
```

<details><summary>Answer</summary>

Because `this` is set by the call, and there is no object to the left of the
dot here, so `this` is `undefined` and `this.width` throws. The tempting wrong
answer is that the method was copied incorrectly - the function is fine, its
connection to the object is what was lost.

</details>

4. Where do you call a `static` method?

<details><summary>Answer</summary>

On the class: `Rectangle.square(4)`. Instances do not have it, so
`box.square(4)` throws `TypeError: box.square is not a function`. The tempting
wrong answer is that `static` means "available everywhere".

</details>

5. What does `#` in front of a field name do?

<details><summary>Answer</summary>

It makes the field private, so only code inside the class body can read or
write it. The tempting wrong answer is that it is a naming convention like a
leading underscore - reaching a `#` field from outside is a syntax error, not
a bad habit.

</details>

6. What is wrong with `return width * height;` inside a method?

<details><summary>Answer</summary>

It looks for variables called `width` and `height` in scope, and throws
`ReferenceError: width is not defined`. Properties of the object need `this.`
in front. The tempting wrong answer is that the constructor failed to set them.

</details>

7. What is the difference between a method that changes `this` and one that
   returns a new instance?

<details><summary>Answer</summary>

The first changes the object every holder of it can see; the second leaves it
alone and hands back something new. The tempting answer is that they are
equivalent - the difference is exactly the `slice` versus `splice` distinction
from lesson 9, and it decides whether callers can be surprised.

</details>

## Your task

Open `js/021-classes/exercise.js` and write one class, `Rectangle`.

- **`new Rectangle(width, height)`** stores `width` and `height` as properties
  with those names.
- **`area()`** returns width times height.
- **`perimeter()`** returns twice the width plus twice the height.
- **`scale(factor)`** returns a **new** `Rectangle` with both sides multiplied
  by `factor`, leaving the original alone.
- **`Rectangle.square(size)`** is a static method returning a new `Rectangle`
  with equal sides.

```js
const r = new Rectangle(2, 3);
r.area()        // 6
r.perimeter()   // 10
r.scale(2)      // a Rectangle with width 4 and height 6
Rectangle.square(4).area() // 16
```

When the tests pass, record it with `npm run learn -- check`.
