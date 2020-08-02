// https://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

function range(n) {
  return [...Array(n).keys()]
}

function drawBorder(sketch, strokeColor) {
  sketch.stroke('white')
  const canvasSide = Math.min(sketch.width, sketch.height)
  sketch.strokeWeight(canvasSide * 0.7)
  sketch.noFill()
  sketch.ellipse(
    canvasSide / 2,
    canvasSide / 2,
    canvasSide * 1.5,
    canvasSide * 1.5,
  )
  if (strokeColor) {
    sketch.stroke(strokeColor)
    sketch.strokeWeight(canvasSide / 800)
    sketch.ellipse(
      canvasSide / 2,
      canvasSide / 2,
      canvasSide * 0.8,
      canvasSide * 0.8,
    )
  }
}

function shufflePalette(coolorsUrl) {
  const colors = coolorsUrl
    .replace(/^.*coolors\.co\//, '')
    .split('-')
    .map((c) => '#' + c)
  return shuffle(colors)
}
