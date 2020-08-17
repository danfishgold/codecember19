const s01 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const side = 100 * f

  const { xy, mult, X, Y } = v(s)

  // https://coolors.co/a40e4c-2c2c54-acc3a6-f5d6ba-f49d6e
  const colors = {
    half: '#a40e4c',
    outerQuarters: '#f5d6ba',
    innerQuarter1: '#2c2c54',
    innerQuarter2: '#acc3a6',
  }

  s.draw = () => {
    s.noStroke()
    for (const [x, y, i, j] of parallelogramGrid(
      canvasSide,
      mult(X, side),
      mult(Y, side),
    )) {
      drawSquare(x, y, (i + j) % 2)
    }
    drawBorder(s, null)
    s.noLoop()
  }

  function drawSquare(left, top, vertical) {
    const bottom = top + side
    const right = left + side
    const midX = left + side / 2
    const midY = top + side / 2
    s.strokeWeight(f)
    if (vertical) {
      s.fill(colors.half)
      s.triangle(left, top, right, top, midX, midY)
      s.triangle(left, bottom, right, bottom, midX, midY)
      s.fill(colors.outerQuarters)
      s.triangle(left, top, left + side / 4, midY, left, bottom)
      s.triangle(right, top, right - side / 4, midY, right, bottom)
      s.fill(colors.innerQuarter1)
      s.triangle(left, top, left + side / 4, top + side / 2, midX, midY)
      s.fill(colors.innerQuarter2)
      s.triangle(left, bottom, left + side / 4, top + side / 2, midX, midY)
      s.fill(colors.innerQuarter2)
      s.triangle(right, top, right - side / 4, top + side / 2, midX, midY)
      s.fill(colors.innerQuarter1)
      s.triangle(right, bottom, right - side / 4, top + side / 2, midX, midY)
    } else {
      s.fill(colors.half)
      s.triangle(left, top, left, bottom, midX, midY)
      s.triangle(right, top, right, bottom, midX, midY)
      s.fill(colors.outerQuarters)
      s.triangle(left, top, right, top, midX, top + side / 4)
      s.triangle(left, bottom, right, bottom, midX, bottom - side / 4)
      s.fill(colors.innerQuarter2)
      s.triangle(left, top, midX, top + side / 4, midX, midY)
      s.fill(colors.innerQuarter1)
      s.triangle(right, top, midX, top + side / 4, midX, midY)
      s.fill(colors.innerQuarter1)
      s.triangle(left, bottom, midX, bottom - side / 4, midX, midY)
      s.fill(colors.innerQuarter2)
      s.triangle(right, bottom, midX, bottom - side / 4, midX, midY)
    }
  }
}
