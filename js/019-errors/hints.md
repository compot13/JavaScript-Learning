## Hint 1 - Language

[`throw`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw),
[`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error),
[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError),
[`RangeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError)
and
[`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch).

`typeof` from lesson 1 tells you whether a value is a number.

## Hint 2 - Nudge

The tests check the exact message text, so copy the messages from the task
rather than writing your own wording.

`checkAge('30')` has to raise the type complaint, not the range one. If the
range check ran first, what would comparing a string against zero tell you?
That settles the order of the two checks.

`attempt` has a test where the function returns `0` and expects `0` back rather
than the fallback. So the decision cannot be based on whether the result looks
empty. What else distinguishes the two cases?

## Hint 3 - Approach

`divide`: check whether the second argument is strictly equal to zero and, if
so, throw a new error built with the exact message from the task. Otherwise
return the division.

`checkAge`: first check the type of the argument, and throw a new type error
with its message when it is not a number. Then check whether it is below zero,
and throw a new range error with its message. If neither fires, return the age.

`attempt`: wrap the call to the function in a try block and return its result
from inside that block. In the catch block, return the fallback. The only thing
that sends you to the catch block is a thrown error, which is exactly the
distinction the tests are checking.
