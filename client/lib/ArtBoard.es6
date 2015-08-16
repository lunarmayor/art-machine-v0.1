// TODO move all canvas code in to this library
class ArtBoard {
  constructor(canvasEl=null, image=null) {
    this.canvas = canvasEl || document.createElement('canvas');
    this.setupCanvas();
    this.setupEvents();
    this.toolColor = '#fff';
    this.toolSize = 5;
    this.setupMarker(this.toolColor, this.toolSize);
  }

  setArtBoard(canvas, image=null) {
    this.constructor(canvas)
  }

  setupEvents() {
    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this))
    this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this))
    this.canvas.addEventListener('mouseleave', this.stopDrawing.bind(this))
    this.canvas.addEventListener('mousemove', this.draw.bind(this))
  }

  setupMarker(color, width) {
    this.context.lineWidth = width;
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.strokeStyle = color;
  }

  setupCanvas() {
    this.context = this.canvas.getContext('2d');
    [this.width, this.height] = [this.canvas.width, this.canvas.height];
    [this.currentX, this.currentY] = [0, 0];
  }

  fill(color) {
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.width, this.height);
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
      this.context.beginPath();
      this.context.moveTo(this.currX, this.currY);
      this.setXY(e);
      this.context.lineTo(this.currX, this.currY);
      this.context.stroke();
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
}

this.ArtBoard = ArtBoard
