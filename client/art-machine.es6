const { Router, Redirect, Route, Link, State, Navigation } = ReactRouter;
const { history } = ReactRouter.lib.BrowserHistory;
this.Link = Link
this.State = State
this.Navigation = Navigation

Meteor.startup(() => {
  React.render((
    <Router history={history}>
      <Route component={App}>
        <Redirect from="/" to="explore/top" />
        <Route path='explore' component={Home} onEnter={requireAuth}>
          <Route path='top' component={TopArtWorkContainer}/>
          <Route path='stream' component={ArtWorkContainer}/>
        </Route>
        <Route path='editor' component={Editor} onEnter={requireAuth} onLeave={leaveEditor}/>
        <Route path='profile/:id' component={Profile} onEnter={requireAuth}/>
        <Route path='art-piece/:id' component={ArtPieceContainer} onEnter={requireAuth}/>
        <Route path='login' component={Login} onEnter={goHomeIfLoggedIn}/>
      </Route>
    </Router>
  ), document.body)
})

leaveEditor = () =>
  EditorActions.changeStage('new')
