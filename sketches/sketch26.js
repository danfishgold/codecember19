const s26 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const wd = 165 * f
  const ht = 0.2 * wd
  const dy1 = 0.45 * wd

  const discriminant = 1 - ht / dy1
  const t1 = 1 / 2 - (1 / 2) * Math.sqrt(discriminant)
  const t2 = 1 / 2 + (1 / 2) * Math.sqrt(discriminant)

  // https://coolors.co/22577a-38a3a5-57cc99-80ed99-c7f9cc
  const colors = {
    triangles: '#C7F9CC',
    intersections: '#80ED99',
    stars: '#38A3A5',
    strokes: '#22577A',
  }

  s.draw = () => {
    s.strokeWeight(8 * f)
    s.stroke(colors.strokes)
    s.background(colors.stars)

    const v1 = new Vector(wd / Math.sqrt(3) + ht, 0).rotate(-90)
    const v2 = v1.rotate(60)
    const dist = wd + ht * Math.sqrt(3)

    drawInFillingHexagonalGrid(
      s,
      canvasSide,
      dist,
      0,
      'triangle-1-26',
      (x, y) => drawTriangle(x + v1.x, y + v1.y, 90, false)
    )
    drawInFillingHexagonalGrid(
      s,
      canvasSide,
      dist,
      0,
      'triangle-2-26',
      (x, y) => drawTriangle(x + v2.x, y + v2.y, 30, true)
    )

    drawBorder(s, colors.strokes, 8 * f)
    s.noLoop()
  }

  function drawTriangle(x, y, baseAngle, withCurvyBits) {
    const p0 = new Vector(x, y)
    const dp = new Vector(wd / Math.sqrt(3), 0).rotate(baseAngle)
    const anchor = new Vector(wd / 2, -dy1).rotate(baseAngle + 180 - 30)
    const c1 = p0.add(dp.rotate(0))
    const c2 = p0.add(dp.rotate(120))
    const c3 = p0.add(dp.rotate(240))
    const a1 = c1.add(anchor.rotate(0))
    const a2 = c2.add(anchor.rotate(120))
    const a3 = c3.add(anchor.rotate(240))

    s.fill(colors.triangles)
    s.beginShape()
    s.vertex(c1.x, c1.y)
    s.quadraticVertex(a1.x, a1.y, c2.x, c2.y)
    s.quadraticVertex(a2.x, a2.y, c3.x, c3.y)
    s.quadraticVertex(a3.x, a3.y, c1.x, c1.y)
    s.endShape(s.CLOSE)

    if (withCurvyBits) {
      s.fill(colors.intersections)
      drawCurvyBit(c1, a1, c2)
      drawCurvyBit(c2, a2, c3)
      drawCurvyBit(c3, a3, c1)
    }
  }

  function drawCurvyBit(c1, a, c2) {
    const { p0, p1, p2 } = splitBezierInThree(c1, a, c2, t1, t2).between
    const middle = p0.add(p2).mult(0.5)
    const p11 = middle.mult(2).sub(p1)
    s.beginShape()
    s.vertex(p0.x, p0.y)
    s.quadraticVertex(p1.x, p1.y, p2.x, p2.y)
    s.quadraticVertex(p11.x, p11.y, p0.x, p0.y)
    s.endShape(s.CLOSE)
  }
}
