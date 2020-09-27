const s24 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const strokeWeight = 4 * f
  const hexagonSide = 125 * f
  const hexagonCurveStart = 0.1
  const triangleCurveStart = 0.15
  const gap = hexagonSide * 0.15
  const triangleSide = Math.sqrt(3) * (hexagonSide - gap) + gap

  // from an image of an orange
  // https://coolors.co/fc9304-fcb505-fcbe2f-fcd55c-fdf3cf
  const colors = {
    background: '#FC9304',
    hexagons: '#FDF3CF',
    strokes: 'black',
    triangles: '#FCD55C',
  }

  s.draw = () => {
    s.strokeWeight(strokeWeight)
    s.stroke(colors.strokes)
    s.background(colors.background)
    s.noFill()

    const points = Array.from(
      hexagonalGrid(
        canvasSide / 2,
        canvasSide / 2 + hexagonSide + gap / s.sqrt(3),
        hexagonSide * Math.sqrt(3) + gap,
        Math.ceil(canvasSide / (hexagonSide * Math.sqrt(3) + gap)),
        0
      )
    )

    drawInHexagonalGrid(
      s,
      canvasSide / 2,
      canvasSide / 2 + hexagonSide + gap / s.sqrt(3),
      hexagonSide * Math.sqrt(3) + gap,
      Math.ceil(canvasSide / (hexagonSide * Math.sqrt(3) + gap)),
      0,
      'hexagon-24',
      (x, y) => {
        s.fill(colors.hexagons)
        drawHexagon(x, y)
      }
    )

    drawInHexagonalGrid(
      s,
      canvasSide / 2,
      canvasSide / 2 + hexagonSide + gap / s.sqrt(3),
      hexagonSide * Math.sqrt(3) + gap,
      Math.ceil(canvasSide / (hexagonSide * Math.sqrt(3) + gap)),
      0,
      'other-bits-24',
      (x, y) => {
        for (const angle of [0, 60]) {
          const xt = x + (hexagonSide + gap / s.sqrt(3)) * dcos(angle + 30)
          const yt = y + (hexagonSide + gap / s.sqrt(3)) * dsin(angle + 30)
          // s.fill(someColor)
          // drawTriangle(xt, yt, angle - 30)
          s.fill(colors.triangles)
          for (const cornerAngle of [0, 120, 240]) {
            drawTriangleCorner(xt, yt, angle + cornerAngle)
          }
        }
      }
    )

    drawBorder(s, colors.strokes, strokeWeight)
    s.noLoop()
  }

  function drawHexagon(x, y) {
    s.beginShape()
    for (const angle of [0, 60, 120, 180, 240, 300]) {
      const { vertexAt, quadraticVertexAt } = vHex(s, hexagonSide, 30 + angle)
      vertexAt(x, y, 1, -hexagonCurveStart, 0)
      quadraticVertexAt(x, y, 1, 0, 0, 1, 0, hexagonCurveStart)
    }
    s.endShape(s.CLOSE)
  }

  function drawTriangle(x, y, baseAngle) {
    s.beginShape()
    for (const angle of [0, 120, 240]) {
      const x0 = x + (triangleSide / Math.sqrt(3)) * dcos(baseAngle + angle)
      const y0 = y + (triangleSide / Math.sqrt(3)) * dsin(baseAngle + angle)
      const { vertexAt, quadraticVertexAt } = vHex(
        s,
        triangleSide,
        baseAngle + angle + 90
      )
      vertexAt(x0, y0, 0, 0, triangleCurveStart)
      quadraticVertexAt(x0, y0, 0, 0, 0, 0, triangleCurveStart, 0)
    }
    s.endShape(s.CLOSE)
  }

  function drawTriangleCorner(x, y, baseAngle) {
    const corners = vHex(s, 1, baseAngle + 90)
    const a0 = gap / s.sqrt(3)
    const normalLength = (triangleSide - gap) / (2 * s.sqrt(3))
    const hexBezierLength = hexagonCurveStart * hexagonSide
    const triBezierLength = triangleCurveStart * triangleSide
    s.beginShape()
    corners.vertexAt(x, y, a0, normalLength, 0)
    corners.vertexAt(x, y, a0, hexBezierLength, 0)
    corners.quadraticVertexAt(x, y, a0, 0, 0, a0, 0, -hexBezierLength)
    corners.vertexAt(x, y, a0, 0, -normalLength)
    const corner = corners.vectorAt(x, y, triangleSide / s.sqrt(3), 0, 0)
    const sides = vHex(s, 1, baseAngle + 180)
    sides.vertexAt(corner.x, corner.y, 0, 0, triBezierLength)
    sides.quadraticVertexAt(corner.x, corner.y, 0, 0, 0, 0, triBezierLength, 0)
    s.endShape(s.CLOSE)
  }
}
