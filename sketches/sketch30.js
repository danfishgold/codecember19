const s30 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800

  const edge = 60 * f
  const distance = edge * (1 + Math.sqrt(3))
  const pollenLength = 0.35 * edge

  // the side of the intersection rhombus
  const smallBit = edge * (1 - 1 / Math.sqrt(3))

  const baseAngle = 0
  const strokes = {
    circumefrence: 4 * f,
    middleLines: 1 * f,
    pollen: 4 * f,
  }

  // https://coolors.co/d3d4d9-4b88a2-bb0a21-252627-fff9fb
  const colors = {
    flowers: '#fff9fb',
    intersections: '#d3d4d9',
    hexagons: '#4b88a2',
    pollen: '#bb0a21',
    strokes: '#252627',
  }

  s.draw = () => {
    s.background(colors.hexagons)
    s.stroke(colors.strokes)

    for (const [x, y] of fillingHexagonalGrid(
      canvasSide,
      distance,
      baseAngle + 30,
    )) {
      drawFlower(x, y)
    }

    drawBorder(s, colors.strokes, strokes.circumefrence)
    s.noLoop()
  }

  function drawFlower(x, y) {
    drawCircumference(x, y, baseAngle)

    for (const index of range(6)) {
      drawPetal(x, y, baseAngle + 30 + index * 60)
    }

    drawPollen(x, y, baseAngle)
  }

  function drawCircumference(x, y, baseAngle) {
    const v0 = new Vector(1, 0).rotate(baseAngle)

    s.strokeWeight(strokes.circumefrence)
    s.fill(colors.flowers)
    s.beginShape()
    for (const index of range(6)) {
      const vIn = v0.rotate(index * 60).mult(edge)
      const vOut = v0
        .rotate(index * 60 + 30)
        .mult(edge + Math.sqrt(3) * smallBit)
      s.vertex(x + vIn.x, y + vIn.y)
      s.vertex(x + vOut.x, y + vOut.y)
    }
    s.endShape(s.CLOSE)
  }

  function drawPetal(x, y, angle) {
    const v0 = new Vector(1, 0).rotate(angle)
    const v1 = v0.rotate(30)
    const v2 = v0.rotate(-30)
    const { vertexAt } = v(s, v1, v2)

    // intersection bit
    s.strokeWeight(strokes.circumefrence)
    s.fill(colors.intersections)
    s.beginShape()
    vertexAt(x, y, edge, edge)
    vertexAt(x, y, edge, edge - smallBit)
    vertexAt(x, y, edge - smallBit, edge - smallBit)
    vertexAt(x, y, edge - smallBit, edge)
    vertexAt(x, y, 0, edge)
    s.endShape(s.CLOSE)

    // radial lines
    s.strokeWeight(strokes.middleLines)
    s.beginShape()
    s.noFill()
    vertexAt(x, y, edge, 0)
    vertexAt(x, y, 0, 0)
    vertexAt(x, y, edge - smallBit, edge - smallBit)
    s.endShape()
  }

  function drawPollen(x, y, baseAngle) {
    s.push()
    s.noStroke()
    s.fill(colors.pollen)
    for (const index of range(12)) {
      const v0 = new Vector(1, 0).rotate(baseAngle + 15 + 30 * index)
      const { vertexAt, quadraticVertexAt } = v(s, v0)
      s.beginShape()
      vertexAt(x, y, 0, 0)
      vertexAt(x, y, pollenLength, strokes.pollen / 2)
      quadraticVertexAt(
        x,
        y,
        pollenLength + 3,
        0,
        pollenLength,
        -strokes.pollen / 2,
      )
      s.endShape(s.CLOSE)
    }
    s.pop()
  }
}
