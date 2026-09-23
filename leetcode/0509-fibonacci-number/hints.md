## Hint 1 - Language

A counting
[`for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
loop, and optionally
[array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring#array_destructuring)
from lesson 13 to update two variables at once.

## Hint 2 - Nudge

Two variables, holding the last two numbers of the sequence. Write out their
values for `n = 6` line by line before writing code - the table in the lesson
shows the shape.

The last test times the call, so the recursive version will fail it. That is
deliberate.

Check `fib(0)` against your loop. With the starting values the lesson uses, how
many times does the loop run for an input of 0, and what would be returned?

## Hint 3 - Approach

Handle the two smallest inputs first: when n is below 2, the answer is n
itself, so return it and leave.

Otherwise declare two variables holding the first two numbers of the sequence.
Count from 2 up to and including n. On each pass, work out the next number by
adding the two you have, then shift them along: the second becomes the first,
and the new number becomes the second. Do that either with a temporary variable
or by assigning both at once.

Return the second variable after the loop.
