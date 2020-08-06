const s09 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
    s.angleMode(s.DEGREES)
  }

  const f = canvasSide / 800

  const side = 120 * f
  const spacing = 5 * f
  const alpha1 = 0.7
  const alpha2 = 0.77

  // https://coolors.co/01161e-124559-598392-aec3b0-eff6e0
  const colors = {
    arms: '#598392',
    background: '#eff6e0',
    middle: '#124559',
    strokes: '#01161e',
  }

  s.draw = () => {
    s.background(colors.background)
    s.strokeWeight(f)
    s.stroke(colors.strokes)

    for ([x, y, i, j] of fillingHexagonalGrid(
      canvasSide,
      (side + s.sqrt(3) * spacing) * s.sqrt(3),
      0,
    )) {
      drawFlower(x, y, 0)
    }

    drawBorder(s, colors.strokes)
    s.noLoop()
  }

  function drawFlower(x, y, angle) {
    for (const [x1, y1, _i, _j, ind, r] of hexagonalGrid(
      x,
      y,
      side / s.sqrt(3) + spacing,
      1,
      angle,
    )) {
      if (r === 0) {
        continue
      }
      drawTriangle(x1, y1, 60 + ind * 60)
    }
  }

  function drawTriangle(x, y, angle) {
    s.fill(colors.strokes)
    drawTriangleShape(x, y, angle, alpha2)
    s.fill(colors.arms)
    drawTriangleShape(x, y, angle, alpha1)
    s.fill(colors.strokes)
    drawTriangleMiddle(x, y, angle, alpha2)
    s.fill(colors.middle)
    drawTriangleMiddle(x, y, angle, alpha1)
  }

  function drawTriangleShape(x, y, angle, alpha) {
    const v1 = s.createVector(side * (1 / s.sqrt(3)), 0).rotate(angle)
    const v2 = v1.copy().rotate(120)
    const v3 = v2.copy().rotate(120)

    s.beginShape()
    s.vertex(x + v1.x, y + v1.y)
    s.quadraticVertex(x + alpha * v2.x, y + alpha * v2.y, x + v3.x, y + v3.y)
    s.quadraticVertex(x + alpha * v1.x, y + alpha * v1.y, x + v2.x, y + v2.y)
    s.quadraticVertex(x + alpha * v3.x, y + alpha * v3.y, x + v1.x, y + v1.y)

    s.endShape()
  }

  function drawTriangleMiddle(x, y, angle, alpha) {
    const v1 = s.createVector(side * (1 / s.sqrt(3)), 0).rotate(angle)
    const v2 = v1.copy().rotate(120)
    const v3 = v2.copy().rotate(120)
    // given a quad bezier curve from v1 to v3 with alpha*v2 as control
    // and a similar quad bezier from v1 to v2 with alpha*v2 as control,
    // which are the bezier curves used in drawTriangleShape,
    // solve B1(t) = B2(t) to get:
    const t = 1 - 1 / (1 + 2 * alpha)
    // we need these intersections in order to fill the middle part
    // with a different color while preserving the strokes

    s.beginShape()
    for (const [p1, p2, p3] of [
      [v1, v2, v3],
      [v3, v1, v2],
      [v2, v3, v1],
    ]) {
      const q11 = p5.Vector.lerp(p1, p2.copy().mult(alpha), t)
      const q12 = p5.Vector.lerp(p2.copy().mult(alpha), p3, t)
      const r1 = p5.Vector.lerp(q11, q12, t)

      const q21 = p5.Vector.lerp(p1, p2.copy().mult(alpha), 1 - t)
      const q22 = p5.Vector.lerp(p2.copy().mult(alpha), p3, 1 - t)
      const r2 = p5.Vector.lerp(q21, q22, 1 - t)
      const rr = lineLineIntersection(q11, q12, q21, q22)

      s.vertex(x + r1.x, y + r1.y)
      s.quadraticVertex(x + rr.x, y + rr.y, x + r2.x, y + r2.y)
    }
    s.endShape()
  }

  function lineLineIntersection(q11, q12, q21, q22) {
    const nomX = q22.x - q11.x
    const denomX = q12.x - q11.x + q22.x - q21.x
    const nomY = q22.y - q11.y
    const denomY = q12.y - q11.y + q22.y - q21.y

    const rrt = s.abs(denomX < 1e-5) ? nomY / denomY : nomX / denomX
    return p5.Vector.add(q11, p5.Vector.mult(p5.Vector.sub(q12, q11), rrt))
  }
}
