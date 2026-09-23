## Hint 1 - Language

[`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
and
[`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse).

`try...catch` from lesson 19 for the second function.

## Hint 2 - Nudge

`toJson` needs indentation. Look at how many arguments `stringify` takes, and
what the one in the middle is for - the lesson shows the exact call.

`parseOrNull` has a test that it does not throw. Parsing bad text raises an
error rather than returning anything, so the only way to turn that into a
returned value is to catch it.

`deepCopy` is two of the functions you have already written in this exercise,
one inside the other. Which order?

## Hint 3 - Approach

`toJson`: return the result of converting the value to JSON, passing the filter
argument as null and the indentation as the number 2.

`parseOrNull`: put the parse inside a try block and return its result from
there. In the catch block, return null. The catch does not need the error
object, so the parentheses after `catch` can be left off entirely.

`deepCopy`: convert the value to JSON text, then parse that text straight back
into a value, and return it. Because the text has no memory of the original
objects, nothing is shared between the two.
