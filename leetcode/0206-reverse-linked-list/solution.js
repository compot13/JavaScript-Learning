export function reverseList(head) {
  // The old head becomes the new tail, so it must end up pointing at null.
  let previous = null;
  let current = head;

  while (current !== null) {
    // Save the way forward before the link is turned around.
    const nextNode = current.next;
    current.next = previous;
    previous = current;
    current = nextNode;
  }

  // current is null here; previous is the last node turned around.
  return previous;
}
