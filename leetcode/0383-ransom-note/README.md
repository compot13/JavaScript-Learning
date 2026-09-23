# LeetCode 383: Ransom Note

Run the tests for this problem with:

```
npm run test -- lc-383
```

Problem on LeetCode: <https://leetcode.com/problems/ransom-note/>

## The lesson

Can `ransomNote` be spelled using the letters in `magazine`? Each letter of the
magazine may be used once.

```
note = 'a',  magazine = 'b'    -> false
note = 'aa', magazine = 'ab'   -> false
note = 'aa', magazine = 'aab'  -> true
```

The second example is the important one: the magazine has an `a`, but only one,
and the note needs two.

### Nearly the same as Valid Anagram

Valid Anagram asked whether two strings use exactly the same letters. This asks
whether one string's letters are enough to cover another's. The counting is the
same; the ending is different.

Two changes:

- The lengths do not have to match. The magazine is allowed to have letters
  left over. A note longer than the magazine is impossible, so that check is
  still a useful shortcut.
- Count the **magazine**, then spend on the **note**. Count the supply, spend
  it on the demand - getting this the wrong way round gives the wrong answer
  whenever the magazine has spare letters.

### The shape

```js
const available = new Map();
for (const letter of magazine) {
  available.set(letter, (available.get(letter) ?? 0) + 1);
}

for (const letter of ransomNote) {
  const left = available.get(letter) ?? 0;
  if (left === 0) {
    return false;
  }
  available.set(letter, left - 1);
}

return true;
```

Tracing `note = 'aa'`, `magazine = 'aab'`:

```
available: a:2, b:1

note 'a' -> 2 left, now 1
note 'a' -> 1 left, now 0
finished -> true
```

And `note = 'aa'`, `magazine = 'ab'`:

```
available: a:1, b:1

note 'a' -> 1 left, now 0
note 'a' -> 0 left -> false
```

### Why not search the magazine each time?

```js
// For each letter of the note, find it in the magazine and remove it.
```

Searching and removing means walking the magazine again for every letter, which
is the nested-loop cost this pattern exists to avoid. Counting once and
spending is a single pass over each string.

### Why not delete when a count hits zero?

You could remove the key entirely and test `has` instead of the number. That
works. Leaving the zero in place and testing the number works too, and avoids
the trap of a key that exists with nothing behind it. Pick one and be
consistent.

<details>
<summary>Common mistakes</summary>

**Counting the note instead of the magazine.**

Then `note = 'a'`, `magazine = 'aa'` looks wrong, because the magazine has a
letter the counts do not account for. Count the supply.

**Checking only which letters appear.**

```js
for (const letter of ransomNote) {
  if (!magazine.includes(letter)) return false;
}
return true;
```

`'aa'` against `'ab'` returns `true`, because `includes` cannot tell you *how
many*.

**Using `has` on a spent letter.**

A count of zero is still a key. Test the number.

</details>

## Check yourself

1. Can `'aa'` be spelled from `'ab'`?

<details><summary>Answer</summary>

No. There is one `a` and the note needs two. The tempting wrong answer is yes,
from checking only that the letter `a` appears somewhere.

</details>

2. Can `'a'` be spelled from `'aab'`?

<details><summary>Answer</summary>

Yes. Leftover letters in the magazine are fine; the note only has to be
coverable. The tempting wrong answer is no, from expecting the two to match
exactly as in Valid Anagram.

</details>

3. Which string do you count, and which do you spend?

<details><summary>Answer</summary>

Count the magazine, spend on the note. Count the supply, then draw from it. The
tempting wrong answer is the other way round, which breaks as soon as the
magazine has spare letters.

</details>

4. Why does `magazine.includes(letter)` not work?

<details><summary>Answer</summary>

Because it answers "is this letter present" rather than "how many are left", so
a note needing two of something passes on the strength of one. The tempting
wrong answer is that it works when the note has no repeats - true, and the
tests include repeats.

</details>

5. What is different about this problem compared with Valid Anagram?

<details><summary>Answer</summary>

The lengths need not match and leftovers are allowed, so there is no final
equality check - only the question of whether the note ever asks for more than
is available. The tempting wrong answer is "nothing"; copying the anagram
solution unchanged rejects valid notes.

</details>

6. What should the function return when the note is empty?

<details><summary>Answer</summary>

`true`. An empty note needs nothing, so any magazine covers it. The loop over
the note never runs and the function reaches its final `true` with no special
case.

</details>

## Your task

Open `leetcode/0383-ransom-note/exercise.js` and write
`canConstruct(ransomNote, magazine)`.

It returns `true` when the note can be spelled using each letter of the
magazine at most once. Count the letters rather than searching.

```js
canConstruct('a', 'b')     // false
canConstruct('aa', 'ab')   // false
canConstruct('aa', 'aab')  // true
canConstruct('', 'abc')    // true
```

When the tests pass, record it with `npm run learn -- check`.
