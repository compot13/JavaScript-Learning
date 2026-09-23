## Hint 1 - Language

The
[remainder operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)
`%` from lesson 3,
[`if...else`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
from lesson 5, and
[`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String)
to convert a number to text.

## Hint 2 - Nudge

Write out what happens to the number 15 in your condition chain, from the top,
stopping at the first test that is true. If the answer is not `'FizzBuzz'`, the
order is the problem, not the conditions.

One test checks that the first entry is a string. Which branch of your chain
produces that entry, and what type does it push?

Check the loop's start and end against `fizzBuzz(1)` returning exactly `['1']`.

## Hint 3 - Approach

Declare an empty result array above the loop. Count from one up to and
including n.

On each pass, run a chain of conditions. Test first whether the number is
divisible by both three and five, and push the combined word. Otherwise test
divisibility by three, then by five, pushing the matching word. If none of them
matched, convert the number to a string and push that.

Return the result array after the loop.
