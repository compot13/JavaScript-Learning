## Hint 1 - Language

A
[`while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)
loop from lesson 6, and
[array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring#array_destructuring)
from lesson 13 for the swap.

The last index of an array is its length minus one.

## Hint 2 - Nudge

Two indexes, one at each end, moving towards each other. Write out the values
of both for `['a', 'b', 'c', 'd']` on paper: what are they at the start, what
are they after one swap, and at what point must the loop stop?

Then check what happens with `['a', 'b', 'c']`, where they land on the same
position rather than crossing.

For the swap itself: whichever form you use, the value you are about to
overwrite has to be kept somewhere first.

## Hint 3 - Approach

Declare one index at zero and another at the last position, both above the
loop.

Loop while the first index is strictly less than the second. Inside, swap the
characters at those two positions, then move the first index one step forward
and the second one step back.

Return nothing at all. The change to the array is the answer.
