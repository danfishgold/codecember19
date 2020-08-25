const sXX = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800
  const stroke = 1 * f

  const palette = shufflePalette('')
  const colors = {}
  console.log(colors)

  s.draw = () => {
    s.strokeWeight(stroke)
    s.background('white')

    drawBorder(s, 'black', stroke)
    s.noLoop()
  }
}
