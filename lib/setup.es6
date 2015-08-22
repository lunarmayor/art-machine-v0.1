Meteor.startup(() => {
})

Meteor.startup(function() {

  Accounts.loginServiceConfiguration.remove({
    service : 'twitter'
  });

  Accounts.loginServiceConfiguration.insert({
    service     : 'twitter',
    consumerKey : '3hnWyHvLOFryyVha6viarEOVl',
    secret      : 'NZvj9P3nH4jEBakgeUv1lrLBhoMK11lLnrWBUAT8xz1gUFCZXB'
  });

});

if(Meteor.isServer) {
  Accounts.validateLoginAttempt(function(info) {
    let user = info.user;
    if(user.isBanned) throw new Meteor.Error(403, 'You are banned');
    return true
  });
}
