# LeetCode 125: Valid Palindrome

Run the tests for this problem with:

```
npm run test -- lc-125
```

Problem on LeetCode: <https://leetcode.com/problems/valid-palindrome/>

## The lesson

A phrase is a **palindrome** if it reads the same forwards and backwards, once
you ignore everything that is not a letter or a digit and treat uppercase and
lowercase as the same.

```
'A man, a plan, a canal: Panama'  -> true   ('amanaplanacanalpanama')
'race a car'                      -> false  ('raceacar')
' '                               -> true   ('')
```

The palindrome check is three lines. The work is in the cleaning.

### Cleaning the string

Two steps: lowercase it, and drop everything that is not a letter or a digit.

Lowercasing is `toLowerCase()` from lesson 2.

For the filtering, split the string into characters, keep the ones you want,
and join them back:

```js
const cleaned = text
  .toLowerCase()
  .split('')
  .filter((character) => isLetterOrDigit(character))
  .join('');
```

`split('')` turns a string into an array of single characters, `filter` from
lesson 10 keeps some of them, and `join('')` glues them back into a string.

### Deciding what to keep

Without regular expressions, compare each character against the ranges:

```js
function isLetterOrDigit(character) {
  return (
    (character >= 'a' && character <= 'z') ||
    (character >= '0' && character <= '9')
  );
}
```

Comparison operators work on strings, comparing them by character code, so
`'c' >= 'a' && 'c' <= 'z'` is `true` and `','` fails both ranges. The string is
already lowercase by this point, so uppercase letters do not need their own
range.

If you have met regular expressions elsewhere, `text.replace(/[^a-z0-9]/g, '')`
does the same job in one call. They are not part of this course, and the
version above is code you can read.

### Checking it reads the same both ways

Either compare the cleaned string against its reverse:

```js
const backwards = cleaned.split('').reverse().join('');
return cleaned === backwards;
```

Or use the two-index pattern from Reverse String, comparing from both ends
inwards and stopping at the first mismatch. That does half as much work and
allocates nothing, which is what an interviewer is looking for. Either passes
the tests here.

### The cases that catch people

- `' '` cleans to the empty string, and an empty string is a palindrome, so the
  answer is `true`.
- `'0P'` cleans to `'0p'`, which is not a palindrome. The digits matter and
  case-folding does not make `'0'` and `'P'` equal.
- Punctuation and spaces are ignored entirely, so `'a.'` cleans to `'a'`, which
  is `true`.

<details>
<summary>Common mistakes</summary>

**Comparing without cleaning.**

```js
'A man, a plan' === reversed; // false, because of spaces, commas and case
```

Clean first, then compare. Doing both in one expression is where the confusion
starts.

**Reversing a string directly.**

```js
'abc'.reverse();
// TypeError: "abc".reverse is not a function
```

`reverse` belongs to arrays. Split, reverse, join - or use two indexes.

**Forgetting digits count.**

`'0P'` must be `false`. Keeping only letters would clean it to `'p'`, a
one-character palindrome, and give the wrong answer.

</details>

## Check yourself

1. What does `'A man, a plan, a canal: Panama'` clean to?

<details><summary>Answer</summary>

`'amanaplanacanalpanama'` - lowercase, letters and digits only. The tempting
wrong answer keeps the spaces, which breaks the comparison immediately.

</details>

2. Is `' '` a palindrome by this problem's rules?

<details><summary>Answer</summary>

Yes. It cleans to the empty string, which reads the same in both directions.
The tempting wrong answer is `false`, from treating an empty result as invalid
input - the problem says otherwise.

</details>

3. Is `'0P'` a palindrome?

<details><summary>Answer</summary>

No. It cleans to `'0p'`, and reversed that is `'p0'`. The tempting wrong answer
is `true`, from dropping digits during the cleaning and being left with a
single letter.

</details>

4. What does `'abc'.split('')` give?

<details><summary>Answer</summary>

`['a', 'b', 'c']`. Splitting on an empty string separates every character. The
tempting wrong answer is `['abc']`, which is what splitting on a character that
does not appear gives you.

</details>

5. Why does `'abc'.reverse()` throw?

<details><summary>Answer</summary>

Because `reverse` is an array method and strings do not have it - strings are
immutable, so nothing can reverse one in place. The tempting wrong answer is
that the spelling is wrong; the fix is to convert to an array first.

</details>

6. What does `'c' >= 'a' && 'c' <= 'z'` evaluate to, and why?

<details><summary>Answer</summary>

`true`. Comparison operators work on strings by character code, and `c` sits
between `a` and `z`. The tempting wrong answer is that comparing strings with
`<` is invalid - it is allowed, and is what makes the range check work.

</details>

## Your task

Open `leetcode/0125-valid-palindrome/exercise.js` and write
`isPalindrome(text)`.

It returns `true` when the text reads the same forwards and backwards, ignoring
case and ignoring every character that is not a letter or a digit. Do not use
regular expressions.

```js
isPalindrome('A man, a plan, a canal: Panama') // true
isPalindrome('race a car')                     // false
isPalindrome(' ')                              // true
isPalindrome('0P')                             // false
```

When the tests pass, record it with `npm run learn -- check`.
