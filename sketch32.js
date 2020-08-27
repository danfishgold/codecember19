const s32 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const stroke = 1 * f
  const wd = 14 * f
  const hexEdge = wd * 1.5
  const triEdge = wd * 6.8
  const baseAngle = 30

  const palette = shufflePalette('')
  const colors = {}
  console.log(colors)

  s.draw = () => {
    s.strokeWeight(stroke)
    s.background('white')

    const { abc } = vHex(s, 1, baseAngle, baseAngle - 60)

    const diff = abc(-wd - hexEdge, -hexEdge, triEdge + wd)

    for (const [x, y] of fillingHexagonalGrid(
      canvasSide,
      diff.mag(),
      diff.heading(),
    )) {
      drawUnit(x, y, baseAngle)
    }

    drawBorder(s, 'black', stroke)
    s.noLoop()
  }

  function drawUnit(x, y, baseAngle) {
    const { arrayAt, vectorAt } = vHex(s, 1, baseAngle, baseAngle - 60)
    drawTriangle(...arrayAt(x, y, 0, 0, wd), triEdge, baseAngle - 60)
    drawHexagon(...arrayAt(x, y, 0, triEdge + wd, wd), hexEdge, baseAngle - 60)
    drawTriangle(...arrayAt(x, y, 0, hexEdge + wd, 0), triEdge, baseAngle)

    drawParallelogram(
      vectorAt(x, y, 0, 0, 0),
      baseAngle - 60,
      false,
      triEdge + hexEdge + wd,
    )

    drawParallelogram(
      vectorAt(x, y, 0, hexEdge, 0),
      baseAngle,
      false,
      triEdge + hexEdge + wd,
    )

    drawParallelogram(
      vectorAt(x, y, 0, hexEdge + triEdge + wd, hexEdge + wd),
      baseAngle + 60,
      false,
      triEdge + hexEdge + wd,
    )
  }

  function drawTriangle(x, y, edge, baseAngle) {
    if (edge < 2 * wd) {
      return
    }
    const { vectorAt, arrayAt } = vHex(s, 1, baseAngle, baseAngle - 60)

    drawTrapesoid(vectorAt(x, y, 0, 0, 0), baseAngle - 60, true, edge)
    drawTrapesoid(vectorAt(x, y, 0, edge, 0), baseAngle + 60, true, edge)
    drawTrapesoid(vectorAt(x, y, edge, 0, 0), baseAngle + 180, true, edge)
    drawTriangle(...arrayAt(x, y, wd, wd, 0), edge - 3 * wd, baseAngle)
  }

  function drawHexagon(x, y, edge, baseAngle) {
    if (edge < wd) {
      return
    }
    const { vectorAt, arrayAt } = vHex(s, 1, baseAngle, baseAngle - 60)

    drawTrapesoid(vectorAt(x, y, 0, 0, wd), baseAngle, true, edge + wd)
    drawTrapesoid(
      vectorAt(x, y, edge, -wd, wd),
      baseAngle - 60,
      true,
      edge + wd,
    )
    drawTrapesoid(
      vectorAt(x, y, edge, edge - wd, 0),
      baseAngle - 120,
      true,
      edge + wd,
    )
    drawTrapesoid(
      vectorAt(x, y, edge + wd, edge - wd, edge),
      baseAngle - 180,
      true,
      edge + wd,
    )
    drawTrapesoid(
      vectorAt(x, y, wd, edge, edge),
      baseAngle - 240,
      true,
      edge + wd,
    )
    drawTrapesoid(
      vectorAt(x, y, wd, 0, edge + wd),
      baseAngle - 300,
      true,
      edge + wd,
    )

    drawHexagon(...arrayAt(x, y, wd, 0, wd), edge - wd, baseAngle)
  }

  function drawTrapesoid(p0, angle1, rightSide, almostEdge) {
    const { vertexAt } = vHex(
      s,
      1,
      angle1,
      rightSide ? angle1 + 60 : angle1 - 60,
    )
    s.beginShape()
    vertexAt(p0.x, p0.y, 0, 0, 0)
    vertexAt(p0.x, p0.y, almostEdge - wd, 0, 0)
    vertexAt(p0.x, p0.y, almostEdge - wd, 0, wd)
    vertexAt(p0.x, p0.y, 0, wd, 0)
    s.endShape(s.CLOSE)
  }

  function drawParallelogram(p0, angle1, rightSide, edge) {
    const { vertexAt } = vHex(
      s,
      1,
      angle1,
      rightSide ? angle1 + 60 : angle1 - 60,
    )
    s.beginShape()
    vertexAt(p0.x, p0.y, 0, 0, 0)
    vertexAt(p0.x, p0.y, edge, 0, 0)
    vertexAt(p0.x, p0.y, edge, wd, 0)
    vertexAt(p0.x, p0.y, 0, wd, 0)
    s.endShape(s.CLOSE)
  }
}
