# LeetCode 344: Reverse String

Run the tests for this problem with:

```
npm run test -- lc-344
```

Problem on LeetCode: <https://leetcode.com/problems/reverse-string/>

## The lesson

You are given an array of single characters. Reverse it **in place**: change
the array you were given, and return nothing.

```
input:  ['h', 'e', 'l', 'l', 'o']
after:  ['o', 'l', 'l', 'e', 'h']
```

Every other problem so far has said "do not change the input". This one insists
on it, which makes it a good place to see the difference clearly.

### In place

"In place" means no second array. You may swap items around inside the one you
have, and nothing else. The function returns `undefined`; the caller reads the
array they passed in.

That works because of how arrays are passed, from the values and references
article: the function receives the address of the caller's array, so changing
it changes theirs.

### Two pointers

The standard approach for "do something from both ends" problems. Keep an index
at each end, swap the two characters, then step both indexes inwards:

```
['h', 'e', 'l', 'l', 'o']
  ^                   ^        left = 0, right = 4   swap h and o

['o', 'e', 'l', 'l', 'h']
       ^         ^             left = 1, right = 3   swap e and l

['o', 'l', 'l', 'e', 'h']
            ^                  left = 2, right = 2   they have met, stop
```

The loop continues while `left < right`. When they meet or cross, every pair
has been swapped. For an odd length the middle character stays where it is,
which is correct - it has nowhere else to go.

### Swapping two items

Destructuring from lesson 13 swaps in one line, with no temporary variable:

```js
[array[left], array[right]] = [array[right], array[left]];
```

The right-hand side is built first, from the current values, then unpacked into
the two positions. The longer form works too:

```js
const temporary = array[left];
array[left] = array[right];
array[right] = temporary;
```

The temporary variable is needed because assigning `array[left] = array[right]`
first would destroy the value you still need.

### Why not `reverse()`?

Arrays have a built-in `reverse`, which also works in place:

```js
s.reverse();
```

That is one line and it is a legitimate answer. Write the two-pointer version
here anyway: the pattern is the point, and it turns up again in Valid
Palindrome and Merge Sorted Array.

<details>
<summary>Common mistakes</summary>

**Building a new array and returning it.**

```js
return s.slice().reverse();
```

The caller's array is untouched, so the tests fail even though the returned
value looks right. This problem asks you to change the input.

**Swapping without a temporary variable.**

```js
s[left] = s[right];
s[right] = s[left]; // both are now the same character
```

The first line overwrote the value the second line needed. Use destructuring or
a temporary.

**Looping all the way to the end.**

```js
while (left < s.length) { /* swap left and right */ }
```

Every pair gets swapped twice, which puts the array back the way it started.
Stop when the two indexes meet.

</details>

## Check yourself

1. What does "in place" mean here?

<details><summary>Answer</summary>

Change the array you were given rather than building a new one, and return
nothing. The tempting wrong answer is "return a reversed copy" - the caller
never sees a returned value in this problem.

</details>

2. Why can a function change the caller's array at all?

<details><summary>Answer</summary>

Because an array argument passes the address of one array, not a copy of its
contents, so both names point at the same array. The tempting wrong answer is
that arguments are always copies - that is true for numbers and strings.

</details>

3. When should the loop stop?

<details><summary>Answer</summary>

When the left index is no longer below the right index - they have met or
crossed. The tempting wrong answer is "when left reaches the end", which swaps
every pair twice and leaves the array unchanged.

</details>

4. What happens to the middle character of an odd-length array?

<details><summary>Answer</summary>

It stays where it is, which is correct: the middle of a reversed sequence is
the middle. The tempting wrong answer is that it needs a special case - the
loop condition handles it by stopping when the indexes meet.

</details>

5. Why does this fail?

```js
s[left] = s[right];
s[right] = s[left];
```

<details><summary>Answer</summary>

The first line overwrites `s[left]`, so the second line copies the value back
onto itself and both positions end up with the same character. The tempting
wrong answer is that the order is fine if you swap the lines - it fails the
same way in the other direction.

</details>

6. What does the function return?

<details><summary>Answer</summary>

Nothing - `undefined`. The result is the change to the array. The tempting
wrong answer is the array itself; returning it does no harm, but the tests read
the array the caller passed in.

</details>

## Your task

Open `leetcode/0344-reverse-string/exercise.js` and write `reverseString(s)`.

`s` is an array of single-character strings. Reverse it in place with two
indexes. Do not build a new array, and do not use the built-in `reverse`.

```js
const s = ['h', 'e', 'l', 'l', 'o'];
reverseString(s);
s // ['o', 'l', 'l', 'e', 'h']
```

When the tests pass, record it with `npm run learn -- check`.
