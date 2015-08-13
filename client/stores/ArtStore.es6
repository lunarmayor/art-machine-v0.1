class ArtStore {
  constructor() {
    bindListeners({
      onArtWorksChanged: CollectionActions.artWorksChanged,
      onCreate: ArtWorksActions.create
    });

    this.state = {
      artWorks: ArtWorks.findAll(),
    }

    Meteor.subscribe('artWorks');
  }

  onArtWorksChanged() {
    this.setState({artWorks: ArtWorks.findAll})
  }

  onCreate(canvasData) {
    ArtWork.create({
      canvasData: canvasData,
      user: {
        _id:  Meteor.userId(),
        name: Meteor.user().profile.name,
        av_url: Meter.user().services.twitter.profile_image_url,
      }
    })
  }
}
