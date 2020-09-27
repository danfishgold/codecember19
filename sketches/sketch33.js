const s33 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const stroke = 4 * f
  const angle = 43
  const length = 110 * f
  const curveLength = 0.3 * length

  const fudge = -curveLength / 3

  const { vertexAt, quadraticVertexAt, xy, arrayAt } = v(
    s,
    new Vector(1, 0).rotate(-angle),
    new Vector(1, 0).rotate(180 + angle)
  )

  // // https://coolors.co/f1e4e8-e2dcde-ceb1be-b97375-2d2d34
  // const colors = {
  //   background: '#ceb1be',
  //   strokes: '#2d2d34',
  //   fill1: '#f1e4e8',
  //   fill2: '#b97375',
  // }

  // https://coolors.co/210124-750d37-b3dec1-dbf9f0-f7f9f7
  const colors = {
    background: '#F7F9F7',
    strokes: '#210124',
    fill1: '#DBF9F0',
    fill2: '#B3DEC1',
  }

  s.draw = () => {
    s.strokeWeight(stroke)
    s.stroke(colors.strokes)
    s.background(colors.background)

    drawInParallelogramGrid(
      s,
      canvasSide,
      xy(length + curveLength, -length - curveLength),
      xy(0, -length - curveLength).add(new Vector(0, fudge)),
      'unit-33',
      (x, y) =>
        drawUnit(
          ...arrayAt(x, y - fudge / 2, curveLength / 2, -curveLength / 2)
        )
    )

    drawBorder(s, colors.strokes, stroke)
    s.noLoop()
  }

  function drawUnit(x, y) {
    s.fill(colors.fill1)
    s.beginShape()
    vertexAt(x, y, 0, curveLength)
    vertexAt(x, y, length - curveLength, curveLength)
    quadraticVertexAt(x, y, length, curveLength, length, 0)
    vertexAt(x, y, curveLength, 0)
    quadraticVertexAt(x, y, 0, 0, 0, curveLength)
    s.endShape(s.CLOSE)

    s.fill(colors.fill2)
    s.beginShape()
    vertexAt(x, y, length, 0)
    vertexAt(x, y, length, -length + curveLength)
    quadraticVertexAt(x, y, length, -length, length + curveLength, -length)
    vertexAt(x, y, length + curveLength, -curveLength)
    quadraticVertexAt(x, y, length + curveLength, 0, length, 0)
    // vertexAt(x, y, length - curveLength, curveLength)
    // quadraticVertexAt(x, y, length, curveLength, length, 0)
    // vertexAt(x, y, curveLength, 0)
    // quadraticVertexAt(x, y, 0, 0, 0, curveLength)
    s.endShape(s.CLOSE)
  }
}
