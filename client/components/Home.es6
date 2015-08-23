class Home extends React.Component {
  addArtWork() {
    ArtWorkActions.moreArtWork()
  }

  render() {
    return (
      <div className='home'>
        <div className='subnav'>
          <Link className='subnav-link' to="/explore/top">top</Link>
          <Link className='subnav-link' to="/explore/stream">stream</Link>
        </div>
        { this.props.children }
      </div>
    )
  }
}

this.Home = Home
