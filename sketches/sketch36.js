const s36 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const stroke = 10 * f
  const edge = 142 * f
  const s3 = Math.sqrt(3)

  const { abc, vertexAt, arrayAt } = vHex(s, 1, 30, -30)

  // https://coolors.co/540d6e-ee4266-ffd23f-f3fcf0-1f271b
  const colors = {
    strokes: '#1f271b',
    triangles: '#f3fcf0',
    hexagons: '#ffd23f',
  }

  s.draw = () => {
    s.strokeWeight(1 * f)
    s.noStroke()
    s.background(colors.strokes)

    const diff = abc(
      edge * (4 / 3) + s3 * stroke,
      stroke / s3,
      edge * (2 / 3) + stroke / s3
    )

    drawInFillingHexagonalGrid(
      s,
      canvasSide,
      diff.mag(),
      diff.heading(),
      'unit-36',
      drawUnit
    )

    drawBorder(s, colors.strokes, stroke)
    s.noLoop()
  }

  function drawUnit(x, y) {
    s.fill(colors.triangles)
    drawTriangle(...arrayAt(x, y, 0, edge * (2 / 3) + stroke * (2 / s3), 0), 30)
    drawTriangle(...arrayAt(x, y, edge * (2 / 3) + stroke * (2 / s3), 0, 0), 90)
    s.fill(colors.hexagons)
    drawHexagon(x, y)
  }

  function drawTriangle(x, y, angle) {
    const { vertexAt, arrayAt } = vHex(s, 1, angle, angle + 300)
    const [x0, y0] = arrayAt(x, y, -edge / 3, -edge / 3, 0)
    const vertex = (ma, mb, mc) => vertexAt(x0, y0, ma, mb, mc)
    s.beginShape()
    vertex(0, 0, 0)
    vertex(edge * (2 / 3) - stroke / s3, 0, 0)
    vertex(edge * (2 / 3) - stroke / s3, 0, edge / 3 - stroke / s3)
    vertex(0, edge / 3 - stroke / s3, 0)
    s.endShape(s.CLOSE)

    s.beginShape()
    vertex(edge, 0, 0)
    vertex(edge * (2 / 3) + stroke / s3, 0, 0)
    vertex(edge * (2 / 3) + stroke / s3, 0, edge / 3)
    vertex(edge, 0, edge * (2 / 3) - stroke / s3)
    s.endShape(s.CLOSE)

    s.beginShape()
    vertex(0, edge / 3 + stroke / s3, 0)
    vertex(edge / 3 - stroke / s3, edge / 3 + stroke / s3, 0)
    vertex(edge, 0, edge * (2 / 3) + stroke / s3)
    vertex(0, edge, 0)

    s.endShape(s.CLOSE)
  }

  function drawHexagon(x, y) {
    const side = edge / 3
    s.beginShape()
    vertexAt(x, y, side, 0, 0)
    vertexAt(x, y, side, 0, side)
    vertexAt(x, y, 0, 0, side)
    vertexAt(x, y, 0, -side, side)
    vertexAt(x, y, 0, -side, 0)
    vertexAt(x, y, side, -side, 0)
    s.endShape(s.CLOSE)
  }
}
