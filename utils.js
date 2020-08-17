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

function drawBorder(sketch, strokeColor, strokeWeight) {
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
  if (strokeColor !== null) {
    sketch.stroke(strokeColor || 'black')
    sketch.strokeWeight(
      strokeWeight === undefined ? canvasSide / 800 : strokeWeight,
    )
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

function mod(k, n) {
  const m = k % n
  if (m >= 0) {
    return m
  } else {
    return n + m
  }
}

const fromDegrees = Math.PI / 180
const toDegrees = 180 / Math.PI

function dsin(x) {
  return Math.sin(x * fromDegrees)
}
function dcos(x) {
  return Math.cos(x * fromDegrees)
}
function dtan(x) {
  return Math.tan(x * fromDegrees)
}
function dasin(x) {
  return Math.asin(x) * toDegrees
}
function dacos(x) {
  return Math.acos(x) * toDegrees
}
function datan(x) {
  return Math.atan(x) * toDegrees
}

const v = (s, X, Y) => {
  const add = Vector.add
  const mult = Vector.mult
  const minus = (v) => mult(v, -1)
  X = X || new Vector(1, 0)
  Y = Y || new Vector(-X.y, X.x)

  const xy = (mx, my, vx, vy) => {
    vx = vx || X
    vy = vy || Y
    return Vector.add(Vector.mult(vx, mx), Vector.mult(vy, my))
  }

  const vectorAt = (x, y, mx, my, vx, vy) => {
    const delta = xy(mx, my, vx, vy)
    return new Vector(x + delta.x, y + delta.y)
  }

  const arrayAt = (x, y, mx, my, vx, vy) =>
    vectorAt(x, y, mx, my, vx, vy).array().slice(0, 2)

  const vertexAt = (x, y, mx, my, vx, vy) => {
    const vec = vectorAt(x, y, mx, my, vx, vy)
    s.vertex(vec.x, vec.y)
  }

  const bezierVertexAt = (x, y, c1mx, c1my, c2mx, c2my, amx, amy, vx, vy) => {
    const [c1x, c1y] = arrayAt(x, y, c1mx, c1my, vx, vy)
    const [c2x, c2y] = arrayAt(x, y, c2mx, c2my, vx, vy)
    const [ax, ay] = arrayAt(x, y, amx, amy, vx, vy)
    s.bezierVertex(c1x, c1y, c2x, c2y, ax, ay)
  }

  const quadraticVertexAt = (x, y, cmx, cmy, amx, amy, vx, vy) => {
    const [cx, cy] = arrayAt(x, y, cmx, cmy, vx, vy)
    const [ax, ay] = arrayAt(x, y, amx, amy, vx, vy)
    s.quadraticVertex(cx, cy, ax, ay)
  }

  const rectAt = (x, y, mx, my, wd, ht, vx, vy) => {
    s.beginShape()
    vertexAt(x, y, mx, my, vx, vy)
    vertexAt(x, y, mx + wd, my, vx, vy)
    vertexAt(x, y, mx + wd, my + ht, vx, vy)
    vertexAt(x, y, mx, my + ht, vx, vy)
    s.endShape(s.CLOSE)
  }

  return {
    add,
    mult,
    X,
    Y,
    xy,
    minus,
    vectorAt,
    arrayAt,
    vertexAt,
    bezierVertexAt,
    quadraticVertexAt,
    rectAt,
  }
}

const vHex = (s, r, angle1, angle2) => {
  const add = Vector.add
  const mult = Vector.mult
  const minus = (v) => mult(v, -1)
  angle2 = angle2 || angle1 + 60
  A = new Vector(r, 0).rotate(angle1)
  B = new Vector(r, 0).rotate(angle2)
  C = add(B, minus(A))

  const abc = (ma, mb, mc) => {
    return Vector.add(Vector.mult(A, ma - mc), Vector.mult(B, mb + mc))
  }

  const vectorAt = (x, y, ma, mb, mc) => {
    const delta = abc(ma, mb, mc)
    return new Vector(x + delta.x, y + delta.y)
  }

  const arrayAt = (x, y, ma, mb, mc) =>
    vectorAt(x, y, ma, mb, mc).array().slice(0, 2)

  const vertexAt = (x, y, ma, mb, mc) => {
    const vec = vectorAt(x, y, ma, mb, mc)
    s.vertex(vec.x, vec.y)
  }

  return {
    add,
    mult,
    minus,
    A,
    B,
    C,
    abc,
    vectorAt,
    arrayAt,
    vertexAt,
  }
}

function splitBezier(p0, p1, p2, t) {
  const q1 = Vector.lerp(p0, p1, t)
  const q2 = Vector.lerp(p1, p2, t)
  const r1 = Vector.lerp(q1, q2, t)

  return {
    before: {
      p0: p0,
      p1: q1,
      p2: r1,
    },
    after: {
      p0: r1,
      p1: q2,
      p2: p2,
    },
  }
}

function splitBezierInThree(p0, p1, p2, t1, t2) {
  const splitAt2 = splitBezier(p0, p1, p2, t2)
  const before2 = splitAt2.before
  const splitAgain = splitBezier(before2.p0, before2.p1, before2.p2, t1 / t2)
  return {
    before: splitAgain.before,
    between: splitAgain.after,
    after: splitAt2.after,
  }
}

// HEXAGONAL GRIDS

function fillingHexagonalGrid(canvasSide, l, angle) {
  r = Math.ceil(canvasSide / l / 2)
  return hexagonalGrid(canvasSide / 2, canvasSide / 2, l, r, angle)
}

function* justTheMiddle(canvasSide) {
  yield [canvasSide / 2, canvasSide / 2]
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

// PARALLELOGRAM GRID

function parallelogramCoefficients(x, y, v1, v2) {
  const det = v1.x * v2.y - v2.x * v1.y
  const n = (1 / det) * (v2.y * x - v2.x * y)
  const m = (1 / det) * (-v1.y * x + v1.x * y)
  return [n, m]
}

function* parallelogramGrid(canvasSide, v1, v2) {
  v2 = v2 || v1.rotate(90)
  const d = canvasSide / 2
  const [n1, m1] = parallelogramCoefficients(-d, -d, v1, v2)
  const [n2, m2] = parallelogramCoefficients(-d, d, v1, v2)
  const [n3, m3] = parallelogramCoefficients(d, -d, v1, v2)
  const [n4, m4] = parallelogramCoefficients(d, d, v1, v2)

  const minN = Math.floor(Math.min(n1, n2, n3, n4))
  const maxN = Math.ceil(Math.max(n1, n2, n3, n4))
  const minM = Math.floor(Math.min(m1, m2, m3, m4))
  const maxM = Math.ceil(Math.max(m1, m2, m3, m4))

  for (const i of range(minN, maxN + 1)) {
    for (const j of range(minM, maxM + 1)) {
      const x = d + i * v1.x + j * v2.x
      const y = d + i * v1.y + j * v2.y
      yield [x, y, i, j]
    }
  }
}
