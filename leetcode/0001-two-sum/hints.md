## Hint 1 - Language

[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
from lesson 15, with `has`, `get` and `set`.

A counting `for` loop, because you need the index as well as the number.

## Hint 2 - Nudge

You are standing on a number and want to know whether its partner has already
appeared. Do not search for it - work out what it must be first. Subtraction
gives you the exact value.

Then the only question left is how to ask "have I seen this number, and where?"
without looking through the array again. That is what the map is for, and it
decides what the keys and values have to be.

The test with `[3, 3]` and target 6 catches the order of the two operations
inside the loop. Work out what happens on the first pass if you store before
you check.

## Hint 3 - Approach

Create an empty map above the loop, which will hold each number you have passed
and the index you passed it at.

Walk the array by index. For each position, work out what number would complete
the pair by subtracting the current number from the target. Ask the map whether
it already holds that number. If it does, return an array of the stored index
followed by the current index.

If it does not, store the current number with its index and carry on.
