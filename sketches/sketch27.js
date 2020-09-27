const s27 = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const len = 80 * f
  const gap = 0.3 * len
  const middle = 0.25 * len
  const smallSide = middle * 0.66
  const diag = (middle + smallSide) * Math.sqrt(2)

  const { vertexAt, arrayAt, xy, X } = v(s, new Vector(1, 0).rotate(0))

  // // https://coolors.co/a4b3cc-e6d19e-e5e5e5-ffffff
  // const colors = {
  //   squares: '#e6d19e',
  //   octagons: '#a4b3cc',
  //   intersections: '#e5e5e5',
  //   middleThing: '#ffffff',
  // }

  // https://coolors.co/033f63-28666e-7c9885-b5b682-fedc97
  const colors = {
    squares: '#7c9885',
    octagons: '#28666e',
    intersections: '#033f63',
    middleThing: '#FEDC97',
  }

  s.draw = () => {
    s.background(colors.squares)
    s.noStroke()

    const secondCopyDist = (len + gap) / 2 + diag / Math.sqrt(2)
    const unitDist = gap + len + diag * Math.sqrt(2)

    drawInParallelogramGrid(
      s,
      canvasSide,
      xy(unitDist, 0),
      undefined,
      'unit-27',
      (x, y) => {
        drawUnit(x, y, false)
        drawUnit(...arrayAt(x, y, secondCopyDist, -secondCopyDist), true)
      }
    )

    drawBorder(s, null, 0)
    s.noLoop()
  }

  function drawUnit(x, y, withIntersections) {
    s.fill(colors.octagons)
    drawFrame(x, y)
    s.fill(colors.middleThing)
    drawMiddle(x, y)
    if (withIntersections) {
      s.fill(colors.intersections)
      for (const angle of [0, 90, 180, 270]) {
        drawIntersection(x, y, angle)
      }
    }
  }

  function drawFrame(x, y) {
    const dd = diag / Math.sqrt(2)
    s.beginShape()
    vertexAt(x, y, -len / 2 - dd, gap / 2)
    vertexAt(x, y, -len / 2 - dd, -gap / 2)
    vertexAt(x, y, -dd - gap / 2, -gap / 2)
    vertexAt(x, y, -gap / 2, -gap / 2 - dd)
    vertexAt(x, y, -gap / 2, -len / 2 - dd)
    vertexAt(x, y, gap / 2, -len / 2 - dd)
    vertexAt(x, y, gap / 2, -dd - gap / 2)
    vertexAt(x, y, gap / 2 + dd, -gap / 2)
    vertexAt(x, y, len / 2 + dd, -gap / 2)
    vertexAt(x, y, len / 2 + dd, gap / 2)
    vertexAt(x, y, gap / 2 + dd, gap / 2)
    vertexAt(x, y, gap / 2, gap / 2 + dd)
    vertexAt(x, y, gap / 2, len / 2 + dd)
    vertexAt(x, y, -gap / 2, len / 2 + dd)
    vertexAt(x, y, -gap / 2, gap / 2 + dd)
    vertexAt(x, y, -gap / 2 - dd, gap / 2)
    s.endShape(s.CLOSE)
  }

  function drawIntersection(x, y, angle) {
    const vv = v(s, X.rotate(angle))
    const dd = diag / Math.sqrt(2)
    s.beginShape()
    vv.vertexAt(x, y, gap / 2, -len / 2 - dd)
    vv.vertexAt(x, y, len / 2, -len / 2 - dd)
    vv.vertexAt(x, y, len / 2 + dd, -len / 2)
    vv.vertexAt(x, y, len / 2 + dd, -gap / 2)
    vv.vertexAt(x, y, gap / 2 + dd, -gap / 2)
    vv.vertexAt(x, y, gap / 2, -gap / 2 - dd)
    s.endShape(s.CLOSE)
  }

  function drawMiddle(x, y) {
    const mm = middle / Math.sqrt(2)
    const ss = smallSide / Math.sqrt(2)

    s.beginShape()
    vertexAt(x, y, -mm - 2 * ss, 0)
    vertexAt(x, y, -mm - ss, -ss)
    vertexAt(x, y, ss, mm + ss)
    vertexAt(x, y, 0, mm + 2 * ss)
    vertexAt(x, y, -ss, mm + ss)
    vertexAt(x, y, mm + ss, -ss)
    vertexAt(x, y, mm + 2 * ss, 0)
    vertexAt(x, y, mm + ss, ss)
    vertexAt(x, y, -ss, -mm - ss)
    vertexAt(x, y, 0, -mm - 2 * ss)
    vertexAt(x, y, ss, -mm - ss)
    vertexAt(x, y, -mm - ss, ss)
    s.endShape(s.CLOSE)
  }
}
