// The default export comes first, with no braces; named ones follow in braces.
import describe, { circleArea, squareArea } from './geometry.js';

// Passes PI straight through, so importers of this file can read it here.
export { PI } from './geometry.js';

export function totalCircleArea(radii) {
  return radii.reduce((total, radius) => total + circleArea(radius), 0);
}

export function describeSquare(side) {
  return describe('square', squareArea(side));
}
