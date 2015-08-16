class ArtWorkStore {
  constructor() {
    this.bindListeners({
      onArtWorksChanged: CollectionActions.artWorksChanged,
      onCreate: ArtWorkActions.create
    });

    this.artWorks = ArtWork.findAll();

    Meteor.subscribe('artWorks');
  }

  onArtWorksChanged() {
    this.setState({artWorks: ArtWork.findAll()})
  }

  onCreate(canvasData) {
    ArtWork.create({
      canvasData: canvasData,
      created_at: new Date(),
      user: {
        _id:  Meteor.userId(),
        name: Meteor.user().profile.name,
        av_url: Meteor.user().services.twitter.profile_image_url,
      }
    })
  }
}

this.ArtWorkStore = alt.createStore(ArtWorkStore, 'ArtWorkStore')
