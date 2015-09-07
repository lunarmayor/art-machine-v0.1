this.Login = React.createClass({
  componentDidMount() {
    mixpanel.track('view landing page')
  },

  loginWithTwitter() {
    mixpanel.track('login with twitter')
    Accounts.onLogin(() => {
      this.redirectToNext
    })
    Meteor.loginWithTwitter()
  },

  redirectToNext() {
    this.transitionTo('/')
  },

  render() {
    return (
      <div className="flexContainer">
        <div className="login">
          <ArtMachineLogo width='50' height='50'/>
          <button onClick={this.loginWithTwitter}>Login with Twitter</button>
        </div>
      </div>
    )
  }
})

