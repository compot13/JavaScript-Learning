import { ListNode } from './list.js';

export function mergeTwoLists(list1, list2) {
  // Something to attach the first node to, so there is no special first case.
  const dummy = new ListNode(0);
  let tail = dummy;
  let a = list1;
  let b = list2;

  while (a !== null && b !== null) {
    // <= keeps equal values in their original order.
    if (a.val <= b.val) {
      tail.next = a;
      a = a.next;
    } else {
      tail.next = b;
      b = b.next;
    }
    tail = tail.next;
  }

  // Whatever is left is already sorted, so it attaches in one step.
  tail.next = a ?? b;

  return dummy.next;
}
