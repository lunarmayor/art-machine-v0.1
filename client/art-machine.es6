const { Router, Route, Link, State, Navigation } = ReactRouter;
const { history } = ReactRouter.lib.BrowserHistory;
this.Link = Link
this.State = State
this.Navigation = Navigation

Meteor.startup(() => {
  React.render((
    <Router history={history}>
      <Route component={App}>
        <Route path='/' component={Home} onEnter={requireAuth}/>
        <Route path='/editor' component={Editor} onEnter={requireAuth} onLeave={leaveEditor}/>
        <Route path='/login' component={Login} onEnter={goHomeIfLoggedIn}/>
      </Route>
    </Router>
  ), document.body)
})

leaveEditor = () =>
  EditorActions.changeStage('new')
