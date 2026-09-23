## Hint 1 - Language

[`trim`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim),
[`split`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
and `length`, all from lesson 2, plus reading the last item of an array from
lesson 9.

## Hint 2 - Nudge

Try `'Hello World '.split(' ')` in the playground and look at the last item.
Then try it with something applied to the string first. That comparison is the
whole problem.

One of the tests passes `'a    bcd'`, with four spaces in the middle. Work out
what `split` gives you there, and check whether any of the empty entries can
end up last.

Then be careful with the final step: the number you want is a property of the
last word, not of the array of words.

## Hint 3 - Approach

Take the string and remove the spaces from both ends. Split what is left on a
single space, which gives you an array of words.

Read the last item of that array, using the position one before the array's
length.

Return the length of that word.
