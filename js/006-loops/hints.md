## Hint 1 - Language

[`for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
for counting,
[`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
for walking through the characters of a string.

For `countVowels`, look again at
[`includes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
and
[`toLowerCase`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase).

`+=` adds to a variable that already exists, for both numbers and strings.

## Hint 2 - Nudge

All three functions collect something across the loop. Where does that variable
have to be declared for it to still exist when the loop finishes?

`countVowels('AEIOU')` has to return 5, and so does a lowercase version. Rather
than checking each letter twice, what could you do to the text once, before the
loop starts?

`reverse`: you have the letters in order, `a` then `b` then `c`, and you need
`cba`. Joining each new letter onto the end gives you the original back. What
is the other place a letter can go?

## Hint 3 - Approach

`sumTo`: declare a total of zero above the loop. Count from 1 up to and
including `n`, adding the counter to the total on each pass. Return the total.
When `n` is zero the condition fails on the first check and the loop body never
runs, which gives you zero with no special case.

`countVowels`: keep a string of the five vowels and a count starting at zero.
Walk through the text one character at a time, in lowercase, and add one to the
count whenever the vowel string contains that character. Return the count.

`reverse`: start with an empty string. Walk through the text one character at a
time, and each time put the new character in front of what you have collected
so far rather than after it. Return the collected string.
