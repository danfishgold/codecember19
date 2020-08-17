const s16 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const s2 = s.sqrt(2)
  const len = 22 * f
  const side = 3 * s2 - 1 + dsin(22.5)
  const a1 = side / s2 - 2 * s2 + 1
  const { xy, rectAt } = v(s, new Vector(len, 0))

  // https://coolors.co/cee0dc-b9cfd4-afaab9-b48291-a5243d
  const colors = { c1: '#b9cfd4', c2: '#a5243d', squares: '#b48291' }

  // it's prettier with this color scheme but I already used it in 09
  // https://coolors.co/01161e-124559-598392-aec3b0-eff6e0
  // const colors = { c1: '#eff6e0', c2: '#124559', squares: '#aec3b0' }

  s.draw = () => {
    s.noStroke()
    s.background(colors.squares)
    for (const [x, y, i, j] of parallelogramGrid(
      canvasSide,
      xy(a1 + 1 - 1 / s2 + side, -a1 + 1 - 5 * (1 / s2)),
    )) {
      drawShape(x, y, mod(i + j, 2))
    }

    drawBorder(s, colors.c2, len / 2)
    s.noLoop()
  }

  function drawShape(x, y, colorIndex) {
    s.fill(colorIndex == 0 ? colors.c1 : colors.c2)
    s.beginShape()
    armVertices(x + (side / 2) * len, y - (side / 2) * len, 0)
    armVertices(x + (side / 2) * len, y + (side / 2) * len, 1)
    armVertices(x - (side / 2) * len, y + (side / 2) * len, 2)
    armVertices(x - (side / 2) * len, y - (side / 2) * len, 3)
    s.endShape(s.CLOSE)
    s.fill(colorIndex == 0 ? colors.c2 : colors.c1)
    // s.fill(colors.squares)
    rectAt(x, y, -side / 2 + 1, -side / 2 + 1, side - 2, side - 2)
  }

  const armCoefficients = [
    [-1 / s2, 0],
    [-1 / s2 + a1, -a1],
    [-1 / s2 + a1, -a1 - s2],
    [-3 / s2 + 1, -2 * a1 - 2 * s2 + 1],
    [-1 / s2 + 1, -2 * a1 - 2 * s2 + 1],
    [-1 / s2 + a1 + 1, -a1 - 2 * s2 + 1],
    [-1 / s2 + a1 + 1, s2 - a1 - 1],
    [0, 1 / s2],
  ]

  function armVertices(x, y, dir) {
    const { vertexAt } = v(s, new Vector(len, 0).rotate(dir * 90))
    for (const [mx, my] of armCoefficients) {
      vertexAt(x, y, mx, my)
    }
  }
}
