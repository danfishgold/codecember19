const s11 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
    s.angleMode(s.DEGREES)
  }

  const f = canvasSide / 800
  const side = 130 * f

  const crossWidth = side / 3
  const shadowWidth = side * (2 / 3)
  const crossHeight = side / 2 - crossWidth / 2

  // https://coolors.co/355070-6d597a-b56576-e56b6f-eaac8b
  const colors = {
    background: '#b56576',
    crosses: ['#e56b6f', '#eaac8b'],
    shadow: '#6d597a',
    stroke: '#355070',
  }

  const X = new Vector(1, 0).rotate(45)
  const Y = new Vector(0, 1).rotate(45)
  const { xy, vertexAt, rectAt } = v(s, X, Y)

  s.draw = () => {
    s.strokeWeight(4 * f)
    s.stroke(colors.stroke)
    s.background(colors.background)
    const v = xy(crossWidth + shadowWidth, crossWidth + crossHeight)
    const u = new Vector(v.y, -v.x)

    for (const [x, y, i, j] of parallelogramGrid(canvasSide, v, u)) {
      drawCross(x, y, mod(i + j, colors.crosses.length))
    }

    drawBorder(s, colors.stroke, 4 * f)
    s.noLoop()
  }

  function drawCross(x, y, colorIndex) {
    const wd = crossWidth
    const ht = crossHeight
    const sh = shadowWidth
    s.fill(colors.crosses[colorIndex])
    s.beginShape()
    vertexAt(x, y, -wd / 2, -wd / 2 - ht)
    vertexAt(x, y, wd / 2, -wd / 2 - ht)
    vertexAt(x, y, wd / 2, -wd / 2)
    vertexAt(x, y, wd / 2 + ht, -wd / 2)
    vertexAt(x, y, wd / 2 + ht, wd / 2)
    vertexAt(x, y, wd / 2, wd / 2)
    vertexAt(x, y, wd / 2, wd / 2 + ht)
    vertexAt(x, y, -wd / 2, wd / 2 + ht)
    vertexAt(x, y, -wd / 2, wd / 2)
    vertexAt(x, y, -wd / 2 - ht, wd / 2)
    vertexAt(x, y, -wd / 2 - ht, -wd / 2)
    vertexAt(x, y, -wd / 2, -wd / 2)
    s.endShape(s.CLOSE)

    s.fill(colors.shadow)
    rectAt(x, y, -wd / 2, -wd / 2, -sh, -ht)
    rectAt(x, y, +wd / 2, +wd / 2, sh, ht)
    rectAt(x, y, -wd / 2, +wd / 2, -ht, sh)
    rectAt(x, y, +wd / 2, -wd / 2, ht, -sh)
  }
}
