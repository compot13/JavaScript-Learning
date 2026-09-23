export function isAdult(age) {
  // The comparison is already a boolean, so return it directly.
  return age >= 18;
}

export function isBlank(text) {
  // Remove the spaces at both ends, then ask whether anything is left.
  return text.trim().length === 0;
}

export function canRentCar(age, hasLicence) {
  // Both halves have to hold, which is what && means.
  return age >= 21 && hasLicence;
}
