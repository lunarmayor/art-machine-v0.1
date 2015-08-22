class ArtWorkStore {
  constructor() {
    this.bindListeners({
      onArtWorksChanged: CollectionActions.artWorksChanged,
      onCreate: ArtWorkActions.create,
      onMoreArtWork: ArtWorkActions.moreArtWork,
      onUpvote: ArtWorkActions.upvote,
      onDestroy: ArtWorkActions.destroy,
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

  onMoreArtWork() {
    this.meteorData.set('limit', this.meteorData.get('limit') + 10)
  }

  onDestroy(id) {
    let user = Meteor.user();
    let artwork = ArtWorks.findOne(id)
    if(user._id ===  artwork.user._id || user.isAdmin) {
      ArtWorks.remove({_id: id})
    }
  }

  onUpvote(artWorkId) {
    let userId = Meteor.userId();
    let artWork = ArtWorks.findOne(artWorkId);
    if(artWork.upvoters.indexOf(userId) === -1) {
      ArtWorks.update(
        {
          _id: artWorkId,
        },
        {
          $push: { upvoters: userId },
          $inc: { upvotes: 1 },
        }
      )
    }
  }

  onCreate(canvasData) {
    ArtWork.create({
      canvasData: canvasData,
      created_at: new Date(),
      upvoters: [],
      upvotes: 0,
      user: {
        _id:  Meteor.userId(),
        name: Meteor.user().profile.name,
        av_url: Meteor.user().services.twitter.profile_image_url,
      }
    })
  }
}

this.ArtWorkStore = alt.createStore(ArtWorkStore, 'ArtWorkStore')
