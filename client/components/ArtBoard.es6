class ArtBoard extends React.Component {
  componentDidMount() {
    this.setupCanvas()
    this.currX = 0
    this.currY = 0
  }

  setupCanvas() {
    this.canvas = React.findDOMNode(this.refs.canvas)
    this.context = this.canvas.getContext('2d')
    this.canvasWidth = this.props.width;
    this.canvasHeight = this.props.height;
  }

  fillCanvas(color) {
    this.context.fillStyle = color;
    this.context.fillRect(0,0,this.canvasWidth,this.canvasHeight);
  }

  startDrawing(e) {
    this.drawing = true;
    this.setXY(e)
  }

  stopDrawing(e) {
    this.drawing = false;
    this.setXY(e)
  }

  draw(e) {
    e.preventDefault()
    if(this.drawing) {

      console.log(this)
      this.context.beginPath()
      this.context.lineWidth = 5;
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.context.strokeStyle = '#fff'
      this.context.moveTo(this.currX, this.currY)
      this.setXY(e)
      this.context.lineTo(this.currX, this.currY)
      this.context.stroke()
    }
  }

  setXY(e) {
    let node = React.findDOMNode(this.refs.canvas)
    let x = e.clientX - node.offsetLeft + 160;
    let y = e.clientY - node.offsetTop;
    [this.currX, this.currY] = [x, y]
  }

  saveCanvas() {
    ArtWorkActions.create(this.canvas.toDataURL())
  }

  downloadCanvas() {
    a = document.createElement('a');
    a.href = this.canvas.toDataURL()
    a.download = "artwork.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  handleImage(file) {
    if (!file.type.match('image.*')) {
      return false
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

  render() {
    return (
      <canvas
        ref='canvas'
        className='artBoard'
        width={this.props.width}
        height={this.props.height}
        onMouseDown={this.startDrawing.bind(this)}
        onMouseUp={this.stopDrawing.bind(this)}
        onMouseLeave={this.stopDrawing.bind(this)}
        onMouseMove={this.draw.bind(this)}/>
    )
  }
}


