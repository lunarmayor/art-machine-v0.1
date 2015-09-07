class SortFilter extends React.Component {
  sortCanvas() {
    this.props.artBoard[this.props.name]()
  }

  render() {
    return (
      <li onClick={this.sortCanvas.bind(this)}>{this.props.display}</li>
    )
  }
}

this.SortFilter = SortFilter;
