class Login extends React.Component {
  loginWithTwitter() {
    Accounts.onLogin(this.redirectToNext)
    Meteor.loginWithTwitter()
  }

  redirectToNext() {
    this.transitionTo('/')
  }

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
}

this.Login = Login
