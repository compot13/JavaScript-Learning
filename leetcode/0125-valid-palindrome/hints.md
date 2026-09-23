## Hint 1 - Language

[`toLowerCase`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase),
[`split`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split),
[`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
and
[`join`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join).

Splitting on an empty string gives you every character separately.

## Hint 2 - Nudge

Two separate jobs: turn the input into the string you actually want to test,
then test it. Do them in that order and each one stays simple.

For the cleaning, lowercase first. That means your "is this worth keeping" test
only needs to know about lowercase letters and digits, rather than both cases.

For the comparison, you can build the reverse and compare the two strings, or
walk in from both ends as you did in Reverse String. Both pass. Check `' '`
against whichever you pick before you run the tests.

## Hint 3 - Approach

Write a small helper that takes one character and answers whether it is a
lowercase letter or a digit, by comparing it against the ends of each range
with the comparison operators.

In the main function, lowercase the text, split it into characters, keep only
the ones the helper approves of, and join them back into a string.

Then decide whether that cleaned string reads the same both ways. Either
reverse a copy of it and compare, or walk one index in from the front and
another in from the back, returning false at the first mismatch and true if
they meet without one.
