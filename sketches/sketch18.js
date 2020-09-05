const s18 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const s2 = s.sqrt(2)
  const stroke = 7 * f
  const padding1 = stroke * 0.5
  const padding2 = stroke * 0.5
  const edge = 82 * f
  const smallEdge = edge * 0.33 - stroke
  const { vertexAt } = v(s)

  // https://coolors.co/925e78-bd93bd-f2edeb-f05365-fabc2a
  const colors = { strokes: ['#925e78', '#f05365'], background: '#F2EDEB' }

  // https://coolors.co/381d2a-3e6990-aabd8c-e9e3b4-f39b6d
  // const colors = { strokes: ['#381D2A', '#3E6990'], background: '#E9E3B4' }

  // https://coolors.co/424b54-b38d97-d5aca9-ebcfb2-c5baaf
  // const colors = { strokes: ['#c5baaf', '#d5aca9'], background: '#424b54' }

  s.draw = () => {
    s.background(colors.background)
    s.noStroke()
    s.fill(colors.strokes[0])

    for (const [x, y, i, j] of parallelogramGrid(
      canvasSide,
      new Vector(
        (edge + edge / 2 - (3 * stroke) / 2) * s2,
        (edge - stroke) / s2,
      ),
      new Vector(0, s2 * (edge - stroke)),
    )) {
      drawUnit(x, y, j)
    }
    drawBorder(s, colors.strokes[0], stroke)
    s.noLoop()
  }

  function drawUnit(x, y, colorIndex) {
    s.fill(colors.strokes[mod(colorIndex, 2)])
    drawHalfUnit(x, y, true)
    s.fill(colors.strokes[mod(colorIndex + 1, 2)])
    drawHalfUnit(x, y, false)
  }

  // oh boy
  const coefficients = [
    [0, 0],
    [edge, 0],
    [edge, edge - stroke - padding1],
    [edge - stroke - padding1, edge - stroke - padding1],
    [(edge + smallEdge) / 2, (edge + smallEdge) / 2],
    [(edge + smallEdge) / 2, (edge - smallEdge) / 2],
    [(edge - smallEdge) / 2 + s2 * padding2, (edge - smallEdge) / 2],
    [
      (edge - smallEdge) / 2 + s2 * padding2 - stroke,
      (edge - smallEdge) / 2 - stroke,
    ],
    [(edge + smallEdge) / 2 + stroke, (edge - smallEdge) / 2 - stroke],
    [
      (edge + smallEdge) / 2 + stroke,
      (edge + smallEdge) / 2 - stroke * dsin(22.5),
    ],
    [edge - stroke, edge - stroke * (1 + s2)],
    [edge - stroke, stroke],
    [0, stroke],
  ]

  function drawHalfUnit(x, y, dir) {
    s.beginShape()
    for ([mx, my] of coefficients) {
      if (dir) {
        s.vertex(x + (mx - my) / s2, y - (mx + my) / s2)
      } else {
        s.vertex(x - (mx - my) / s2, y - s2 * edge + (mx + my) / s2)
      }
    }
    s.endShape(s.CLOSE)
  }
}
