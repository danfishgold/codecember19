const ns = 'http://www.w3.org/2000/svg'

const initialStyle = {
  fill: 'white',
  stroke: 'black',
  strokeWeight: 1,
}

class Sketch {
  constructor() {
    this.CLOSE = true
    this.width = null
    this.height = null

    this.style = { ...initialStyle }
    this.styleStack = []

    this.svg = null
    this.children = []
    this.defs = []

    this.currentDefChildren = []
    this.addingToDef = false

    this.isDansSvgThing = true
  }

  sqrt(x) {
    return Math.sqrt(x)
  }
  abs(x) {
    return Math.abs(x)
  }
  random(a, b) {
    return a + (b - a) * Math.random()
  }

  createCanvas(width, height) {
    const svg = document.createElementNS(ns, 'svg')
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
    svg.setAttribute('preserveAspectRatio', 'xMidYMin slice')
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svg.setAttributeNS(ns, 'xlink', 'http://www.w3.org/1999/xlink')
    if (document.getElementsByTagName('main').length === 0) {
      var m = document.createElement('main')
      document.body.appendChild(m)
    }
    document.getElementsByTagName('main')[0].appendChild(svg)

    this.svg = svg
    this.width = width
    this.height = height
  }
  createVector(x, y) {
    return new p5.Vector(x, y)
  }
  noLoop() {}

  line(x1, y1, x2, y2) {
    this._addChild('line', {
      x1,
      y1,
      x2,
      y2,
      ...this._styleAttrs,
    })
  }
  triangle(x1, y1, x2, y2, x3, y3) {
    this._addChild('polygon', {
      points: `${x1}, ${y1} ${x2}, ${y2} ${x3}, ${y3}`,
      ...this._styleAttrs,
    })
  }
  ellipse(cx, cy, wd, ht) {
    const rx = wd / 2
    const ry = (ht || wd) / 2
    this._addChild('ellipse', {
      cx,
      cy,
      rx,
      ry: ry || rx,
      ...this._styleAttrs,
    })
  }

  beginShape() {
    this.currentPathParts = []
    this.shouldBeginContour = true
  }
  vertex(x, y) {
    if (this.shouldBeginContour) {
      this.currentPathParts.push(Sketch.round`M ${x} ${y}`)
      this.shouldBeginContour = false
    } else {
      this.currentPathParts.push(Sketch.round`L ${x} ${y}`)
    }
  }
  quadraticVertex(x1, y1, x, y) {
    this.currentPathParts.push(Sketch.round`Q ${x1} ${y1}, ${x} ${y}`)
  }
  bezierVertex(x1, y1, x2, y2, x, y) {
    this.currentPathParts.push(
      Sketch.round`C ${x1} ${y1}, ${x2} ${y2}, ${x} ${y}`
    )
  }
  beginContour() {
    this.currentPathParts.push('Z')
    this.shouldBeginContour = true
  }
  endContour() {}
  endShape(shouldClose) {
    if (shouldClose) {
      this.currentPathParts.push('Z')
    }
    this._addChild('path', {
      d: this.currentPathParts.join(' '),
      ...this._styleAttrs,
    })
  }
  background(color) {
    this._addChild('rect', {
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
      fill: color,
    })
  }

  noStroke() {
    this.style.stroke = null
    this.style.strokeWeight = 1
  }
  stroke(color) {
    this.style.stroke = color
  }
  fill(color) {
    this.style.fill = color
  }
  strokeWeight(weight) {
    this.style.strokeWeight = weight
  }
  noFill() {
    this.style.fill = null
  }

  push() {
    this.styleStack.push({ ...this.style })
  }
  pop() {
    this.style = { ...this.styleStack.pop() }
  }

  _addChild(name, attrs) {
    if (this.addingToDef) {
      this.currentDefChildren.push({ name, attrs })
    } else {
      this.children.push({ name, attrs })
    }
  }

  _startDef() {
    this.addingToDef = true
  }

  _endDef(id) {
    this.defs.push({ id, children: this.currentDefChildren })
    this.addingToDef = false
    this.currentDefChildren = []
  }

  _appendToElement(parent, tagName, attrs) {
    const boi = document.createElementNS(ns, tagName)
    for (const [attr, value] of Object.entries(attrs)) {
      boi.setAttribute(attr === 'strokeWidth' ? 'stroke-width' : attr, value)
    }
    parent.appendChild(boi)
  }

  _populateSvg(svg, children, defs) {
    if (defs.length > 0) {
      const defsElement = document.createElementNS(ns, 'defs')
      for (const { id, children } of defs) {
        const defElement = document.createElementNS(ns, 'g')
        defElement.setAttribute('id', id)
        children.forEach(({ name, attrs }) =>
          this._appendToElement(defElement, name, attrs)
        )
        defsElement.appendChild(defElement)
      }
      svg.appendChild(defsElement)
    }
    children.forEach(({ name, attrs }) =>
      this._appendToElement(svg, name, attrs)
    )
  }

  use(id, x, y) {
    this._addChild('use', {
      href: `#${id}`,
      transform: Sketch.round`translate(${x}, ${y})`,
    })
  }

  get _styleAttrs() {
    return {
      fill: this.style.fill || 'none',
      stroke: this.style.stroke || 'none',
      strokeWidth: this.style.strokeWeight,
    }
  }

  static round(between, ...values) {
    return between
      .map((betweenString, index) => {
        if (index < values.length) {
          return `${betweenString}${Sketch.roundNumber(values[index])}`
        } else {
          return betweenString
        }
      })
      .join('')
  }

  static roundNumber(x) {
    return Math.round(x * 10) / 10
  }
}

class p5Svg {
  constructor(buildSketch) {
    const sketch = new Sketch()
    buildSketch(sketch)
    sketch.setup()
    sketch.draw()
    sketch._populateSvg(sketch.svg, sketch.children, sketch.defs)
  }
}
