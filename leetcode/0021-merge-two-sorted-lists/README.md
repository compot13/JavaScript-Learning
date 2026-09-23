# LeetCode 21: Merge Two Sorted Lists

Run the tests for this problem with:

```
npm run test -- lc-21
```

Problem on LeetCode: <https://leetcode.com/problems/merge-two-sorted-lists/>

## The lesson

Two sorted linked lists. Join them into one sorted list, built from the nodes
you were given, and return its head.

```
list1: 1 -> 2 -> 4
list2: 1 -> 3 -> 4
out:   1 -> 1 -> 2 -> 3 -> 4 -> 4
```

If linked lists are new, read the lesson for Reverse Linked List first; this
one assumes you have met nodes, `next`, and walking until `null`. `list.js` in
this folder has the `ListNode` class and the helpers the tests use.

### Take the smaller head, repeatedly

Both lists are sorted, so the smallest value overall is at the front of one of
them. Compare the two heads, take the smaller, and move that list's marker
along. Repeat until one list runs out, then attach whatever is left of the
other - it is already sorted, so no more work is needed.

```
a: 1 -> 2 -> 4      b: 1 -> 3 -> 4

1 vs 1 -> take a's 1        out: 1
2 vs 1 -> take b's 1        out: 1 -> 1
2 vs 3 -> take a's 2        out: 1 -> 1 -> 2
4 vs 3 -> take b's 3        out: 1 -> 1 -> 2 -> 3
4 vs 4 -> take a's 4        out: 1 -> 1 -> 2 -> 3 -> 4
a is empty -> attach the rest of b (4)
out: 1 -> 1 -> 2 -> 3 -> 4 -> 4
```

### Building a list as you go

Keep a `tail` marker on the last node of the result and attach each new node to
`tail.next`, then move `tail` along:

```js
tail.next = a;
tail = a;
```

The awkward part is the very first node: there is no `tail` yet, so every
attachment needs a "is this the first one?" check.

### The dummy node trick

Start with a throwaway node whose only job is to be something to attach to:

```js
const dummy = new ListNode(0);
let tail = dummy;
```

Now `tail.next = ...` always works, including for the first real node. At the
end, the answer is `dummy.next` - everything after the throwaway.

This removes the special case entirely, and it is a standard move worth
recognising whenever you build a linked list.

### The shape

```js
const dummy = new ListNode(0);
let tail = dummy;
let a = list1;
let b = list2;

while (a !== null && b !== null) {
  if (a.val <= b.val) {
    tail.next = a;
    a = a.next;
  } else {
    tail.next = b;
    b = b.next;
  }
  tail = tail.next;
}

tail.next = a ?? b;   // whichever still has nodes, or null if neither
return dummy.next;
```

The loop stops as soon as either list is exhausted. One line then attaches the
remainder in one go - no loop needed, because the rest of a sorted list is
already in order.

`a <= b` rather than `a < b` keeps equal values in their original order, which
is the stable behaviour you met in sorting.

### Reusing nodes

No `new ListNode` per value: the result is made of the original nodes, with
their `next` fields rewritten. That is why only one dummy node is created.

<details>
<summary>Common mistakes</summary>

**Returning the dummy.**

The dummy holds a placeholder value at the front. Return `dummy.next`.

**Forgetting the leftovers.**

Stopping when one list empties, without attaching the rest of the other, drops
every remaining node.

**Comparing nodes instead of values.**

```js
if (a <= b)
```

That compares two objects, not their numbers. Compare `a.val` against `b.val`.

</details>

## Check yourself

1. Where is the smallest remaining value at any point?

<details><summary>Answer</summary>

At the head of one of the two lists, because both are sorted. The tempting
wrong answer is that you have to search for it - the sorting is what makes this
one comparison.

</details>

2. What is the dummy node for?

<details><summary>Answer</summary>

To give you something to attach the first real node to, so the first
attachment needs no special case. The tempting wrong answer is that it is part
of the result - it is thrown away by returning `dummy.next`.

</details>

3. What do you return?

<details><summary>Answer</summary>

`dummy.next`, the first real node. The tempting wrong answer is `dummy`, which
puts a placeholder value at the front of the answer.

</details>

4. What happens when one list runs out first?

<details><summary>Answer</summary>

Attach the whole of the other list to the tail in one step: it is already
sorted and every value is at least as large as everything placed so far. The
tempting wrong answer is to keep looping node by node, which does the same job
with more code.

</details>

5. Why `a.val <= b.val` rather than `a.val < b.val`?

<details><summary>Answer</summary>

So that equal values keep the order they came in, taking from the first list
first. The tempting wrong answer is that it makes no difference - the result is
sorted either way, and stability is the better default.

</details>

6. How many new nodes does the answer create?

<details><summary>Answer</summary>

One: the dummy. Everything else is the original nodes with rewritten `next`
fields. The tempting wrong answer is one per value, which works and allocates a
whole second list.

</details>

## Your task

Open `leetcode/0021-merge-two-sorted-lists/exercise.js` and write
`mergeTwoLists(list1, list2)`.

It returns the head of one sorted list containing all the nodes of both. Reuse
the nodes you are given; create at most one new node.

```js
// 1 -> 2 -> 4  and  1 -> 3 -> 4   give   1 -> 1 -> 2 -> 3 -> 4 -> 4
mergeTwoLists(null, null) // null
```

When the tests pass, record it with `npm run learn -- check`.
