## Hint 1 - Language

Nothing new: a
[`while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)
loop, and reading and writing object properties from lesson 12.

Open `list.js` in this folder to see exactly what a node looks like.

## Hint 2 - Nudge

Draw three nodes on paper with arrows between them. Now rub out the first arrow
and draw it the other way. What can you no longer reach, and what would you
have needed to write down before rubbing it out?

You need markers for three things as you walk: where you came from, where you
are, and where you were about to go. Two of those are variables that persist
across passes; one only has to survive a single pass.

When the loop ends, check which of your variables is standing on the node that
should be returned. It is not the one the loop condition is watching.

## Hint 3 - Approach

Declare a variable for the previous node, starting at null, and one for the
current node, starting at the head.

Loop while the current node is not null. Inside, first save the current node's
next node in a local variable. Then point the current node's next at the
previous node. Then move the previous marker to the current node, and move the
current marker to the node you saved.

When the loop ends, return the previous marker. It is standing on the new head.
