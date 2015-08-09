class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

this.App = App;
