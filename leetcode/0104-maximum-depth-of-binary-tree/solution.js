export function maxDepth(root) {
  // The base case: an empty tree has no nodes on any path.
  if (root === null) {
    return 0;
  }

  // 1 for this node, plus the deeper of the two sides.
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
