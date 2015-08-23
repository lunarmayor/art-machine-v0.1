class UserArtWorkContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = UserArtWorkStore.getState()
  }

  componentDidMount() {
    UserArtWorkStore.listen(this.onChange.bind(this))
  }

  componentWillUnmount() {
    UserArtWorkStore.unlisten(this.onChange.bind(this))
  }

  onChange(state) {
    this.setState(state)
  }

  render() {
    return (
      <ArtWorkList artWorks={this.state.artWorks}/>
    )
  }
}

this.UserArtWorkContainer = UserArtWorkContainer
