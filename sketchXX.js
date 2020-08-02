const sXX = (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
    s.angleMode(s.DEGREES)
  }

  const offsetX = 0
  const offsetY = 0

  const palette = shufflePalette(
    'https://coolors.co/22162b-451f55-724e91-e54f6d-f8c630',
  )
  console.log(palette)
  const colors = {}

  s.draw = () => {
    drawBorder(s, true)
    s.noLoop()
  }
}
