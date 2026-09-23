export function lengthOfLastWord(s) {
  // Trimming first means the final entry cannot be an empty string.
  const words = s.trim().split(' ');
  const last = words[words.length - 1];
  return last.length;
}
