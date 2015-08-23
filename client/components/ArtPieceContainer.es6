@HasMeteorData
class ArtPieceContainer extends React.Component {
  getMeteorData() {
    Meteor.subscribe('artPieceData', this.props.params.id);

    return {
      artPiece: ArtWorks.findOne({ _id: this.props.params.id }),
    }
  }

  render() {
    return (
      <div className='artPieceContainer'>
        { this.data.artPiece ?
          <ArtPieceViewer artPiece={this.data.artPiece}/>
        : null }
      </div>
    )
  }
}

this.ArtPieceContainer = ArtPieceContainer
