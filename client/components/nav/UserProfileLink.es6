class UserProfileLink extends React.Component {
  render() {
    return (
      <Link className="profileLink" to='/profile'>
        <img src={this.props.user.services.twitter.profile_image_url}/>
      </Link>
    )
  }
}

this.UserProfileLink = UserProfileLink
