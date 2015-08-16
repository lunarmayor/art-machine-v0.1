class BackgroundPicker extends React.Component {
  handleImage(file) {
    this.props.artBoard.handleImage(file);
    EditorActions.changeStage('edit')
  }

  render() {
    return (
      <div className="editor-canvasContainer editor-painterContainer">
        <FileDropZone
          dropHandler={this.handleImage.bind(this)}
          width='320'
          height='320'>
          <CanvasPainter artBoard={this.props.artBoard}/>
        </FileDropZone>
      </div>
    )
  }
}

this.BackgroundPicker = BackgroundPicker
