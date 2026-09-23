## Hint 1 - Language

[`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys),
[`Object.values`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
and
[`Object.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries).

All three hand you an array, so `map` from lesson 10 and `reduce` from lesson
11 work on the result.

## Hint 2 - Nudge

Each of the three functions needs a different one of the three `Object`
functions. Decide which by asking what the answer depends on: only the names,
only the values, or both.

`countProperties({})` returning 0 and `totalValues({})` returning 0 both come
out for free once you pick the right tool - neither needs an `if`.

For `describeAll`, each item you are given is a two-item array. What did the
lesson use to name both halves inside a callback?

## Hint 3 - Approach

`countProperties`: get the object's keys as an array and return the length of
that array.

`totalValues`: get the object's values as an array and reduce it to a total,
starting from zero.

`describeAll`: get the object's entries as an array of pairs, then map over
them. In the callback, unpack each pair into a key and a value with a pattern
in square brackets, and return a template literal with the key, a colon, a
space and the value.
