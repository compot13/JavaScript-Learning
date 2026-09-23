## Hint 1 - Language

Nothing new: a
[`while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)
loop, reading a character with square brackets, and `===`.

Two counters, one for each string.

## Hint 2 - Nudge

The two indexes do not move at the same rate. One of them advances on every
pass; the other only advances when something happens. Which is which?

Step through `s = 'aa'` and `t = 'ababa'` on paper, writing both indexes after
each character of `t`. Then do `s = 'aaa'`, `t = 'aa'` and see what stops the
loop.

At the end, one of the two indexes tells you the answer. Decide which before
writing the return line - and note that the empty string cases need no special
handling if you pick the right one.

## Hint 3 - Approach

Declare two indexes at zero, one for each string.

Loop while both indexes are still inside their strings. Inside, compare the
character of the first string at its index against the character of the second
string at its index. When they match, move the first index on by one. Move the
second index on by one every pass, whether or not there was a match.

After the loop, return whether the first index has reached the length of the
first string.
