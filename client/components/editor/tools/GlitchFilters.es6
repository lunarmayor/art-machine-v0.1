let filters = [
  { display: 'lava world',name: 'lavaworld'},
  { display: 'aquafier', name: 'aquafier'},
  { display: 'dark gravity', name: 'darkGravity'},
  { display: 'light gravity', name: 'lightGravity'},
  { display: 'time 1', name: 'new'},
  { display: 'grainz', name: 'newnew'},
  { display: 'slicer', name: 'slicer'},
  { display: 'neon melt', name: 'random'},
  { display: 'vertical dispersal', name: 'newnews'},
  { display: 'stripes', name: 'crusher'},
  { display: 'electric shift', name: 'blueGreenMeltDown'},
  { display: 'split face', name: 'splitFace'},
  { display: 'messy invert', name: 'messyInvert' },
]

class GlitchFilters extends React.Component {
  constructor(props) {
    super(props)
   }

  render() {
    let glitchFilters = filters.map((filter) => {
      return <GlitchFilter {...this.props} display={filter.display} name={filter.name}/>
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
