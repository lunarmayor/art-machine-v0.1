class GlitchFilter extends React.Component {
  glitchCanvas() {
    this.props.artBoard.glitchCanvas(this.props.name)
  }

  render() {

    return (
      <li onClick={this.glitchCanvas.bind(this)}>{this.props.name}</li>
    )
  }
}

this.GlitchFilter = GlitchFilter
