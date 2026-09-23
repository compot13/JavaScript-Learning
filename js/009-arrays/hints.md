## Hint 1 - Language

[`length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
and square-bracket indexing for `lastItem`.

[`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
for `withoutFirst` - read its page carefully and compare it against
[`splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice),
which is the one you do not want here.

[`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
and `===` for `countOf`.

## Hint 2 - Nudge

`lastItem([])` must return `undefined`. If you work out the last index of an
empty array, what number do you get, and what does reading that index give you?
You may not need an `if` at all.

`withoutFirst` has a test that checks the array you were given still has all
three items afterwards. Two array methods can remove the first item. Only one
of them leaves the original alone.

`countOf([1, 2, 3], '1')` must return 0. Which comparison operator refuses to
match a string against a number?

## Hint 3 - Approach

`lastItem`: read the item at the position one before the length, and return it.
On an empty array that position does not exist, and reading a position that
does not exist gives you exactly the answer the test wants.

`withoutFirst`: return a copy of the array that starts at position 1 and runs
to the end. The copying method takes a starting position on its own, with no
second argument needed. An empty array copied from position 1 is still empty.

`countOf`: declare a count of zero above a loop. Walk through every item, and
when an item is strictly equal to the value you were given, add one. Return the
count after the loop.
