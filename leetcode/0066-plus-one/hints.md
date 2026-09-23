## Hint 1 - Language

A counting
[`for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
loop that runs downwards, and
[spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
from lesson 13 for copying the array and for adding a digit to the front.

An early `return` from inside a loop, as in lesson 7.

## Hint 2 - Nudge

Do the sum on paper for `[4, 3, 9]` and for `[1, 2, 3]`. In one of them you
touch two digits, in the other you touch one. What is true about a digit that
tells you no further digits need to change?

The loop ending without you having returned is itself a piece of information.
What must have been true of every digit for that to happen, and what does the
answer look like in that case?

One test checks the array you were given is unchanged, so something has to
happen before the loop starts.

## Hint 3 - Approach

Copy the array first and work on the copy.

Walk the copy from the last position back to the first. On each digit, ask
whether it is below nine. If it is, add one to it and return the whole array
immediately - the job is finished. If it is not, set that position to zero and
carry on to the next digit left.

If the loop runs out, every digit was a nine and is now a zero. Return a new
array made of a one followed by all the zeroes.
