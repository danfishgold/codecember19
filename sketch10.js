const s10 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const edge = 30 * f

  const v1 = new Vector(edge, 0).rotate(65)
  const v2 = new Vector(edge, 0).rotate(-50)

  const { minus, xy, vertexAt } = v(s, v1, v2)

  // https://coolors.co/ed254e-f9dc5c-f4fffd-011936-465362
  const colors = {
    background: '#f4fffd',
    lines: ['#f9dc5c', '#ed254e', '#465362', '#011936'],
  }

  s.draw = () => {
    s.background(colors.background)
    s.strokeWeight(5 * f)
    s.strokeCap(s.PROJECT)

    for ([x, y, i, j] of parallelogramGrid(canvasSide, xy(3, 5), xy(-5, 3))) {
      s.noFill()
      s.stroke(colors.lines[0])
      drawShape(x, y, 0)
      s.stroke(colors.lines[1])
      drawShape(x, y, 1)
      s.stroke(colors.lines[2])
      drawShape(x, y, 2)
      s.stroke(colors.lines[3])
      drawShape(x, y, 3)
    }

    drawBorder(s, colors.lines[3], 5 * f)
    s.noLoop()
  }

  function drawShape(x, y, dir) {
    const [v, u] = directions(dir)
    drawShapeWithVectors(x, y, v, u)
  }

  function directions(dir) {
    switch (dir) {
      case 0: {
        return [v1, v2]
      }
      case 1: {
        return [v2, minus(v1)]
      }
      case 2: {
        return [minus(v1), minus(v2)]
      }
      case 3: {
        return [minus(v2), v1]
      }
    }
  }

  function drawShapeWithVectors(x, y, v, u) {
    const coefs = [
      [0, 0],
      [1, 0],
      [1, -1],
      [2, -1],
      [2, 2],
      [3, 2],
      [3, 1],
      [4, 1],
    ]
    s.beginShape()
    for (const [i, j] of coefs) {
      vertexAt(x, y, i, j, v, u)
    }
    s.endShape()
  }
}
