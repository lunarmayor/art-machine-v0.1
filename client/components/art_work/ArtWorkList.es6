class ArtWorkList extends React.Component {
  render() {
    let artWorks = this.props.artWorks.map((artWork) => {
      return(<ArtWorkItem key={artWork._id} artWork={artWork}/>)
    })

    return (
      <ul className='artWorkList'>
        {artWorks}
      </ul>
    )
  }
}

this.ArtWorkList = ArtWorkList
