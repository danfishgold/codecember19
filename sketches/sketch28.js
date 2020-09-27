const s28 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const edge = 28 * f
  const stroke = edge * 0.3
  const wd = 4 * edge + 3 * stroke
  const ht = 6 * edge + 5 * stroke
  const h = edge - stroke * 1.3
  const n = edge / 2 + stroke * 0.5
  const m = edge / 2 + stroke * 1.5

  // https://coolors.co/f0eaeb-d4cfd8-b1aebc-8f8593-2b3140
  const colors = {
    strokes: '#2b3140',
    middles: '#d4cfd8',
    squares: '#d4cfd8',
    corners: '#f0eaeb',
    rectangles: '#8f8593',
  }

  s.draw = () => {
    s.noStroke()
    s.background(colors.strokes)
    const boop = wd + ht + 2 * stroke

    drawInParallelogramGrid(
      s,
      canvasSide,
      new Vector(boop, 0),
      new Vector(boop / 2, boop / 2),
      'unit-28',
      (x, y) => {
        drawUnit(x, y, true)
        drawUnit(x + wd / 2 + ht / 2 + stroke, y, false)
        s.fill(colors.squares)
        drawSquare(x + wd / 2 + stroke, y - ht / 2)
        drawSquare(x - wd / 2 - stroke - edge, y - ht / 2)
      }
    )
    drawBorder(s, colors.strokes, stroke)
    s.noLoop()
  }

  function drawUnit(x, y, isHorizontal) {
    const { vectorAt, X, Y, minus } = isHorizontal
      ? v(s, new Vector(1, 0))
      : v(s, new Vector(0, 1))

    s.fill(colors.corners)
    drawCorner(vectorAt(x, y, -wd / 2, +ht / 2), X, Y)
    drawCorner(vectorAt(x, y, +wd / 2, +ht / 2), minus(X), Y)
    drawCorner(vectorAt(x, y, -wd / 2, -ht / 2), X, minus(Y))
    drawCorner(vectorAt(x, y, +wd / 2, -ht / 2), minus(X), minus(Y))

    s.fill(colors.rectangles)
    drawRectangleSide(vectorAt(x, y, -wd / 2 + edge / 2, 0), X)
    drawRectangleSide(vectorAt(x, y, wd / 2 - edge / 2, 0), X)

    s.fill(colors.middles)
    drawMiddle(vectorAt(x, y, -edge - stroke / 2, -edge - stroke / 2), X)
  }

  function drawCorner(p0, X, Y) {
    const { vertexAt } = v(s, X, Y)
    const [x, y] = p0.array()
    s.beginShape()
    vertexAt(x, y, 0, 0)
    vertexAt(x, y, 2 * edge + stroke, 0)
    vertexAt(x, y, 2 * edge + stroke, -2 * edge - stroke)
    vertexAt(x, y, edge + stroke, -2 * edge - stroke)
    vertexAt(x, y, edge + stroke, -edge)
    vertexAt(x, y, 0, -edge)
    s.endShape(s.CLOSE)
  }

  function drawRectangleSide(pc, X) {
    const { vertexAt } = v(s, X)
    const [xc, yc] = pc.array()
    s.beginShape()
    vertexAt(xc, yc, -edge / 2, -(edge * 2 + stroke * 1.5))
    vertexAt(xc, yc, edge / 2, -(edge * 2 + stroke * 1.5))
    vertexAt(xc, yc, edge / 2, edge * 2 + stroke * 1.5)
    vertexAt(xc, yc, -edge / 2, edge * 2 + stroke * 1.5)
    s.endShape(s.CLOSE)
  }

  function drawMiddle(p0, X) {
    const [x, y] = p0.array()
    const { vertexAt } = v(s, X)

    s.beginShape()
    vertexAt(x, y, 0, 0)
    vertexAt(x, y, edge, 0)
    vertexAt(x, y, edge, h)
    vertexAt(x, y, edge - n, h)
    vertexAt(x, y, edge - n, h + m)
    vertexAt(x, y, edge - n + stroke, h + m)
    vertexAt(x, y, edge - n + stroke, h + stroke)
    vertexAt(x, y, edge + stroke, h + stroke)
    vertexAt(x, y, edge + stroke, 0)
    vertexAt(x, y, 2 * edge + stroke, 0)
    vertexAt(x, y, 2 * edge + stroke, 2 * edge + stroke)
    vertexAt(x, y, edge + stroke, 2 * edge + stroke)
    vertexAt(x, y, edge + stroke, 2 * edge + stroke - h)
    vertexAt(x, y, edge + stroke + n, 2 * edge + stroke - h)
    vertexAt(x, y, edge + stroke + n, 2 * edge + stroke - h - m)
    vertexAt(x, y, edge + n, 2 * edge + stroke - h - m)
    vertexAt(x, y, edge + n, 2 * edge - h)
    vertexAt(x, y, edge, 2 * edge - h)
    vertexAt(x, y, edge, 2 * edge + stroke)
    vertexAt(x, y, 0, 2 * edge + stroke)
    s.endShape(s.CLOSE)
  }

  function drawSquare(x, y) {
    s.beginShape()
    s.vertex(x, y)
    s.vertex(x + edge, y)
    s.vertex(x + edge, y + edge)
    s.vertex(x, y + edge)
    s.endShape(s.CLOSE)
  }
}
