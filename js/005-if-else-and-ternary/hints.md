## Hint 1 - Language

[`if...else`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
for the first two functions, and the
[conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator)
for the third.

`return` inside an `if` ends the function there, which means you do not need
`else` after it.

## Hint 2 - Nudge

`grade(95)` is true for `>= 90`, `>= 70` and `>= 50` all at once. Since the
first matching test is the one that runs, which end of the range has to be
checked first?

`ticketPrice` describes its bands from the youngest upwards. If you write the
tests with `<` in that same order, what happens to an age of 70 as it falls
past each one?

`pluralise(1, 'file')` and `pluralise(0, 'file')` differ by one character in
the output. Which single piece of the string is conditional - the count, the
word, or the ending?

## Hint 3 - Approach

`grade`: write four lines. Test for the highest band first and return its
letter, then the next band down, then the next, then return the lowest grade
with no test at all, because anything that reaches the end failed every band
above it.

`ticketPrice`: the same shape, from the other direction. Test whether the age
falls below the bottom of each band in turn, returning that band's price, and
return the oldest band's price at the end.

`pluralise`: return one template literal holding the count, a space, the word,
and then an ending. The ending is a ternary that compares the count against 1
and produces either an empty string or the letter s.

