const s31 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const triangleEdge = 100 * f
  const hexagonEdge = 0.8 * triangleEdge
  const stroke = 0.12 * triangleEdge
  const baseAngle = 30

  // https://coolors.co/d62839-ba324f-175676-4ba3c3-cce6f4
  const colors = {
    strokes: '#cce6f4',
    triangles: '#175676',
    hexagons: '#4ba3c3',
  }

  s.draw = () => {
    s.noStroke()
    s.background(colors.strokes)

    const diff = new Vector(
      hexagonEdge + triangleEdge + (4 / Math.sqrt(3)) * stroke,
      0,
    )
      .add(
        new Vector(
          triangleEdge + (2 / Math.sqrt(3)) * stroke - hexagonEdge,
          0,
        ).rotate(-120),
      )
      .rotate(-30)

    for (const [x, y] of fillingHexagonalGrid(
      canvasSide,
      diff.mag(),
      diff.heading() + baseAngle,
    )) {
      drawUnit(x, y, baseAngle)
    }

    drawBorder(s, colors.strokes, stroke)
    s.noLoop()
  }

  function drawUnit(x, y, baseAngle) {
    const v1 = new Vector(hexagonEdge, 0)
      .add(new Vector(stroke * (2 / Math.sqrt(3)), 0).rotate(-60))
      .rotate(30 + baseAngle)
    const v2 = v1.rotate(60)
    s.fill(colors.hexagons)
    drawHexagon(x, y, baseAngle)
    s.fill(colors.triangles)
    drawTriangle(x + v1.x, y + v1.y, baseAngle - 90)
    drawTriangle(x + v2.x, y + v2.y, baseAngle - 30)
  }

  function drawHexagon(x, y, baseAngle) {
    const { vertexAt } = vHex(s, hexagonEdge, 30 + baseAngle)
    s.beginShape()
    vertexAt(x, y, 1, 0, 0)
    vertexAt(x, y, 0, 1, 0)
    vertexAt(x, y, 0, 0, 1)
    vertexAt(x, y, -1, 0, 0)
    vertexAt(x, y, 0, -1, 0)
    vertexAt(x, y, 0, 0, -1)
    s.endShape(s.CLOSE)
  }

  function drawTriangle(x, y, angle) {
    const v1 = new Vector(triangleEdge, 0).rotate(angle)
    const v2 = v1.rotate(60)
    const { vertexAt } = v(s, v1, v2)
    s.beginShape()
    vertexAt(x, y, 0, 0)
    vertexAt(x, y, 1, 0)
    vertexAt(x, y, 0, 1)
    s.endShape(s.CLOSE)
  }
}
