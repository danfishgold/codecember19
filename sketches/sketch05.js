const s05 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const l = canvasSide / 20
  const n = l * (s.sqrt(3) / 2)

  // https://coolors.co/ed6a5a-f4f1bb-9bc1bc-5d576b-e6ebe0
  const colors = ['#ed6a5a', '#9bc1bc', '#e6ebe0']

  function color(index) {
    const mod = index % 3
    if (mod < 0) {
      return colors[3 + mod]
    } else {
      return colors[mod]
    }
  }
  s.draw = () => {
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

    drawBorder(s, 'black', 2 * f)
    s.noLoop()
  }

  function megaHexagon(x, y, colorIndex) {
    s.fill(color(colorIndex))
    hexagonPiece(x, y, 30)
    s.fill(color(colorIndex + 1))
    hexagonPiece(x, y, 150)
    s.fill(color(colorIndex + 2))
    hexagonPiece(x, y, 270)

    for (const [x1, y1, i, j, idx] of hexagonalGrid(x, y, 2 * n, 1, 30)) {
      if (i == 0 && j == 0) {
        continue
      }
      s.fill(color(colorIndex + idx + 1))
      hexagonPiece(x1, y1, 60 * (-idx - 0.5))
    }
  }

  function hexagonPiece(x, y, angle) {
    const v0 = new Vector(1, 0).rotate(angle)
    const v1 = v0.rotate(-60)
    const v2 = v0.rotate(60)

    s.beginShape()
    s.vertex(x, y)
    s.vertex(x + n * v1.x, y + n * v1.y)
    s.vertex(x + n * v1.x - (l * v1.y) / 2, y + n * v1.y + (l * v1.x) / 2)
    s.vertex(x + n * v2.x + (l * v2.y) / 2, y + n * v2.y - (l * v2.x) / 2)
    s.vertex(x + n * v2.x, y + n * v2.y)
    s.endShape(s.CLOSE)

    s.push()
    s.strokeWeight(2 * f)
    s.beginShape()
    s.vertex(x + n * v1.x, y + n * v1.y)
    s.vertex(x + n * v1.x - (l * v1.y) / 2, y + n * v1.y + (l * v1.x) / 2)
    s.vertex(x + n * v2.x + (l * v2.y) / 2, y + n * v2.y - (l * v2.x) / 2)
    s.vertex(x + n * v2.x, y + n * v2.y)
    s.endShape()
    s.pop()
  }
}
