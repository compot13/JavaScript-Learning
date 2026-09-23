export function lastItem(items) {
  // On an empty array this reads index -1, which does not exist, so the
  // answer is undefined without a special case.
  return items[items.length - 1];
}

export function withoutFirst(items) {
  // slice copies, so the array passed in is left alone. Starting at 1 skips
  // the first item, and an empty array has nothing to skip.
  return items.slice(1);
}

export function countOf(items, value) {
  let count = 0;
  for (const item of items) {
    if (item === value) {
      count += 1;
    }
  }
  return count;
}
