class EditorStore {
  constructor() {
    this.bindListeners({
      onEditorStageChanged: EditorActions.changeStage,
      onArtBoardChanged: EditorActions.addArtBoard,
      onClearRemix: EditorActions.clearRemix,
      onRemixSet: ArtWorkActions.setRemix,
      onResetEditor: EditorActions.resetEditor,
    })

    this.stage = 'new'
    this.artBoard = new ArtBoard()
    this.remixData = new ReactiveDict('remixData')
    this.remixData.set('remixUser', null)
  }

  onEditorStageChanged(stage) {
    this.setState({ stage: stage })
  }

  onArtBoardChanged(artBoard) {
    this.artBoard = artBoard;
  }

  onClearRemix() {
    this.setState({
      isRemix: false,
      original: null,
    })
  }

  onResetEditor() {
    this.setState({
      isRemix: false,
      original: null,
      stage: 'new',
    })
    this.remixData.set('remixUser', null)
  }

  onRemixSet(id) {
    this.tracker = this.tracker || Deps.autorun(() => {
      this.setState({
        isRemix: true,
        original: ArtWorks.findOne({_id: this.remixData.get('remixUser')}),
        stage: 'edit'
      })

      if(this.original) {
        this.artBoard.loadAndSave(this.original.canvasData)
      }
    })
    this.remixData.set('remixUser', id)

    Meteor.subscribe('artPieceData', this.remixData.get('remixUser'))
  }
}

this.EditorStore = alt.createStore(EditorStore, 'EditorStore')
