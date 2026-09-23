## Hint 1 - Language

[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
built from an array of pairs, as in lesson 15, and `??` from lesson 12 for the
value past the end of the string.

A counting `for` loop, because you need to look at the position after the
current one.

## Hint 2 - Nudge

Write out `MCMXCIV` symbol by symbol on paper, with each symbol's value and the
value of the one after it. Mark which ones should be added and which
subtracted, then look for what the subtracted ones have in common.

The last symbol has nothing after it. Decide what value to use for "nothing" so
that the general rule still gives the right answer there, rather than writing a
separate case for it.

## Hint 3 - Approach

Create a map from each of the seven symbols to its value, outside the function.

Inside, start a total at zero and walk the string by index. For each position,
look up the value of the current symbol and the value of the next one, using
zero when there is no next one.

Compare the two. When the current value is smaller than the next, take it away
from the total. Otherwise add it.

Return the total after the loop.
