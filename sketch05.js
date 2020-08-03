const s05 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
    s.angleMode(s.DEGREES)
  }

  const f = canvasSide / 800
  const l = 30
  const n = l * (s.sqrt(3) / 2)

  const offsetX = 0
  const offsetY = 0

  const palette = shufflePalette(
    // 'https://coolors.co/c6ebbe-a9dbb8-7ca5b8-38369a-020887',
    'https://coolors.co/8cb369-f4e285-f4a259-5b8e7d-bc4b51',
  )
  console.log(palette)
  const colors = [palette[0], palette[1], palette[2]]

  function color(index) {
    return colors[(3 + index) % 3]
  }
  s.draw = () => {
    s.strokeWeight(f)
    for (const [x, y, i, j] of hexagonalGrid(400, 400, 3 * l, 4, 0)) {
      megaHexagon(x, y, (i + j) % 3)
    }

    drawBorder(s, 'black')
    s.noLoop()
  }

  function megaHexagon(x, y, colorIndex) {
    const v1 = s.createVector(1, 0).rotate(30)
    const v2 = s.createVector(1, 0).rotate(150)
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
      hexagonPiece(x1, y1, 60 * (-idx - 0.5))
    }
  }

  function hexagonPiece(x, y, angle) {
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
