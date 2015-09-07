this.ActionButtons = React.createClass({
  mixins: [ReactMeteorData, Navigation],

  getMeteorData() {
    this.props.artBoard.historyExists.get()
    return {
      historyExists: this.props.artBoard.historyExists,
    }
  },

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

  restoreHistory() {
    this.props.artBoard.restoreHistory()
  },

  render() {
    return (
      <span>
        <button onClick={this.clearCanvas}>reset</button>
        <button onClick={this.saveCanvas}>publish</button>
        <button onClick={this.downloadCanvas}>download</button>
        { this.data.historyExists.get() ?
          <button onClick={this.restoreHistory}>undo</button>
        : null }
      </span>
    )
  }
})

