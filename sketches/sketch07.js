const s07 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const edge = canvasSide / 26
  const stroke = 0 * f

  // https://coolors.co/463f1a-60492c-0e79b2-0d2149-ffca3a
  const colors = ['#0e79b2', '#ffca3a', '#0d2149']

  s.draw = () => {
    s.strokeWeight(stroke)

    for (const [x, y, i, j] of fillingHexagonalGrid(
      canvasSide,
      edge * s.sqrt(39),
      datan(-2 * s.sqrt(3))
    )) {
      drawManyThings(x, y, ((i + j) % 3) * 60)
    }
    drawBorder(s, 'black', stroke)
    s.noLoop()
  }

  function drawManyThings(x, y, angle) {
    s.fill(colors[0])
    drawThing(x, y, angle + 0)
    s.fill(colors[1])
    drawThing(x, y, angle + 60)
    s.fill(colors[2])
    drawThing(x, y, angle + 120)
    s.fill(colors[0])
    drawThing(x, y, angle + 180)
    s.fill(colors[1])
    drawThing(x, y, angle + 240)
    s.fill(colors[2])
    drawThing(x, y, angle + 300)
  }

  function drawThing(x, y, angle) {
    const v0 = new Vector(edge, 0).rotate(angle)
    const v1 = v0.rotate(-30)
    const v2 = v0.rotate(-90)
    const { vertexAt } = v(s, v1, v2)

    const multipliers = [
      [0, 0],
      [1, 0],
      [2, -1],
      [2, -2],
      [3, -3],
      [4, -3],
      [3, -2],
      [3, -1],
      [4, -1],
      [4, 0],
      [3, 1],
      [3, 0],
      [2, 0],
      [1, 1],
      [0, 1],
    ]
    s.beginShape()
    for (const [k, l] of multipliers) {
      vertexAt(x, y, k, l)
    }
    s.endShape(s.CLOSE)
  }
}
