# LeetCode 14: Longest Common Prefix

Run the tests for this problem with:

```
npm run test -- lc-14
```

Problem on LeetCode: <https://leetcode.com/problems/longest-common-prefix/>

## The lesson

Find the longest starting piece that every string in an array shares. When
there is none, return the empty string.

```
['flower', 'flow', 'flight'] -> 'fl'
['dog', 'racecar', 'car']    -> ''
['a']                        -> 'a'
```

A **prefix** is a piece from the start. `'fl'` is a prefix of `'flower'`;
`'low'` is not, even though it appears inside it.

### Guess and shrink

Take the first string as a guess at the answer. Then check it against each of
the others in turn, and whenever one does not start with your guess, cut the
last character off and check again.

```
guess = 'flower'

'flow' does not start with 'flower'   -> 'flowe'
'flow' does not start with 'flowe'    -> 'flow'
'flow' starts with 'flow'             -> move on

'flight' does not start with 'flow'   -> 'flo'
'flight' does not start with 'flo'    -> 'fl'
'flight' starts with 'fl'             -> move on

answer: 'fl'
```

The guess only ever gets shorter, and it can shrink to the empty string - which
every string starts with, so the loop always ends.

### The tools

`startsWith` answers the question directly:

```js
console.log('flower'.startsWith('fl')); // true
console.log('flight'.startsWith('flo')); // false
console.log('anything'.startsWith('')); // true
```

`slice` shortens the guess by one:

```js
console.log('flowe'.slice(0, -1)); // flow
```

A negative end index counts back from the end, so `slice(0, -1)` means
"everything except the last character". `slice(0, guess.length - 1)` says the
same thing.

### The shape

```js
let prefix = strs[0];

for (const word of strs) {
  while (!word.startsWith(prefix)) {
    prefix = prefix.slice(0, -1);
  }
}

return prefix;
```

A `while` inside a `for`: the outer loop visits each word, and the inner loop
shrinks the guess until that word agrees with it.

When the guess reaches the empty string, `startsWith('')` is `true` for every
word, so the inner loop stops and the function returns `''`. The
"no common prefix" case needs no special handling.

### The other way round

You could compare character by character: look at position 0 of every word,
then position 1, and stop at the first position where they disagree or where a
word runs out. That is also correct and slightly faster. The shrinking version
is fewer moving parts and easier to get right first time.

<details>
<summary>Common mistakes</summary>

**Using `includes` instead of `startsWith`.**

```js
'flow'.includes('low'); // true, but 'low' is not a prefix
```

`includes` looks anywhere in the string. A prefix has to be at the start.

**Shrinking with a `for` loop instead of a `while`.**

One word can disagree many times in a row, so the guess may need to shrink
several times before moving on. A `while` keeps going until the word agrees.

**Assuming the first string is the shortest.**

`['flower', 'flow']` starts with a guess longer than the second word. That is
fine as long as the guess shrinks, which is what the algorithm does.

</details>

## Check yourself

1. What is the answer for `['flower', 'flow', 'flight']`?

<details><summary>Answer</summary>

`'fl'`. `'flo'` fails on `'flight'`. The tempting wrong answer is `'flo'`, from
checking only the first two words.

</details>

2. What is the answer for `['dog', 'racecar', 'car']`?

<details><summary>Answer</summary>

`''`, the empty string. No character is shared at position 0. The tempting
wrong answer is `null` or `undefined` - the problem asks for a string, and the
empty string is the right one.

</details>

3. What is the difference between `startsWith` and `includes`?

<details><summary>Answer</summary>

`startsWith` checks the beginning; `includes` checks anywhere. The tempting
wrong answer is that they are the same for short strings - `'flow'.includes('low')`
is `true` and `'flow'.startsWith('low')` is `false`.

</details>

4. What does `'abcd'.slice(0, -1)` give?

<details><summary>Answer</summary>

`'abc'`. A negative end index counts back from the end, so this drops the last
character. The tempting wrong answer is `'d'`, from reading `-1` as a start
position.

</details>

5. What does `'anything'.startsWith('')` return?

<details><summary>Answer</summary>

`true`. Every string starts with the empty string. This is what guarantees the
shrinking loop ends, and why the "no common prefix" case falls out for free.

</details>

6. Why is the inner loop a `while` rather than a single `if`?

<details><summary>Answer</summary>

Because one word may force several characters off the guess in a row -
`'flight'` cuts `'flow'` down to `'fl'` in two steps. The tempting wrong answer
is that one cut per word is enough, which fails on exactly that example.

</details>

## Your task

Open `leetcode/0014-longest-common-prefix/exercise.js` and write
`longestCommonPrefix(strs)`.

It returns the longest string that every word in `strs` starts with, or `''`
when there is none. The array always has at least one word.

```js
longestCommonPrefix(['flower', 'flow', 'flight']) // 'fl'
longestCommonPrefix(['dog', 'racecar', 'car'])    // ''
longestCommonPrefix(['a'])                        // 'a'
longestCommonPrefix(['ab', 'ab'])                 // 'ab'
```

When the tests pass, record it with `npm run learn -- check`.
