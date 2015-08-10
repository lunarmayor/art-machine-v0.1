class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <TopNav/>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

this.App = App;
