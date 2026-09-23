## Hint 1 - Language

Nothing new. A parameter can hold a
[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_parameters),
and you call it the way you call any function: the parameter name followed by
parentheses.

`for...of` from lesson 6 and `push` from lesson 9 build the result.

## Hint 2 - Nudge

`applyTwice` has a test that counts how many times the function is called, and
another that checks the first result is fed into the second call. Both come out
of one expression with two sets of parentheses.

For `transformAll` and `countWhere`, you already wrote this shape in lesson 6:
a variable declared above the loop, changed inside it, returned after it. The
only new part is that what happens to each item is decided by the caller.

## Hint 3 - Approach

`applyTwice`: call the function with the value, and call the function again
with whatever came back. Return that. It fits on one line, with one call nested
inside another.

`transformAll`: create an empty array above a loop. Walk through the items, and
for each one push the result of calling the function with that item. Return the
array after the loop.

`countWhere`: create a count of zero above a loop. Walk through the items, and
when calling the predicate with an item gives something truthy, add one to the
count. Return the count after the loop.
