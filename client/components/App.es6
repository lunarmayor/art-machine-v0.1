class App extends React.Component {
  render() {
    return (
      <div className='app'>
        {Meteor.userId() ?
          <TopNav/>
        : null }
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

this.App = App;
