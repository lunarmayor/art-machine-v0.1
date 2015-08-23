@HasMeteorData
class UpvoteButton extends React.Component {
  getMeteorData() {
    Meteor.subscribe('userData')

    return {
      userId: Meteor.userId(),
    }
  }

  upvote() {
    ArtWorkActions.upvote(this.props.artWork._id)
  }

  render() {
    let classes='upvoteBtn-icon'

    if(this.props.artWork.upvoters.indexOf(this.data.userId) > -1) {
      classes = classes + ' isActive';
    }

    return (
      <div className="upvoteBtn" onClick={this.upvote.bind(this)}>
        <Heart className={classes}/>
        <div className='upvoteBtn-count'>
         {this.props.artWork.upvotes || 0}
        </div>
      </div>
    )
  }
}

this.UpvoteButton = UpvoteButton
