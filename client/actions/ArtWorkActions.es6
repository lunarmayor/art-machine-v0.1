class ArtWorkActions {
  create(createData) {
    this.dispatch(createData)
  }

  moreArtWork() {
    this.dispatch()
  }

  upvote(id) {
    this.dispatch(id)
  }

  setUser(id) {
    this.dispatch(id)
  }

  setRemix(id) {
    this.dispatch(id)
  }

  destroy(id) {
    this.dispatch(id)
  }
}

this.ArtWorkActions = alt.createActions(ArtWorkActions)
