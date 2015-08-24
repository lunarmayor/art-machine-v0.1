this.ActionButtons = React.createClass({
  mixins: [Navigation],
  clearCanvas() {
    this.props.artBoard.resetWithLastBase()
  },

  saveCanvas() {
    let createData = {
      canvasData: this.props.artBoard.toDataURL(),
      original: this.props.original,
    }
    ArtWorkActions.create(createData)
    this.transitionTo('/explore/stream')
  },

  downloadCanvas() {
    this.props.artBoard.download()
  },

  render() {
    return (
      <span>
        <button onClick={this.clearCanvas}>reset</button>
        <button onClick={this.saveCanvas}>publish</button>
        <button onClick={this.downloadCanvas}>download</button>
      </span>
    )
  }
})
