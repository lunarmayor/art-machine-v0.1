class TopArtWorkStore {
  constructor() {
    this.bindListeners({
      onArtWorksChanged: CollectionActions.artWorksChanged,
      onMoreArtWork: TopArtWorkActions.moreArtWork,
    })

    this.meteorData = new ReactiveDict;
    this.meteorData.set('limit', 15)

    Deps.autorun(() => {
      Meteor.subscribe('topArt', this.meteorData.get('limit'));
    })

    this.artWorks = ArtWorks.find({}, { sort: { upvotes: -1 }})
  }

  onArtWorksChanged() {
    this.setState({
      artWorks: ArtWorks.find({}, { sort: { upvotes: -1 }}),
    })
  }

  onMoreArtWork() {
    this.meteorData.set('limit', this.meteorData.get('limit') + 10)
  }
}

this.TopArtWorkStore = alt.createStore(TopArtWorkStore, 'TopArtWorkStore')


