const fromDegrees = Math.PI / 180
const toDegrees = 180 / Math.PI

class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(v2) {
    return Vector.add(this, v2)
  }

  sub(v2) {
    return Vector.sub(this, v2)
  }

  mult(other) {
    return Vector.mult(this, other)
  }

  rotate(angle) {
    const newAngle = (this.heading() + angle) * fromDegrees
    const mag = this.mag()
    return new Vector(mag * Math.cos(newAngle), mag * Math.sin(newAngle))
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  heading() {
    return Math.atan2(this.y, this.x) * toDegrees
  }

  array() {
    return [this.x, this.y]
  }

  static add(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y)
  }

  static sub(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y)
  }

  static mult(v1, other) {
    if (typeof other === 'Vector') {
      return new Vector(v1.x * other.x, v1.y * other.y)
    } else {
      return new Vector(v1.x * other, v1.y * other)
    }
  }

  static lerp(v1, v2, f) {
    return Vector.add(v1.mult(1 - f), v2.mult(f))
  }
}
