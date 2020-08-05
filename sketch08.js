const s08 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
    s.angleMode(s.DEGREES)
  }

  const f = canvasSide / 800
  const edge = 100

  //https://coolors.co/c6d8ff-71a9f7-16425b-b3b492-3b0d11
  const colors = ['#71a9f7', '#c6d8ff', '#72195a']

  s.draw = () => {
    s.strokeWeight(f)

    for ([x, y, i, j, ind] of fillingHexagonalGrid(
      canvasSide,
      edge * s.sqrt(3),
      0,
    )) {
      drawHexagon(x, y, 0)
    }
    drawBorder(s, 'black')
    s.noLoop()
  }

  function drawHexagon(x, y, angle) {
    for ([x, y, _, _, ind, r] of hexagonalGrid(
      x,
      y,
      edge * (s.sqrt(3) / 3),
      1,
      0,
    )) {
      if (r == 0) {
        continue
      }
      drawTriangle(x, y, 30 - 60 * ind, i + j)
    }
  }

  function drawTriangle(x, y, angle, colorOffset) {
    s.fill(colors[mod(colorOffset + 0, 3)])
    drawTrianglePart(x, y, angle + 0)
    s.fill(colors[mod(colorOffset + 1, 3)])
    drawTrianglePart(x, y, angle + 120)
    s.fill(colors[mod(colorOffset + 2, 3)])
    drawTrianglePart(x, y, angle + 240)
  }

  function drawTrianglePart(x, y, angle) {
    const pt = s.createVector(x, y)
    const long = s.createVector(edge, 0).rotate(angle)
    const side1 = long
      .copy()
      .rotate(180 - 30)
      .mult(s.sqrt(3) / 3)

    const side2 = long
      .copy()
      .rotate(180 + 30)
      .mult(s.sqrt(3) / 3)

    s.beginShape()
    jaggedVertices(pt, side1)
    jaggedVertices(pt.copy().add(side1), long)
    jaggedVertices(pt.copy().add(side1).add(long), side2)

    // s.vertex(x + v2.x, y + v2.y)
    s.endShape()
  }

  function jaggedVertices(origin, edge) {
    const v = edge.copy().rotate(6).mult(0.55)
    s.vertex(origin.x + v.x, origin.y + v.y)
    s.vertex(origin.x + edge.x - v.x, origin.y + edge.y - v.y)
    s.vertex(origin.x + edge.x, origin.y + edge.y)
  }
}
