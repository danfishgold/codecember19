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

function range(n, m) {
  if (m === undefined) {
    m = n
    n = 0
  }
  if (m > n) {
    return [...Array(m - n).keys()].map((i) => n + i)
  } else {
    return [...Array(n - m).keys()].map((i) => n - i)
  }
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

function fillingHexagonalGrid(canvasSide, l, angle) {
  r = Math.ceil(canvasSide / l / 2)
  return hexagonalGrid(canvasSide / 2, canvasSide / 2, l, r, angle)
}

function* hexagonalGrid(x, y, l, r, angle) {
  angle = angle * (Math.PI / 180)
  const x1 = l * Math.cos(angle)
  const y1 = l * Math.sin(angle)
  const x2 = l * Math.cos(angle + Math.PI * (2 / 3))
  const y2 = l * Math.sin(angle + Math.PI * (2 / 3))
  for (const [i, j, n, rr] of hexagonalGridIndexes(r)) {
    yield [x + i * x1 + j * x2, y + i * y1 + j * y2, i, j, n, rr]
  }
}

function* hexagonalGridIndexes(r) {
  for (const rr of range(r + 1)) {
    for (const [i, j, n] of hexagonalGridRingIndexes(rr)) {
      yield [i, j, n, rr]
    }
  }
}

function* hexagonalGridRingIndexes(r) {
  if (r === 0) {
    yield [0, 0, 0]
  }
  for (const i of range(r)) {
    yield [i, r, i]
  }
  for (const i of range(r)) {
    yield [r, r - i, r + i]
  }
  for (const i of range(r)) {
    yield [r - i, -i, 2 * r + i]
  }
  for (const i of range(r)) {
    yield [-i, -r, 3 * r + i]
  }
  for (const i of range(r)) {
    yield [-r, -r + i, 4 * r + i]
  }
  for (const i of range(r)) {
    yield [-r + i, i, 5 * r + i]
  }
}

function mod(k, n) {
  const m = k % n
  if (m >= 0) {
    return m
  } else {
    return 3 + m
  }
}
