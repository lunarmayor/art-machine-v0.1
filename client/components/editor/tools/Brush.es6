class Brush extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      size: this.props.artBoard.getLineWidth(),
      color: this.props.artBoard.getStrokeColor(),
    }
  }

  updateSize(e) {
    console.log(this.state.size)
    let value = parseInt(e.target.value);
    this.props.artBoard.setLineWidth(value);
    this.setState({ size: value})
  }

  updateColor(e) {
    let value = e.target.value;
    this.props.artBoard.setStrokeColor(value)
    this.setState({ color: value })
  }

  render() {
    return (
      <div className="toolOptions">
        <h6>Brush Size</h6>
        <input onChange={this.updateSize.bind(this)} type='number' value={this.state.size}/>
        <h6>Brush Color</h6>
        <input onChange={this.updateColor.bind(this)} type='color' value={this.state.color}/>
      </div>
    )
  }
}

this.Brush = Brush
