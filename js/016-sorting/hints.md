## Hint 1 - Language

[`sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
and the comparator function it takes.

[Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
from lesson 13 makes the copy you sort.

## Hint 2 - Nudge

Every one of these has a test checking the array passed in is unchanged
afterwards. `sort` rearranges in place, so something has to happen before the
sort, not after it.

The comparator has to return a number. For two words, what number can you
subtract from what to say which is shorter? For two people, which property
stands in for the item itself?

## Hint 3 - Approach

All three have the same shape: make a copy of the array, sort the copy with a
comparator, and return it.

`sortedNumbers`: the comparator takes two numbers and subtracts the second from
the first for ascending order.

`sortedByLength`: the comparator takes two words and subtracts the length of
the second from the length of the first. Equal lengths give zero, and sorting
is stable, so the tie case needs nothing extra.

`sortedByAge`: the comparator takes two people and subtracts the second
person's age from the first person's age.
