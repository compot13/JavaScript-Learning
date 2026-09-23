export function makeMultiplier(factor) {
  // The returned function keeps using factor after makeMultiplier has finished.
  return (n) => n * factor;
}

export function makeCounter() {
  // Declared inside the factory, so each call to makeCounter gets its own.
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
}

export function once(fn) {
  // Two private variables, shared by every call to the returned function.
  let called = false;
  let result;

  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}
