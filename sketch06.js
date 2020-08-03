const s06 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
    s.angleMode(s.DEGREES)
  }

  const f = canvasSide / 800
  const l = canvasSide / 20
  const n = l * (s.sqrt(3) / 2)

  // https://coolors.co/8d6a9f-c5cbd3-8cbcb9-dda448-bb342f
  const colors = {
    background: '#8cbcb9',
    triangles: ['#dda448', '#c5cbd3', '#8d6a9f'],
  }

  function color(index) {
    const mod = index % 3
    if (mod < 0) {
      return colors.triangles[3 + mod]
    } else {
      return colors.triangles[mod]
    }
  }
  s.draw = () => {
    s.background(colors.background)
    s.strokeWeight(f)
    for (const [x, y, i, j] of hexagonalGrid(
      canvasSide / 2,
      canvasSide / 2,
      3 * l,
      Math.ceil(canvasSide / (4 * l)),
      0,
    )) {
      megaHexagon(x, y, (i + j) % 3)
    }

    drawBorder(s, 'black')
    s.noLoop()
  }

  function megaHexagon(x, y, colorIndex) {
    s.fill(color(colorIndex))
    trianglePiece(x, y, 90 + 0)
    s.fill(color(colorIndex - 1))
    trianglePiece(x, y, 90 + 120)
    s.fill(color(colorIndex - 2))
    trianglePiece(x, y, 90 + 240)

    for (const [x1, y1, i, j, idx] of hexagonalGrid(x, y, 2 * n, 1, 30)) {
      if (i == 0 && j == 0) {
        continue
      }
      s.fill(color(colorIndex))
      trianglePiece(x1, y1, 60 * (-idx - 0.5))
    }
  }

  function trianglePiece(x, y, angle) {
    const v = s.createVector(1, 0).rotate(angle)

    const v1 = v.copy().rotate(-60)
    const v2 = v.copy().rotate(60)
    s.beginShape()
    s.vertex(x, y)
    s.vertex(x + n * v1.x, y + n * v1.y)
    s.vertex(x + n * v2.x, y + n * v2.y)
    s.endShape(s.CLOSE)
  }
}
