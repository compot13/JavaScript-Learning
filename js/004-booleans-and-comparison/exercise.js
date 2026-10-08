/**
 * Is this person an adult? 18 or older counts.
 *
 * @param {number} age
 * @returns {boolean}
 */
  export function isAdult(age) {
    return age >= 18;

  }

  console.log(isAdult(20));
  console.log(isAdult(12));
  console.log(isAdult(18));


/**
 * Is this text empty or nothing but spaces?
 * isBlank('   ') returns true, isBlank(' hi ') returns false.
 *
 * @param {string} text
 * @returns {boolean}
 */
export function isBlank(text) {
  return text.trim().length === 0;
}

/**
 * May this person rent a car? They must be 21 or older and hold a licence.
 *
 * @param {number} age
 * @param {boolean} hasLicence
 * @returns {boolean}
 */
export function canRentCar(age, hasLicence) {

   return age >= 21 && hasLicence;
}
console.log(canRentCar(25, true));   
console.log(canRentCar(25, false));  
console.log(canRentCar(19, true));   
console.log(canRentCar(21, true));   