## Hint 1 - Language

[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
with `get` and `set`, and `??` for a letter seen for the first time - the same
counting pattern as Valid Anagram.

## Hint 2 - Nudge

This is Valid Anagram with two differences. Find them before you write
anything: one is about whether the lengths have to match, the other is about
which of the two strings gets counted.

Think of it as a budget rather than a comparison. One string says what you
have; the other says what you need. Which one do you count?

The test comparing `'aa'` against `'ab'` is there to catch any approach based
on which letters appear rather than how many.

## Hint 3 - Approach

Build a map from each letter of the magazine to how many times it appears,
treating a letter not yet seen as zero before adding one.

Then walk the note one letter at a time. For each letter, read how many are
left, treating a missing key as zero. If none are left, return false.
Otherwise store the count reduced by one.

If the loop finishes, return true. Letters still unspent in the magazine do not
matter, so there is nothing to check afterwards.
