## Hint 1 - Language

[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
with `get` and `set`, the `?? 0` counting pattern from lesson 15, and
destructuring a `[key, value]` pair if you loop over the map afterwards.

## Hint 2 - Nudge

Two jobs: work out how often each value appears, and find which value has the
highest count. You can do them in two passes or in one.

If you do it in one pass, you need one more variable beyond the map. What are
you comparing against each time a count goes up - the value, or the number?

One test has the majority value appearing only from the second position
onwards, which catches an answer that assumes the first item wins.

## Hint 3 - Approach

Create an empty map, a variable for the best value so far starting at the first
number, and a variable for its count starting at zero.

Walk the numbers. For each one, work out its new count by reading the current
count, treating a missing key as zero, and adding one. Store that back in the
map.

Then compare the new count against the best count so far. If it is larger,
record both the new count and the value that produced it.

After the loop, return the value - not the count.
