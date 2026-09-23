## Hint 1 - Language

[Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
are written in the parameter list: `function f(x = 10)`.

For `wrapInTag`, a template literal from lesson 2 holds the tag name in two
places.

For `safeDivide`, an `if` with a `return` inside it ends the function before
the division happens.

## Hint 2 - Nudge

`applyDiscount(80, 0)` has to return 80, not 72. If you handled the missing
argument with an `if` that checks whether `percentOff` is falsy, what would
that test say about `0`? Where else could the default live so that `0` is
treated as a real answer?

`safeDivide(0, 0)` and `safeDivide(0, 5)` expect different results. Which of
the two arguments decides that?

## Hint 3 - Approach

`applyDiscount`: give the second parameter a default of 10 in the parameter
list. In the body, work out the amount of the discount by multiplying the price
by the percentage and dividing by 100, then subtract that from the price and
return it.

`wrapInTag`: give the tag parameter a default of the letter p. Return a
template literal with an opening angle bracket, the tag, a closing angle
bracket, the text, then a closing tag - which is the same but with a slash
before the tag name.

`safeDivide`: start with an `if` that compares the second argument against zero
using strict equality, and returns the message string inside that block. After
the `if`, return the first argument divided by the second.
