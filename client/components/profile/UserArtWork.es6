class UserArtWorkList extends React.Component {
  render() {
    let artWorks = this.props.artWorks.map((artWork) => {
      return(<ArtWorkImage key={artWork._id} artWork={artWork}/>)
    })

    return (
      <div className='userArtWorkList'>
        {artWorks}
      </div>
    )
  }
}

this.UserArtWorkList = UserArtWorkList
