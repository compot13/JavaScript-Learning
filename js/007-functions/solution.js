// The default sits in the parameter list, so a caller can leave it off.
export function applyDiscount(price, percentOff = 10) {
  return price - (price * percentOff) / 100;
}

export function wrapInTag(text, tag = 'p') {
  return `<${tag}>${text}</${tag}>`;
}

export function safeDivide(a, b) {
  // Guard clause: deal with the impossible case and leave.
  if (b === 0) {
    return 'cannot divide by zero';
  }
  return a / b;
}
