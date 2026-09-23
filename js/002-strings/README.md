# 2. Strings and template literals

Run the tests for this exercise with:

```
npm run test -- 002
```

## The lesson

A **string** is text. You write one between single quotes or double quotes; the
two are identical in behaviour, and this course uses single quotes.

```js
const name = 'Ada';
const greeting = "hello";
```

### Template literals

Sticking text together with `+` gets hard to read as soon as there is more than
one gap to fill. The alternative uses backticks: `` ` ``, the key above Tab on
most keyboards. Inside backticks, `${...}` drops a value into the text.

```js
const name = 'Ada';
const age = 36;

console.log(`${name} is ${age}`);         // Ada is 36
console.log(name + ' is ' + age);         // Ada is 36
```

Both lines produce the same string. The first is harder to get wrong, because
the spaces you can see in the source are the spaces you get in the output.

Anything can go inside `${}`, including arithmetic:

```js
console.log(`${name} will be ${age + 1} next year`);
// Ada will be 37 next year
```

A template literal can also run across several lines, and the line breaks are
kept:

```js
console.log(`line one
line two`);
// line one
// line two
```

### Length

Every string knows its own length. `.length` is a property, not a function, so
there are no parentheses after it.

```js
console.log('Ada'.length); // 3
console.log(''.length);    // 0
```

### Methods that give you a new string

A **method** is a function that belongs to a value; you call it with a dot.
Strings are **immutable**, which means none of these change the original
string. They each return a new one.

```js
const name = 'Ada Lovelace';

console.log(name.toUpperCase());   // ADA LOVELACE
console.log(name.toLowerCase());   // ada lovelace
console.log(name.slice(0, 3));     // Ada
console.log(name.includes('Love'));// true
console.log(name.indexOf('Love')); // 4
console.log(name);                 // Ada Lovelace
```

That last line is the important one. `name` is unchanged. If you want the
uppercase version later, store it: `const shouty = name.toUpperCase();`.

`slice(start, end)` counts from 0, takes the character at `start`, and stops
*before* `end`. So `slice(0, 3)` gives you characters 0, 1 and 2.

```js
console.log('Lovelace'.slice(0, 4)); // Love
console.log('Lovelace'.slice(4));    // lace
```

With one argument it runs to the end of the string.

`slice` never complains about a range that runs off the end. Asking for more
characters than exist gives you what is there, and asking an empty string for
its first character gives you an empty string:

```js
console.log('hi'.slice(0, 10)); // hi
console.log(''.slice(0, 1));    // (an empty string)
```

### Reading one character

Square brackets read a single character by position, counting from 0.

```js
const name = 'Ada';
console.log(name[0]); // A
console.log(name[2]); // a
console.log(name[9]); // undefined
```

Position 9 does not exist, so you get `undefined` rather than an error.

### Trimming

`.trim()` returns the string without the spaces at either end.

```js
console.log('  hello  '.trim()); // hello
console.log('  hello  '.trim().length); // 5
```

Methods chain: `.trim()` hands back a string, and you can call another method
on that string straight away.

<details>
<summary>Common mistakes</summary>

**Using `${}` outside backticks.**

```js
const name = 'Ada';
console.log('hello ${name}');
// hello ${name}
```

No error, no crash, and the wrong output. `${}` only means anything inside
backticks. Quote marks make it ordinary text.

**Expecting a method to change the string.**

```js
const name = 'ada';
name.toUpperCase();
console.log(name); // ada
```

The uppercase string was created and then thrown away, because nothing caught
the return value. You need `const shouty = name.toUpperCase();`.

**Calling `.length` as if it were a function.**

```js
console.log('Ada'.length());
// TypeError: "Ada".length is not a function
```

`length` is a property: no parentheses. The error message is literal - the
thing you tried to call is a number, and numbers cannot be called.

</details>

## Check yourself

1. What does this print?

```js
const animal = 'cat';
console.log('I have a ${animal}');
```

<details><summary>Answer</summary>

`I have a ${animal}`. The quotes are ordinary single quotes, so `${animal}` is
text like any other. The tempting wrong answer is `I have a cat`, which is what
you get with backticks. When your output contains a literal `${`, this is
almost always why.

</details>

2. What is `'JavaScript'.slice(0, 4)`?

<details><summary>Answer</summary>

`'Java'`. `slice` starts at index 0 and stops before index 4, giving you four
characters. The tempting wrong answer is `'Javas'`, from assuming the end index
is included. It is not: the second argument is where to stop, not the last
character to keep.

</details>

3. After these two lines, what is in `word`?

```js
const word = 'hello';
word.toUpperCase();
```

<details><summary>Answer</summary>

`'hello'`, unchanged. String methods return a new string and leave the original
alone. The tempting wrong answer is `'HELLO'`, which assumes the method edits
the string in place. Nothing was assigned, so the uppercase version was
discarded the instant it was made.

</details>

4. What does `'  hi  '.trim().length` evaluate to?

<details><summary>Answer</summary>

`2`. `.trim()` removes the spaces at both ends, leaving `'hi'`, and that string
has a length of 2. The tempting wrong answer is `6`, the length before
trimming - which is what you would get if you wrote `'  hi  '.length` and
trimmed afterwards.

</details>

5. What is `'Ada'[1]`?

<details><summary>Answer</summary>

`'d'`. Positions count from 0, so index 1 is the second character. The tempting
wrong answer is `'A'`, from counting the first character as 1. Every position
in JavaScript starts at 0, and this is the source of a large share of
off-by-one bugs.

</details>

6. What does `'Ada'[7]` give you?

<details><summary>Answer</summary>

`undefined`. Reading a position that does not exist is not an error; you get
the "nothing here" value back. The tempting wrong answer is an error message.
This matters because `undefined` travels quietly through your program and only
causes trouble further along.

</details>

7. What does `` `${2 + 3} apples` `` produce?

<details><summary>Answer</summary>

`'5 apples'`. The expression inside `${}` runs first, then its result is turned
into text. The tempting wrong answer is `'2 + 3 apples'`, which treats the
contents as text - that only happens outside backticks.

</details>

## Your task

Open `js/002-strings/exercise.js` and write three functions.

1. **`greet(name)`** returns a greeting built with a template literal.

   ```js
   greet('Ada') // 'Hello, Ada!'
   ```

2. **`initials(fullName)`** takes a name of exactly two words separated by one
   space, and returns the two first letters in uppercase, separated by a dot.

   ```js
   initials('Ada Lovelace')   // 'A.L'
   initials('grace hopper')   // 'G.H'
   ```

   The space is always in the same kind of place, but the words are not always
   the same length, so you cannot count characters from the start for the
   second initial. `indexOf(' ')` tells you where the space is.

3. **`titleCase(word)`** returns the word with its first letter uppercase and
   the rest lowercase.

   ```js
   titleCase('ada')   // 'Ada'
   titleCase('aDA')   // 'Ada'
   titleCase('')      // ''
   ```

   An empty string has to come back as an empty string, without an error. There
   is a way to take the first letter that stays safe on an empty string, and
   you have already seen it in this lesson.

When the tests pass, record it with `npm run learn -- check`.
