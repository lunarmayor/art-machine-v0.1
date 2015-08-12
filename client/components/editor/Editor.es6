class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new: true,
    }
  }

  componentDidMount() {
    this.setupCanvas()
    this.currX = 0
    this.currY = 0
  }

  setupCanvas() {
    this.canvas = React.findDOMNode(this.refs.canvas)
    this.context = this.canvas.getContext('2d')
    this.canvasWidth = 320;
    this.canvasHeight = 320;
  }

  fillCanvas(color) {
    this.context.fillStyle = color;
    this.context.fillRect(0,0,this.canvasWidth,this.canvasHeight);
    this.setState({ new: false })
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
    let x = e.clientX - this.canvas.offsetLeft + 160;
    let y = e.clientY - this.canvas.offsetTop
    [this.currX, this.currY] = [x, y]
  }

  render() {
    return (
      <div className="editor">
        {this.state.new ?
          <CanvasPainter onPaintSelection={this.fillCanvas.bind(this)}/>
        : null}
        <canvas
          width='320'
          height='320'
          ref='canvas'
          onMouseDown={this.startDrawing.bind(this)}
          onMouseUp={this.stopDrawing.bind(this)}
          onMouseLeave={this.stopDrawing.bind(this)}
          onMouseMove={this.draw.bind(this)}/>
      </div>
    )
  }
}

this.Editor = Editor
