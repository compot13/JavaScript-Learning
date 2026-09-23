## Hint 1 - Language

[`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import),
[`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
and
[`export ... from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#re-exporting_aggregating)
for the re-export.

`reduce` from lesson 11 adds up the areas.

## Hint 2 - Nudge

Open `geometry.js` and look at which of its four exports has the word `default`
in front of it. That one is imported without braces; the others need them. All
of them can come from a single import statement.

For `PI`, the task says to re-export rather than import and write it out again.
There is a form of `export` that names a file, and it is one line.

Check the order of the arguments the default export takes before you call it -
the expected output tells you which piece goes first.

## Hint 3 - Approach

At the top of the file, write one import from the geometry file that brings in
the default export under a name of your choosing, plus the two area functions
by their exact names.

On another line, re-export PI from the geometry file using the form of export
that takes a path.

`totalCircleArea`: reduce over the radii, starting from zero, adding the result
of calling the circle area function with each radius.

`describeSquare`: call the square area function with the side, then pass the
word square and that area to the default export, and return what it gives you.
