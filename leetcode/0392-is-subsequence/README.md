# LeetCode 392: Is Subsequence

Run the tests for this problem with:

```
npm run test -- lc-392
```

Problem on LeetCode: <https://leetcode.com/problems/is-subsequence/>

## The lesson

Return `true` when `s` is a subsequence of `t`.

A **subsequence** is what you get by deleting some characters from a string
without reordering the rest. `'ace'` is a subsequence of `'abcde'`: delete the
`b` and the `d`. `'aec'` is not, because in `'abcde'` the `c` comes before the
`e`.

```
s = 'abc', t = 'ahbgdc'  -> true
s = 'axc', t = 'ahbgdc'  -> false
```

A subsequence is not the same as a **substring**: a substring has to be
contiguous, a subsequence does not.

### Two indexes at different speeds

Keep one index in `s` and one in `t`. Walk through `t` from start to finish. At
each character, ask whether it matches the character `s` is currently waiting
for:

- **Match**: that character of `s` is accounted for, so move the `s` index on.
- **No match**: move on through `t` and leave the `s` index where it is.

If the `s` index reaches the end of `s`, every character was found in order, so
the answer is `true`.

```
s = 'abc', t = 'ahbgdc'

t: a   matches s[0] 'a'   -> s index 1
t: h   no match           -> s index 1
t: b   matches s[1] 'b'   -> s index 2
t: g   no match           -> s index 2
t: d   no match           -> s index 2
t: c   matches s[2] 'c'   -> s index 3
```

The `s` index reached 3, which is `s.length`. Answer: `true`.

For `s = 'axc'` the `x` is never found, so the index stops at 1 and the answer
is `false`.

### Why only one pass over `t` is needed

Whenever a character of `t` matches what you are waiting for, taking it is
always at least as good as skipping it. Taking the earliest possible match
leaves the most of `t` for the characters still to come. So there is never a
reason to go back and try a different match.

### The answer

`s` is a subsequence exactly when its index reached the end:

```js
return sIndex === s.length;
```

The empty string is a subsequence of anything, including the empty string:
`sIndex` starts at 0, `s.length` is 0, and the comparison is `true` before the
loop runs. No special case needed.

### Stopping early

Once `sIndex` reaches `s.length` there is nothing left to look for, so a
`while` loop with both conditions ends as soon as either string runs out:

```js
while (sIndex < s.length && tIndex < t.length) {
```

<details>
<summary>Common mistakes</summary>

**Advancing the `s` index every pass.**

```js
if (s[sIndex] === t[tIndex]) { /* ... */ }
sIndex += 1;   // outside the if
```

That checks whether `s` equals the start of `t`, which is a different question.
The `s` index only moves on a match.

**Using `includes`.**

```js
return t.includes(s); // substring, not subsequence
```

`'abc'.includes` asks for contiguous characters. `'ahbgdc'.includes('abc')` is
`false`, and the correct answer is `true`.

**Returning `true` from inside the loop on the first match.**

One matching character says nothing. The answer is decided by where the `s`
index finished.

</details>

## Check yourself

1. Is `'ace'` a subsequence of `'abcde'`?

<details><summary>Answer</summary>

Yes. Deleting `b` and `d` leaves `ace`, and the order is preserved. The
tempting wrong answer is no, from requiring the characters to be next to each
other - that is a substring.

</details>

2. Is `'aec'` a subsequence of `'abcde'`?

<details><summary>Answer</summary>

No. `e` appears after `c` in `abcde`, so taking `e` before `c` would need
reordering. The tempting wrong answer is yes, from checking only that all three
letters appear somewhere.

</details>

3. When does the index into `s` move forward?

<details><summary>Answer</summary>

Only when the current character of `t` matches the character of `s` it is
waiting for. The tempting wrong answer is "every pass", which turns the problem
into a prefix comparison.

</details>

4. What is the final check?

<details><summary>Answer</summary>

Whether the index into `s` reached `s.length`, meaning every character was
matched in order. The tempting wrong answer is whether the index into `t`
reached the end - `t` often has characters left over, and that is fine.

</details>

5. Is the empty string a subsequence of `'abc'`?

<details><summary>Answer</summary>

Yes. Deleting everything is allowed. The comparison is already true before the
loop starts, so this needs no special handling. The tempting wrong answer is
no, which would require an extra condition that breaks the general case.

</details>

6. Why is it safe to take the first matching character rather than looking
   ahead for a better one?

<details><summary>Answer</summary>

Because matching earlier leaves more of `t` for the characters still to come,
so an earlier match is never worse. The tempting wrong answer is that you must
try every combination - that would be far more work for the same result.

</details>

## Your task

Open `leetcode/0392-is-subsequence/exercise.js` and write
`isSubsequence(s, t)`.

It returns `true` when every character of `s` appears in `t` in the same order,
possibly with other characters in between.

```js
isSubsequence('abc', 'ahbgdc') // true
isSubsequence('axc', 'ahbgdc') // false
isSubsequence('', 'abc')       // true
isSubsequence('abc', '')       // false
```

When the tests pass, record it with `npm run learn -- check`.
