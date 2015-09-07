Meteor.startup(function() {
  if(true) {
    let accounts = Accounts.loginServiceConfiguration.find({service: 'twitter'}).fetch()
    if(accounts.length) {
      let id = accounts[0]._id
      Accounts.loginServiceConfiguration.remove({_id: id})
      Accounts.loginServiceConfiguration.insert({
        service     : 'twitter',
        consumerKey : '3hnWyHvLOFryyVha6viarEOVl',
        secret      : 'NZvj9P3nH4jEBakgeUv1lrLBhoMK11lLnrWBUAT8xz1gUFCZXB'
      });
    } else {
      Accounts.loginServiceConfiguration.insert({
        service     : 'twitter',
        consumerKey : '3hnWyHvLOFryyVha6viarEOVl',
        secret      : 'NZvj9P3nH4jEBakgeUv1lrLBhoMK11lLnrWBUAT8xz1gUFCZXB'
      });
    }
  }
});

if(Meteor.isServer) {
  Accounts.validateLoginAttempt(function(info) {
    let user = info.user;
    if(user && user.isBanned) throw new Meteor.Error(403, 'You are banned');
    return true
  });
}
