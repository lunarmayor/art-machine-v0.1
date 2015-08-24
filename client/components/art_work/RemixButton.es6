this.RemixButton = React.createClass({
  mixins: [Navigation],

  setupRemixCanvas() {
    this.transitionTo(`/editor/remix/${this.props.artWork._id}`)
  },

  render() {
    return (
      <div onClick={this.setupRemixCanvas} className='remixBtn'>
        <Remix/>
      </div>
    )
  }
})
