@HasMeteorData
class ArtWorkContainer extends React.Component {
  constructor(props) {
    super(props)
    this.meteorData = new ReactiveDict;
    this.meteorData.set('limit', 10);
  }

  getMeteorData() {
    Deps.autorun(() => {
      Meteor.subscribe('artFeed', this.meteorData.get('limit'))
    })

    return {
      artWorks: ArtWorks.find({}, { limit: this.meteorData.get('limit'), sort: { created_at: -1 }}).fetch()
    }

  }

  componentDidMount() {
    ArtWorkStore.listen(this.onChange.bind(this))
  }

  componentWillUnmount() {
    ArtWorkStore.unlisten(this.onChange.bind(this))
  }

  onChange(state) {
    this.setState(state)
  }

  addArtWork() {
    this.meteorData.set('limit', this.meteorData.get('limit') + 10)
  }

  render() {
    return (
      <InfiniteScrollContainer onScrollBottom={this.addArtWork.bind(this)}>
        <ArtWorkList artWorks={this.data.artWorks}/>
      </InfiniteScrollContainer>
    )
  }
}

this.ArtWorkContainer = ArtWorkContainer
