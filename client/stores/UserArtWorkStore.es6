class UserArtWorkStore {
  constructor() {
    this.bindListeners({
      onSetUser: ArtWorkActions.setUser,
    })

    this.artWorks = [];
  }

  onSetUser(id) {
    Meteor.subscribe('topArtByUser', id)
    this.setState({
      artWorks: ArtWorks.find({ 'user._id': id }, { sort: { upvotes: -1 }})
    })
  }
}

this.UserArtWorkStore = alt.createStore(UserArtWorkStore, 'UserArtWorkStore')
