this.UpvoteButton = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe('userData')

    return {
      userId: Meteor.userId(),
    }
  },

  upvote() {
    ArtWorkActions.upvote(this.props.artWork._id)
  },

  render() {
    let classes='upvoteBtn-icon'

    if(this.props.artWork.upvoters.indexOf(this.data.userId) > -1) {
      classes = classes + ' isActive';
    }

    return (
      <div className="upvoteBtn">
        <div className={classes} onClick={this.upvote}>
          <svg  x="0px" y="0px" viewBox="0 0 100 90" enable-background="new 0 0 100 86.108">
            <g>
              <path fill="#010101" d="M72.748,0C55.736,0,50,15.099,50,15.099S44.271,0,27.252,0C10.245,0,0,16.214,0,29.578 c0,22.396,50,56.53,50,56.53s50-34.126,50-56.526C100,16.214,89.76,0,72.748,0z"/>
            </g>
          </svg>
        </div>
        <div className='upvoteBtn-count'>
         {this.props.artWork.upvotes || 0}
        </div>
      </div>
    )
  }
})

