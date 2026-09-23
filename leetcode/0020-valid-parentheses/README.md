# LeetCode 20: Valid Parentheses

Run the tests for this problem with:

```
npm run test -- lc-20
```

Problem on LeetCode: <https://leetcode.com/problems/valid-parentheses/>

## The lesson

A string contains only the characters `(`, `)`, `{`, `}`, `[` and `]`. It is
valid when every bracket is closed by the matching kind, in the right order.

```
'()'       -> true
'()[]{}'   -> true
'(]'       -> false
'([)]'     -> false
'{[]}'     -> true
```

`([)]` is the interesting one: every bracket has a partner of the right type,
and they are tangled. The `(` opened first, so it must close last.

### Counting does not work

Counting openers and closers gives `([)]` a clean bill of health, because there
is one of each. What matters is the **order**, and specifically this rule:

**The most recently opened bracket must be the first one closed.**

### A stack

A **stack** is a list where you only add and remove at one end - like a pile of
plates. The last thing put on is the first thing taken off, which is exactly the
rule above.

An array is a stack already: `push` adds to the end, `pop` removes from the end,
and the item at `length - 1` is the top.

```js
const stack = [];
stack.push('(');
stack.push('[');
console.log(stack[stack.length - 1]); // [
console.log(stack.pop());             // [
console.log(stack);                   // [ '(' ]
```

### The algorithm

Walk the string one character at a time:

- **An opener** - push it onto the stack.
- **A closer** - pop the top of the stack. If it is not the matching opener,
  the string is invalid. If the stack was empty, there is nothing to close, so
  it is also invalid.

At the end, the stack must be empty. Anything left is an opener that was never
closed.

```
'{[]}'

{  opener  -> stack: [ { ]
[  opener  -> stack: [ {, [ ]
]  closer  -> pop [ , matches ]      stack: [ { ]
}  closer  -> pop { , matches }      stack: []
end, stack empty -> true
```

```
'([)]'

(  opener -> stack: [ ( ]
[  opener -> stack: [ (, [ ]
)  closer -> pop [ , does not match ) -> false
```

### Matching pairs

A `Map` from each closer to the opener it needs:

```js
const pairs = new Map([
  [')', '('],
  [']', '['],
  ['}', '{'],
]);
```

Then `pairs.has(character)` tells you whether the character is a closer, and
`pairs.get(character)` tells you what should be on top of the stack.

### The three ways to fail

1. A closer that does not match the top: `'(]'`.
2. A closer with an empty stack: `')'`.
3. Anything still on the stack at the end: `'('`.

Miss any of the three and some invalid string is accepted. The tests check all
three.

<details>
<summary>Common mistakes</summary>

**Forgetting the final check.**

```js
return true; // after the loop, without looking at the stack
```

`'('` and `'([{'` are then accepted.

**Popping an empty stack.**

`[].pop()` returns `undefined`, which is not any opener, so the comparison is
`false` and the answer is right by accident. Make it deliberate, so the intent
is readable.

**Counting instead of stacking.**

Any solution that counts brackets accepts `'([)]'`.

</details>

## Check yourself

1. Why is `'([)]'` invalid?

<details><summary>Answer</summary>

Because the `(` was opened before the `[`, so it must close after it - the two
pairs overlap instead of nesting. The tempting wrong answer is that it is valid
since every bracket has a partner of the right kind; order is the rule.

</details>

2. What is a stack, in terms of arrays?

<details><summary>Answer</summary>

An array you only add to and remove from at the end, with `push` and `pop`, so
the last thing in is the first thing out. The tempting wrong answer is that a
stack needs a special class - an array is already one.

</details>

3. What do you do when you meet an opening bracket?

<details><summary>Answer</summary>

Push it onto the stack and move on. The tempting wrong answer is to look ahead
for its partner, which reintroduces the searching this approach avoids.

</details>

4. What has to be true at the end?

<details><summary>Answer</summary>

The stack must be empty. Anything remaining was opened and never closed. The
tempting wrong answer is that reaching the end without a mismatch is enough,
which accepts `'('`.

</details>

5. What should happen for a closing bracket when the stack is empty?

<details><summary>Answer</summary>

The string is invalid - there is nothing for it to close. The tempting wrong
answer is to ignore it, which accepts `')'`.

</details>

6. Why does counting brackets fail?

<details><summary>Answer</summary>

Because it ignores order, so `'([)]'` passes with one of each. The tempting
wrong answer is that counting per type is enough - it is not, as that example
shows.

</details>

## Your task

Open `leetcode/0020-valid-parentheses/exercise.js` and write `isValid(s)`.

It returns `true` when every bracket is closed by the matching kind in the
right order. The string contains only the six bracket characters.

```js
isValid('()')     // true
isValid('()[]{}') // true
isValid('(]')     // false
isValid('([)]')   // false
isValid('{[]}')   // true
isValid('')       // true
```

When the tests pass, record it with `npm run learn -- check`.
