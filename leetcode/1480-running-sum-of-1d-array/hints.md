## Hint 1 - Language

Nothing new.
[`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
from lesson 6 and
[`push`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
from lesson 9.

## Hint 2 - Nudge

You need two things that outlive a single pass of the loop: the array you are
building, and the total so far. Where do both have to be declared?

Inside the loop there are two statements and their order decides the answer.
Try it both ways on `[1, 2, 3]` on paper and see which one produces a first
element of 1 rather than 0.

## Hint 3 - Approach

Declare an empty array for the result and a total of zero, both above the loop.

Walk through the numbers one at a time. For each number, add it to the total,
then push the total's new value onto the result array.

After the loop, return the result array - not the total.

An empty input never enters the loop, so the empty result array is returned as
it was created, which is the answer the tests want.
