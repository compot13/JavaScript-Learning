## Hint 1 - Language

[Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions),
and in particular the concise body form: `(x) => x + 1`.

For `initialsOf`, the same tools as lesson 2:
[`indexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf),
square-bracket access and
[`toUpperCase`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase).

## Hint 2 - Nudge

The stubs come with braces and a `throw` inside. For the first two functions
the finished version has no braces at all. What happens to the word `return`
when the braces go?

For `nextId`: the test calls it four times and expects 1, 2, 3, 4. If the
counter were declared inside the function body, what would it be set back to at
the start of every call? The file already has a comment marking where it
belongs.

## Hint 3 - Approach

`double`: replace the whole braced body with a single expression that
multiplies the parameter by two, placed straight after the arrow.

`initialsOf`: the first initial is the character at position 0. The second is
the character one position after the space. Uppercase each of them and join the
two with the string concatenation operator, all as one expression after the
arrow.

`nextId`: declare a counter at the top of the file, outside every function,
starting at zero. Inside the function, keep the braces, add one to that
counter, and return it on the next line.
