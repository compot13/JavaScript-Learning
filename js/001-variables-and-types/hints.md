## Hint 1 - Language

One operator answers the first two functions:
[`typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).
You write it in front of a value, with a space: `typeof value`.

For joining two pieces of text, the `+` operator is all you need here.

## Hint 2 - Nudge

`typeof value` is an expression, the same way `2 + 2` is an expression. What
does a function need to do with an expression for the caller to receive it?

For `initialValue`: the lesson showed what a variable holds when you declare it
and stop there. What has to be inside the function for that value to exist?

## Hint 3 - Approach

For `typeOf`: return the result of applying `typeof` to the parameter. One
line, no comparisons, no conditions.

For `describeVariable`: build a string out of three pieces in order - the name
you were given, a colon followed by a space, and the type of the value. Join
them with `+` and return the result. Check the space: the expected answer has
one space after the colon and none before it.

For `initialValue`: declare a variable inside the function with `let` and no
value, then return that variable on the next line.
