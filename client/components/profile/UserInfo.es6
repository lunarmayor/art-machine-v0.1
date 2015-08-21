class UserInfo extends React.Component {

  render() {
    let user = this.props.user
    return (
      <div className="userInfo">
        <img className='userInfo-image' src={user.services.twitter.profile_image_url}/>
        <div className="userInfo-name">
          {user.profile.name}
        </div>
      </div>
    )
  }
}

this.UserInfo = UserInfo
