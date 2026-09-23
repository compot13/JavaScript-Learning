# 3. Numbers, math, and `NaN`

Run the tests for this exercise with:

```
npm run test -- 003
```

## The lesson

JavaScript has one number type. Whole numbers and decimals are both `number`,
and there is no separate integer type to choose.

```js
console.log(typeof 7);    // number
console.log(typeof 7.5);  // number
```

### Arithmetic

```js
console.log(7 + 2);  // 9
console.log(7 - 2);  // 5
console.log(7 * 2);  // 14
console.log(7 / 2);  // 3.5
console.log(7 % 2);  // 1
console.log(7 ** 2); // 49
```

Division always gives you the exact answer, decimals included. If you come from
a language where `7 / 2` is `3`, this is different here.

`%` is the **remainder** operator: what is left over after dividing. `7 % 2` is
1 because 2 goes into 7 three times with 1 left over. It is how you ask "is
this number even?" (`n % 2` is 0) or "what minute of the hour is this?"
(`minutes % 60`).

Multiplication and division happen before addition and subtraction, as in
school arithmetic. Parentheses override that.

```js
console.log(2 + 3 * 4);   // 14
console.log((2 + 3) * 4); // 20
```

### Rounding and the Math object

`Math` is a built-in collection of number tools. You call them with a dot.

```js
console.log(Math.round(2.5));  // 3
console.log(Math.round(2.4));  // 2
console.log(Math.floor(2.9));  // 2   always down
console.log(Math.ceil(2.1));   // 3   always up
console.log(Math.abs(-4));     // 4   distance from zero
console.log(Math.max(3, 9, 1)); // 9
console.log(Math.min(3, 9, 1)); // 1
```

`Math.floor` paired with `/` is how you split a total into whole units. 135
minutes is `Math.floor(135 / 60)` hours, which is 2.

### Decimals are approximate

```js
console.log(0.1 + 0.2); // 0.30000000000000004
```

This is not a JavaScript bug. Computers store decimals in binary, and some
decimals have no exact binary form, the same way 1/3 has no exact decimal form.
Nearly every language does this. When the exact digits matter, round at the end.

`toFixed(places)` rounds to a set number of decimal places, and returns a
**string**:

```js
const price = 2.5678;
console.log(price.toFixed(2));         // 2.57
console.log(typeof price.toFixed(2));  // string
console.log(Number(price.toFixed(2))); // 2.57
console.log(typeof Number(price.toFixed(2))); // number
```

`Number(...)` converts text back into a number. That round trip - `toFixed` to
round, `Number` to convert back - is the usual way to round to a set number of
decimal places and still have a number.

### `NaN`

`NaN` means "Not a Number". It is what you get when a calculation cannot
produce a sensible number.

```js
console.log(Number('abc'));  // NaN
console.log('abc' * 2);      // NaN
console.log(0 / 0);          // NaN
```

Confusingly, `typeof NaN` is `'number'`. Think of `NaN` as a broken number
rather than as "not a number at all".

`NaN` spreads. Any arithmetic involving it produces `NaN`, so one bad value
early on turns every later result into `NaN`. When a number appears from
nowhere as `NaN`, look backwards for the first calculation that produced it.

`NaN` is the one value in JavaScript that is not equal to itself:

```js
console.log(NaN === NaN); // false
```

So you cannot test for it with `===`. Use `Number.isNaN`:

```js
console.log(Number.isNaN(NaN));     // true
console.log(Number.isNaN(5));       // false
console.log(Number.isNaN('abc'));   // false
```

That last line surprises people. `Number.isNaN` asks "is this value the `NaN`
value?" The string `'abc'` is a string, not `NaN`, so the answer is `false`.

There is also an older global function called `isNaN`, which converts its
argument to a number first and then asks the question:

```js
console.log(isNaN('abc')); // true
```

The two give different answers for the same input. `Number.isNaN` is the one to
use: it answers the question you actually asked.

<details>
<summary>Common mistakes</summary>

**Comparing against `NaN` with `===`.**

```js
const result = Number('abc');
console.log(result === NaN); // false
```

No error, and the check silently never fires. `NaN === NaN` is `false` by
design, so this comparison is always `false` whatever you feed it. Use
`Number.isNaN(result)`.

**Treating `toFixed` output as a number.**

```js
const rounded = (2.5).toFixed(1);
console.log(rounded + 1); // 2.51
```

`toFixed` returned the string `'2.5'`, and `+` with a string joins text instead
of adding. Wrap it: `Number(rounded) + 1` gives `3.5`.

**Expecting exact decimals in a comparison.**

```js
console.log(0.1 + 0.2 === 0.3); // false
```

The sum is `0.30000000000000004`, which is not `0.3`. Round both sides before
comparing, or compare the rounded strings.

</details>

## Check yourself

1. What does `console.log(9 / 2)` print?

<details><summary>Answer</summary>

`4.5`. There is one number type, and division keeps the decimal part. The
tempting wrong answer is `4`, which is what languages with integer division
give. If you want `4`, you ask for it with `Math.floor(9 / 2)`.

</details>

2. What is `10 % 3`?

<details><summary>Answer</summary>

`1`. Three goes into ten three times with one left over, and `%` gives you what
is left over. The tempting wrong answer is `3.33`, from reading `%` as a
percentage or as division. It is remainder, not division.

</details>

3. What does `typeof NaN` return?

<details><summary>Answer</summary>

`'number'`. `NaN` lives inside the number type; it is the value a number
calculation produces when it fails. The tempting wrong answer is `'NaN'`, which
is not a type at all - the list of types from lesson 1 has no entry for it.

</details>

4. What does this print?

```js
console.log(Number.isNaN('hello'));
```

<details><summary>Answer</summary>

`false`. `'hello'` is a string, and `Number.isNaN` asks whether a value *is*
the `NaN` value, without converting anything. The tempting wrong answer is
`true`, which is what the older global `isNaN('hello')` returns because it
converts to a number first. Two similar names, two different questions.

</details>

5. What is the type of `(3.14159).toFixed(2)`?

<details><summary>Answer</summary>

`string`. `toFixed` is for producing text to display, so it hands back text.
The tempting wrong answer is `number`, and believing it leads to
`'3.14' + 1` producing `'3.141'` instead of `4.14`. Convert with `Number(...)`
when you need to keep calculating.

</details>

6. Why is `0.1 + 0.2 === 0.3` false?

<details><summary>Answer</summary>

Because `0.1 + 0.2` produces `0.30000000000000004`. Binary cannot represent
those decimals exactly, so the sum lands a tiny distance away from `0.3`. The
tempting wrong answer is that JavaScript is broken here; the same result
appears in Python, Java and C. Round before comparing.

</details>

7. What is `Math.floor(135 / 60)`?

<details><summary>Answer</summary>

`2`. `135 / 60` is `2.25`, and `Math.floor` always rounds down to `2`. The
tempting wrong answer is `2.25`, forgetting that `Math.floor` was applied, or
`3` from thinking of `Math.round` - `floor` never rounds up, whatever the
decimal part is.

</details>

## Your task

Open `js/003-numbers-and-nan/exercise.js` and write three functions.

1. **`roundTo(value, places)`** rounds a number to a set number of decimal
   places and returns a **number**, not a string.

   ```js
   roundTo(3.14159, 2) // 3.14
   roundTo(2.5, 0)     // 3
   ```

2. **`formatMinutes(totalMinutes)`** turns a count of minutes into hours and
   minutes, in the form `2h 15m`. `totalMinutes` is a whole number and is never
   negative.

   ```js
   formatMinutes(135) // '2h 15m'
   formatMinutes(45)  // '0h 45m'
   formatMinutes(120) // '2h 0m'
   ```

3. **`isBrokenNumber(value)`** returns `true` when the value is the `NaN` value
   and `false` for everything else, including strings that are not numbers.

   ```js
   isBrokenNumber(Number('abc')) // true
   isBrokenNumber(7)             // false
   isBrokenNumber('abc')         // false
   ```

When the tests pass, record it with `npm run learn -- check`.
