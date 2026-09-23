## Hint 1 - Language

[Object literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
for `makeBook`, a template literal for `bookLabel`, and for `cityOf`:
[optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
`?.` with
[nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
`??`.

## Hint 2 - Nudge

`makeBook` is one `return` of an object written out in braces. Two of the three
values come from the parameters and one is the same every time.

For `cityOf`, there are two separate problems. One is reaching through an
address that might not exist without throwing. The other is turning the
`undefined` you get in that case into a word. Which operator solves which?

One test passes a city that is an empty string and expects an empty string
back. That rules out one of the two fallback operators. Check which.

## Hint 3 - Approach

`makeBook`: return an object literal with three properties - the title from the
first parameter, the author from the second, and a read property set to false.

`bookLabel`: return a template literal containing the book's title, a space,
the word by, a space, and the book's author.

`cityOf`: read the city through the address using the operator that stops
safely when a step is missing, then supply the fallback word with the operator
that only replaces null and undefined. One line.
