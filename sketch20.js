const s20 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
    s.angleMode(s.DEGREES)
  }

  const f = canvasSide / 800
  const scale = 8 * f
  const stroke = scale
  const edge1 = scale * 5
  const edge2 = scale * 12
  const squareSide = edge2 - edge1 - stroke

  const { xy, X, Y, minus } = v(s)

  // https://coolors.co/f7ebec-ddbdd5-ac9fbb-59656f-1d1e2c
  const colors = {
    strokes: '#1D1E2C',
    squares: '#f7ebec',
    step1: '#ac9fbb',
    step2: '#ddbdd5',
  }

  s.draw = () => {
    s.noStroke()
    s.background(colors.strokes)

    for (const [x, y] of parallelogramGrid(
      canvasSide,
      xy(edge1 + edge2 + 2 * stroke, 0),
      xy(0, edge2 + edge1 + 2 * stroke),
    )) {
      drawBaseShape(x - squareSide / 2, y + squareSide / 2)
    }

    drawBorder(s, colors.strokes, stroke)
    s.noLoop()
  }

  function drawBaseShape(x, y) {
    s.fill(colors.step1)
    drawStepBit(x, y + stroke, X, Y)
    s.fill(colors.step2)
    drawStepBit(x + edge2 - edge1, y, minus(Y), X)
    s.fill(colors.squares)
    drawSquare(x, y)
  }

  function drawStepBit(x, y, vx, vy) {
    s.beginShape()
    const { vertexAt } = v(s, vx, vy)
    vertexAt(x, y, 0, 0)
    vertexAt(x, y, edge2, 0)
    vertexAt(x, y, edge2, edge1)
    vertexAt(x, y, edge2 - edge1 - stroke, edge1)
    vertexAt(x, y, edge2 - edge1 - stroke, 2 * edge1 + stroke)
    vertexAt(x, y, -edge1 - stroke, 2 * edge1 + stroke)
    vertexAt(x, y, -edge1 - stroke, edge1 + stroke)
    vertexAt(x, y, 0, edge1 + stroke)
    s.endShape(s.CLOSE)
  }

  function drawSquare(x, y) {
    s.beginShape()
    s.vertex(x, y)
    s.vertex(x + squareSide, y)
    s.vertex(x + squareSide, y - squareSide)
    s.vertex(x, y - squareSide)
    s.endShape(s.CLOSE)
  }
}
