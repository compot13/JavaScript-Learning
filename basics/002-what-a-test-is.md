# What a test is, and why this course uses them

A **test** is code that runs your code and checks the answer. That is the whole
idea. There is nothing clever underneath.

## The shape of one

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { double } from './exercise.js';

test('double returns twice the number', () => {
  assert.equal(double(5), 10);
});
```

Read it as a sentence: *test that double returns twice the number, by checking
that `double(5)` equals `10`.*

- `test(name, fn)` registers one check. The name is a description, not code.
- `assert.equal(actual, expected)` throws when the two do not match.
- If nothing throws, the test passes.

`assert.deepEqual` is the same for arrays and objects, comparing contents
rather than asking whether they are the same object. That distinction comes up
in lesson 9.

## Why not print and look?

You could write `console.log(double(5))` and check it yourself. That works
once. It stops working when you have twelve functions, or when you change one
thing and want to know whether the other eleven still behave.

A test is the check written down, so it can be repeated in a second, by a
machine, every time you change anything.

## Reading a pass

```
✔ double returns twice the number (0.9ms)
ℹ tests 1
ℹ pass 1
ℹ fail 0
```

Nothing to do.

## Reading a failure

```
✖ double returns twice the number (1.2ms)
  Expected values to be strictly equal:

  11 !== 10
```

Three pieces of information:

1. **Which test.** The name tells you which behaviour broke.
2. **What was expected.** `10`, on the right of `!==`.
3. **What happened.** `11`, on the left.

The first number is what your code produced, the second is what the test
wanted. The whole job is closing that gap.

The other failure you will see often is:

```
✖ double returns twice the number
  not implemented
```

That is the stub you have not written yet, throwing on purpose.

## The tests here are the specification

In this course, the tests say precisely what each exercise has to do. When the
README and your idea of the task disagree, the tests settle it. They also cover
the awkward cases the README names: an empty array, an empty string, zero, a
negative number.

They never test anything the lesson did not tell you about. If a test seems to
require knowledge you were not given, that is a bug in the course, not a gap in
you.

## Running them

```
npm run test -- 001
```

One exercise, as often as you like. Every run starts fresh, so there is no
state left over from the last attempt.

```
npm run learn -- check
```

The same tests, plus recording the item as done when they all pass.
