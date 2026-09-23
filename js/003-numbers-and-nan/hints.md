## Hint 1 - Language

For `roundTo`:
[`toFixed`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)
and
[`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number).

For `formatMinutes`:
[`Math.floor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
and the
[remainder operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)
`%`.

For `isBrokenNumber`:
[`Number.isNaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN).

## Hint 2 - Nudge

`roundTo`: one of the tests checks that the result is a number rather than a
string. Which of the two tools you have does the rounding, and what type does
it hand back?

`formatMinutes`: there are 60 minutes in an hour. Dividing gives you a decimal
like 2.25, and the 2 and the .25 both mean something. Which operator gives you
the whole part, and which gives you what was left behind?

`isBrokenNumber`: one test passes in the string `'abc'` and expects `false`.
Two similarly named tools answer this question differently. Which one refuses
to convert its argument first?

## Hint 3 - Approach

`roundTo`: round the value to the requested number of decimal places, then
convert that result back into a number before returning it. Two operations,
one line.

`formatMinutes`: work out the whole hours by dividing the total by 60 and
rounding down. Work out the leftover minutes by taking the remainder of the
total divided by 60. Then return a template literal that puts the hours, the
letter h, a space, the minutes and the letter m in that order.

`isBrokenNumber`: return the result of the check that asks whether a value is
the NaN value, applied to the parameter. One line, and no comparison operator
of your own.
