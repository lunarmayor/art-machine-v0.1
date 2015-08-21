class UserInfo extends React.Component {

  render() {
    let user = this.props.user
    return (
      <div className="userInfo">
        <div className='artWork-userAv'>
          <img src={user.services.twitter.profile_image_url}/>
        </div>
        <div className="userInfo-name">
          {user.profile.name}
        </div>
      </div>
    )
  }
}

this.UserInfo = UserInfo
