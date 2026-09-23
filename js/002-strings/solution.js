export function greet(name) {
  return `Hello, ${name}!`;
}

export function initials(fullName) {
  // The space tells us where the second word begins.
  const spaceAt = fullName.indexOf(' ');
  const first = fullName[0];
  const second = fullName[spaceAt + 1];
  // Uppercase once at the end rather than twice on the way in.
  return `${first}.${second}`.toUpperCase();
}

export function titleCase(word) {
  // slice(0, 1) rather than word[0]: on an empty string it returns '' instead
  // of undefined, so the empty case needs no special handling.
  const firstLetter = word.slice(0, 1).toUpperCase();
  const rest = word.slice(1).toLowerCase();
  return firstLetter + rest;
}
