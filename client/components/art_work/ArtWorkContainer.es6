class ArtWorkContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = ArtWorkStore.getState().state
  }

  componentDidMount() {
    ArtWorkStore.listen(this.onChange.bind(this))
  }

  componentWillUnmount() {
    ArtWorkStore.unlisten(this.onChange.bind(this))
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

this.ArtWorkContainer = ArtWorkContainer
