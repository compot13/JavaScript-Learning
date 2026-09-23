## Hint 1 - Language

[`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
[`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
and
[`some`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some).

Each one takes a callback: an arrow function you write inside the parentheses.

## Hint 2 - Nudge

One of these three returns an array the same length as the one it was given,
one returns an array that may be shorter, and one returns a single boolean.
Match each function in the task to the right shape of answer before you write
anything.

`longWords(['abc'], 3)` keeps `'abc'`, so the comparison includes the boundary
itself. Which comparison operator does that?

`hasNegative([])` has to be `false`. Check the empty-array rule in the lesson
for the method you picked.

## Hint 3 - Approach

`doubleAll`: return the result of mapping over the numbers, where the callback
takes one number and returns that number multiplied by two.

`longWords`: return the result of filtering the words, where the callback takes
one word and compares its length against the minimum, counting an exact match
as long enough.

`hasNegative`: return the result of asking whether at least one number passes a
test, where the test is that the number is less than zero.
