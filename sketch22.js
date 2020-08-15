const s22 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
    s.angleMode(s.DEGREES)
  }

  const f = canvasSide / 800
  const edge = 15 * f
  const angle1 = 45 // or maybe 0???????
  const angle2 = angle1 + 90
  const v0 = s.createVector(edge, 0)
  const { X, Y, xy, minus } = v(
    s,
    v0.copy().rotate(angle1 * (s.PI / 180)),
    v0.copy().rotate(angle2 * (s.PI / 180)),
  )

  // https://coolors.co/e3170a-a9e5bb-fcf6b1-f7b32b-48304b
  const colors = {
    strokes: 'black',
    background: '#48304b',
    fs: ['#e3170a', '#a9e5bb', '#fcf6b1', '#f7b32b'],
  }

  s.draw = () => {
    s.background(colors.background)
    s.strokeWeight(2 * f)
    s.stroke(colors.strokes)

    for (const [x, y, i, j] of parallelogramGrid(
      canvasSide,
      xy(6, 6),
      xy(6, -6),
      // xy(6, 0),
      // xy(0, 6),
    )) {
      s.fill(colors.fs[mod(i + 2 * j, colors.fs.length)])
      drawUnit(x, y)
    }

    drawBorder(s, colors.strokes, 2 * f)
    s.noLoop()
  }

  function drawUnit(x, y) {
    for (const [v, u] of [
      [X, Y],
      [Y, minus(X)],
      [minus(X), minus(Y)],
      [minus(Y), X],
    ]) {
      drawF(x, y, v, u)
    }
  }

  const coefficients = [
    [0, 0],
    [1, -1],
    [1, -4],
    [2, -4],
    [2, -3],
    [3, -3],
    [3, -2],
    [2, -2],
    [2, -1],
    [5, -1],
    [6, 0],
    [0, 0],
  ]

  function drawF(x, y, X, Y) {
    const { vertexAt } = v(s, X, Y)
    s.beginShape()
    for (const [mx, my] of coefficients) {
      vertexAt(x, y, mx, my)
    }
    s.endShape()
  }
}
