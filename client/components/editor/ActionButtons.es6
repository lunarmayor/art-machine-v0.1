@CanNavigate @HasMeteorData
class ActionButtons extends React.Component {
  constructor(props) {
    super(props)
    window.thang = this;
  }
  getMeteorData() {
    this.props.artBoard.historyExists.get()
    return {
      historyExists: this.props.artBoard.historyExists,
    }
  }

  clearCanvas() {
    this.props.artBoard.resetWithLastBase()
  }

  saveCanvas() {
    let createData = {
      canvasData: this.props.artBoard.toDataURL(),
      original: this.props.original,
    }
    ArtWorkActions.create(createData)
    this.transitionTo('/explore/stream')
  }

  downloadCanvas() {
    this.props.artBoard.download()
  }

  restoreHistory() {
    this.props.artBoard.restoreHistory()
  }

  render() {
    return (
      <span>
        <button onClick={this.clearCanvas.bind(this)}>reset</button>
        <button onClick={this.saveCanvas.bind(this)}>publish</button>
        <button onClick={this.downloadCanvas.bind(this)}>download</button>
        { this.data.historyExists.get() ?
          <button onClick={this.restoreHistory.bind(this)}>undo</button>
        : null }
      </span>
    )
  }
}

this.ActionButtons = ActionButtons
