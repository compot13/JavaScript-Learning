## Hint 1 - Language

[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
from lesson 15, with `get` and `set`, and the
[nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
operator `??` for the first time a letter is seen.

## Hint 2 - Nudge

Start with the cheapest possible test. Two of the cases in the task are settled
by it before any counting happens - and one test in the file exists purely to
catch leaving it out.

Then think of it as a budget. The first word tells you how many of each letter
you have. The second word spends them. What has gone wrong the moment a letter
is spent that you do not have?

One test compares `'aabb'` against `'abbb'`. Both use the same two letters, so
the answer cannot come from which letters appear.

## Hint 3 - Approach

First compare the lengths of the two strings and return false if they differ.

Then build a map from each letter of the first string to how many times it
appears, treating a letter not yet in the map as a count of zero before adding
one.

Then walk the second string. For each letter, read its remaining count,
treating a missing key as zero. If that count is already zero, return false.
Otherwise store the count reduced by one and carry on.

If the loop finishes, return true. The length check guarantees nothing is left
over.
