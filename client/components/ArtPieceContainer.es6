@HasMeteorData
class ArtPieceContainer extends React.Component {
  getMeteorData() {
    Meteor.subscribe('artPieceData', this.props.params.id);
    Meteor.subscribe('remixData', this.props.params.id);
    Meteor.subscribe('artFeed', 1000)

    let artPiece = ArtWorks.findOne({ _id: this.props.params.id })
    let original = ArtWorks.findOne({remixes: {$in: [this.props.params.id]}})

    return {
      artPiece: artPiece,
      original: original,
    }
  }

  render() {
    return (
      <div className='artPieceContainer'>
        { this.data.artPiece ?
          <div>
            <ArtPieceViewer artPiece={this.data.artPiece}/>
            <br/>
          </div>
        : null }

        { this.data.original ?
          <div>
            <h5 className="sectionHeader">original</h5>
            <ArtPieceViewer artPiece={this.data.original}/>
          </div>
        : null }
      </div>
    )
  }
}

this.ArtPieceContainer = ArtPieceContainer
