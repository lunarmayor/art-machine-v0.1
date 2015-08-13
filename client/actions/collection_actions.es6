class CollectionActions {
  artWorksChanged(artWorks) {
    this.dispatch(artWorks);
  }
}

this.CollectionActions = alt.createActions(CollectionActions)
