@HasMeteorData
class TopArtWorkContainer extends React.Component {
  constructor(props) {
    super(props);
    this.meteorData = new ReactiveDict;
    this.meteorData.set('limit', 10);
  }

  getMeteorData() {
    Deps.autorun(() => {
      Meteor.subscribe('topArt', this.meteorData.get('limit'))
    })

    return {
      artWorks: ArtWorks.find({}, { limit: this.meteorData.get('topLimit'),  sort: { upvotes: -1, created_at: -1 }}).fetch(),
    }
  }

  addArtWork() {
    this.meteorData.set('limit', this.meteorData.get('limit') + 10)
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
