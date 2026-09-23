// This file is provided. Do not change it.
// It builds and inspects linked lists so the tests can check your work.

/** One link in a chain: a value, and a pointer to the next node or null. */
export class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

/** Build a linked list from an array. fromArray([1, 2]) gives 1 -> 2 -> null */
export function fromArray(values) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) {
    head = new ListNode(values[i], head);
  }
  return head;
}

/** Read a linked list back into an array, for comparing in tests. */
export function toArray(head) {
  const values = [];
  let node = head;
  while (node !== null) {
    values.push(node.val);
    node = node.next;
  }
  return values;
}
