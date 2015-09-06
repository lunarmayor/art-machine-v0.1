artWorksData = new ReactiveDict;
artWorksData.set('limit', 20)

@HasMeteorData
class ArtWorkContainer extends React.Component {
  getMeteorData() {
    Deps.autorun(() => {
      Meteor.subscribe('artFeed', artWorksData.get('limit'))
    })

    return {
      artWorks: ArtWorks.find({}, { limit: artWorksData.get('limit'), sort: { created_at: -1 }}).fetch()
    }

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
    artWorksData.set('limit', artWorksData.get('limit') + 10)
  }

  render() {
    return (
      <InfiniteScrollContainer onScrollBottom={this.addArtWork.bind(this)}>
        <ArtWorkList artWorks={this.data.artWorks}/>
      </InfiniteScrollContainer>
    )
  }
}

this.ArtWorkContainer = ArtWorkContainer
