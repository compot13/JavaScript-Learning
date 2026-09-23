## Hint 1 - Language

A counting
[`for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
loop from lesson 6,
[`push`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
from lesson 9, and the
[remainder operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)
`%` from lesson 3.

## Hint 2 - Nudge

The output is twice as long as the input, so the loop has to run twice as many
times - or there have to be two loops. Either is fine.

If you use one long loop, the counter runs past the end of the array, and
reading past the end gives `undefined`. What did lesson 3 say `%` does to a
number that is larger than the thing you divide by?

## Hint 3 - Approach

Declare an empty result array above the loop.

Count from zero up to, but not including, twice the length of the input. On
each pass, push the item at the counter wrapped around by the input's length -
that is, the remainder of the counter divided by the length.

Return the result array.

The two-loop version is equally good: walk the input pushing each item, then
walk it again pushing each item a second time.
