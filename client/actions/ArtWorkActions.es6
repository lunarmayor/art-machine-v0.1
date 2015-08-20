class ArtWorkActions {
  create(canvasData) {
    this.dispatch(canvasData)
  }

  moreArtWork() {
    this.dispatch()
  }

  upvote(id) {
    this.dispatch(id)
  }
}

this.ArtWorkActions = alt.createActions(ArtWorkActions)
