const { Router, Route, Link } = ReactRouter;
const { history } = ReactRouter.lib.BrowserHistory;
this.Link = Link

Meteor.startup(() => {
  React.render((
    <Router history={history}>
      <Route component={App}>
        <Route path='/' component={Home}/>
        <Route path='/editor' component={Editor}/>
      </Route>
    </Router>
  ), document.body)
})
