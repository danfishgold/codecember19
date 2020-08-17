const s21 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const edge1 = 80 * f
  const edge2 = 0.4 * edge1

  // // https://coolors.co/0d1f2d-546a7b-9ea3b0-fae1df-e4c3ad
  // const colors = {
  //   asterisks: ['#9ea3b0', '#fae1df', '#e4c3ad'],
  //   background: '#546a7b',
  //   strokes: '#0d1f2d',
  // }

  // // https://coolors.co/fefffe-e5fcf5-b3dec1-210124-750d37
  // const colors = {
  //   strokes: '#210124',
  //   background: '#e5fcf5',
  //   asterisks: ['#b3dec1', '#750d37', '#fefffe'],
  // }

  // https://coolors.co/9ad2cb-d7ebba-feffbe-ebd494-472836
  const colors = {
    strokes: '#472836',
    background: '#ebd494',
    asterisks: ['#9ad2cb', '#d7ebba', '#feffbe'],
  }

  s.draw = () => {
    s.background(colors.background)
    s.stroke(colors.strokes)
    s.strokeWeight(4 * f)
    const v1 = new Vector(edge2, edge1 + s.sqrt(3) * edge2)
    for (const [x, y, i, j] of fillingHexagonalGrid(
      canvasSide,
      v1.mag(),
      v1.heading(),
    )) {
      s.fill(colors.asterisks[mod(i + j, 3)])
      drawBaseShape(x, y)
    }

    drawBorder(s, colors.strokes, 4 * f)
    s.noLoop()
  }

  function drawBaseShape(x, y) {
    s.beginShape()
    for (index of range(6)) {
      const { vertexAt } = v(
        s,
        new Vector(1, 0).rotate(60 * index),
        new Vector(0, 1).rotate(60 * index),
      )
      const dx = -edge2 / 2
      const dy = -edge2 * (s.sqrt(3) / 2)
      vertexAt(x, y, dx, dy)
      vertexAt(x, y, dx, dy - edge1)
      vertexAt(x, y, dx + edge2, dy - edge1 + edge2 * (s.sqrt(3) / 3))
      vertexAt(x, y, dx + edge2, dy)
    }
    s.endShape()
  }
}
