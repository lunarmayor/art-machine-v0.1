if(Meteor.isServer) {
  Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
                    {fields: {'services.twitter': 1, 'isAdmin': 1}});
  });

  Meteor.publish("profileData", function (id) {
    return Meteor.users.find({_id: id},
                    {fields: {'services.twitter': 1, 'isAdmin': 1, profile: 1}});
  });
}

Meteor.methods({
  userTotalUpvotes(id) {
    let upvotes = 0

    ArtWorks.find({ 'user._id': id}, {fields: {'upvotes': 1}}).fetch().map((artWork) => {
      upvotes = upvotes + artWork.upvotes;
    })

    return upvotes
  }
})
