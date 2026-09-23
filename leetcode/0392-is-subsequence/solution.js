export function isSubsequence(s, t) {
  let sIndex = 0;
  let tIndex = 0;

  // Stops as soon as either string runs out.
  while (sIndex < s.length && tIndex < t.length) {
    if (s[sIndex] === t[tIndex]) {
      // This character of s is accounted for; start waiting for the next one.
      sIndex += 1;
    }
    // t always moves on, match or no match.
    tIndex += 1;
  }

  // Every character of s was found in order exactly when the index got to the end.
  return sIndex === s.length;
}
