const { Router, Route, Link } = ReactRouter;
const { history } = ReactRouter.lib.BrowserHistory;
window.Link = Link

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
