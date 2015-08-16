class PaintBlock extends React.Component {
  paintCanvas() {
    this.props.artBoard.fill(this.props.color)
    EditorActions.changeStage('edit')
  }

  render() {
    let style = { background: this.props.color }

    return (
      <div className='paintBlock'>
        <div
          onClick={this.paintCanvas.bind(this)}
          className='paintBlock-hue'
          style={style}/>
      </div>
    )
  }
}

this.PaintBlock = PaintBlock

