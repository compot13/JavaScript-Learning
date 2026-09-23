## Hint 1 - Language

[`push`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
and
[`pop`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
from lesson 9 - together they turn an array into a stack.

A [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
from each closing bracket to the opener it matches.

## Hint 2 - Nudge

Every character is either an opener or a closer, and the two cases do opposite
things to the stack. A map keyed by the closing brackets lets you tell which is
which with one question.

There are three separate ways a string can be invalid. Two happen inside the
loop; one can only be detected after it. List them before you write the code -
three of the tests exist for exactly those three.

What does popping an empty array give you, and does comparing that against an
opener give the answer you want?

## Hint 3 - Approach

Create a map from each of the three closing brackets to its matching opener,
outside the function. Inside, create an empty array to use as the stack.

Walk the string one character at a time. If the map has that character as a
key, it is a closer: take the top item off the stack and compare it against the
opener the map gives you, returning false if they differ. Otherwise it is an
opener, so push it onto the stack.

After the loop, return whether the stack has nothing left in it.
