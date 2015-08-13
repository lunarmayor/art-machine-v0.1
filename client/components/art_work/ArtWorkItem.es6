class ArtWorkItem extends React.Component {
  componentDidMount() {
    this.setupCanvas();
  }

  setupCanvas() {
    this.canvas = React.findDOMNode(this.refs.canvas);
    this.context = this.canvas.getContext('2d')

    let img = new Image()
    img.onload = () =>
      this.context.drawImage(img, 0, 0)

    img.src = this.props.artWork.canvasData
    window.img = img
    window.ctx = this.context
  }

  render() {
    let artWork = this.props.artWork;
    let user = artWork.user;

    return(
      <div className='artWork'>
        <h5 className='artWork-header'>
          <div className='artWork-userAv'>
            <img src={user.av_url}/>
          </div>
          <div className='artWork-userName'>
            {user.name}
          </div>
        </h5>
        <canvas ref='canvas' width='320' height='320' className='artWork-canvas'/>
        <footer className='artWork-footer'>
        </footer>
      </div>
    )
  }
}

this.ArtWorkItem = ArtWorkItem
