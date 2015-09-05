class TopArtWorkStore {
  constructor() {
    this.bindListeners({
      onArtWorksChanged: CollectionActions.artWorksChanged,
      onMoreArtWork: TopArtWorkActions.moreArtWork,
    })

    this.meteorData = new ReactiveDict;
    this.meteorData.set('topLimit', 15)

    Deps.autorun(() => {
      Meteor.subscribe('topArt', this.meteorData.get('topLimit'));
    })

    this.artWorks = ArtWorks.find({}, { limit: this.meteorData.get('topLimit'), sort: { upvotes: -1, created_at: -1 }})
  }

  onArtWorksChanged() {
    this.setState({
      artWorks: ArtWorks.find({}, { limit: this.meteorData.get('topLimit'),  sort: { upvotes: -1, created_at: -1 }}),
    })
  }

  onMoreArtWork() {
    this.meteorData.set('topLimit', this.meteorData.get('topLimit') + 10)
  }
}

this.TopArtWorkStore = alt.createStore(TopArtWorkStore, 'TopArtWorkStore')
