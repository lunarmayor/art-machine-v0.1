class ArtWorkList extends React.Component {
  render() {
    let artWorks = this.props.artWorks.map((artWork) => {
      return(<ArtWorkItem key={artWork._id} artWork={artWork}/>)
    })

    return (
      <div className='artWorkList'>
        {artWorks}
      </div>
    )
  }
}

this.ArtWorkList = ArtWorkList
