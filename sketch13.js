const s13 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
    s.angleMode(s.DEGREES)
  }

  const f = canvasSide / 800
  const len = f * 80

  // https://coolors.co/00243d-1a7a89-ffe6c2-ff9633-78290f
  const colors = { background: '#00243D', strokes: '#1A7A89' }

  s.draw = () => {
    s.background(colors.background)
    s.strokeWeight(len / 16)
    s.stroke(colors.strokes)
    s.noFill()
    for (const [x, y] of fillingHexagonalGrid(canvasSide, 1.5 * len, -33)) {
      for (const angle of [0, 120, 240]) {
        drawShape(x, y, 18 + angle)
      }
    }

    drawBorder(s, colors.strokes, len / 16)
    s.noLoop()
  }

  function drawShape(x, y, angle) {
    // I fudged all of these numbers
    const { bezierVertexAt, vertexAt, quadraticVertexAt } = v(
      s,
      s.createVector(len, 0).rotate(angle),
    )
    s.beginShape()
    s.vertex(x, y)
    bezierVertexAt(x, y, 0.4, -0.1, 0.7, 0.6, 1, 0)
    s.endShape()

    s.beginShape()
    s.vertex(x, y)
    s.endShape()

    s.beginShape()
    vertexAt(x, y, 0.9, 0.1)
    quadraticVertexAt(x, y, 0.8, 0, 0.8, -0.1)
    s.endShape()
  }
}
