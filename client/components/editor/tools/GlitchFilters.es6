let filters = [
  { name: 'lavaworld', color: '#00B9F2' },
  { name: 'aquafier', color: '#008FD5' },
  { name: 'darkGravity', color: '#034DA2' },
  { name: 'lightGravity', color: '#662E91' },
  { name: 'new', color: '#942977' },
  { name: 'newnew', color: '#BF245E' },
  { name: 'slicer', color: '#EC1B30' },
  { name: 'random', color: '#F36523' },
  { name: 'newnews', color: '#FFC20F' },
  { name: 'crusher', color: '#FFEC01' },
  { name: 'blueGreenMeltDown', color: '#CADB2A' },
  { name: 'splitFace', color: '#eee' },
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
      <div>
        <div className="">
          <ul>
            { glitchFilters }
          </ul>
        </div>
      </div>
    )
  }
}

this.GlitchFilters = GlitchFilters
