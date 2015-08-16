class GlitchFilter extends React.Component {
  glitchCanvas() {
    this.props.artBoard.glitchCanvas(this.props.name)
  }

  render() {
    let style = { background: this.props.color };

    return (
      <li onClick={this.glitchCanvas.bind(this)} style={style}>{this.props.name}</li>
    )
  }
}

this.GlitchFilter = GlitchFilter
