## Hint 1 - Language

[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
with `add` and `has`, and
[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
with `set` and `get`.

[Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
from lesson 13 turns a `Set` back into an array.

## Hint 2 - Nudge

`unique` has a test checking the result is a real array rather than a `Set`.
Building the `Set` is one step; there is a second step after it.

`countWords`: the first time a word turns up, what does `get` hand back, and
what happens when you add 1 to that? The lesson has the fallback.

`firstRepeated(['a', 'b', 'b', 'a'])` is `'b'`, not `'a'`, even though `'a'`
comes first in the array. So the answer is decided by where the *second*
appearance is. If you keep a record of what you have seen and check it before
adding the current item, which item are you standing on when the check first
comes back true?

## Hint 3 - Approach

`unique`: build a set from the array, then spread that set into a new array and
return it. One line.

`countWords`: create an empty map above a loop. For each word, read its current
count, treat a missing count as zero, add one, and store the result back under
that word. Return the map after the loop.

`firstRepeated`: create an empty set above a loop. For each item, first ask the
set whether it already contains that item and return the item if it does.
Otherwise add it to the set and carry on. If the loop finishes without
returning, return undefined.
