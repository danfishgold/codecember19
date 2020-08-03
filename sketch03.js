const s03 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
    s.angleMode(s.DEGREES)
  }

  const f = canvasSide / 800
  const offsetX = -canvasSide / 2
  const offsetY = -canvasSide

  const side = canvasSide / 16

  // https://coolors.co/dd6e42-e8dab2-4f6d7a-c0d6df-eaeaea
  const colors = {
    background: '#eaeaea',
    star: '#dd6e42',
    triangle: '#4f6d7a',
  }

  const lengths = {
    big: 0.7,
    small: 0.45,
    extra0: 0.75,
    extra1: 1,
  }

  s.draw = () => {
    s.background(colors.background)
    const dx1 = 0
    const dy1 = side * s.sqrt(3)
    const dx2 = side * 1.5
    const dy2 = (side / 2) * s.sqrt(3)

    for (const i in range(15)) {
      for (const j in range(10)) {
        drawStar(
          offsetX + canvasSide / 2 + i * dx1 + j * dx2,
          offsetY + canvasSide / 2 + i * dy1 + j * dy2,
          side,
        )
      }
    }
    drawBorder(s, colors.triangle)
    s.noLoop()
  }

  function drawStar(x, y, len) {
    // big lines
    s.stroke(colors.star)
    s.strokeWeight(2 * f)
    for (const angle of [30, 90, 150, 210, 270, 330]) {
      const dx = len * s.cos(angle)
      const dy = len * s.sin(angle)
      const fudge = s.random(-0.1, 0)
      s.line(
        x,
        y,
        x + (lengths.big + fudge) * dx,
        y + (lengths.big + fudge) * dy,
      )
    }

    for (const angle of [0, 60, 120, 180, 240, 300]) {
      const dx = len * s.cos(angle)
      const dy = len * s.sin(angle)
      // small lines
      s.stroke(colors.star)
      s.strokeWeight(f)
      s.line(
        x - lengths.small * dx,
        y - lengths.small * dy,
        x + lengths.small * dx,
        y + lengths.small * dy,
      )

      // extra lines
      s.stroke(colors.triangle)
      s.strokeWeight(f)
      s.line(
        x + lengths.extra0 * dx,
        y + lengths.extra0 * dy,
        x + lengths.extra1 * dx,
        y + lengths.extra1 * dy,
      )
    }
  }
}
