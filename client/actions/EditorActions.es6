class EditorActions {
  changeStage(stage) {
    this.dispatch(stage);
  }

  addArtBoard(artBoard) {
    this.dispatch(artBoard);
  }
}

this.EditorActions = alt.createActions(EditorActions)
