// TODO move all canvas code in to this library
class ArtBoard {
  constructor(canvasEl) {
    this.canvas = canvasEl;
    this.setupCanvas();
  }

  setupCanvas() {
    this.context = this.canvas.getContext('2d');
    [this.width, this.height] = [this.canvas.width, this.canvas.height];
    [this.currentX, this.currentY] = [0, 0];
  }
}

