const s02 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const ht = 98 * f
  const wd = ht * (3 / 4)

  // https://coolors.co/22162b-451f55-724e91-e54f6d-f8c630
  const colors = {
    background: '#451f55',
    r1: '#f8c630',
    r2: '#e54f6d',
    r3: '#724e91',
  }

  s.draw = () => {
    s.background(colors.background)
    const diagonal = s.sqrt(ht * ht + wd * wd + ht * wd) // cosine theorem
    const angle = dacos((ht + wd / 2) / diagonal) // cosine theorem again
    for (const [x, y] of hexagonalGrid(
      canvasSide / 2 - wd,
      canvasSide / 2 - ht / 2,
      diagonal,
      3,
      angle + 90,
    )) {
      drawThreeRhombi(x, y)
    }
    drawBorder(s, 'black')
    s.noLoop()
  }

  function drawThreeRhombi(x, y) {
    s.fill(colors.r1)
    drawRhombus(x, y, 0)
    s.fill(colors.r2)
    drawRhombus(x + (wd * s.sqrt(3)) / 2, y + ht + wd / 2, 120)
    s.fill(colors.r3)
    drawRhombus(
      x + (wd * s.sqrt(3)) / 2 + (ht * s.sqrt(3)) / 2,
      y + ht / 2 - wd / 2,
      240,
    )
  }

  function drawRhombus(x, y, angle) {
    const dx1 = wd * dsin(angle + 60)
    const dy1 = wd * dcos(angle + 60)
    const dx2 = ht * dsin(angle)
    const dy2 = ht * dcos(angle)
    s.strokeWeight(f)
    s.beginShape()
    s.vertex(x, y)
    s.vertex(x + dx1, y + dy1)
    s.vertex(x + dx1 + dx2, y + dy1 + dy2)
    s.vertex(x + dx2, y + dy2)
    s.endShape(s.CLOSE)
  }
}
