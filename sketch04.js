const s04 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const l = 38 * f
  const offsetX = -1.5 * l
  const offsetY = 4 * l

  const { vertexAt, xy } = v(s, s.createVector(l, 0), s.createVector(0, l))

  // https://coolors.co/805d93-f49fbc-ffd3ba-231f20-bb4430
  const colors = {
    thorps1: '#ffd3ba',
    thorps2: '#f49fbc',
    centers: '#805d93',
    strokes: '#231F20',
  }

  s.draw = () => {
    s.strokeWeight(3 * f)
    s.stroke(colors.strokes)
    s.background(colors.centers)
    const u = xy(4, -1)
    const v = xy(1, 4)
    for (const [x, y, i, j] of parallelogramGrid(canvasSide, u, v)) {
      const color = (i + j) % 2 == 0 ? colors.thorps1 : colors.thorps2
      s.fill(color)
      drawOctothorp(x, y)
    }

    drawBorder(s, colors.centers, 3 * f)
    s.noLoop()
  }

  function drawOctothorp(x, y) {
    const offsets = [
      [0, 0],
      [1, 0],
      [1, -1],
      [2, -1],
      [2, 0],
      [3, 0],
      [3, -1],
      [4, -1],
      [4, 0],
      [5, 0],
      [5, 1],
      [4, 1],
      [4, 2],
      [5, 2],
      [5, 3],
      [4, 3],
      [4, 4],
      [3, 4],
      [3, 3],
      [2, 3],
      [2, 4],
      [1, 4],
      [1, 3],
      [0, 3],
      [0, 2],
      [1, 2],
      [1, 1],
      [0, 1],
      [0, 0],
    ]
    s.beginShape()
    for (const [mx, my] of offsets) {
      vertexAt(x, y, mx, my)
    }

    s.beginContour()
    vertexAt(x, y, 2, 1)
    vertexAt(x, y, 2, 2)
    vertexAt(x, y, 3, 2)
    vertexAt(x, y, 3, 1)
    s.endContour()

    s.endShape(s.CLOSE)
  }
}
