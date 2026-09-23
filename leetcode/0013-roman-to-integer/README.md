# LeetCode 13: Roman to Integer

Run the tests for this problem with:

```
npm run test -- lc-13
```

Problem on LeetCode: <https://leetcode.com/problems/roman-to-integer/>

## The lesson

Convert a Roman numeral to a number.

```
'III'     -> 3
'LVIII'   -> 58     L=50, V=5, III=3
'MCMXCIV' -> 1994   M=1000, CM=900, XC=90, IV=4
```

The seven symbols:

```
I = 1     V = 5     X = 10     L = 50
C = 100   D = 500   M = 1000
```

### The rule

Usually the symbols are written largest first and you add them up: `LVIII` is
50 + 5 + 1 + 1 + 1 = 58.

The exception is subtraction. Six pairs are written small-then-large, and mean
the difference:

```
IV = 4    IX = 9
XL = 40   XC = 90
CD = 400  CM = 900
```

`MCMXCIV` splits as M + CM + XC + IV = 1000 + 900 + 90 + 4 = 1994.

### Look at the next symbol

You do not need to recognise those six pairs. One rule covers everything:

**If a symbol's value is smaller than the value of the symbol after it,
subtract it. Otherwise add it.**

That is all. Walk the string left to right, comparing each symbol with the one
after it.

```
MCMXCIV

M (1000) vs C (100)   1000 >= 100  -> add 1000     total 1000
C (100)  vs M (1000)  100 < 1000   -> subtract 100 total 900
M (1000) vs X (10)    1000 >= 10   -> add 1000     total 1900
X (10)   vs C (100)   10 < 100     -> subtract 10  total 1890
C (100)  vs I (1)     100 >= 1     -> add 100      total 1990
I (1)    vs V (5)     1 < 5        -> subtract 1   total 1989
V (5)    last symbol  -> add 5                     total 1994
```

The last symbol has nothing after it, so it is always added. Reading past the
end gives `undefined`, so guard that case - or read the value with a fallback
of 0, which is never larger than any symbol and therefore always leads to
addition.

### The lookup

A `Map` from symbol to value, built once:

```js
const values = new Map([
  ['I', 1],
  ['V', 5],
  ['X', 10],
  ['L', 50],
  ['C', 100],
  ['D', 500],
  ['M', 1000],
]);
```

The `Map` constructor takes an array of `[key, value]` pairs, as lesson 15
showed. Build it outside the function so it is created once rather than on
every call.

### Why this beats matching pairs

You could check for the six two-character pairs first and fall back to single
symbols. That works and needs six special cases plus careful index skipping.
The compare-with-the-next rule is one comparison and no special cases, because
the six pairs are exactly the situations where a smaller symbol precedes a
larger one.

<details>
<summary>Common mistakes</summary>

**Adding everything.**

`MCMXCIV` comes out as 2174 rather than 1994. The subtraction rule is the whole
problem.

**Comparing symbols instead of values.**

```js
if (s[i] < s[i + 1]) // compares letters alphabetically
```

`'I' < 'V'` is `true` by luck of the alphabet, and `'X' < 'L'` is also `true`,
but `'C' < 'M'` and `'I' < 'X'` happen to work while `'V' < 'X'` gives the
wrong sign in cases that do occur. Compare the numbers the symbols stand for.

**Reading past the end.**

`values.get(s[i + 1])` on the last symbol is `undefined`, and
`100 < undefined` is `false` - which happens to be right here, by accident.
Make it deliberate: use a fallback of 0.

</details>

## Check yourself

1. What is `LVIII`?

<details><summary>Answer</summary>

`58`: 50 + 5 + 1 + 1 + 1. The tempting wrong answer is 53, from reading `VIII`
as 8 but forgetting one of the `I`s - count the symbols.

</details>

2. What single rule decides whether to add or subtract?

<details><summary>Answer</summary>

A symbol is subtracted when its value is smaller than the value of the symbol
immediately after it, and added otherwise. The tempting wrong answer is
"recognise the six special pairs", which is the same rule written out six times.

</details>

3. What happens with the last symbol?

<details><summary>Answer</summary>

It is always added, because there is nothing after it to be larger. The
tempting wrong answer is that it needs its own rule - a fallback value of 0 for
"past the end" makes it fall out of the general case.

</details>

4. Why compare values rather than the letters?

<details><summary>Answer</summary>

Because comparing letters compares their alphabetical order, which is unrelated
to their numeric value - `'V' < 'X'` is true but `'L' < 'X'` is also true while
50 is larger than 10. The tempting wrong answer is that the alphabet happens to
line up; it does not.

</details>

5. What does `MCMXCIV` break down into?

<details><summary>Answer</summary>

M + CM + XC + IV, which is 1000 + 900 + 90 + 4 = 1994. The tempting wrong
answer is 2174, from adding every symbol and ignoring the three subtractions.

</details>

6. Why build the symbol table outside the function?

<details><summary>Answer</summary>

So it is created once rather than rebuilt on every call. The tempting wrong
answer is that it makes no difference - it is correct either way, and rebuilding
a fixed table inside a loop is the habit worth not forming.

</details>

## Your task

Open `leetcode/0013-roman-to-integer/exercise.js` and write
`romanToInt(s)`.

It converts a valid Roman numeral between 1 and 3999 into a number. Use the
compare-with-the-next rule rather than listing the six subtractive pairs.

```js
romanToInt('III')     // 3
romanToInt('LVIII')   // 58
romanToInt('MCMXCIV') // 1994
romanToInt('IV')      // 4
```

When the tests pass, record it with `npm run learn -- check`.
