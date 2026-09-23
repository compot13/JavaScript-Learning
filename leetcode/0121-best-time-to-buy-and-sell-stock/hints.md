## Hint 1 - Language

[`Math.max`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max)
and
[`Math.min`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min)
from lesson 3, and a `for...of` loop.

[`Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity)
is a number larger than every other, which is a convenient starting point for
"the smallest I have seen so far".

## Hint 2 - Nudge

Two running values, both declared above the loop, both updated on every pass.
Decide what each one means in one sentence before you write the loop.

For any given day, what is the best trade that ends on that day? You only need
one earlier number to answer it, and it is not the price on the day before.

The test with `[2, 9, 1]` is there to catch any approach that finds the lowest
and highest prices separately. Work out why it gives 7 rather than 8.

## Hint 3 - Approach

Declare the cheapest price so far, starting at a value larger than any real
price, and the best profit so far, starting at zero.

Walk through the prices one at a time. For each price, work out what selling
today would earn against the cheapest price so far, and keep whichever is
larger, that or the best profit you already had. Then, if today's price is
lower than the cheapest so far, make it the new cheapest.

After the loop, return the best profit. Because the cheapest price always comes
from a day already visited, the buy is always before the sell.
