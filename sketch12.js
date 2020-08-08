const s12 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
    s.angleMode(s.DEGREES)
  }

  const f = canvasSide / 800
  const side = 130 * f

  const crossWidth = side / 3
  const shadowWidth = side * (1 / 3)
  const crossHeight = side / 2 - crossWidth / 2

  function vectorAt(x, y, mx, my) {
    const delta = add(
      mult(X.copy().rotate(45 * (s.PI / 180)), mx),
      mult(Y.copy().rotate(45 * (s.PI / 180)), my),
    )
    return s.createVector(x + delta.x, y + delta.y)
  }

  function vertexAt(x, y, mx, my) {
    const vec = vectorAt(x, y, mx, my)
    s.vertex(vec.x, vec.y)
  }

  function rectAt(x, y, mx, my, wd, ht) {
    s.beginShape()
    vertexAt(x, y, mx, my)
    vertexAt(x, y, mx + wd, my)
    vertexAt(x, y, mx + wd, my + ht)
    vertexAt(x, y, mx, my + ht)
    s.endShape(s.CLOSE)
  }

  // https://coolors.co/efecca-a9cbb7-ff934f-5e565a
  const colors = {
    background: '#5e565a',
    crosses: ['#a9cbb7', '#efecca'],
    shadow: '#ff934f',
    stroke: 'black',
  }

  s.draw = () => {
    s.strokeWeight(4 * f)
    s.stroke(colors.stroke)
    s.background(colors.background)
    const v = vectorAt(0, 0, crossWidth + shadowWidth, crossWidth + crossHeight)
    const u = s.createVector(v.y, -v.x)

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
