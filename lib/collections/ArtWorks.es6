ArtWorks = new Mongo.Collection('artWorks');

Meteor.startup(() => {
  if(Meteor.isClient) {
    trackCollection(ArtWorks, CollectionActions.artWorksChanged)
  }
})

if(Meteor.isServer) {
  Meteor.publish('topArt', function(limit) {
    return ArtWorks.find({}, { limit: limit, sort: { upvotes: -1}})
  })

  Meteor.publish('artFeed', function(limit) {
    return ArtWorks.find({}, { limit: limit, sort: { created_at: -1 }})
  })

  Meteor.publish('topArtByUser', function(id, limit = 15) {
    return ArtWorks.find({ 'user._id': id }, { limit: limit, sort: { created_at: -1 }})
  })
}

ArtWork = {
  create(attributes) {
    return ArtWorks.insert(attributes)
  },

  findAll() {
    return ArtWorks.find({}, { limit: 5, sort: { created_at: -1 }})
  }
}

