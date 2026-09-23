export function longestCommonPrefix(strs) {
  // Start by guessing the whole of the first word.
  let prefix = strs[0];

  for (const word of strs) {
    // One word can force several characters off, so keep cutting until it agrees.
    while (!word.startsWith(prefix)) {
      // slice(0, -1) drops the last character.
      prefix = prefix.slice(0, -1);
    }
  }

  // Every string starts with '', so the loop always ends.
  return prefix;
}
