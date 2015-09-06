class ArtWorkStore {
  constructor() {
    this.bindListeners({
      onCreate: ArtWorkActions.create,
      onMoreArtWork: ArtWorkActions.moreArtWork,
      onUpvote: ArtWorkActions.upvote,
      onDestroy: ArtWorkActions.destroy,
    });
  }

  onMoreArtWork() {
   // this.meteorData.set('limit', this.meteorData.get('limit') + 10)
  }

  onDestroy(id) {
    let user = Meteor.user();
    let artwork = ArtWorks.findOne(id)
    mixpanel.track('destory art piece')
    if(user._id ===  artwork.user._id || user.isAdmin) {
      ArtWorks.remove({_id: id})
    }
  }

  onUpvote(artWorkId) {
    let userId = Meteor.userId();
    let artWork = ArtWorks.findOne(artWorkId);
    mixpanel.track('upvote')
    if(artWork.upvoters.indexOf(userId) === -1) {
      Notifications.insert({
        type: 'upvote',
        userId: artWork.user._id,
        viewed: false,
        creator: {
          _id: Meteor.userId(),
          name: Meteor.user().profile.name,
          av_url: Meteor.user().services.twitter.profile_image_url,
        }
      })

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

  onCreate(createData) {
    if(createData.original) {
      mixpanel.track('create remix')
      let original = createData.original
      let canvasData = createData.canvasData;
      let attributes = {
        canvasData: createData.canvasData,
        created_at: new Date(),
        upvoters: [],
        upvotes: 0,
        remixers: 0,
        remixOf: createData.original._id,
        isRemix: true,
        remixee: {
          _id: createData.original.user._id,
          name: createData.original.user.name,
          av_url: createData.original.user.av_url,
        },
        remixes: [],
        user: {
          _id:  Meteor.userId(),
          name: Meteor.user().profile.name,
          av_url: Meteor.user().services.twitter.profile_image_url,
        }
      }

      Meteor.call('saveArtWork', attributes, canvasData, original)
    } else {
      mixpanel.track('create art piece')
      let canvasData = createData.canvasData
      let attributes = {
        created_at: new Date(),
        upvoters: [],
        upvotes: 0,
        remixers: 0,
        remixes: [],
        remixOf: null,
        isRemix: false,
        user: {
          _id:  Meteor.userId(),
          name: Meteor.user().profile.name,
          av_url: Meteor.user().services.twitter.profile_image_url,
        }
      }

      Meteor.call('saveArtWork', attributes, canvasData)
    }
  }
}

this.ArtWorkStore = alt.createStore(ArtWorkStore, 'ArtWorkStore')
