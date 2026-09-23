## Hint 1 - Language

[`Math.max`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max)
from lesson 3.

The new idea is a function that calls itself - see
[recursion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#recursion).

Open `tree.js` in this folder to see what a node looks like.

## Hint 2 - Nudge

Say the depth of a tree in one sentence, using the word "depth" inside the
sentence. If you can do that, the function writes itself from the sentence.

Look at the example tree: the left child is a tree of its own, and so is the
right child. If you already knew both of their depths, what arithmetic gives
you the depth of the whole thing?

Then ask what the smallest possible tree is, and what its depth should be. That
case has to return without calling anything, or the calls never stop.

## Hint 3 - Approach

Start with the case that ends the recursion: when the node you were given is
null, return zero.

Otherwise, ask the same function for the depth of the left child and for the
depth of the right child. Take whichever of those two numbers is larger, add
one for the node you are standing on, and return that.

Do not try to follow the calls all the way down in your head. Assume the two
inner calls give correct answers for their own subtrees, and check that your
one line is right given that.
