const s03 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
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
    drawInHexagonalGrid(
      s,
      canvasSide / 2 - side / 4,
      canvasSide / 2 + side / 2,
      side * s.sqrt(3),
      5,
      90,
      'unit-03',
      drawStar
    )

    drawBorder(s, colors.triangle)
    s.noLoop()
  }

  function drawStar(x, y) {
    // big lines
    s.stroke(colors.star)
    s.strokeWeight(2 * f)
    for (const angle of [30, 90, 150, 210, 270, 330]) {
      const dx = side * dcos(angle)
      const dy = side * dsin(angle)
      const fudge = s.random(-0.1, 0)
      s.line(
        x,
        y,
        x + (lengths.big + fudge) * dx,
        y + (lengths.big + fudge) * dy
      )
    }

    for (const angle of [0, 60, 120, 180, 240, 300]) {
      const dx = side * dcos(angle)
      const dy = side * dsin(angle)
      // small lines
      s.stroke(colors.star)
      s.strokeWeight(f)
      s.line(
        x - lengths.small * dx,
        y - lengths.small * dy,
        x + lengths.small * dx,
        y + lengths.small * dy
      )

      // extra lines
      s.stroke(colors.triangle)
      s.strokeWeight(f)
      s.line(
        x + lengths.extra0 * dx,
        y + lengths.extra0 * dy,
        x + lengths.extra1 * dx,
        y + lengths.extra1 * dy
      )
    }
  }
}
