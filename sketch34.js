const s34 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const stroke = 3 * f
  const edge = 80 * f
  const wd = 35 * f
  const s2 = Math.SQRT2

  const { vertexAt, xy } = v(s, new Vector(1, 0))

  // https://coolors.co/f9dbbd-fca17d-da627d-9a348e-0d0628
  const colors = {
    horizontal: '#f9dbbd',
    diagonals: ['#da627d', '#fca17d'],
    background: '#0d0628',
  }

  s.draw = () => {
    s.strokeWeight(stroke)
    s.background(colors.background)

    for (const [x, y, i, j] of parallelogramGrid(
      canvasSide,
      xy(edge + wd, edge + wd),
      xy(edge + wd, -edge - wd),
    )) {
      drawUnit(x, y)
    }

    drawBorder(s, 'black', stroke)
    s.noLoop()
  }

  function drawUnit(x, y) {
    s.fill(colors.horizontal)
    drawPlus(x, y)
    s.fill(colors.diagonals[0])
    drawCross(x, y - edge - wd)
    s.fill(colors.diagonals[1])
    drawDiagonalBit(x, y, true)
    drawDiagonalBit(x, y, false)
  }

  function drawPlus(x, y) {
    const c1 = wd / 2
    const c2 = edge + wd - wd / s2
    const c3 = edge + wd / 2 - wd / s2

    s.beginShape()
    vertexAt(x, y, c3, c1)
    vertexAt(x, y, c2, 0)
    vertexAt(x, y, c3, -c1)
    vertexAt(x, y, c1, -c1)
    vertexAt(x, y, c1, -c3)
    vertexAt(x, y, 0, -c2)
    vertexAt(x, y, -c1, -c3)
    vertexAt(x, y, -c1, -c1)
    vertexAt(x, y, -c3, -c1)
    vertexAt(x, y, -c2, 0)
    vertexAt(x, y, -c3, c1)
    vertexAt(x, y, -c1, c1)
    vertexAt(x, y, -c1, c3)
    vertexAt(x, y, 0, c2)
    vertexAt(x, y, c1, c3)
    vertexAt(x, y, c1, c1)
    vertexAt(x, y, c3, c1)
    s.endShape()
  }

  function drawCross(x, y) {
    const ht = edge / s2 + wd / s2 - wd / 2
    const { vertexAt, arrayAt } = v(s, new Vector(1, 0).rotate(45))

    s.beginShape()
    vertexAt(x, y, wd / 2, wd / 2)
    vertexAt(x, y, wd / 2, ht)
    vertexAt(x, y, -wd / 2, ht)
    vertexAt(x, y, -wd / 2, wd / 2)
    vertexAt(x, y, -ht, wd / 2)
    vertexAt(x, y, -ht, -wd / 2)
    vertexAt(x, y, -wd / 2, -wd / 2)
    vertexAt(x, y, -wd / 2, -ht)
    vertexAt(x, y, wd / 2, -ht)
    vertexAt(x, y, wd / 2, -wd / 2)
    vertexAt(x, y, ht, -wd / 2)
    vertexAt(x, y, ht, wd / 2)
    s.endShape(s.CLOSE)
  }

  function drawDiagonalBit(x, y, isRight) {
    const dirX = isRight ? 1 : -1

    const vertex = (a, b) => vertexAt(x, y, dirX * a, b)

    s.beginShape()
    vertex(wd / 2, -wd / 2)
    vertex(wd / 2 + wd / s2, -wd / 2)
    vertex(wd / 2 + edge, -wd / 2 - edge + wd / s2)
    vertex(wd / 2 + edge, -wd / 2 - edge)
    vertex(wd / 2 + edge - wd / s2, -wd / 2 - edge)
    vertex(wd / 2, -wd / 2 - wd / s2)
    s.endShape(s.CLOSE)
  }
}
