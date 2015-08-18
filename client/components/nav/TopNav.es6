this.TopNav = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe('userData')

    return {
      currentUser: Meteor.user(),
    }
  },

  render() {
    return (
      <nav className='nav'>
        <div className='nav-innerContainer'>
          <ArtMachineLogo width='50' height='50'/>
          {this.data.currentUser && this.data.currentUser.services ?
            <UserProfileLink user={this.data.currentUser}/>
          : null}
          <NewArtLink/>
        </div>
      </nav>
    )
  }
})

