## Hint 1 - Language

[`reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).

The shape is `array.reduce((accumulator, item) => newAccumulator, startingValue)`.

For the third function you also want the
[conditional operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator)
from lesson 5.

## Hint 2 - Nudge

Each function needs a different starting value, and each one is decided by the
same question: what should this function return for an empty array? The tests
tell you all three answers.

For `longestWord`: the accumulator is the best word found so far, not a number.
On each pass you are choosing which of two strings carries forward. What
happens on a tie if you compare with `>` rather than `>=`?

## Hint 3 - Approach

`sumOf`: reduce over the numbers with a callback that adds the current number
to the running total, starting from zero.

`productOf`: the same shape, multiplying instead of adding, and starting from
one so the first multiplication does not wipe the value out.

`longestWord`: reduce over the words, starting from an empty string. In the
callback, compare the length of the current word against the length of the best
word so far, and return whichever should carry on. Use a comparison that is
false on a tie, so the earlier word stays.
