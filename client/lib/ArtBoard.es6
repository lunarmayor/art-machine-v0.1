// TODO move all canvas code in to this library
class ArtBoard {
  setArtBoard(canvasEl, previewCanvas, image=null) {
    this.canvas = canvasEl || document.createElement('canvas');
    this.backCanvas = previewCanvas || document.createElement('canvas')
    this.setupCanvas();
    this.setupEvents();
    this.toolColor = '#fff';
    this.toolSize = 5;
    this.currentDrawTool = 'paint';
    this.density = 20;
    this.sprayRadius = 20;
    this.setupMarker(this.toolColor, this.toolSize);
    this.history = []
    this.baseImage = null
  }

  setupEvents() {

    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this))
    this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this))
    this.canvas.addEventListener('mouseleave', this.stopDrawing.bind(this))
    this.canvas.addEventListener('mousemove', this.draw.bind(this))
    window.removeEventListener('keydown', this.restoreHistory.bind(this))
    window.addEventListener('keydown', this.restoreHistory.bind(this))

  }

  restoreHistory(e) {
    if(e.metaKey && e.keyCode == 90) {
      if(this.history.length) {
        this.handleDataURL(this.history.pop())
      }
    }
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
    this.baseImage = this.canvas.toDataURL()
    this.context.fillStyle = currentColor;
  }

  startDrawing(e) {
    this.saveSnapshot()
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

  resetWithLastBase() {
    if(this.baseImage) {
      this.handleDataURL(this.baseImage)
    }
  }

  handleDataURL(dataUrl) {
    let img = new Image()
    img.onload = () =>
      this.context.drawImage(img, 0, 0)

    img.src = dataUrl
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
        this.history = []
        this.baseImage = this.canvas.toDataURL()
      }
      img.src = e.target.result
    }

    reader.readAsDataURL(file)
  }

  toDataURL() {
    return this.canvas.toDataURL();
  }

  saveSnapshot() {
    this.history.push(this.canvas.toDataURL())
  }

  glitchCanvas(name) {
    this.saveSnapshot()
    this.backContext.drawImage(this.canvas, 0, 0)
    let imageData = this.backContext.getImageData(0, 0, 320, 320)
    let pixelData = imageData.data

    let i = 0;
    for(i; i <= pixelData.length; i = i + 4) {
      let newPixelValue = this[name](i, pixelData)
      if(newPixelValue) {
        [pixelData[i], pixelData[i + 1], pixelData[i + 2]] = newPixelValue
      }
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

  aquafier(i, pixelData) {
    let brightness = this.calculateBrightness(pixelData, i);
    if(brightness < 90) {
      return [
        0,
        Math.random() * 50,
        Math.random() * 20,
      ]
    } else {
      return [
        Math.sin(+Date.now()/ 200) * 200 + 100,
        Math.random() * 255,
        Math.random() * 255,
      ]
    }
  }

  darkGravity(i, pixelData) {
    let brightness = this.calculateBrightness(pixelData, i);
    if(brightness < 80) {
      let times = Math.floor(Math.random() * 4)
      for(let t = 0; t < times; t++) {
        pixelData[i + this.width * 4 * t] = pixelData[i]
        pixelData[i + 1 + this.width * 4 * t] = pixelData[i + 1]
        pixelData[i + 2 + this.width * 4 * t] = pixelData[i + 2]
      }
     return [pixelData[i], pixelData[i+1], pixelData[i+2]]
    } else {
     return [pixelData[i], pixelData[i+1], pixelData[i+2]]
    }
  }

  lightGravity(i, pixelData) {
    let brightness = this.calculateBrightness(pixelData, i);
    if(brightness > 80) {
      let times = Math.floor(Math.random() * 4)
      for(let t = 0; t < times; t++) {
        pixelData[i + this.width * 4 * t] = pixelData[i]
        pixelData[i + 1 + this.width * 4 * t] = pixelData[i + 1]
        pixelData[i + 2 + this.width * 4 * t] = pixelData[i + 2]
      }
      return [pixelData[i], pixelData[i+1], pixelData[i+2]]
    } else {
      return [pixelData[i], pixelData[i+1], pixelData[i+2]]
    }
  }

  new(i, pixelData) {
    let now = +new Date();
    return [
      Math.cos(now / 250) * pixelData[i] + pixelData[i],
      Math.tan(now / 210) * pixelData[i+1] / Math.random() * 100,
      Math.sin(now / 181) * pixelData[i+2] + Math.random() * 100,
    ]
  }

  newnew(i, pixelData) {
    let now = +new Date();
    let brightness = this.calculateBrightness(pixelData, i)
    let brightnessBelow = this.calculateBrightnessBelow(pixelData, i)

    if(brightness < 80) {
      return [0,0,0]
    }

    if(brightnessBelow < brightness) {
      return [200, Math.sin(now/ 3999) * 100, Math.cos(now / 999) * 100]
    }

    return [
      Math.cos(now / 250) * pixelData[i] + pixelData[i],
      Math.tan(now / 210) * pixelData[i+1] / Math.random() * 100,
      Math.sin(now / 181) * pixelData[i+2] + Math.random() * 100,
    ]
  }

  slicer(i, pixelData) {
    let now = +new Date();
    let brightness = this.calculateBrightness(pixelData, i)
    let brightnessBelow = this.calculateBrightnessBelow(pixelData, i)

    if(brightness > brightnessBelow) {
      let times = Math.floor(Math.random() * 8)
      for(let t = 0; t < times; t++) {
        pixelData[i + this.width * 4 * t] = pixelData[i]
        pixelData[i + 1 + this.width * 4 * t] = pixelData[i + 1]
        pixelData[i + 2 + this.width * 4 * t] = pixelData[i + 2]
      }
    } else {
      let times = Math.floor(Math.random() * 8)
      for(let t = 0; t < times; t++) {
        pixelData[i +  4 * t] = pixelData[i]
        pixelData[i + 1 + 4 * t] = pixelData[i + 1]
        pixelData[i + 2 + 4 * t] = pixelData[i + 2]
       }
     }
     return [pixelData[i], pixelData[i+1], pixelData[i+2]]
  }
  newnews(i, pixelData) {
     let now = +new Date();
     let brightness = this.calculateBrightness(pixelData, i)
     let brightnessBelow = this.calculateBrightnessBelow(pixelData, i)

     if(brightness > brightnessBelow) {
       let times = Math.floor(Math.random() * 8)
       for(let t = 0; t < times; t++) {
         let direction = Math.floor(Math.random() * 20) - 10
         pixelData[i + this.width * direction * 4 * t] = pixelData[i]
         pixelData[i + 1 + this.width * direction  * 4 * t] = pixelData[i + 1]
         pixelData[i + 2 + this.width * direction * 4 * t] = pixelData[i + 2]
       }
     }
     return [pixelData[i], pixelData[i+1], pixelData[i+2]]
   }

  crusher(i, pixelData) {
     let now = +new Date();
     let brightness = this.calculateBrightness(pixelData, i)
     let brightnessBelow = this.calculateBrightnessBelow(pixelData, i)

     if(brightness < 100) {
       return [0,0,0]
     }

     if(brightness > 200) {
      return [pixelData[i], pixelData[i+1], pixelData[i+2]]
     }

     return [
      Math.sin(now * 235) * Math.sin(now * 304) * 50 + 150,
      Math.sin(now * 235) * Math.sin(now * 1220) * 50 + 150,
      Math.sin(now * 192) * Math.sin(now * 22) * 50 + 150,
     ]
   }


  random(i, pixelData) {
    let now = +new Date();
    let brightness = this.calculateBrightness(pixelData, i)
    let brightnessBelow = this.calculateBrightnessBelow(pixelData, i)

    if(brightness > brightnessBelow) {
      let times = Math.floor(Math.random() * 7)
      for(let t = 0; t < times; t++) {
        pixelData[i + Math.floor(Math.random()) * 10 * 4 * t] = pixelData[i] * Math.sin(now / 200) + 100
        pixelData[i + 1 + this.width * 4 * t] = pixelData[i + 1] * Math.sin(now / 100) + 100
        pixelData[i + 2 + this.width * 4 * t] = pixelData[i + 2] * Math.cos(now/ 100) + 100
      }
    } else {
      let times = Math.floor(Math.random() * 2)
      for(let t = 0; t < times; t++) {
        pixelData[i +  4 * t] = pixelData[i]
        pixelData[i + 1 + 4 * t] = pixelData[i + 1]
        pixelData[i + 2 + 4 * t] = pixelData[i + 2]
       }
     }
     return [pixelData[i], pixelData[i+1], pixelData[i+2]]
   }

  blueGreenMeltDown(i, pixelData) {
    let brightness = this.calculateBrightness(pixelData, i)
    let brightnessBelow = this.calculateBrightnessBelow(pixelData, i)
    let now = +new Date();

    let pixel = this.pixel(i - Math.floor(Math.cos(now/20000) * brightness * Math.sin(now / 30000) - 20), pixelData)
    if(pixel[0] > 100) {
      return this.pixel(i, pixelData)
    } else {
      return pixel
    }
  }

  splitFace(i, pixelData) {
    let brightness = this.calculateBrightness(pixelData, i);
    let brightnessBelow = this.calculateBrightnessBelow(pixelData, i)
    let now = +new Date()
    if(brightnessBelow < brightness) {
      return this.pixel((Math.ceil(Math.cos(now / 20000000) * this.width * this.height * 4 / 2) + 3 + Math.floor(0.2 * this.width * this.height * 4)), pixelData)
    } else {
      return this.pixel(i, pixelData)
    }
  }

  pixel(i, pixelData) {
    return [pixelData[i], pixelData[i + 1], pixelData[i + 2]]
  }

  calculateBrightness(data, i) {
    return 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]
  }
  calculateBrightnessBelow(data, i) {
    return this.calculateBrightness(data, i + this.width * 4)
  }
}

this.ArtBoard = ArtBoard
