@connectToStores
class Editor extends React.Component {
  static getStores() {
    return [EditorStore];
  }

  static getPropsFromStores() {
    return EditorStore.getState();
  }

  componentDidMount() {
    this.setupCanvas()
  }

  setupCanvas() {
    this.canvas = React.findDOMNode(this.refs.canvas)
    this.props.artBoard.setArtBoard(this.canvas)
  }

  handleImage(file) {
    this.props.artBoard.handleImage(file);
  }

  render() {
    return (
      <div className="editor">
        <section>
          {this.props.stage == 'new' ?
            <div className='editor-canvasContainer editor-painterContainer'>
              <FileDropZone
                dropHandler={this.handleImage.bind(this)}
                width='320'
                height='320'>
                <CanvasPainter artBoard={this.props.artBoard}
                  onImageSelection={this.handleImage.bind(this)}/>
              </FileDropZone>
            </div>
          : null}
          <div ref='canvasContainer' className='editor-canvasContainer'>
            <FileDropZone
              dropHandler={this.handleImage.bind(this)}
              height='320'
              width='320'>
              <canvas width='320' height='320' ref='canvas'/>
            </FileDropZone>
            {!(this.props.stage == 'new') ?
              <ActionButtons artBoard={this.props.artBoard}/>
            : null}
          </div>
        </section>
        <aside>
        </aside>
      </div>
    )
  }
}

this.Editor = Editor
