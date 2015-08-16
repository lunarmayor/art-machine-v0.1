class EditorStore {
  constructor() {
    this.bindListeners({
      onEditorStageChanged: EditorActions.changeStage,
      onArtBoardChanged: EditorActions.addArtBoard,
    })

    this.stage = 'new'
    this.artBoard = new ArtBoard()
  }

  onEditorStageChanged(stage) {
    this.setState({ stage: stage })
  }

  onArtBoardChanged(artBoard) {
    this.artBoard = artBoard;
  }
}

this.EditorStore = alt.createStore(EditorStore, 'EditorStore')
