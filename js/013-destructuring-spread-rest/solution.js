// The pattern in the parameter list unpacks the object on arrival.
export function fullName({ first, last }) {
  return `${first} ${last}`;
}

export function withDefaults(settings) {
  // Defaults first, so anything in settings overwrites them. Both are spread
  // into a brand new object, leaving the argument alone.
  return { colour: 'red', size: 'M', ...settings };
}

// A rest parameter collects every argument into an ordinary array.
export function sumAll(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
