class FileDropZone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
    }
  }

  _onDrop(e) {
    e.preventDefault();
    let data = e.dataTransfer;
    let file = data.files[0];
    this.setState({ isActive: false })

    this.props.dropHandler(file);
  }

  _onDragOver(e) {
    e.preventDefault();
  }

  _onDragEnter(e) {
    e.preventDefault();
    this.setState({ isActive: true })
  }

  _onDragLeave(e) {
    e.preventDefault();
    this.setState({ isActive: false })
  }

  classes() {
    let classes = 'dropZone';
    if(this.state.isActive) {
      classes = classes + ' isActive'
    }
    return classes
  }

  render() {
    return (
      <div
        className={this.classes()}
        width={this.props.width}
        height={this.props.height}
        onDragOver={this._onDragOver.bind(this)}
        onDragEnter={this._onDragEnter.bind(this)}
        onDragLeave={this._onDragLeave.bind(this)}
        onDrop={this._onDrop.bind(this)}>
        {this.props.children}
      </div>
    )
  }
}

this.FileDropZone = FileDropZone
