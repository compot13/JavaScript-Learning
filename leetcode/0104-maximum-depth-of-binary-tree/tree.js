// This file is provided. Do not change it.
// It builds binary trees so the tests can check your work.

/** One node of a binary tree: a value, and up to two children. */
export class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Build a tree from the level-by-level array format LeetCode uses, where null
 * marks a missing child.
 * fromArray([3, 9, 20, null, null, 15, 7]) gives
 *
 *        3
 *       / \
 *      9  20
 *        /  \
 *       15   7
 */
export function fromArray(values) {
  if (values.length === 0 || values[0] === null) return null;

  const root = new TreeNode(values[0]);
  const queue = [root];
  let i = 1;

  while (i < values.length) {
    const node = queue.shift();

    if (i < values.length) {
      const value = values[i];
      i += 1;
      if (value !== null && value !== undefined) {
        node.left = new TreeNode(value);
        queue.push(node.left);
      }
    }

    if (i < values.length) {
      const value = values[i];
      i += 1;
      if (value !== null && value !== undefined) {
        node.right = new TreeNode(value);
        queue.push(node.right);
      }
    }
  }

  return root;
}
