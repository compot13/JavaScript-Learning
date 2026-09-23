## Hint 1 - Language

[`reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
from lesson 11, or a plain loop, to add the array up.

The rest is arithmetic: the sum of the whole numbers from 0 to n is
`n * (n + 1) / 2`.

## Hint 2 - Nudge

You know which numbers *should* be there, and you can see which ones *are*
there. Comparing the two sets one by one is slow. Is there a single number that
summarises a whole set, and changes in a predictable way when one member is
removed?

Before writing anything, check the formula against `[0]` by hand: what is the
length, what should the total be, what is the actual total, and does the
subtraction give 1?

## Hint 3 - Approach

Take the length of the array and call it n. Work out what the numbers from zero
to n add up to, using the formula.

Add up the numbers the array actually contains, in one pass.

Return the first total minus the second. Nothing needs sorting, and no
candidate is ever searched for.
