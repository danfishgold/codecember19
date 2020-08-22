const s29 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const bezierK = 0.364212423249 // https://stackoverflow.com/a/50596945
  const edge1 = 120 * f
  const height1 = 40 * f
  const edge2 = 100 * f
  const height2 = 35 * f
  const stroke1 = 3 * f
  const stroke2 = 6 * f

  const { vectorAt, vertexAt, xy } = v(
    s,
    new Vector(edge1, 0),
    new Vector(0, edge2),
  )

  // https://coolors.co/4c5454-ff715b-ffffff-1ea896-523f38
  // const colors = { shape1: '#ff715b', shape2: '#ffffff', strokes: '#4c5454' }

  // https://coolors.co/4f000b-720026-ce4257-ff7f51-ff9b54
  // const colors = { shape1: '#ce4257', shape2: '#ff7f51', strokes: '#4f000b' }

  // https://coolors.co/cfdbd5-e8eddf-f5cb5c-242423-333533
  // const colors = { shape1: '#f5cb5c', shape2: '#E8EDDF', strokes: '#242423' }

  // https://coolors.co/031d44-04395e-70a288-dab785-d5896f
  // const colors = { shape1: '#031d44', shape2: '#04395e', strokes: '#dab785' }

  // https://coolors.co/450503-5e0411-9f71a3-dab785-6fd6b6
  const colors = { shape1: '#450503', shape2: '#5E0411', strokes: '#dab785' }

  s.draw = () => {
    for (const [x, y] of parallelogramGrid(canvasSide, xy(2, 0), xy(1, 1))) {
      drawUnit(x, y)
    }

    drawBorder(s, colors.strokes, stroke1)
    s.noLoop()
  }

  function drawUnit(x, y) {
    s.fill(colors.shape1)
    s.stroke(colors.strokes)
    s.strokeWeight(stroke1)
    s.beginShape()
    vertexAt(x, y, 0, 0)
    sinCurve(vectorAt(x, y, 0, 0), vectorAt(x, y, 1, 0), height2, true)
    sinCurve(vectorAt(x, y, 1, 0), vectorAt(x, y, 1, -1), height1, false)
    sinCurve(vectorAt(x, y, 1, -1), vectorAt(x, y, 0, -1), height2, true)
    sinCurve(vectorAt(x, y, 0, -1), vectorAt(x, y, 0, 0), height1, false)
    s.endShape(s.CLOSE)

    s.fill(colors.shape2)
    s.beginShape()
    vertexAt(x, y, 1, 0)
    sinCurve(vectorAt(x, y, 1, 0), vectorAt(x, y, 2, 0), height2, false)
    sinCurve(vectorAt(x, y, 2, 0), vectorAt(x, y, 2, -1), height1, true)
    sinCurve(vectorAt(x, y, 2, -1), vectorAt(x, y, 1, -1), height2, false)
    sinCurve(vectorAt(x, y, 1, -1), vectorAt(x, y, 1, 0), height1, true)
    s.endShape(s.CLOSE)

    s.noFill()
    s.strokeWeight(stroke2)
    s.beginShape()
    vertexAt(x, y, 0, -1)
    sinCurve(vectorAt(x, y, 0, -1), vectorAt(x, y, 0, 0), height1, false)
    s.endShape()

    s.beginShape()
    vertexAt(x, y, 1, -1)
    sinCurve(vectorAt(x, y, 1, -1), vectorAt(x, y, 1, 0), height1, true)
    s.endShape()
  }

  function sinCurve(p0, p1, height, isRight) {
    const X = p1.sub(p0)
    const angleX = X.heading()
    const angleY = isRight ? angleX + 90 : angleX - 90
    const Y = new Vector(dcos(angleY), dsin(angleY)).mult(height)
    const { quadraticVertexAt } = v(s, X, Y)
    quadraticVertexAt(p0.x, p0.y, 0.5 - bezierK * 0.8, 1, 0.5, 1)
    quadraticVertexAt(p0.x, p0.y, 0.5 + bezierK * 0.8, 1, 1, 0)
  }
}
