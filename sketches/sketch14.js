const s14 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const edge = 49 * f
  const lineWidth = edge * 0.2
  const innerEdge = edge - lineWidth
  const { xy, vertexAt } = v(s)

  // https://coolors.co/565264-706677-a6808c-ccb7ae-d6cfcb
  const colors = { cross: '#565264', h: '#706677', lines: '#D6CFCB' }

  s.draw = () => {
    s.background(colors.lines)
    s.noStroke()

    drawInParallelogramGrid(
      s,
      canvasSide,
      xy(4 * edge, 0),
      xy(-edge, 4 * edge),
      'unit-14',
      (x, y) => {
        s.fill(colors.cross)
        drawCross(x, y)
        s.fill(colors.h)
        drawH(x - 3 * edge, y - edge)
      }
    )

    drawBorder(s, colors.lines, lineWidth)
    s.noLoop()
  }

  function drawCross(x, y, side) {
    const coeffs = [
      [0, 0],
      [innerEdge, 0],
      [innerEdge, edge],
      [innerEdge + edge, edge],
      [innerEdge + edge, edge + innerEdge],
      [innerEdge, edge + innerEdge],
      [innerEdge, 2 * edge + innerEdge],
      [0, 2 * edge + innerEdge],
      [0, edge + innerEdge],
      [-edge, edge + innerEdge],
      [-edge, edge],
      [0, edge],
    ]
    s.beginShape()
    for ([mx, my] of coeffs) {
      vertexAt(x, y, mx, my)
    }
    s.endShape(s.CLOSE)
  }

  function drawH(x, y) {
    const coeffs = [
      [0, 0],
      [innerEdge, 0],
      [innerEdge, edge],
      [2 * edge, edge],
      [2 * edge, 0],
      [2 * edge + innerEdge, 0],
      [2 * edge + innerEdge, edge + innerEdge],
      [edge + innerEdge, edge + innerEdge],
      [edge + innerEdge, 3 * edge],
      [2 * edge + innerEdge, 3 * edge],
      [2 * edge + innerEdge, 4 * edge + innerEdge],
      [2 * edge, 4 * edge + innerEdge],
      [2 * edge, 3 * edge + innerEdge],
      [innerEdge, 3 * edge + innerEdge],
      [innerEdge, 4 * edge + innerEdge],
      [0, 4 * edge + innerEdge],
      [0, 3 * edge],
      [edge, 3 * edge],
      [edge, edge + innerEdge],
      [0, edge + innerEdge],
    ]
    s.beginShape()
    for ([mx, my] of coeffs) {
      vertexAt(x, y, mx, my)
    }
    s.endShape(s.CLOSE)
  }
}
