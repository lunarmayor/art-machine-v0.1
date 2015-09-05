class ArtWorkContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = ArtWorkStore.getState()
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

  addArtWork() {
    ArtWorkActions.moreArtWork();
  }

  render() {
    return (
      <InfiniteScrollContainer onScrollBottom={this.addArtWork.bind(this)}>
        <ArtWorkList artWorks={this.state.artWorks}/>
      </InfiniteScrollContainer>
    )
  }
}

this.ArtWorkContainer = ArtWorkContainer
