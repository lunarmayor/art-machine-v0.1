let filters = [
  { name: 'lavaworld', color: '#A4120F' },
  { name: 'new' },
]

class GlitchFilters extends React.Component {
  constructor(props) {
    super(props)
   }

  render() {
    let glitchFilters = filters.map((filter) => {
      return <GlitchFilter {...this.props} name={filter.name} color={filter.color}/>
    })

    return (
      <div className="">
        <ul>
          { glitchFilters }
        </ul>
      </div>
    )
  }
}

this.GlitchFilters = GlitchFilters
