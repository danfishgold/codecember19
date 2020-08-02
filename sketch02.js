const s02 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
    s.angleMode(s.DEGREES)
  }

  const offsetX = -200 * (canvasSide / 800)
  const offsetY = 0

  // https://coolors.co/22162b-451f55-724e91-e54f6d-f8c630
  const colors = {
    background: '#451f55',
    r1: '#f8c630',
    r2: '#e54f6d',
    r3: '#724e91',
  }

  s.draw = () => {
    s.background(colors.background)
    const ht = 98 * (canvasSide / 800)
    const wd = (ht * 3) / 4
    const dx1 = (wd * s.sqrt(3)) / 2 + (ht * s.sqrt(3)) / 2
    const dy1 = ht / 2 - wd / 2
    const dx2 = (wd * s.sqrt(3)) / 2
    const dy2 = ht + wd / 2
    for (const i of range(6)) {
      for (const j of range(6)) {
        drawThreeRhombi(
          offsetX + i * dx1 + j * dx2,
          offsetY + i * dy1 + j * dy2,
          wd,
          ht,
        )
      }
    }
    drawBorder(s, 'black')
    s.noLoop()
  }

  function drawThreeRhombi(x, y, wd, ht) {
    s.fill(colors.r1)
    drawRhombus(x, y, wd, ht, 0)
    s.fill(colors.r2)
    drawRhombus(x + (wd * s.sqrt(3)) / 2, y + ht + wd / 2, wd, ht, 120)
    s.fill(colors.r3)
    drawRhombus(
      x + (wd * s.sqrt(3)) / 2 + (ht * s.sqrt(3)) / 2,
      y + ht / 2 - wd / 2,
      wd,
      ht,
      240,
    )
  }

  function drawRhombus(x, y, wd, ht, angle) {
    const dx1 = wd * s.sin(angle + 60)
    const dy1 = wd * s.cos(angle + 60)
    const dx2 = ht * s.sin(angle)
    const dy2 = ht * s.cos(angle)
    s.strokeWeight(canvasSide / 800)
    s.quad(
      x,
      y,
      x + dx1,
      y + dy1,
      x + dx1 + dx2,
      y + dy1 + dy2,
      x + dx2,
      y + dy2,
    )
  }
}
