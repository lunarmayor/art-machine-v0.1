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
    this.historyExists = new ReactiveVar;
    this.historyExists.set(false)
    this.baseImage = null
  }

  setupEvents() {

    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this))
    this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this))
    this.canvas.addEventListener('mouseleave', this.stopDrawing.bind(this))
    this.canvas.addEventListener('mousemove', this.draw.bind(this))
    this.onKeyDown = this.onRestoreHistory.bind(this)
    window.addEventListener('keydown', this.onKeyDown)

  }

  onRestoreHistory(e) {
    if(e.metaKey && e.keyCode == 90) {
      this.restoreHistory()
    }
  }

  restoreHistory() {
    if(this.history.length) {
      this.handleDataURL(this.history.pop())
      if(this.history.length == 0) {
        this.historyExists.set(false)
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
    let x = (e.clientX / 0.74074074074) - (node.offsetLeft / 0.74074074074) + (0.5 * this.width) - 4;
    let y = (e.clientY / 0.74074074074) - 153;
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
      this.history = []
      this.historyExists.set(false)
      this.handleDataURL(this.baseImage)
    }
  }

  teardown() {
    window.removeEventListener('keydown', this.onKeyDown)
  }

  handleDataURL(dataUrl) {
    let img = new Image()
    img.onload = () =>
      this.context.drawImage(img, 0, 0)

    img.src = dataUrl
  }

  loadAndSave(dataUrl) {
    let img = new Image()
    img.crossOrigin = ''
    img.onload = () =>
      this.context.drawImage(img, 0, 0)
      this.baseImage = dataUrl

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
        this.context.drawImage(img, 0, 0, 540, 540)
        this.history = []
        this.historyExists.set(false)
        this.baseImage = this.canvas.toDataURL()
        EditorActions.clearRemix()
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
    this.historyExists.set(true)
    if(this.history.length > 60) {
      this.history.shift()
    }
  }

  glitchCanvas(name) {
    this.saveSnapshot()
    this.backContext.drawImage(this.canvas, 0, 0)
    let imageData = this.backContext.getImageData(0, 0, 540, 540)
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

  messyInvert(i, pixelData) {
    let brightness = this.calculateBrightness(pixelData, i);
    let row = i / this.width / 4
    let position = Math.ceil(row) - row

    let direction = position > 0.5
    let times = Math.floor(Math.random() * 2)


    if(brightness > pixelData[i] && brightness < 200 && brightness > 80) {
      for(let t = 0; t < times; t++) {
        pixelData[i +  (4 * t)] = 255 - pixelData[i] + 5
        pixelData[i + 1 + (4 * t)] = 255 - pixelData[i + 1] + 5
        pixelData[i + 2 + (4 * t)] =  255 - pixelData[i + 2]
      }
    }
    return [255 - pixelData[i] + 5, 255 - pixelData[i+1], 255 - pixelData[i+2]]
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

  sortPixels(m = 0, val = -10000000, sortCol=true, sortRows=true) {
    let value = val;
    let row = 0;
    let column = 0;
    let mode = m

    this.saveSnapshot()
    this.backContext.drawImage(this.canvas, 0, 0)
    let imageData = this.backContext.getImageData(0, 0, 540, 540)
    let pixelData = imageData.data

    let width = 540;
    let height = 540;
    let context = this.context
    draw()

    function draw() {
      while(column < width-1) {
        if(sortCol) {
          sortColumn();
        }
        column++;
      }

      while(row < height -1) {
        if(sortRows) {
          sortRow();
        }
        row++;
      }

      context.putImageData(imageData, 0, 0)
    }

    function sortRow() {
      let x = 0;
      let y = row;
      let xend = 0;

      while(xend < width-1) {
        switch(mode) {
          case 0:
            x = getFirstNotBlackX(x, y);
            xend = getNextBlackX(x,y);
            break;
          case 1:
            x = getFirstBrightX(x, y);
            xend = getNextDarkX(x, y);
            break;
          case 2:
            x = getFirstNotWhiteX(x, y);
            xend = getNextWhiteX(x, y);
            break;
          default:
            break;
        }

        if (x < 0) break;

        let sortLength = xend - x;
        let unsorted = new Array(sortLength)
        let sorted = new Array(sortLength)
        for(let i=0; i < sortLength; i++) {
          unsorted[i] = getPixelValue(x + i, y);
        }

        sorted = unsorted.sort()

        for(let i=0; i < sortLength; i++) {
          setPixelValue(x + i, y, sorted[i]);
        }

        x = xend + 1;
      }
    }

    function sortColumn() {
      let x = column;
      let y = 0;
      let yend = 0;

      while(yend < height - 1) {
        switch(mode) {
          case 0:
            y = getFirstNotBlackY(x, y);
            yend = getNextBlackY(x, y);
            break;
          case 1:
            y = getFirstBrightY(x, y);
            yend = getNextDarkY(x, y);
            break;
          case 2:
            y = getFirstNotWhiteY(x, y);
            yend = getNextWhiteY(x, y);
            break;
          default:
            break;
        }

        if(y < 0) break;

        let sortLength = yend - y;

        let unsorted = new Array(sortLength);
        let sorted = new Array(sortLength);

        for(let i= 0; i < sortLength; i++) {
          unsorted[i] = getPixelValue(x, y+i);
        }

        sorted = unsorted.sort();

        for(let i=0; i < sortLength; i++) {
          setPixelValue(x, y+i, sorted[i]);
        }

        y = yend + 1;
      }
    }

    function setPixelValue(x, y, val) {
      var offset = (x + y * width) * 4;
      var r = (val >> 16) & 255;
      var g = (val >> 8) & 255;
      var b = val & 255;
      pixelData[offset] = r;
      pixelData[offset+1] = g;
      pixelData[offset+2] = b;
    }
    function getPixelValue(x, y) {
      var offset = (x + y * width) * 4;
      var r = pixelData[offset];
      var g = pixelData[offset + 1];
      var b = pixelData[offset + 2];

      return ( ((255 << 8) | r) << 8 | g) << 8 | b;
    }
    function getPixelBrightness(x, y) {
      var offset = (x + y * width) * 4;
      var r = pixelData[offset];
      var g = pixelData[offset + 1];
      var b = pixelData[offset + 2];
      // HSL - lightness:
      // return (Math.max(r,g,b) + Math.min(r,g,b)) / 2
      // HSV - value:
      return Math.max(r,g,b) / 255 * 100;
    }

    //BLACK
    function getFirstNotBlackX(_x, _y) {
      var x = _x;
      var y = _y;

      while(getPixelValue(x, y) < value) {
        x++;
        if(x >= width) return -1;
      }
      return x;
    }

    function getNextBlackX(_x, _y) {
      var x = _x+1;
      var y = _y;
      while(getPixelValue(x, y) > value) {
        x++;
        if(x >= width) return width-1;
      }
      return x-1;
    }

    //BRIGHTNESS
    function getFirstBrightX(_x, _y) {
      var x = _x;
      var y = _y;
      while(getPixelBrightness(x, y) < value) {
        x++;
        if(x >= width) return -1;
      }
      return x;
    }

    function getNextDarkX(_x, _y) {
      var x = _x+1;
      var y = _y;
      while(getPixelBrightness(x, y) > value) {
        x++;
        if(x >= width) return width-1;
      }
      return x-1;
    }

    //WHITE
    function getFirstNotWhiteX(_x, _y) {
      var x = _x;
      var y = _y;
      while(getPixelValue(x, y) > whiteValue) {
        x++;
        if(x >= width) return -1;
      }
      return x;
    }

    function getNextWhiteX(_x, _y) {
      var x = _x+1;
      var y = _y;
      while(getPixelValue(x, y) < whiteValue) {
        x++;
        if(x >= width) return width-1;
      }
      return x-1;
    }


    //BLACK
    function getFirstNotBlackY(_x, _y) {
      var x = _x;
      var y = _y;
      if(y < height) {
        while(getPixelValue(x, y) < value) {
          y++;
          if(y >= height) return -1;
        }
      }
      return y;
    }

    function getNextBlackY(_x, _y) {
      var x = _x;
      var y = _y+1;
      if (y < height) {
        while(getPixelValue(x, y) > value) {
          y++;
          if(y >= height) return height-1;
        }
      }
      return y-1;
    }

    //BRIGHTNESS
    function getFirstBrightY(_x, _y) {
      var x = _x;
      var y = _y;
      if (y < height) {
        while(getPixelBrightness(x, y) < value) {
          y++;
          if(y >= height) return -1;
        }
      }
      return y;
    }

    function getNextDarkY(_x, _y) {
      var x = _x;
      var y = _y+1;
      if (y < height) {
        while(getPixelBrightness(x, y) > value) {
          y++;
          if(y >= height) return height-1;
        }
      }
      return y-1;
    }

    //WHITE
    function getFirstNotWhiteY(_x, _y) {
      var x = _x;
      var y = _y;
      if (y < height) {
        while(getPixelValue(x, y) > whiteValue) {
          y++;
          if(y >= height) return -1;
        }
      }
      return y;
    }

    function getNextWhiteY(_x, _y) {
      var x = _x;
      var y = _y+1;
      if (y < height) {
        while(getPixelValue(x, y) < whiteValue) {
          y++;
          if(y >= height) return height-1;
        }
      }
      return y-1;
    }
  }

  blackHev() {
    this.sortPixels(0, -11359681)
  }

  blackMed() {
    this.sortPixels(0, -9917279)
  }

  blackLight() {
    this.sortPixels(0, -8000000)
  }

  brightLight() {
    this.sortPixels(1, 80)
  }

  brightMed() {
    this.sortPixels(1, 40)
  }

  brightHev() {
    this.sortPixels(1, 10)
  }

  sortColumns() {
    let intensity = Math.floor(Math.random() * 80)
    this.sortPixels(1, intensity, true, false)
  }

  sortRows() {
    let intensity = Math.floor(Math.random() * 80)
    this.sortPixels(1, intensity, false, true)
  }
}

this.ArtBoard = ArtBoard
