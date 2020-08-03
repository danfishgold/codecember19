const s04 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const l = (38 * canvasSide) / 800
  const offsetX = -1.5 * l
  const offsetY = 4 * l

  // https://coolors.co/805d93-f49fbc-ffd3ba-231f20-bb4430
  const colors = {
    thorps1: '#ffd3ba',
    thorps2: '#f49fbc',
    centers: '#805d93',
  }

  s.draw = () => {
    s.strokeWeight(canvasSide / 800)
    s.background(colors.centers)
    const n = Math.ceil(canvasSide / l / 4)
    for (const i in range(n)) {
      for (const j in range(n)) {
        const color = (i ^ j) % 2 == 0 ? colors.thorps1 : colors.thorps2
        s.fill(color)
        drawOctothorp(
          offsetX + 4 * i * l + j * l,
          offsetY - i * l + 4 * l * j,
          l,
        )
      }
    }
    drawBorder(s, 'black')
    s.noLoop()
  }

  function drawOctothorp(x, y, l) {
    s.beginShape()
    s.vertex(x, y)
    s.vertex(x + 1 * l, y)
    s.vertex(x + 1 * l, y - l)
    s.vertex(x + 2 * l, y - l)
    s.vertex(x + 2 * l, y)
    s.vertex(x + 3 * l, y)
    s.vertex(x + 3 * l, y - l)
    s.vertex(x + 4 * l, y - l)
    s.vertex(x + 4 * l, y)
    s.vertex(x + 5 * l, y)
    s.vertex(x + 5 * l, y + 1 * l)
    s.vertex(x + 4 * l, y + 1 * l)
    s.vertex(x + 4 * l, y + 2 * l)
    s.vertex(x + 5 * l, y + 2 * l)
    s.vertex(x + 5 * l, y + 3 * l)
    s.vertex(x + 4 * l, y + 3 * l)
    s.vertex(x + 4 * l, y + 4 * l)
    s.vertex(x + 3 * l, y + 4 * l)
    s.vertex(x + 3 * l, y + 3 * l)
    s.vertex(x + 2 * l, y + 3 * l)
    s.vertex(x + 2 * l, y + 4 * l)
    s.vertex(x + 1 * l, y + 4 * l)
    s.vertex(x + 1 * l, y + 3 * l)
    s.vertex(x, y + 3 * l)
    s.vertex(x, y + 2 * l)
    s.vertex(x + 1 * l, y + 2 * l)
    s.vertex(x + 1 * l, y + 1 * l)
    s.vertex(x, y + 1 * l)
    s.vertex(x, y)

    s.beginContour()
    s.vertex(x + 2 * l, y + 1 * l)
    s.vertex(x + 2 * l, y + 2 * l)
    s.vertex(x + 3 * l, y + 2 * l)
    s.vertex(x + 3 * l, y + 1 * l)
    s.endContour()

    s.endShape(s.CLOSE)
  }
}
