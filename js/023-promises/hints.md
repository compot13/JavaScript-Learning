## Hint 1 - Language

[`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise),
[`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout),
[`then`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
and
[`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).

`reduce` from lesson 11 adds the numbers up once you have them.

## Hint 2 - Nudge

Each function has a test checking it returns a promise. That rules out doing
the work and returning a plain value.

`delay` does not care what it fulfils with, but `doubleLater` does. Look at the
two `setTimeout` forms in the lesson: one hands `resolve` over to be called
later, the other calls it yourself with a value. Which do you need for each?

`sumOfPromises` is two steps. First turn an array of promises into a promise of
an array. Then, once that array exists, add its numbers up - and that second
step has to happen somewhere that the numbers are actually available.

## Hint 3 - Approach

`delay`: return a new promise whose function takes resolve and calls setTimeout
with resolve and the number of milliseconds.

`doubleLater`: return a new promise whose function takes resolve and calls
setTimeout with an arrow function that calls resolve with the doubled number,
and the number of milliseconds.

`sumOfPromises`: pass the array to the method that waits for all of them, then
chain a step onto it. Inside that step you are handed an ordinary array of
numbers, so reduce it to a total starting from zero and return that. Because
the total is returned from inside the chain, the whole expression is still a
promise.
