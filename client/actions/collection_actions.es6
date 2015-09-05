class CollectionActions {
  artWorksChanged(artWorks) {
    this.dispatch(artWorks);
  }

  notificationsChanged(notifications) {
    this.dispatch(notifications)
  }
}

this.CollectionActions = alt.createActions(CollectionActions)
