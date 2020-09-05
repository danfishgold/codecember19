const s35 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const stroke = 4 * f
  const edge = 27 * f

  const { xy, vertexAt } = v(s, new Vector(edge, 0).rotate(60))

  // https://coolors.co/abe188-f7ef99-f1bb87-f78e69-5d675b
  const colors = { strokes: '#5d675b', fill1: '#abe188', fill2: '#f7ef99' }

  s.draw = () => {
    s.strokeWeight(stroke)
    s.stroke(colors.strokes)
    s.background('white')

    for (const [x, y] of parallelogramGrid(canvasSide, xy(3, 3))) {
      drawUnit(x, y)
    }

    drawBorder(s, colors.strokes, stroke)
    s.noLoop()
  }

  const coeffs = [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
    [2, 0],
    [3, 0],
    [3, -1],
    [2, -1],
    [2, -2],
    [3, -2],
    [3, -3],
    [2, -3],
    [2, -4],
    [1, -4],
    [1, -3],
    [0, -3],
    [0, -2],
    [1, -2],
    [1, -1],
    [0, -1],
  ]

  function drawUnit(x, y) {
    s.fill(colors.fill1)
    s.beginShape()
    for (const [mx, my] of coeffs) {
      vertexAt(x, y, mx, my)
    }
    s.endShape(s.CLOSE)

    s.fill(colors.fill2)
    s.beginShape()
    for (const [my, mx] of coeffs) {
      vertexAt(x, y, mx, my - 3)
    }
    s.endShape(s.CLOSE)
  }
}
