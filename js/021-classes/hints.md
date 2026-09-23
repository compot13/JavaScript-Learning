## Hint 1 - Language

[`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes),
[`constructor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor),
[`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
and
[`static`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static).

## Hint 2 - Nudge

The tests read `rectangle.width` directly, so the constructor has to store the
values under those exact names.

`scale` has two tests: one checks the new rectangle's sides, another checks the
original is unchanged. What does a method have to return for both to pass at
once - and what must it avoid assigning to?

`square` is called as `Rectangle.square(4)`, with no instance anywhere. What
does that tell you about whether its body can use `this`?

## Hint 3 - Approach

The constructor takes the two measurements and assigns each one to a property
of the object being built, using the keyword for "this object".

`area` returns the product of the object's own two properties. `perimeter`
returns two times one property plus two times the other.

`scale` builds and returns a brand new rectangle, passing in each of this
object's sides multiplied by the factor. Assigning nothing to the current
object is what keeps the original intact.

`square` is declared with the keyword that attaches it to the class rather than
to an instance, and returns a new rectangle built with the same size for both
sides.
