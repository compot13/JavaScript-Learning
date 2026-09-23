## Hint 1 - Language

The [comparison operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)
you need are `>=` and `===`, and the
[logical AND](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)
operator `&&`.

For `isBlank`, you also want
[`trim`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)
and `.length` from lesson 2.

## Hint 2 - Nudge

Every one of these functions returns a boolean, and `age >= 18` already *is* a
boolean. What does that tell you about how much code each function needs?

For `isBlank`: `'   '` and `''` should both come back `true`. What single
operation turns the first one into the second one?

For `canRentCar`: one test passes `19` and `false` and expects `false` rather
than the value of `hasLicence`. Which operator gives you a boolean out of two
conditions instead of handing one of them back?

## Hint 3 - Approach

`isAdult`: return the comparison of the age against 18, using the operator that
counts 18 itself as passing.

`isBlank`: trim the text first, then compare the length of the trimmed text
against zero with the strict equality operator, and return that comparison.

`canRentCar`: return one expression made of two parts joined by logical AND.
The first part compares the age against 21, counting 21 as passing. The second
part is the licence value itself, which is already a boolean.
