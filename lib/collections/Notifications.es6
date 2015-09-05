Notifications = new Mongo.Collection('notifications');

Meteor.startup(() => {
  if(Meteor.isClient) {
    trackCollection(ArtWorks, CollectionActions.notificationsChanged)
  }
})

if(Meteor.isServer) {
  Meteor.publish('notifications', function(limit=10) {
    return Notifications.find(
      { userId: Meteor.userId() },
      { limit: limit, sort: { created_at: -1 }}
    )
  })
}
