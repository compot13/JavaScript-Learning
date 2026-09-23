# LeetCode 104: Maximum Depth of Binary Tree

Run the tests for this problem with:

```
npm run test -- lc-104
```

Problem on LeetCode: <https://leetcode.com/problems/maximum-depth-of-binary-tree/>

## The lesson

Another new data structure, and the first problem in this track where a
function calls itself.

### What a binary tree is

A linked list node points at one other node. A **binary tree** node points at
up to two, called `left` and `right`:

```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
```

```
        3
       / \
      9  20
        /  \
       15   7
```

- The top node, `3`, is the **root**.
- `9`, `15` and `7` have no children; a node with no children is a **leaf**.
- A missing child is `null`.

`tree.js` in this folder has the class and a `fromArray` helper that builds a
tree from LeetCode's level-by-level array format. You do not need to change it.

### Depth

The **maximum depth** is the number of nodes on the longest path from the root
down to a leaf. The tree above has depth 3: `3 -> 20 -> 15`.

```
[3, 9, 20, null, null, 15, 7]  -> 3
[1, null, 2]                   -> 2
[]                             -> 0
```

### Why a function that calls itself

Here is the whole insight. The depth of a tree is:

**1, plus the depth of the deeper of its two subtrees.**

Look at the root `3`. Its left child `9` is a tree of depth 1. Its right child
`20` is a tree of depth 2. The deeper is 2, so the whole tree is 2 + 1 = 3.

That definition refers to itself, so the function does too:

```js
function maxDepth(root) {
  if (root === null) {
    return 0;
  }
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

A function calling itself is called **recursion**. Two parts are required:

1. A **base case** that returns without calling again. Here: an empty tree has
   depth 0.
2. A step that calls itself on something **smaller**, so the base case is
   always eventually reached. Here: each call works on a subtree, and subtrees
   run out.

Without the base case the calls never stop, and Node ends it with
`RangeError: Maximum call stack size exceeded`.

### Following the calls

```
maxDepth(3)
  maxDepth(9)
    maxDepth(null) -> 0
    maxDepth(null) -> 0
    1 + max(0, 0) = 1
  maxDepth(20)
    maxDepth(15)
      two nulls -> 1 + max(0, 0) = 1
    maxDepth(7)
      two nulls -> 1 + max(0, 0) = 1
    1 + max(1, 1) = 2
  1 + max(1, 2) = 3
```

Each call waits for its two children to answer before it can answer. Trust that
the inner calls return the right thing, rather than trying to hold the whole
tree in your head - that trust is the skill recursion asks for.

### Why recursion fits here and not before

Fibonacci and Climbing Stairs had recursive definitions too, and the recursion
was wasteful because the same sub-answers were recomputed. A tree has no such
overlap: every node is visited exactly once, because each node belongs to
exactly one subtree. Recursion is the right tool here, and it was the wrong one
there.

<details>
<summary>Common mistakes</summary>

**No base case.**

```js
return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
```

With no check for `null`, the calls never stop:
`RangeError: Maximum call stack size exceeded`.

**Forgetting the `1 +`.**

Every answer comes back as 0, because nothing ever counts the node you are
standing on.

**Adding the two depths instead of taking the larger.**

`maxDepth(left) + maxDepth(right)` counts both sides. The question asks for the
longest single path.

</details>

## Check yourself

1. What is the maximum depth of `[3, 9, 20, null, null, 15, 7]`?

<details><summary>Answer</summary>

`3`, along the path 3, 20, 15. The tempting wrong answer is 4, from counting
the edges between nodes rather than the nodes themselves - this problem counts
nodes.

</details>

2. What are the two parts every recursive function needs?

<details><summary>Answer</summary>

A base case that returns without calling again, and a step that calls itself on
a smaller input. The tempting wrong answer is only the second - without a base
case the calls never stop.

</details>

3. What is the base case here?

<details><summary>Answer</summary>

An empty tree, `root === null`, which has depth 0. The tempting wrong answer is
a leaf node, which does work but needs two extra checks for its children; `null`
is simpler and handles the empty tree for free.

</details>

4. Why `Math.max` rather than adding the two depths?

<details><summary>Answer</summary>

Because the depth is the longest single path down, not the total number of
nodes. Adding gives 3 for a tree of depth 2 with two children. The tempting
wrong answer is that adding counts every level once.

</details>

5. What error does a missing base case produce?

<details><summary>Answer</summary>

`RangeError: Maximum call stack size exceeded`, meaning the calls nested too
deeply. The tempting wrong answer is that it hangs - it fails quickly with a
specific message, which is a useful thing to recognise.

</details>

6. Why is recursion a good fit here when it was a bad fit for Fibonacci?

<details><summary>Answer</summary>

Because each node belongs to exactly one subtree, so nothing is computed twice;
Fibonacci's two calls overlap enormously. The tempting wrong answer is that
recursion is always slower - it is the repeated work that was slow, not the
technique.

</details>

## Your task

Open `leetcode/0104-maximum-depth-of-binary-tree/exercise.js` and write
`maxDepth(root)`.

It returns the number of nodes along the longest path from the root down to a
leaf. An empty tree has depth 0.

```js
// [3, 9, 20, null, null, 15, 7] -> 3
// [1, null, 2]                  -> 2
maxDepth(null) // 0
```

When the tests pass, record it with `npm run learn -- check`.
