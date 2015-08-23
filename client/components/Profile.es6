this.Profile = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe('profileData', this.props.params.id);

    return {
      currentUser: Meteor.users.findOne({ _id: this.props.params.id })
    }
  },

  render() {
    return (
      <div className='profile'>
        { this.data.currentUser && this.data.currentUser.services  ?
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
