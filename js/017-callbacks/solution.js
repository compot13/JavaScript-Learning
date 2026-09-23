export function applyTwice(fn, value) {
  // The inner call runs first, and its result is what the outer call receives.
  return fn(fn(value));
}

export function transformAll(items, fn) {
  const result = [];
  for (const item of items) {
    // fn is a parameter holding a function, so calling it needs parentheses.
    result.push(fn(item));
  }
  return result;
}

export function countWhere(items, predicate) {
  let count = 0;
  for (const item of items) {
    if (predicate(item)) {
      count += 1;
    }
  }
  return count;
}
