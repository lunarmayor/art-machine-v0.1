requireAuth = (nextState, transition) => {
  if(!Meteor.userId()) {
    transition.to('/login', {nextPath: nextState.location.path})
  }
}

goHomeIfLoggedIn = (nextState, transition) => {
  if(!!Meteor.userId()) {
    transition.to('/')
  }
}
