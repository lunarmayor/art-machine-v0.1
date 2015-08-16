class SprayCan extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      density: this.props.artBoard.getDensity(),
      sprayRadius: this.props.artBoard.getSprayRadius(),
      color: this.props.artBoard.getFillColor(),
    }
  }

  updateDensity(e) {
    let value = parseInt(e.target.value);
    this.props.artBoard.setDensity(value);
    this.setState({ density: value })
  }

  updateColor(e) {
    let value = e.target.value;
    this.props.artBoard.setFillColor(value);
    this.setState({ color: value })
  }

  updateSprayRadius(e) {
    let value = e.target.value;
    this.props.artBoard.setSprayRadius(value);
    this.setState({ sprayRadius: value })
  }

  render() {
    return (
      <div className='toolOptions'>
        <h6>Density</h6>
        <input onChange={this.updateDensity.bind(this)} type='number' value={this.state.density}/>
        <h6>Spray Radius</h6>
        <input onChange={this.updateSprayRadius.bind(this)} type='number' value={this.state.sprayRadius}/>
        <h6>Color</h6>
        <input onChange={this.updateColor.bind(this)} type='color' value={this.state.color}/>
      </div>
    )
  }
}

this.SprayCan = SprayCan
