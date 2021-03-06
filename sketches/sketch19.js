const s19 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const ht = 120 * f
  const dx = 0.65 * ht
  const h = 0.25 * ht
  const u = 0.25 * ht

  // I did something similar to this here:
  // https://math.stackexchange.com/a/1777007
  // to find the intersection of the bezier from p0 = (x, y) and the one
  // from p0' = (p0.x, p0.y+ht) with p1' = -p1 and p2' = -p2
  const dp1x = u - dx
  const dp1y = ht / 2
  const dp2x = u
  const dp2y = ht / 2

  const ax = dp2x - 2 * dp1x
  const ay = dp2y - 2 * dp1y
  const bx = 2 * dp1x
  const by = 2 * dp1y
  const dy = ht - h

  const m = (dy * ax) / (by * ax - bx * ay)

  const disc = m * m - ((2 * m) / ax) * (m * ax + bx)
  const t1 = m / 2 - s.sqrt(disc) / 2
  const t2 = m / 2 + s.sqrt(disc) / 2

  const { xy, vertexAt, quadraticVertexAt } = v(s)
  const { before, between, after } = splitBezierInThree(
    xy(0, 0),
    xy(u - dx, ht / 2),
    xy(u, ht / 2),
    t1,
    t2,
  )

  // https://coolors.co/227c9d-17c3b2-ffcb77-fef9ef-fe6d73
  const colors = {
    strokes: 'black',
    blobs: ['#fef9ef', '#FFCB77', '#227C9D', '#17c3b2'],
  }

  s.draw = () => {
    s.strokeWeight(4 * f)
    s.stroke(colors.strokes)

    for (const [x, y, i, j] of parallelogramGrid(
      canvasSide,
      xy(4 * u, 0),
      xy(0, ht - h),
    )) {
      drawShape(x - u, y, i, j)
    }

    drawBorder(s, colors.strokes, 4 * f)
    s.noLoop()
  }

  function drawShape(x, y, i, j) {
    s.fill(colors.blobs[mod(j - 1, colors.blobs.length)])
    drawLeftBlob(x, y, 1)
    drawRightBlob(x, y, 1)
    s.fill(colors.blobs[mod(j, colors.blobs.length)])
    drawMainBlob(x, y, 1)
    drawMainBlob(x + 2 * u, y, -1)
  }

  function drawMainBlob(x, y, dirY) {
    s.beginShape()
    vertexAt(x, y, before.p0.x, dirY * before.p0.y)
    bezierVertex(x, y, before, true, 1, dirY)
    bezierVertex(x, y + dirY * (ht - h), between, false, -1, -dirY)
    bezierVertex(x, y, after, true, 1, dirY)
    bezierVertex(x + 2 * u, y, after, false, -1, dirY)
    bezierVertex(x + 2 * u, y + dirY * (ht - h), between, true, 1, -dirY)
    bezierVertex(x + 2 * u, y, before, false, -1, dirY)
    bezierVertex(x + 2 * u, y, before, true, 1, -dirY)
    bezierVertex(x + 2 * u, y - dirY * (ht - h), after, true, -1, dirY)
    bezierVertex(x, y - dirY * (ht - h), after, false, 1, dirY)
    bezierVertex(x, y, before, false, -1, -dirY)

    s.endShape(s.CLOSE)
  }

  function drawLeftBlob(x, y, dirY) {
    s.beginShape()
    vertexAt(x, y, between.p0.x, dirY * between.p0.y)
    bezierVertex(x, y, between, true, 1, dirY)
    bezierVertex(x, y + dirY * (ht - h), between, true, -1, -dirY)
    s.endShape(s.CLOSE)
  }

  function drawRightBlob(x, y, dirY) {
    s.beginShape()
    vertexAt(x + 2 * u, y, -between.p0.x, dirY * between.p0.y)
    bezierVertex(x + 2 * u, y, between, true, -1, dirY)
    bezierVertex(x + 2 * u, y + dirY * (ht - h), between, true, 1, -dirY)
    s.endShape(s.CLOSE)
  }

  function bezierVertex(x, y, { p0, p1, p2 }, rightSide, dirX, dirY) {
    // vertexAt(
    //   x,
    //   y,
    //   rightSide ? dirX * p0.x : dirX * p2.x,
    //   rightSide ? dirY * p0.y : dirY * p2.y,
    // )
    quadraticVertexAt(
      x,
      y,
      dirX * p1.x,
      dirY * p1.y,
      rightSide ? dirX * p2.x : dirX * p0.x,
      rightSide ? dirY * p2.y : dirY * p0.y,
    )
  }
}
