export function divide(a, b) {
  // Refuse the impossible request rather than returning Infinity quietly.
  if (b === 0) {
    throw new Error('cannot divide by zero');
  }
  return a / b;
}

export function checkAge(age) {
  // The type check comes first: a negative check on a string would be
  // meaningless.
  if (typeof age !== 'number') {
    throw new TypeError('age must be a number');
  }
  if (age < 0) {
    throw new RangeError('age must be 0 or more');
  }
  return age;
}

export function attempt(fn, fallback) {
  try {
    return fn();
  } catch {
    // The error itself is not needed here, so catch takes no parameter.
    return fallback;
  }
}
