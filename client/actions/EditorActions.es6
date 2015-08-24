class EditorActions {
  changeStage(stage) {
    this.dispatch(stage);
  }

  addArtBoard(artBoard) {
    this.dispatch(artBoard);
  }

  clearRemix() {
    this.dispatch()
  }

  resetEditor() {
    this.dispatch();
  }
}

this.EditorActions = alt.createActions(EditorActions)
