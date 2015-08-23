class UserArtWorkStore {
  constructor() {
    this.bindListeners({
      onSetUser: ArtWorkActions.setUser,
      onArtWorksChanged: CollectionActions.artWorksChanged,
    })

    this.artWorks = [];
  }

  onSetUser(id) {
    this.id = id;
    Meteor.subscribe('topArtByUser', id)
    this.setState({
      artWorks: ArtWorks.find({ 'user._id': id }, { sort: { upvotes: -1 }})
    })
  }

  onArtWorksChanged() {
    if(this.id) {
      this.setState({
        artWorks: ArtWorks.find({ 'user._id': this.id }, { sort: { upvotes: -1 }})
      })
    }
  }
}

this.UserArtWorkStore = alt.createStore(UserArtWorkStore, 'UserArtWorkStore')
