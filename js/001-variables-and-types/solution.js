export function typeOf(value) {
  // typeof hands back the type name already as a string, so return it directly.
  return typeof value;
}

export function describeVariable(name, value) {
  // Both pieces are text by the time they meet, so + sticks them together.
  return name + ': ' + typeof value;
}

export function initialValue() {
  // Declared, never assigned: the variable holds undefined.
  let value;
  return value;
}
