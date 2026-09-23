export function roundTo(value, places) {
  // toFixed rounds but hands back a string, so convert it back to a number.
  return Number(value.toFixed(places));
}

export function formatMinutes(totalMinutes) {
  // Whole hours: divide and throw away the decimal part.
  const hours = Math.floor(totalMinutes / 60);
  // What is left over after taking those whole hours out.
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

export function isBrokenNumber(value) {
  // Number.isNaN asks "is this the NaN value", with no conversion first.
  return Number.isNaN(value);
}
