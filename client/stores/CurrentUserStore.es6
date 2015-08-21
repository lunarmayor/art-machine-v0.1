class CurrentUserStore {
  constructor() {
    Meteor.subscribe('userData')
    this.currentUser = Meteor.user()
    Deps.autorun(() => {
      this.currentUser = Meteor.user()
    })
  }
}

this.CurrentUserStore = alt.createStore(CurrentUserStore, 'CurrentUserStore')
