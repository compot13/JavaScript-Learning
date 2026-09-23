## Hint 1 - Language

For `greet`, you need a
[template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals):
backticks, with `${}` around the part that changes.

For `initials`, look at
[`indexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf),
square-bracket access by position, and
[`toUpperCase`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase).

For `titleCase`, look at
[`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice),
[`toUpperCase`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)
and
[`toLowerCase`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase).

## Hint 2 - Nudge

For `initials`: the first initial is always at position 0. The second one is at
a position you have to work out. If the space sits at position 3, which
position holds the first letter of the second word?

For `titleCase`: `word[0]` on an empty string gives you `undefined`, and
`undefined` has no `toUpperCase` method. What else in the lesson gets you the
first character and returns an empty string instead of `undefined` when there
is no first character?

## Hint 3 - Approach

`greet`: return one template literal containing the word Hello, a comma, a
space, the name, and an exclamation mark.

`initials`: find the position of the space. The second word starts one position
after it. Take the character at position 0 and the character at that position,
put a dot between them, and uppercase the whole result at the end.

`titleCase`: build the answer from two pieces. The first piece is the first
character, uppercased, taken in the way that survives an empty string. The
second piece is everything from the second character onwards, lowercased. Join
the two pieces and return them. An empty string makes both pieces empty, which
gives you the empty string back with no extra work.
