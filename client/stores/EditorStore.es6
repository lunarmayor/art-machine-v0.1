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
    this.remixData.set('remixUser', null)
    history.replaceState({editor: 'editor'}, 'Art Machine', '/editor')
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
      if(this.remixData.get('remixUser') !== null) {
        this.setState({
          isRemix: true,
          original: ArtWorks.findOne({_id: this.remixData.get('remixUser')}),
          stage: 'edit'
        })

        if(this.original) {
          if(!this.artBoard.baseImage) {
            this.artBoard.loadAndSave(this.original.imageUrl)
          }
        }
      }
    })
    this.remixData.set('remixUser', id)

    Meteor.subscribe('artPieceData', this.remixData.get('remixUser'))
  }
}

this.EditorStore = alt.createStore(EditorStore, 'EditorStore')
