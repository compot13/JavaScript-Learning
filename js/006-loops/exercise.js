/**
 * Add up every whole number from 1 to n.
 * sumTo(4) returns 10, because 1 + 2 + 3 + 4 is 10.
 *
 * @param {number} n a whole number, never negative
 * @returns {number}
 */
export function sumTo(n) {

  let total = 0;

 for (let i = 1; i <= n; i++){
   total += i;
 }
 return total;
}
console.log(sumTo(4));

/**
 * Count the vowels in some text, in either case.
 * countVowels('banana') returns 3.
 *
 * @param {string} text
 * @returns {number}
 */
export function countVowels(text) {
  const vowels = 'aeiou';
  let count = 0; 
  for (const letter of text.toLowerCase()){
    if (vowels.includes(letter)) {
      count += 1;
    }
  }
  return count;
}
console.log(countVowels('banana'));
console.log(countVowels('BANANA'));
console.log(countVowels('xyz'));

/**
 * Return the text backwards, built one character at a time.
 * reverse('abc') returns 'cba'.
 *
 * @param {string} text
 * @returns {string}
 */
export function reverse(text) {

let reversed = '';

for (const letter of text) {
    reversed = letter + reversed;
  }

return reversed;
}

console.log(reverse('abc'));  
console.log(reverse('google'));      
console.log(reverse(''));
