this.Profile = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe('profileData', this.props.params.id);
    ArtWorkActions.setUser(this.props.params.id)

    return {
      currentUser: Meteor.users.findOne({ _id: this.props.params.id })
    }
  },

  render() {
    let user = this.data.currentUser;

    return (
      <div className='profile'>
        { user && user.services && user.profile  ?
          <div>
            <UserInfo user={this.data.currentUser}/>
            <div>
              <UserArtWorkContainer id={this.data.currentUser._id}/>
            </div>
          </div>
        : null }
      </div>
    )
  }
})
