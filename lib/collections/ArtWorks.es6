ArtWorks = new Mongo.Collection('artWorks');

Meteor.startup(() => {
  if(Meteor.isClient) {
    trackCollection(ArtWorks, CollectionActions.artWorksChanged)
  }
})

ArtWork = {
  create(attributes) {
    ArtWorks.insert(attributes)
  },

  findAll() {
    return ArtWorks.find({}, { sort: { created_at: -1 }}).fetch()
  }
}
