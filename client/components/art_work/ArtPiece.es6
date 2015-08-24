class ArtPieceViewer extends React.Component {
  render() {
    let art = this.props.artPiece
    let user = art.user;

    return (
      <article className='artPiece'>
        { art.isRemix ?
          <header>
            <hgroup>
              <h4>
                <Link to={`/profile/${art.remixee._id}`}>
                  <img src={art.remixee.av_url}/>
                </Link>
              </h4>
              <h3>
                {art.remixee.name}
              </h3>
            </hgroup>

            <hgroup>
              <h6>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" data-icon="arrow-right-angle-top-right-fill" data-container-transform="translate(0 4)" viewBox="0 0 32 40" x="0px" y="0px"><path d="M0 0v21h26v2.5c0 .3.206.387.406.188l5.188-3.875c.2-.2.2-.425 0-.625l-5.188-3.875c-.2-.2-.406-.113-.406.188v2.5h-23v-18h-3z" transform="translate(0 4)"/></svg>
                <Link to={`/profile/${user._id}`}>
                  <img src={user.av_url}/>
                </Link>
              </h6>
              <h5>
                {user.name + ' remix'}
              </h5>
            </hgroup>
          </header>
        :
          <header>
            <h4>
              <Link to={`/profile/${user._id}`}>
                <img src={user.av_url}/>
              </Link>
            </h4>
            <h3>
              {user.name}
            </h3>
          </header>
        }
        <ArtWorkItem expanded={true} artWork={art}/>
      </article>
    )
  }
}

this.ArtPieceViewer = ArtPieceViewer
