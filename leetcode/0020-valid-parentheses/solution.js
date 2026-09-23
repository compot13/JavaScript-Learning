// Each closing bracket and the opener it must match.
const PAIRS = new Map([
  [')', '('],
  [']', '['],
  ['}', '{'],
]);

export function isValid(s) {
  const stack = [];

  for (const character of s) {
    if (PAIRS.has(character)) {
      // A closer: the top of the stack has to be its partner.
      if (stack.pop() !== PAIRS.get(character)) {
        return false;
      }
    } else {
      stack.push(character);
    }
  }

  // Anything left was opened and never closed.
  return stack.length === 0;
}
