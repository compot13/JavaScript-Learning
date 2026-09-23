# LeetCode 206: Reverse Linked List

Run the tests for this problem with:

```
npm run test -- lc-206
```

Problem on LeetCode: <https://leetcode.com/problems/reverse-linked-list/>

## The lesson

This problem needs a data structure you have not met. Read this part carefully;
the problem itself is short.

### What a linked list is

An array keeps its items in one block, numbered by position. A **linked list**
keeps each value in its own small object, and each object holds a pointer to the
next one.

```js
const third = { val: 3, next: null };
const second = { val: 2, next: third };
const first = { val: 1, next: second };
```

Drawn out:

```
first          second         third
{val: 1} ---> {val: 2} ---> {val: 3} ---> null
```

Each object is a **node**. The first is the **head**. The last node's `next` is
`null`, which is how you know the chain has ended.

A class makes them easier to build, and this is the definition LeetCode uses:

```js
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}
```

`list.js` in this folder has it, along with `fromArray` and `toArray` for the
tests. You do not need to change that file.

### Walking one

```js
let node = head;
while (node !== null) {
  console.log(node.val);
  node = node.next;
}
```

`node = node.next` is the "move along one" step. This is the loop shape for
every linked list problem: start at the head, walk until `null`.

There is no `length`, and no way to jump to the fifth item without walking past
the first four. In exchange, inserting in the middle means repointing two
`next` fields, with nothing to shift along.

### The problem

Reverse the list and return the new head.

```
in:  1 -> 2 -> 3 -> null
out: 3 -> 2 -> 1 -> null
```

### Turning each link around

Walk the list, and as you pass each node, point its `next` at the node before
it rather than the one after.

The trap: the moment you overwrite `node.next`, you have lost your way to the
rest of the list. So save it first.

Three variables:

- `previous` - the node behind you, starting at `null` (the old head becomes
  the new tail, and its `next` must be `null`)
- `current` - the node you are on, starting at the head
- `nextNode` - a temporary hold on the rest of the list

```
1 -> 2 -> 3 -> null

previous = null, current = 1
  save next (2), point 1 at null, move on
  null <- 1     previous = 1, current = 2

  save next (3), point 2 at 1, move on
  null <- 1 <- 2   previous = 2, current = 3

  save next (null), point 3 at 2, move on
  null <- 1 <- 2 <- 3   previous = 3, current = null

current is null, so stop. previous is the new head: 3.
```

In code:

```js
let previous = null;
let current = head;

while (current !== null) {
  const nextNode = current.next;  // save the way forward
  current.next = previous;        // turn this link around
  previous = current;             // step both markers along
  current = nextNode;
}

return previous;
```

Return `previous`, not `current`: when the loop ends, `current` is `null` and
`previous` is the last node you turned around, which is the new head.

An empty list is `head === null`, so the loop never runs and `previous` is still
`null` - the correct answer with no special case.

<details>
<summary>Common mistakes</summary>

**Overwriting `next` before saving it.**

```js
current.next = previous;
current = current.next; // this is now previous: you have gone backwards
```

Save the next node in a variable first.

**Returning `current` or `head`.**

`current` is `null` at the end, and `head` is now the last node. The new head is
`previous`.

**Starting `previous` at the head.**

It starts at `null`, because the old head becomes the new tail and has to point
at `null`.

</details>

## Check yourself

1. How do you know a linked list has ended?

<details><summary>Answer</summary>

The last node's `next` is `null`. The tempting wrong answer is a length
property - there is none, which is why every traversal is a loop until `null`.

</details>

2. What does `node = node.next` do?

<details><summary>Answer</summary>

Moves your marker one node along the chain. The tempting wrong answer is that
it changes the list - it only moves a local variable; nothing in the list is
touched.

</details>

3. Why save `current.next` before changing it?

<details><summary>Answer</summary>

Because overwriting it destroys the only route to the rest of the list. The
tempting wrong answer is that you can read it back afterwards - after the
assignment it points backwards.

</details>

4. What does `previous` start as, and why?

<details><summary>Answer</summary>

`null`, because the current head becomes the new tail and a tail's `next` must
be `null`. The tempting wrong answer is the head itself, which makes the first
node point at itself and produces a loop.

</details>

5. What do you return at the end?

<details><summary>Answer</summary>

`previous`. When the loop stops, `current` is `null` and `previous` is the last
node processed, which is the new head. The tempting wrong answer is `head`,
which is now the final node of the reversed list.

</details>

6. What happens for an empty list?

<details><summary>Answer</summary>

`head` is `null`, so the loop never runs and `previous` is returned as `null` -
correct without a special case. The tempting wrong answer is that it needs its
own check.

</details>

## Your task

Open `leetcode/0206-reverse-linked-list/exercise.js` and write
`reverseList(head)`.

It reverses the list by repointing each node's `next`, and returns the new
head. Do not build a new list and do not collect the values into an array.

```js
// 1 -> 2 -> 3 -> null  becomes  3 -> 2 -> 1 -> null
reverseList(null) // null
```

When the tests pass, record it with `npm run learn -- check`.
