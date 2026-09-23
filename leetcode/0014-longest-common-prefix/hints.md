## Hint 1 - Language

[`startsWith`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)
and
[`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice).

`slice(0, -1)` returns everything except the last character.

## Hint 2 - Nudge

Start with a guess at the answer that is certainly long enough, and make it
shorter until it is true of every word. Which word gives you a free first
guess?

Take `['flower', 'flow', 'flight']` and follow your guess as it meets each
word. How many characters does `'flight'` force off, and what does that tell
you about whether one check per word is enough?

Think about what happens when the guess becomes the empty string. Which words
start with the empty string?

## Hint 3 - Approach

Set a variable holding the current guess to the first word of the array.

Walk through every word. For each one, keep shortening the guess by one
character from the end for as long as that word does not start with the guess.
Use a loop for that, not a single check, because one word can cut several
characters.

Return the guess after every word has been checked. If it shrank all the way to
the empty string, that is the correct answer for an array with nothing in
common.
