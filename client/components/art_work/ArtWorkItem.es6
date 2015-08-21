class ArtWorkItem extends React.Component {
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
        <img src={this.props.artWork.canvasData} name={this.props.artWork._id} ref='canvas' width='320' height='320' className='artWork-canvas'/>
        <footer className='artWork-footer'>
          <UpvoteButton artWork={this.props.artWork}/>
          <RemixButton artWork={this.props.artWork}/>
        </footer>
      </div>
    )
  }
}

this.ArtWorkItem = ArtWorkItem
