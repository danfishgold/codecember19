const s25 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const hexagonSide = 70 * f
  const gap = hexagonSide * 1.5
  const triangleSide = Math.sqrt(3) * (hexagonSide - gap) + gap

  const angle0 = 90

  // https://coolors.co/5d2a42-fb6376-fcb1a6-ffdccc-fff9ec
  const colors = {
    hexagons: '#fb6376',
    squareIntersections: '#fcb1a6',
    squares: '#ffdccc',
    strokes: '#5d2a42',
    triangles: '#fff9ec',
  }

  s.draw = () => {
    s.stroke(colors.strokes)
    s.strokeWeight(4 * f)
    s.background(colors.squares)

    // center the grid around a triangle instead of a hexagon
    const p0 = new Vector(hexagonSide + gap / s.sqrt(3), 0).rotate(
      angle0 - 30 + 90
    )

    drawInHexagonalGrid(
      s,
      canvasSide / 2 + p0.x,
      canvasSide / 2 + p0.y,
      hexagonSide * Math.sqrt(3) + gap,
      Math.ceil(canvasSide / (hexagonSide * Math.sqrt(3) + gap)),
      angle0 - 30,
      'hexagon-25',
      (x, y) => {
        s.fill(colors.hexagons)
        drawHexagon(x, y)
      }
    )

    drawInHexagonalGrid(
      s,
      canvasSide / 2 + p0.x,
      canvasSide / 2 + p0.y,
      hexagonSide * Math.sqrt(3) + gap,
      Math.ceil(canvasSide / (hexagonSide * Math.sqrt(3) + gap)),
      angle0 - 30,
      'other-bits-25',
      (x, y) => {
        for (const angle of [0, 60]) {
          const xt = x + (hexagonSide + gap / s.sqrt(3)) * dcos(angle + angle0)
          const yt = y + (hexagonSide + gap / s.sqrt(3)) * dsin(angle + angle0)
          s.fill(colors.triangles)
          drawTriangle(xt, yt, angle + angle0 - 60)
          s.fill(colors.squareIntersections)
          for (const cornerAngle of [0, 120, 240]) {
            drawSquareIntersections(xt, yt, angle + cornerAngle + angle0 - 30)
          }
        }
      }
    )
    drawBorder(s, colors.strokes, 4 * f)
    s.noLoop()
  }

  function drawHexagon(x, y) {
    s.beginShape()
    for (const index of range(6)) {
      const v = new Vector(hexagonSide, 0).rotate(index * 60 + angle0)
      s.vertex(x + v.x, y + v.y)
    }
    s.endShape(s.CLOSE)
  }

  function drawTriangle(x, y, baseAngle) {
    s.beginShape()
    for (const angle of [0, 120, 240]) {
      const x0 = x + (triangleSide / Math.sqrt(3)) * dcos(baseAngle + angle)
      const y0 = y + (triangleSide / Math.sqrt(3)) * dsin(baseAngle + angle)
      s.vertex(x0, y0)
    }
    s.endShape(s.CLOSE)
  }

  function drawSquareIntersections(x, y, baseAngle) {
    const { vertexAt } = vHex(s, 1, baseAngle + 90)
    const a0 = gap / s.sqrt(3)
    const normalLength = (triangleSide - gap) / (2 * s.sqrt(3))
    s.beginShape()
    vertexAt(x, y, a0, normalLength, 0)
    vertexAt(x, y, a0, 0, 0)
    vertexAt(x, y, a0, 0, -normalLength)
    vertexAt(x, y, triangleSide / s.sqrt(3), 0, 0)
    s.endShape(s.CLOSE)
  }
}
