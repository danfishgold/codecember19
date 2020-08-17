const s17 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const side = 100 * f
  const { A, B, C, abc, vertexAt, arrayAt } = vHex(s, side, 0, -60)

  // https://coolors.co/d64045-e9fff9-9ed8db-467599-1d3354
  const colors = {
    background: '#467599',
    smallTriangles: '#E9FFF9',
    bigTriangles: '#1D3354',
    strokes: 'black',
  }

  s.draw = () => {
    s.strokeWeight(1 * f)
    s.stroke(colors.strokes)
    s.background(colors.background)
    s.noFill()

    for ([x, y] of parallelogramGrid(
      canvasSide,
      abc(-4 / 3, 2 / 3, 0),
      abc(2, 0, 0),
    )) {
      drawUnit(x, y)
    }

    drawBorder(s, colors.strokes)
    s.noLoop()
  }

  function drawUnit(x, y) {
    s.fill(colors.smallTriangles)
    s.beginShape()
    vertexAt(x, y, 0, 0, 0)
    vertexAt(x, y, 1, 0, 0)
    vertexAt(x, y, 0, 1, 0)
    s.endShape(s.CLOSE)
    s.fill(colors.bigTriangles)
    s.beginShape()
    vertexAt(x, y, 1 / 3, 0, -1 / 3)
    vertexAt(x, y, 1 / 3, 1, -1 / 3)
    vertexAt(x, y, -2 / 3, 1, -1 / 3)
    s.endShape(s.CLOSE)
  }
}
