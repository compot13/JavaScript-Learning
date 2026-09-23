## Hint 1 - Language

The
[remainder operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)
`%` and
[`Math.floor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
from lesson 3, and
[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
from lesson 15.

Writing a small helper function alongside the exported one is fine - it does
not have to be exported.

## Hint 2 - Nudge

Two separate problems. Solve the digit arithmetic first, on its own: given 82,
produce 68. Test that by hand before worrying about the rest.

Then the outer question: the process either arrives at 1 or goes round forever.
You cannot wait forever, so you need to recognise "I have been here before".
What did Contains Duplicate use for exactly that question?

When your loop ends, there were two possible reasons. Make sure the value you
return says which one happened.

## Hint 3 - Approach

Write a helper that takes a number and returns the sum of the squares of its
digits. Inside it, keep a total at zero and loop while the number is above
zero: take the last digit with the remainder of dividing by ten, add its
square to the total, then remove that digit by dividing by ten and rounding
down.

In the main function, create an empty set and a variable holding the current
value. Loop while the current value is not one and the set does not already
contain it. Inside the loop, add the current value to the set and replace it
with the result of the helper.

After the loop, return whether the current value is one.
