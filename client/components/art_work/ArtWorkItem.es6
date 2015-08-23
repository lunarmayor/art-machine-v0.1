class ArtWorkItem extends React.Component {
  upvote() {
    ArtWorkActions.upvote(this.props.artWork._id)
  }

  render() {
    let artWork = this.props.artWork;
    let user = artWork.user;

    return(
      <div className='artWork'>
        <Link to={`/art-piece/${artWork._id}`}>
          <img
            onDoubleClick={this.upvote.bind(this)}
            src={this.props.artWork.canvasData}
            name={this.props.artWork._id}
            ref='canvas' width='320'
            height='320'
            className='artWork-canvas'/>
        </Link>
        <footer className='artWork-footer'>
          <div className='artWork-userAv'>
            <Link to={`/profile/${user._id}`}>
              <img src={user.av_url}/>
            </Link>
          </div>
          <UpvoteButton artWork={this.props.artWork}/>
          <RemixButton artWork={this.props.artWork}/>
          { Meteor.userId() === user._id || Meteor.user().isAdmin ?
            <DeleteButton artWork={this.props.artWork}/>
          : null }
        </footer>
      </div>
    )
  }
}

this.ArtWorkItem = ArtWorkItem
