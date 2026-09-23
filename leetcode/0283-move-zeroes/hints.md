## Hint 1 - Language

Nothing new: a counting `for` loop, an `if`, and assigning to a position with
square brackets, as in lesson 9.

Two loops, one after the other, is a perfectly good answer.

## Hint 2 - Nudge

Track two positions with two variables. One visits every item. The other marks
where the next number that is staying should go.

Write out `[0, 1, 0, 3, 12]` on paper and step through it, noting both
positions after each item. Watch what happens to the gap between them each time
you meet a zero.

When the first pass finishes, compare where the write position ended up with
the length of the array. What does the gap tell you about what still needs
doing?

## Hint 3 - Approach

Declare a write position starting at zero, above the loop.

Walk every position of the array. When the number there is not zero, copy it to
the write position and move the write position on by one. When it is zero, do
nothing at all.

After that loop, run a second loop from the write position to the end of the
array, setting each of those positions to zero.

Return nothing. The array itself is the answer.
