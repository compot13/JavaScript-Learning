export class Rectangle {
  constructor(width, height) {
    // this is the new object, so these two lines give it its properties.
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  perimeter() {
    return 2 * this.width + 2 * this.height;
  }

  scale(factor) {
    // Returns a new rectangle rather than changing this one.
    return new Rectangle(this.width * factor, this.height * factor);
  }

  static square(size) {
    // Called on the class, so there is no this instance to read from.
    return new Rectangle(size, size);
  }
}
