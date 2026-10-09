/**
 * Turn a score from 0 to 100 into a letter grade.
 * 90+ is 'A', 70 to 89 is 'B', 50 to 69 is 'C', below 50 is 'F'.
 *
 * @param {number} score
 * @returns {string}
 */
export function grade(score) {

  if (score >=90) return ('A');
  if (score >= 70) return ('B');
  if (score >= 50) return ('C');
  return ('F');
}

console.log(grade(95)); 
console.log(grade(75));  
console.log(grade(55));  
console.log(grade(23));  

/**
 * Price of a ticket for someone of this age.
 * Under 5 is 0, 5 to 17 is 8, 18 to 64 is 12, 65 and over is 9.
 *
 * @param {number} age
 * @returns {number}
 */
export function ticketPrice(age) {
  if (age < 5) return 0;
  if (age <= 17) return 8;
  if (age <= 64) return 12;
  return 9;
}
console.log(ticketPrice(4.5)); 
console.log(ticketPrice(10)); 
console.log(ticketPrice(30)); 
console.log(ticketPrice(65)); 

/**
 * Put a count and a word together, adding an s unless the count is 1.
 * pluralise(3, 'file') returns '3 files'.
 *
 * @param {number} count
 * @param {string} word
 * @returns {string}
 */
export function pluralise(count, word) {
  if (count === 1) {
    return `${count} ${word}`;
  }
  return `${count} ${word}s`;
}
console.log(pluralise(3, 'file'));
console.log(pluralise(1, 'file'));
console.log(pluralise(0, 'file'));