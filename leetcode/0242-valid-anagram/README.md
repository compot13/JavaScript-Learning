# LeetCode 242: Valid Anagram

Run the tests for this problem with:

```
npm run test -- lc-242
```

Problem on LeetCode: <https://leetcode.com/problems/valid-anagram/>

## The lesson

Two strings are **anagrams** when one is a rearrangement of the other: the same
letters, the same number of each, in any order.

```
s = 'anagram', t = 'nagaram'  -> true
s = 'rat',     t = 'car'      -> false
s = 'a',       t = 'ab'       -> false
```

### The quick check

Different lengths means not an anagram, and that test costs nothing:

```js
if (s.length !== t.length) return false;
```

Do it first. It removes a whole class of input before any counting starts.

### Counting letters

Two words are anagrams when each letter appears the same number of times in
both. So count the letters of the first word, then spend those counts on the
second.

Count with a `Map`, using the pattern from lesson 15:

```js
const counts = new Map();
for (const letter of s) {
  counts.set(letter, (counts.get(letter) ?? 0) + 1);
}
```

For `'anagram'`: `a` 3, `n` 1, `g` 1, `r` 1, `m` 1.

Then walk the second word, taking one off each count:

```js
for (const letter of t) {
  const remaining = counts.get(letter) ?? 0;
  if (remaining === 0) {
    return false;
  }
  counts.set(letter, remaining - 1);
}
return true;
```

A letter that is not in the map at all, or whose count has already run out,
means the second word has a letter the first cannot supply. Because the lengths
are equal and every letter of `t` was paid for, nothing can be left over, so
reaching the end means `true`.

```
'nagaram' against a:3 n:1 g:1 r:1 m:1

n -> 1 left, now 0
a -> 3 left, now 2
g -> 1 left, now 0
a -> 2 left, now 1
r -> 1 left, now 0
a -> 1 left, now 0
m -> 1 left, now 0
```

Nothing ran out. `true`.

### The sorting alternative

```js
const sort = (text) => text.split('').sort().join('');
return sort(s) === sort(t);
```

Two anagrams sort to the same string. It is three lines, it is correct, and it
does more work than counting because sorting costs more than a single pass.
Interviewers usually ask for the counting version after you offer this one.

### Why not an object?

`{}` works here, since the keys are single letters. A `Map` is the habit worth
building, for the reason lesson 15 gave: with keys that come from input, a
plain object can appear to already contain names like `toString`.

<details>
<summary>Common mistakes</summary>

**Skipping the length check.**

Without it, `s = 'a'` and `t = 'aa'` passes: every letter of `t` is found, and
the leftover in `s` is never noticed. Compare the lengths first, or check at
the end that no counts remain.

**Counting `undefined`.**

```js
counts.set(letter, counts.get(letter) + 1); // NaN on the first sighting
```

`get` returns `undefined` for a new key. Use `?? 0`.

**Checking `has` instead of the count.**

```js
if (!counts.has(letter)) return false;
```

A letter whose count has dropped to zero is still in the map. Test the number,
not the presence.

</details>

## Check yourself

1. Are `'rat'` and `'car'` anagrams?

<details><summary>Answer</summary>

No: `'rat'` has a `t` and `'car'` has a `c`. The tempting wrong answer is yes,
from noticing they are the same length with two letters in common - every
letter has to match, with the same count.

</details>

2. Why check the lengths first?

<details><summary>Answer</summary>

Because different lengths rule it out immediately, and because without that
check a shorter first word can pass: every letter of `t` is found and the
surplus in `s` is never examined. The tempting wrong answer is that it is only
an optimisation.

</details>

3. What does `counts.get('z')` return for a letter never counted?

<details><summary>Answer</summary>

`undefined`. Adding 1 to it gives `NaN`, which is why the counting pattern uses
`?? 0`. The tempting wrong answer is `0`, which is what you want and not what
you get.

</details>

4. Why test the count rather than `has`?

<details><summary>Answer</summary>

Because a letter whose count has been spent down to zero is still a key in the
map, so `has` returns `true` when there is nothing left. The tempting wrong
answer is that the two are equivalent - they differ exactly when a letter is
used more times in `t` than in `s`.

</details>

5. What does the sorting approach rely on?

<details><summary>Answer</summary>

That two anagrams sort to the same sequence of characters. The tempting wrong
answer is that it is wrong - it is correct, and it does more work than a single
counting pass.

</details>

6. If the lengths match and every letter of `t` was paid for, can anything be
   left over in the counts?

<details><summary>Answer</summary>

No. Equal lengths mean the number of letters spent equals the number counted,
so the totals cancel exactly. The tempting wrong answer is that you need a
final sweep over the map - the length check has already ruled that out.

</details>

## Your task

Open `leetcode/0242-valid-anagram/exercise.js` and write `isAnagram(s, t)`.

It returns `true` when `t` is a rearrangement of `s`. Count the letters; do not
sort.

```js
isAnagram('anagram', 'nagaram') // true
isAnagram('rat', 'car')         // false
isAnagram('a', 'ab')            // false
isAnagram('', '')               // true
```

When the tests pass, record it with `npm run learn -- check`.
