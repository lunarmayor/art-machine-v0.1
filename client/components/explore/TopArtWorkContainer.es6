class TopArtWorkContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = TopArtWorkStore.getState();
  }

 componentDidMount() {
    TopArtWorkStore.listen(this.onChange.bind(this))
  }

  componentWillUnmount() {
    TopArtWorkStore.unlisten(this.onChange.bind(this))
  }

  onChange(state) {
    this.setState(state)
  }

  addArtWork() {
    TopArtWorkActions.moreArtWork();
  }

  render() {
    return (
      <InfiniteScrollContainer onScrollBottom={this.addArtWork.bind(this)}>
        <ArtWorkList artWorks={this.state.artWorks}/>
      </InfiniteScrollContainer>
    )
  }
}

this.TopArtWorkContainer = TopArtWorkContainer
