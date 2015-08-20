class Home extends React.Component {
  addArtWork() {
    ArtWorkActions.moreArtWork()
  }

  render() {
    return (
      <div className='home'>
        <InfiniteScrollContainer onScrollBottom={this.addArtWork.bind(this)}>
          <ArtWorkContainer/>
        </InfiniteScrollContainer>
      </div>
    )
  }
}

this.Home = Home
