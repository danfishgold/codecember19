const s23 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
    s.angleMode(s.DEGREES)
  }

  const f = canvasSide / 800
  const edge = 20 * f
  const angle = 90
  const s2 = s.sqrt(2)
  const boop1 = 5 - s2 + Math.sin(22.5)
  const boop2 = 3
  const boop3 = (2 + boop1 - boop2) / 2
  const v0 = new Vector(edge, 0)
  const { X, Y, xy, minus } = v(s, v0.rotate(angle), v0.rotate(angle - 90))

  // const palette = shufflePalette(
  //   'https://coolors.co/0d1f2d-546a7b-9ea3b0-fae1df-e4c3ad',
  //   'https://coolors.co/eb5e55-3a3335-d81e5b-fdf0d5-c6d8d3',
  //   'https://coolors.co/e5f4e3-5da9e9-003f91-ffffff-6d326d',
  //   'https://coolors.co/f1dac4-a69cac-474973-161b33-0d0c1d',
  // )
  // const colors = [palette[1], palette[2], palette[4], palette[3]]
  // const colors = ['#e4c3ad', '#546a7b', '#fae1df', '#0d1f2d']
  // const colors = ['#ffffff', '#5da9e9', '#e5f4e3', '#003f91']
  // const colors = ['#f1dac4', '#161b33', '#a69cac', '#0d0c1d']

  // https://coolors.co/0d1f2d-546a7b-9ea3b0-fae1df-e4c3ad
  const colors = ['#0d1f2d', '#fae1df', '#0d1f2d', '#9EA3B0']

  s.draw = () => {
    s.noStroke()

    for (const [x, y, i, j] of parallelogramGrid(
      canvasSide,
      xy(8 - s2 + boop1 - boop2, 6 + s2 - boop1 + boop2),
    )) {
      drawUnit(x - 100, y + 100, 0 * (i + j))
    }

    drawBorder(s, null)
    s.noLoop()
  }

  function drawUnit(x, y, colorOffset) {
    ;[
      [X, Y],
      [Y, minus(X)],
      [minus(X), minus(Y)],
      [minus(Y), X],
    ].forEach(([v, u], idx) => {
      s.fill(colors[mod(colorOffset + idx, colors.length)])
      drawF(x, y, v, u)
    })
  }

  const coefficients = [
    [0, 0],
    [0, -1],
    [1, -1],
    [1, -2],
    [1 - boop1, -2],
    [2 - boop1, -3],
    [2 - boop1 + boop2, -3],
    [2 - boop1 + boop2 + boop3, -3 - boop3],
    [2 - boop1 + boop2 + boop3 + 1 / s2, -3 - boop3 + 1 / s2],
    [2 - boop1 + boop2 + boop3, -3 - boop3 + s2],
    [4, s2 - 1 + boop1 - boop2 - 2 * boop3],
    [4, s2 - 1 + boop1 - 2 * boop3],
    [5, s2 + boop1 - 2 * boop3],
    [5, s2 - 2 * boop3],
    [6, s2 - 2 * boop3],
    [6, s2 + 1 - 2 * boop3],
    [7, s2 + 1 - 2 * boop3],
    [7, 2 + s2 - 2 * boop3],
    [6, 2 + s2 - 2 * boop3],
    [6, 2 + s2 - 2 * boop3],
    [6, 3 + s2 - 2 * boop3],
    [6 + boop1, 3 + s2 - 2 * boop3],
    [5 + boop1, 4 + s2 - 2 * boop3],
    [5 + boop1 - boop2, s2 + 4 - 2 * boop3],
    [5 + boop1 - boop2 - boop3, s2 + 4 - boop3],
    [5 + boop1 - boop2 - boop3 - 1 / s2, 1 / s2 + 4 - boop3],
    [5 + boop1 - boop2 - boop3, 4 - boop3],
    [5 + boop1 - boop2 - boop3, 4 - boop3],
    [3, 2 - boop1 + boop2],
    [3, 2 - boop1],
    [2, 1 - boop1],
    [2, 1],
    [1, 1],
    [1, 0],
  ]

  function drawF(x, y, X, Y) {
    const { vertexAt } = v(s, X, Y)
    s.beginShape()
    for (const [mx, my] of coefficients) {
      vertexAt(x, y, mx, my)
    }
    s.endShape(s.CLOSE)
  }
}
