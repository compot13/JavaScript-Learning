# LeetCode 58: Length of Last Word

Run the tests for this problem with:

```
npm run test -- lc-58
```

Problem on LeetCode: <https://leetcode.com/problems/length-of-last-word/>

## The lesson

Given a string of words separated by spaces, return the length of the last
word. A word is a sequence of characters that are not spaces.

```
'Hello World'            -> 5
'   fly me   to   the moon  ' -> 4
'luffy is still joyboy'  -> 6
```

The problem is easy. The test cases are where it gets interesting, and they are
all about spaces in awkward places.

### Why `split` alone is not enough

```js
console.log('Hello World'.split(' '));
// [ 'Hello', 'World' ]
```

So far so good. Now with a trailing space:

```js
console.log('Hello World '.split(' '));
// [ 'Hello', 'World', '' ]
```

The last item is an empty string, whose length is 0. `split` produces an entry
for whatever sits between each pair of separators, and between the final space
and the end of the string there is nothing.

Several spaces in a row give several empty strings:

```js
console.log('a   b'.split(' '));
// [ 'a', '', '', 'b' ]
```

### Trim first

`trim` removes the spaces at both ends before you split:

```js
console.log('  Hello World  '.trim().split(' '));
// [ 'Hello', 'World' ]
```

That deals with leading and trailing spaces. Gaps in the middle still produce
empty strings, but they cannot be last once the string has been trimmed - after
trimming, the string ends with a real character, so the final entry is a real
word.

So the whole solution is:

1. Trim.
2. Split on a space.
3. Take the last item.
4. Return its length.

The last item of an array, from lesson 9, is at `length - 1`, or from
`at(-1)`.

### The other approach

You can also walk backwards from the end without splitting at all: skip any
spaces, then count characters until you hit a space or run out of string. That
uses no extra memory and is what an interviewer means by "can you do it without
`split`?". If the loop version appeals, write it - the tests do not care which
you choose.

### The guarantee you are given

LeetCode promises the input contains at least one word. You do not have to
handle a string of nothing but spaces, and the tests here follow the same
promise.

<details>
<summary>Common mistakes</summary>

**Splitting without trimming.**

```js
'Hello World '.split(' ').at(-1).length; // 0
```

The last entry is an empty string. Trim first.

**Using `length` on the array instead of the word.**

```js
'Hello World'.trim().split(' ').length; // 2
```

That is the number of words. You want the length of one of them.

**Taking `[length]` instead of `[length - 1]`.**

```js
const words = 'a b'.split(' ');
words[words.length]; // undefined
// TypeError: Cannot read properties of undefined (reading 'length')
```

Indexes stop one before the length.

</details>

## Check yourself

1. What does `'Hello World '.split(' ')` produce?

<details><summary>Answer</summary>

`['Hello', 'World', '']`. The trailing space creates an entry for the empty
gap after it. The tempting wrong answer is `['Hello', 'World']` - which is what
you get only after trimming.

</details>

2. What is the length of the last item in that array?

<details><summary>Answer</summary>

`0`, because it is an empty string. This is exactly the bug the problem is
testing for, and it returns a plausible-looking number rather than an error.

</details>

3. What does `'  a b  '.trim()` give?

<details><summary>Answer</summary>

`'a b'`. `trim` removes spaces from both ends and leaves the inside alone. The
tempting wrong answer is `'ab'` - it does not touch spaces in the middle.

</details>

4. How do you read the last item of an array called `words`?

<details><summary>Answer</summary>

`words[words.length - 1]`, or `words.at(-1)`. The tempting wrong answer is
`words[words.length]`, which is one past the end and gives `undefined`.

</details>

5. What does `words.length` tell you, for `words = 'a bb'.split(' ')`?

<details><summary>Answer</summary>

`2`, the number of words - not the length of any word. The tempting wrong
answer is `2` meaning the answer to the problem, which happens to match here
and would not for `'a bbb'`.

</details>

6. Why can a gap in the middle of the string not break the answer, once the
   string is trimmed?

<details><summary>Answer</summary>

Because a trimmed string ends with a real character, so the final entry from
`split` is a real word. The tempting wrong answer is that extra empty strings
in the middle still matter - they do exist in the array, and none of them is
last.

</details>

## Your task

Open `leetcode/0058-length-of-last-word/exercise.js` and write
`lengthOfLastWord(s)`.

It returns the number of characters in the last word of `s`. The input always
contains at least one word, and may have any number of spaces at either end or
between words.

```js
lengthOfLastWord('Hello World')                  // 5
lengthOfLastWord('   fly me   to   the moon  ')  // 4
lengthOfLastWord('luffy is still joyboy')        // 6
lengthOfLastWord('a')                            // 1
```

When the tests pass, record it with `npm run learn -- check`.
