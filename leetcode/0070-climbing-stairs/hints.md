## Hint 1 - Language

Nothing new. A counting
[`for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
loop and two variables, exactly as in Fibonacci Number.

## Hint 2 - Nudge

Do not start with code. Write out by hand how many routes there are for 1, 2, 3
and 4 steps, listing them if it helps. Then look at the four numbers together.

To see why the rule holds, think about the final move of any route to the top.
There are only two things it can have been. What does each one tell you about
where you were standing before it?

If you already solved Fibonacci Number, this is that code with different
starting values. Work out what they are from your hand-written list rather than
copying 0 and 1.

## Hint 3 - Approach

Deal with one and two steps first: the answer is the number of steps itself, so
return it and leave.

Otherwise declare two variables holding the counts for one step and for two
steps. Count upwards from three to n. On each pass, the count for this step is
the sum of the two you hold, and then the pair shifts along: the more recent of
the two becomes the older, and the new count becomes the more recent.

Return the more recent count after the loop.
