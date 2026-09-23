## Hint 1 - Language

Nothing new: a
[`while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)
loop, `if` / `else`, and assigning to positions with square brackets.

Three index variables, all counting downwards.

## Hint 2 - Nudge

Work out where each index starts before writing the loop. One of them is not
`length - 1` - remember which entries of the first array are real.

Ask which position in the first array is safe to overwrite right now. That
answer is what decides the direction of the whole algorithm.

Two tests are there to catch specific slips. One passes an empty second array.
The other passes a first array with no real numbers at all, so its index starts
at minus one before the loop body has run even once - what has to be checked
before reading from it?

## Hint 3 - Approach

Declare three indexes: one at the last real number of the first array, one at
the last number of the second, and one at the very last position of the first
array.

Loop while the second array's index is still zero or more. Inside, decide which
of the two candidates is larger. Take from the first array only when its index
is still valid and its number is the larger one; otherwise take from the second
array. Write whichever you took to the write position, step that array's index
back, and step the write position back.

Return nothing. The first array is the answer.
