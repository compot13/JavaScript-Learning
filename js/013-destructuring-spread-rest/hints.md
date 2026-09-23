## Hint 1 - Language

[Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring),
[spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
and
[rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).

For the third function you also want `reduce` from lesson 11.

## Hint 2 - Nudge

`fullName` is given one object. The braces go where the parameter name is now,
and the names inside them have to match the property names exactly.

`withDefaults`: one test checks that the object you were handed is unchanged
afterwards, and another checks that a setting beats a default. Both are decided
by the same thing - where the three dots go, and in what order.

`sumAll` is declared in the stub with a plain parameter. The tests call it with
zero, one, two and three arguments. What has to change about the parameter list
before the body can treat them as a list?

## Hint 3 - Approach

`fullName`: replace the parameter with a pattern in braces naming the two
properties you want, then return a template literal with the first name, a
space and the last name.

`withDefaults`: return a new object literal. Write the two default properties
first, then spread the settings after them so anything they contain replaces
what came before. Building a fresh literal is what keeps the argument
untouched.

`sumAll`: put three dots in front of the parameter name so the function
collects all its arguments into an array. Then reduce that array to a total,
starting from zero, which also handles being called with nothing at all.
