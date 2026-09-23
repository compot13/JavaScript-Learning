## Hint 1 - Language

[`ListNode`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
comes from `list.js` in this folder - import it if you want a starting node.

A `while` loop with two conditions joined by `&&`, and the
[nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
operator `??` for attaching whichever list still has nodes.

## Hint 2 - Nudge

Both lists are sorted, so at every step there are only two candidates for the
next node. Which two?

Attaching the first node is awkward because there is nothing to attach it to
yet. Rather than writing a check for it, invent something to attach to. The
lesson calls it a dummy, and the thing you return afterwards is not the dummy.

The loop has to stop when either list empties. Whatever is left of the other
one does not need examining node by node - why not?

## Hint 3 - Approach

Create one new node to act as a starting point, and a tail marker pointing at
it. Take a marker into each of the two lists.

Loop while both markers are still on a node. Compare the values at the two
markers. Attach the smaller node to the tail's next, and move that list's
marker along to its own next. Then move the tail to the node you attached. Use
a comparison that takes from the first list when the two values are equal.

When the loop ends, attach whichever marker is still on a node - or null when
neither is - to the tail's next.

Return the node after your starting point, not the starting point itself.
