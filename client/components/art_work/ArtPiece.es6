class ArtPieceViewer extends React.Component {
  render() {
    let art = this.props.artPiece
    let user = art.user;

    return (
      <article className='artPiece'>
        <header>
          <h4>
            <Link to={`/profile/${user._id}`}>
              <img src={user.av_url}/>
            </Link>
          </h4>
          <h3>
            {user.name}
            { art.isRemix ?
              ' (remix)'
            : null }
          </h3>
        </header>
        <img src={art.canvasData}/>
        <footer>
        </footer>
      </article>
    )
  }
}

this.ArtPieceViewer = ArtPieceViewer
