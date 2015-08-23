@HasMeteorData
class UserInfo extends React.Component {
  getMeteorData() {
    Meteor.call('userTotalUpvotes', this.props.user._id, (e,r) => {
      Session.set('totalUpvotes', r)
    })

    return {
      totalUpvotes: Session.get('totalUpvotes')
    }
  }

  render() {
    let user = this.props.user
    return (
      <div className="userInfo">
        <img className='userInfo-image' src={user.services.twitter.profile_image_url}/>
        <div className="userInfo-name">
          {user.profile.name}
        </div>
        <div className="userInfo-upvoteCount">
          <Heart className="userInfo-upvoteIcon"/>
          {this.data.totalUpvotes}
        </div>
      </div>
    )
  }
}

this.UserInfo = UserInfo
