## Hint 1 - Language

[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
from lesson 15, with
[`has`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has),
[`add`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add)
and `size`.

## Hint 2 - Nudge

You wrote almost this function in lesson 15, as `firstRepeated`. The difference
is what you return.

Two things happen to each value: a question and an addition. Getting them in
the wrong order makes every array look like it has a duplicate - try it on
`[1]` in your head.

There is also a one-line answer that compares two numbers. If you find it, be
able to say why it is correct before using it.

## Hint 3 - Approach

Create an empty set above a loop.

Walk through the numbers. For each one, first ask the set whether it already
contains that number, and return true if it does. Otherwise add the number to
the set and carry on.

If the loop finishes, nothing was repeated, so return false.

The one-line alternative: build a set from the whole array and compare how many
members it has against how many items the array has. They differ exactly when
something was repeated.
