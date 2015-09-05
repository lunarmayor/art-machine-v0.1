topArtWorksData = new ReactiveDict;
topArtWorksData.set('limit', 20)

@HasMeteorData
class TopArtWorkContainer extends React.Component {
  getMeteorData() {
    Deps.autorun(() => {
      Meteor.subscribe('topArt', topArtWorksData.get('limit'))
    })

    return {
      artWorks: ArtWorks.find({}, { limit: topArtWorksData.get('topLimit'),  sort: { upvotes: -1, created_at: -1 }}).fetch(),
    }
  }

  addArtWork() {
    topArtWorksData.set('limit', topArtWorksData.get('limit') + 10)
  }

  render() {
    return (
      <InfiniteScrollContainer onScrollBottom={this.addArtWork.bind(this)}>
        <ArtWorkList artWorks={this.data.artWorks}/>
      </InfiniteScrollContainer>
    )
  }
}

this.TopArtWorkContainer = TopArtWorkContainer
