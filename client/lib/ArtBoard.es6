// TODO move all canvas code in to this library
class ArtBoard {
  constructor(canvasEl=null, previewCanvas=null, image=null) {
    this.canvas = canvasEl || document.createElement('canvas');
    this.backCanvas = previewCanvas || document.createElement('canvas')
    this.setupCanvas();
    this.setupEvents();
    this.toolColor = '#fff';
    this.toolSize = 5;
    this.currentDrawTool = 'paint';
    this.density = 10;
    this.sprayRadius = 10;
    this.setupMarker(this.toolColor, this.toolSize);
  }

  setArtBoard(canvas, preview, image=null) {
    this.constructor(canvas, preview)
  }

  setupEvents() {
    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this))
    this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this))
    this.canvas.addEventListener('mouseleave', this.stopDrawing.bind(this))
    this.canvas.addEventListener('mousemove', this.draw.bind(this))
  }

  setupMarker(color='#fff', width=5) {
    this.context.lineWidth = width;
    this.context.fillStyle = color;
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.strokeStyle = color;
  }

  setLineWidth(width) {
    this.context.lineWidth = width;
  }

  getLineWidth() {
    return this.context.lineWidth;
  }

  setStrokeColor(color) {
    this.context.strokeStyle = color;
  }

  setFillColor(color) {
    this.context.fillStyle = color;
  }

  setDensity(density) {
    this.density = density;
  }

  getDensity() {
    return this.density
  }

  setSprayRadius(radius) {
    this.sprayRadius = radius
  }

  getSprayRadius() {
    return this.sprayRadius
  }

  getStrokeColor(color) {
    return this.context.strokeStyle;
  }

  getFillColor(color) {
    return this.context.fillStyle;
  }

  setupCanvas() {
    this.context = this.canvas.getContext('2d');
    this.backContext = this.backCanvas.getContext('2d');
    [this.width, this.height] = [this.canvas.width, this.canvas.height];
    [this.currentX, this.currentY] = [0, 0];
  }

  fill(color) {
    var currentColor = this.context.fillStyle
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.fillStyle = currentColor;
  }

  startDrawing(e) {
    this.drawing = true;
    this.setXY(e);
  }

  stopDrawing(e) {
    this.drawing = false;
    this.setXY(e);
  }

  draw(e) {
    e.preventDefault()
    if(this.drawing) {
      this[this.currentDrawTool](e)
    }
  }

  paint(e) {
    this.context.beginPath();
    this.context.moveTo(this.currX, this.currY);
    this.setXY(e);
    this.context.lineTo(this.currX, this.currY);
    this.context.stroke();
  }

  getRandomOffset() {
    let randomAngle = Math.random() * 360;
    let randomRadius = Math.random() * this.sprayRadius;

    return {
      x: Math.cos(randomAngle) * randomRadius,
      y: Math.sin(randomAngle) * randomRadius,
    }

  }

  sprayPaint(e) {
    this.setXY(e)
    for (i = 0; i < this.density; i++) {
      let offset = this.getRandomOffset()
      let x = this.currX + offset.x;
      let y = this.currY + offset.y;
      this.context.fillRect(x, y, 1, 1)
    }
  }

  setXY(e) {
    let node = this.canvas.parentElement.parentElement;
    let x = e.clientX - node.offsetLeft + (0.5 * this.width) - 3
    let y = e.clientY - 112;
    [this.currX, this.currY] = [x, y]
  }

  download() {
    a = document.createElement('a');
    a.href = this.canvas.toDataURL()
    a.download = "artwork.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  handleImage(file) {
    if(!file.type.match('image.*')) {
      return false;
    }

    let reader = new FileReader()
    reader.onload = (e) => {
      let img = new Image()
      img.onload = () => {
        this.context.drawImage(img, 0, 0, 320, 320)
      }
      img.src = e.target.result
    }

    reader.readAsDataURL(file)
  }

  toDataURL() {
    return this.canvas.toDataURL();
  }

  glitchCanvas(name) {
    this.backContext.drawImage(this.canvas, 0, 0)
    let imageData = this.backContext.getImageData(0, 0, 320, 320)
    let pixelData = imageData.data

    let i = 0;
    for(i; i <= pixelData.length; i = i + 4) {
      [pixelData[i], pixelData[i + 1], pixelData[i + 2]] = this[name](i, pixelData)
    }
    this.context.putImageData(imageData, 0, 0)
  }

  lavaworld(i, pixelData) {
    let brightness = this.calculateBrightness(pixelData, i)
    if(brightness < 100) {
      return [
        Math.random() * 200,
        Math.random() * 50,
        Math.random() * 20,
      ]
    } else {
      return [200, 100, 0]
    }
  }

  new(i, pixelData) {

  }

  calculateBrightness(data, i) {
    return 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]
  }
}

this.ArtBoard = ArtBoard
