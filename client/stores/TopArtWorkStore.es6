class TopArtWorkStore {
  constructor() {
    this.bindListeners({
      onMoreArtWork: TopArtWorkActions.moreArtWork,
    })
  }

  onArtWorksChanged() {
    this.setState({
      artWorks: ArtWorks.find({}, { limit: this.meteorData.get('topLimit') || 10,  sort: { upvotes: -1, created_at: -1 }}),
    })
  }

  onMoreArtWork() {
    //this.meteorData.set('topLimit', this.meteorData.get('topLimit') + 10)
  }
}

this.TopArtWorkStore = alt.createStore(TopArtWorkStore, 'TopArtWorkStore')
