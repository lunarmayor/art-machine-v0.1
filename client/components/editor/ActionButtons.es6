class ActionButtons extends React.Component {
  clearCanvas() {
    this.props.artBoard.resetWithLastBase()
  }

  saveCanvas() {
    ArtWorkActions.create(this.props.artBoard.toDataURL())
  }

  downloadCanvas() {
    this.props.artBoard.download()
  }

  render() {
    return (
      <span>
        <button onClick={this.clearCanvas.bind(this)}>reset</button>
        <button onClick={this.saveCanvas.bind(this)}>publish</button>
        <button onClick={this.downloadCanvas.bind(this)}>download</button>
      </span>
    )
  }
}

this.ActionButtons = ActionButtons
