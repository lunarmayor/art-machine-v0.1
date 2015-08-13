this.TopNav = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user(),
    }
  },

  render() {
    return (
      <nav className='nav'>
        <div className='nav-innerContainer'>
          <ArtMachineLogo width='50' height='50'/>
          {this.data.currentUser ?
            <UserProfileLink user={this.data.currentUser}/>
          : null}
          <NewArtLink/>
        </div>
      </nav>
    )
  }
})

