class Home extends React.Component {
  addArtWork() {
    ArtWorkActions.moreArtWork()
  }

  render() {
    return (
      <div className='home'>
        <div className="userInfo">Explore</div>
        <InfiniteScrollContainer onScrollBottom={this.addArtWork.bind(this)}>
          <ArtWorkContainer/>
        </InfiniteScrollContainer>
      </div>
    )
  }
}

this.Home = Home
