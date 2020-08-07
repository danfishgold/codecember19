const s11 = (ss) => (canvasSide) => (s) => {
  s.setup = () => {
    s.createCanvas(canvasSide, canvasSide)
    s.angleMode(s.DEGREES)
  }

  const f = canvasSide / 800
  const side = 130 * f

  let crossWidth, shadowWidth, crossHeight

  switch (ss) {
    case 1: {
      crossWidth = side / 3
      shadowWidth = side * (1 / 3)
      crossHeight = side / 2 - crossWidth / 2
      break
    }
    case 2: {
      crossWidth = side * 0.3
      shadowWidth = side * 0.05
      crossHeight = side / 2 - crossWidth / 2
      break
    }
    case 3: {
      crossWidth = side / 3
      shadowWidth = side * (2 / 3)
      crossHeight = side / 2 - crossWidth / 2
      break
    }
    case 4: {
      crossWidth = side / 2
      shadowWidth = side * (1 / 4)
      crossHeight = side / 2 - crossWidth / 2
      break
    }
  }

  function vectorAt(x, y, mx, my) {
    const delta = add(
      mult(X.copy().rotate(45 * (s.PI / 180)), mx),
      mult(Y.copy().rotate(45 * (s.PI / 180)), my),
    )
    return s.createVector(x + delta.x, y + delta.y)
  }

  function vertexAt(x, y, mx, my) {
    const vec = vectorAt(x, y, mx, my)
    s.vertex(vec.x, vec.y)
  }

  function rectAt(x, y, mx, my, wd, ht) {
    s.beginShape()
    vertexAt(x, y, mx, my)
    vertexAt(x, y, mx + wd, my)
    vertexAt(x, y, mx + wd, my + ht)
    vertexAt(x, y, mx, my + ht)
    s.endShape(s.CLOSE)
  }

  const palette = shufflePalette(
    shuffle([
      'https://coolors.co/cacf85-8cba80-658e9c-4d5382-514663',
      'https://coolors.co/177e89-084c61-f7b32b-db3a34-323031',
      'https://coolors.co/262626-acbfa4-e2e8ce-ff7f11-ff1b1c',
      'https://coolors.co/2a2b2a-706c61-f8f4e3-e5446d-ff8966',
      'https://coolors.co/ecebe4-cc998d-16f4d0-429ea6-153b50',
      'https://coolors.co/ecebe4-cc998d-502419-429ea6-153b50',
      'https://coolors.co/355070-6d597a-b56576-e56b6f-eaac8b',
    ])[0],
  )
  const colors = {
    background: palette[0],
    crosses: [palette[1], palette[2]],
    shadow: palette[3],
    stroke: palette[4],
  }

  // https://coolors.co/355070-6d597a-b56576-e56b6f-eaac8b
  // const colors = {
  //   background: '#b56576',
  //   crosses: ['#e56b6f', '#eaac8b'],
  //   shadow: '#6d597a',
  //   stroke: '#355070',
  // }
  // const colors = {
  //   background: 'white',
  //   crosses: ['white', 'white'],
  //   shadow: 'white',
  //   stroke: 'black',
  // }
  // const colors = {
  //   background: '#e56b6f',
  //   crosses: ['#6d597a', '#eaac8b'],
  //   shadow: '#355070',
  //   stroke: 'black',
  // }

  s.draw = () => {
    s.strokeWeight(4 * f)
    s.stroke(colors.stroke)
    s.background(colors.background)
    const v = vectorAt(0, 0, crossWidth + shadowWidth, crossWidth + crossHeight)
    const u = s.createVector(v.y, -v.x)

    for (const [x, y, i, j] of parallelogramGrid(canvasSide, v, u)) {
      drawCross(x, y, mod(i + j, colors.crosses.length))
    }

    drawBorder(s, colors.stroke, 4 * f)
    s.noLoop()
  }

  function drawCross(x, y, colorIndex) {
    const wd = crossWidth
    const ht = crossHeight
    const sh = shadowWidth
    s.fill(colors.crosses[colorIndex])
    s.beginShape()
    vertexAt(x, y, -wd / 2, -wd / 2 - ht)
    vertexAt(x, y, wd / 2, -wd / 2 - ht)
    vertexAt(x, y, wd / 2, -wd / 2)
    vertexAt(x, y, wd / 2 + ht, -wd / 2)
    vertexAt(x, y, wd / 2 + ht, wd / 2)
    vertexAt(x, y, wd / 2, wd / 2)
    vertexAt(x, y, wd / 2, wd / 2 + ht)
    vertexAt(x, y, -wd / 2, wd / 2 + ht)
    vertexAt(x, y, -wd / 2, wd / 2)
    vertexAt(x, y, -wd / 2 - ht, wd / 2)
    vertexAt(x, y, -wd / 2 - ht, -wd / 2)
    vertexAt(x, y, -wd / 2, -wd / 2)
    s.endShape(s.CLOSE)

    s.fill(colors.shadow)
    rectAt(x, y, -wd / 2, -wd / 2, -sh, -ht)
    rectAt(x, y, +wd / 2, +wd / 2, sh, ht)
    rectAt(x, y, -wd / 2, +wd / 2, -ht, sh)
    rectAt(x, y, +wd / 2, -wd / 2, ht, -sh)
  }
}
