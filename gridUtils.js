function drawInFillingHexagonalGrid(s, canvasSide, l, angle, id, atXY) {
  drawInGrid(s, fillingHexagonalGrid(canvasSide, l, angle), id, atXY)
}

function drawInHexagonalGrid(s, x0, y0, l, r, angle, id, atXY) {
  drawInGrid(s, hexagonalGrid(x0, y0, l, r, angle), id, atXY)
}

function drawInParallelogramGrid(s, canvasSide, v1, v2, id, atXY) {
  drawInGrid(s, parallelogramGrid(canvasSide, v1, v2), id, atXY)
}

function drawInGrid(s, pointGenerator, id, atXY) {
  if (s.isDansSvgThing) {
    s._startDef()
    atXY(0, 0)
    s._endDef(id)

    for (const [x, y] of pointGenerator) {
      s.use(id, x, y)
    }
  } else {
    for (const [x, y] of pointGenerator) {
      atXY(x, y)
    }
  }
}
