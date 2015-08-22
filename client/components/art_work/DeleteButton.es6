class DeleteButton extends React.Component {
  destroyArtWork() {
    ArtWorkActions.destroy(this.props.artWork._id)
  }

  render() {
    return (
      <div className="deleteBtn" onClick={this.destroyArtWork.bind(this)}>x</div>
    )
  }
}

this.DeleteButton = DeleteButton
