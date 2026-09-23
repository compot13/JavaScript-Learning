export function countProperties(obj) {
  // Objects have no length of their own, so count the keys.
  return Object.keys(obj).length;
}

export function totalValues(obj) {
  // The keys do not matter here, only the numbers.
  return Object.values(obj).reduce((total, n) => total + n, 0);
}

export function describeAll(obj) {
  // entries gives [key, value] pairs; the inner brackets unpack each one.
  return Object.entries(obj).map(([key, value]) => `${key}: ${value}`);
}
