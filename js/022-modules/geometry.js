// This file is provided. Do not change it - the exercise imports from it.

/** Pi, to five decimal places. A named export. */
export const PI = 3.14159;

/** The area of a circle. A named export. */
export function circleArea(radius) {
  return PI * radius * radius;
}

/** The area of a square. A named export. */
export function squareArea(side) {
  return side * side;
}

/** Describe a shape in words. This file's default export. */
export default function describe(name, area) {
  return `${name} with an area of ${area}`;
}
