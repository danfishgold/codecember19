const sXX = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
  }

  const f = canvasSide / 800

  const palette = shufflePalette('')
  const colors = {}
  console.log(colors)

  s.draw = () => {
    s.strokeWeight(f)

    drawBorder(s, 'black')
    s.noLoop()
  }
}
