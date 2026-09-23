/**
 * A rectangle with a width and a height.
 *
 * new Rectangle(2, 3) has width 2 and height 3.
 * area() returns 6, perimeter() returns 10.
 * scale(2) returns a new Rectangle of 4 by 6 and leaves this one alone.
 * Rectangle.square(4) returns a new Rectangle of 4 by 4.
 */
export class Rectangle {
  /**
   * @param {number} width
   * @param {number} height
   */
  constructor(width, height) {
    throw new Error('not implemented');
  }

  /** @returns {number} width times height */
  area() {
    throw new Error('not implemented');
  }

  /** @returns {number} twice the width plus twice the height */
  perimeter() {
    throw new Error('not implemented');
  }

  /**
   * @param {number} factor
   * @returns {Rectangle} a new rectangle, both sides multiplied by factor
   */
  scale(factor) {
    throw new Error('not implemented');
  }

  /**
   * @param {number} size
   * @returns {Rectangle} a new rectangle with equal sides
   */
  static square(size) {
    throw new Error('not implemented');
  }
}
