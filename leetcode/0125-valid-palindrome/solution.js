/** Letters and digits only. The text is lowercase by the time this is called. */
function isLetterOrDigit(character) {
  // Comparison operators compare strings by character code.
  return (
    (character >= 'a' && character <= 'z') || (character >= '0' && character <= '9')
  );
}

export function isPalindrome(text) {
  const cleaned = text.toLowerCase().split('').filter(isLetterOrDigit).join('');

  // Compare from both ends inwards, stopping at the first mismatch.
  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left += 1;
    right -= 1;
  }

  return true;
}
