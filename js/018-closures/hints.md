## Hint 1 - Language

[Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures).

For `once`, you also want
[rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
and
[spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
from lesson 13, to accept any arguments and pass them on.

## Hint 2 - Nudge

Each of these functions returns something. Check what type that something has
to be before writing the body - one test asks directly.

`makeCounter` has a test proving two counters do not interfere. That decides
where the count variable is declared: inside the factory, or outside
everything. Only one of those places gives each counter its own.

`once` has to remember two things between calls: whether it has run, and what
the answer was. Where can two variables live so that the returned function can
read and change them, but nothing else can?

## Hint 3 - Approach

`makeMultiplier`: return an arrow function that takes one number and multiplies
it by the factor parameter. The factor is still readable inside, which is the
whole point.

`makeCounter`: declare a count starting at zero inside the factory, then return
a function that adds one to it and returns the new value. Declaring the count
inside is what gives each counter its own.

`once`: declare two variables inside the factory - a flag saying whether the
function has run yet, and a place to keep the result. Return a function that
collects any arguments it is given. Inside, when the flag is still unset, set
it, call the original function with those arguments and store what comes back.
Then return the stored result, whichever call it was.
