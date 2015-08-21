this.Profile = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe('userData');

    return {
      currentUser: Meteor.user()
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
