const s15 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const { bezierVertexAt, vertexAt, xy } = v(s)
  const curveCount = 12
  const minWidth = 20 * f
  const maxWidth = 60 * f
  const height = 200 * f
  const separatorPointCount = Math.ceil(24 * f)

  const sinf = (f) => 0.5 - dcos(f * 360) / 2
  const serp = (f, a, b) => a + (b - a) * sinf(f)

  // https://coolors.co/361134-e7ad99-ce796b
  const colors = ['#e7ad99', '#361134', '#ce796b']

  s.draw = () => {
    const x = canvasSide / 2
    const y = canvasSide / 3
    drawInParallelogramGrid(
      s,
      canvasSide,
      xy(0, height),
      xy(2 * (minWidth + maxWidth), 0),
      'unit-1-15',
      (x, y) => drawCurves(x, y - height, true)
    )
    drawInParallelogramGrid(
      s,
      canvasSide,
      xy(0, -height),
      xy(2 * (minWidth + maxWidth), 0),
      'unit-2-15',
      (x, y) =>
        drawCurves(x + minWidth + maxWidth, y - height + height / 2, false)
    )

    drawBorder(s, 'black', 2 * f)
    s.noLoop()
  }

  function drawCurves(x, y, isUp) {
    const dirY = isUp ? 1 : -1

    const indexes = isUp ? range(curveCount) : range(curveCount - 1, -1)

    for (const curveIndex of indexes) {
      const fCurve = curveIndex / curveCount
      const dx = serp(fCurve, minWidth, maxWidth)
      const dy = height * (curveIndex / curveCount)
      const dxPrev = serp(
        (curveIndex + dirY * 1) / curveCount,
        minWidth,
        maxWidth
      )
      const dyPrev = height * ((curveIndex + dirY * 1) / curveCount)
      c1f = serp(fCurve, 0.1, 0.15)
      c2dx = serp(fCurve, minWidth * 0.6, maxWidth * 0.4)
      ady = height * serp(fCurve, 0.2, 0.23)

      const n = new Vector(
        dirY *
          Math.PI *
          (maxWidth - minWidth) *
          dsin((curveIndex / curveCount) * 360),
        height
      )
      s.fill(colors[mod(curveIndex, colors.length)])
      s.noStroke()
      s.beginShape()
      vertexAt(x, y, dxPrev, dyPrev)
      vertexAt(x, y, dx, dy)
      bezierVertexAt(
        x,
        y,
        dx - c1f * n.x,
        dy - dirY * c1f * n.y,
        c2dx,
        dy - dirY * ady,
        0,
        dy - dirY * ady
      )
      bezierVertexAt(
        x,
        y,
        -c2dx,
        dy - dirY * ady,
        -dx + c1f * n.x,
        dy - dirY * c1f * n.y,
        -dx,
        dy
      )
      vertexAt(x, y, -dxPrev, dyPrev)

      s.endShape()
    }

    for (dirX of [1, -1]) {
      s.noFill()
      s.strokeWeight(2 * f)
      s.stroke('black')
      s.beginShape()
      for (const idx of range(separatorPointCount + 1)) {
        const dx =
          minWidth + (maxWidth - minWidth) * sinf(idx / separatorPointCount)
        const dy = height * (idx / separatorPointCount)
        vertexAt(x, y, dirX * dx, dy)
      }
      s.endShape()
    }
  }
}
