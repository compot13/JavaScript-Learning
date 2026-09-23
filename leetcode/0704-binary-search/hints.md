## Hint 1 - Language

[`Math.floor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
from lesson 3, a
[`while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)
loop, and `if` / `else`.

## Hint 2 - Nudge

Three numbers: the lowest index still in play, the highest, and the one halfway
between. Two of them are updated as you go, one is recalculated each pass.

After you check the middle and it is not the target, that position is known to
be wrong. Make sure the next range excludes it, or the range can stop shrinking.

Check your loop condition against `search([5], 5)`. If it returns `-1`, the
condition stops one item too early.

## Hint 3 - Approach

Declare the low index at zero and the high index at the last position.

Loop while the low index is less than or equal to the high index. Inside, work
out the middle by adding the two and halving, rounding down.

Compare the number at the middle against the target. If they are equal, return
the middle. If the number is smaller than the target, move the low index to one
past the middle. Otherwise move the high index to one before the middle.

If the loop ends without a match, return minus one.
