class ArtWorkStore {
  constructor() {
    this.bindListeners({
      onArtWorksChanged: CollectionActions.artWorksChanged,
      onCreate: ArtWorkActions.create
    });

    this.meteorData = new ReactiveDict;
    this.meteorData.set('limit', 15)

    Deps.autorun(() => {
      Meteor.subscribe('artFeed', this.meteorData.get('limit'));
    })

    this.artWorks = ArtWorks.find({}, { sort: { created_at: -1 }})
  }

  onArtWorksChanged() {
    this.setState({artWorks: ArtWorks.find({}, { sort: { created_at: -1 }})})
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
