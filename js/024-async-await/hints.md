## Hint 1 - Language

[`async` functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function),
[`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await),
[`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) and
[`Response.json`](https://developer.mozilla.org/en-US/docs/Web/API/Response/json).

`Promise.all` from lesson 23 and `try` / `catch` from lesson 19.

## Hint 2 - Nudge

`loadTitle` involves two promises, one after the other: the response, then the
parsed body. Between them is the check the lesson says `fetch` will not do for
you. The test expects the number from the response to appear in the message.

`loadAllTitles` has a test that fails when three 40ms requests take longer than
100ms in total. So the requests have to be started before any of them is waited
on. Which method turns an array of urls into an array of started requests, and
what waits for that whole array?

`loadTitleOr` has three failure tests: a bad status, a rejected fetch, and a
body that throws while parsing. Rather than handling each one, notice what all
three have in common by the time they reach you, once `await` is involved.

## Hint 3 - Approach

`loadTitle`: await the fetching function with the url and keep the response.
Check whether the response is not ok, and if so throw a new error built from a
template literal containing the words request failed with status followed by
the response's status. Otherwise await the response's json method, and return
the title property of what it gives you.

`loadAllTitles`: map the urls into calls to your first function, passing the
fetching function through, which starts them all. Then await the method that
waits for an array of promises, and return the array of titles.

`loadTitleOr`: put a call to your first function inside a try block, awaiting
it and returning the result from there. In the catch block, return the
fallback. Awaiting inside the try is what routes a rejection into the catch.
