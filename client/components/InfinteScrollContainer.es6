class InfiniteScrollContainer extends React.Component {
  componentDidMount() {
    this.boundFunction = debounce(this.onScroll.bind(this), 10, false)
    window.addEventListener('scroll', this.boundFunction)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.boundFunction)
  }

  onScroll(e) {
    let docHeight = this.getHeight()
    let distance = docHeight - (window.innerHeight + window.scrollY)
    if (distance < 550) {
      this.props.onScrollBottom()
    }
  }

  getHeight() {
    let body = document.body,
        html = document.documentElement;

    return Math.max( body.scrollHeight, body.offsetHeight,
                     html.clientHeight, html.scrollHeight, html.offsetHeight )
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

this.InfiniteScrollContainer = InfiniteScrollContainer
